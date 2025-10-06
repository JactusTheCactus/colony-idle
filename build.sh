#!/usr/bin/env bash
TRUE=0
FALSE=1
LOG="log.md"
isTrue() {
	[ $1 -eq 0 ]
}
ifLog() {
	[[ -f $LOG ]]
}
LOGGING=$FALSE
if isTrue $LOGGING; then
	exec > $LOG
else
	if ifLog; then
		rm -rf $LOG
	fi
fi
logHead() {
	if ifLog; then
		echo "$1"
	fi
}
all() {
	pre() {
		logHead "## Pre"
		perms() {
			logHead "### Perms"
			chmod -R +x *.pl *.sh || true
		}
		perms
	}
	main() {
		css() {
			logHead "### CSS"
			SCSS=*.scss
			for s in ${SCSS[@]}; do (
				out="${s%.scss}.css"
				npx sass "$s" "$out"
				rm -f "$out.map"
				logHead "- \`$s\` => \`${s%.scss}.css\`"
			) done
		}
		js() {
			logHead "### JS"
			TS=*.ts
			for t in ${TS[@]}; do (
				npx tsc "$t" \
					--target esnext \
					--skipLibCheck true
				logHead "- \`$t\` => \`${t%.ts}.js\`"
			) done
		}
		pages() {
			logHead "### HTML & MD"
			PAGES=(html md)
			for ext in ${PAGES[@]}; do (
				logHead "#### ${ext^^}"
				PUG=*.pug
				for p in ${PUG[@]}; do (
					base="${p%.pug}"
					out="$base.$ext"
					node page.js "$out"
					logHead "- \`$p\` => \`$out\`"
				) done
			) done
		}
		python() {
			source vEnv/bin/activate
			cd app
			python3.12 main.py
		}
		logHead "## Main"
		# css
		# js
		# pages
		python
	}
	post() {
		format() {
			logHead "### Format"
			./clean.pl
			./mini.sh
			npx prettier . --write
		}
		logHead "## Post"
		format
	}
	logHead "# Build"
	# pre
	main
	# post
}
all
