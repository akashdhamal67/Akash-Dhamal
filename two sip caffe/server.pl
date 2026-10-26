#!/usr/bin/env perl
use strict;
use warnings;
use IO::Socket::INET;
use File::Spec;
use Cwd 'abs_path';

$SIG{PIPE} = 'IGNORE';

my $port = $ARGV[0] || 3000;
my $root = abs_path(File::Spec->rel2abs('.'));

my %mime = (
    'html' => 'text/html; charset=UTF-8',
    'css'  => 'text/css; charset=UTF-8',
    'js'   => 'application/javascript; charset=UTF-8',
    'svg'  => 'image/svg+xml',
    'png'  => 'image/png',
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'json' => 'application/json',
    'webp' => 'image/webp',
    'ico'  => 'image/x-icon',
    'mp4'  => 'video/mp4',
    'webm' => 'video/webm'
);

my $server = IO::Socket::INET->new(
    LocalPort => $port,
    Listen    => 10,
    Reuse     => 1,
    Proto     => 'tcp'
) or die "Cannot create socket on port $port: $!\n";

print "========================================================\n";
print " Two Sips — Premium Cafe Landing Page Server\n";
print " Serving: $root\n";
print " Local URL: http://localhost:$port\n";
print " Press Ctrl+C to stop.\n";
print "========================================================\n";

while (my $client = $server->accept()) {
    my $request_line = <$client>;
    next unless $request_line;

    if ($request_line =~ m{^GET\s+([^\s?]+)}) {
        my $path = $1;
        $path =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/eg;
        $path = '/index.html' if $path eq '/';
        my $file_path = File::Spec->catfile($root, split(m{/}, $path));

        # Security check: stay inside root
        my $real_path = abs_path($file_path);
        if ($real_path && -f $real_path && $real_path =~ m{^\Q$root\E}) {
            my ($ext) = $real_path =~ m{\.([^.]+)$};
            my $type = $mime{$ext || ''} || 'application/octet-stream';

            open my $fh, '<:raw', $real_path or do {
                print $client "HTTP/1.1 500 Internal Error\r\nContent-Length: 0\r\n\r\n";
                close $client;
                next;
            };

            my $size = -s $real_path;
            print $client "HTTP/1.1 200 OK\r\n";
            print $client "Content-Type: $type\r\n";
            print $client "Content-Length: $size\r\n";
            print $client "Connection: close\r\n";
            print $client "Cache-Control: no-cache\r\n\r\n";

            my $buffer;
            while (read($fh, $buffer, 8192)) {
                print $client $buffer;
            }
            close $fh;
        } else {
            my $body = "<html><body><h1>404 Not Found</h1></body></html>";
            print $client "HTTP/1.1 404 Not Found\r\n";
            print $client "Content-Type: text/html\r\n";
            print $client "Content-Length: " . length($body) . "\r\n";
            print $client "Connection: close\r\n\r\n";
            print $client $body;
        }
    }
    close $client;
}
