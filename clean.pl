#!/usr/bin/env perl
use strict;
use warnings;
sub inplace_substitutions {
	my ($filename, @subs) = @_;
	local $/;
	open my $fh, "<", $filename or die "Can't open $filename: $!";
	my $content = <$fh>;
	close $fh;
	for my $sub (@subs) {
		my ($pattern, $replacement, $flags) = @$sub;
		$flags //= "";
		$flags .= "g";
		eval "\$content =~ s/$pattern/$replacement/$flags;";
		die "Bad substitution ($pattern -> $replacement /$flags): $@" if $@;
	}
	open my $out, ">", $filename or die "Can't write $filename: $!";
	print $out $content;
	close $out;
}
my @re = (
	[
		"README.md",
		[qr/&#x20;/, " "],
		[qr/&amp;/, "&"],
		[qr/&gt;/, ">"]
	],
	[
		"make.log",
		[qr/.*? \d+ms \(unchanged\)/, ""],
		[qr/\n+/, "\n"],
		[qr/^\n|\n$/, ""]
	]
);
foreach my $r (@re) {
	inplace_substitutions(@$r)
};