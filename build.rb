require "haml"
File.write(
	ARGV[1],
	Haml::Template
		.new{File.read(ARGV[0])}
		.render
)