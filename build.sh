#!/usr/bin/env bash
LOG="log.md"
if [ -f .bash/dev.sh ]; then
	DEV=true
else
	DEV=false
fi
LOGGING=false
if $LOGGING; then
	exec > $LOG 2>&1
	[[ -f $LOG ]] \
	&& rm -rf $LOG \
	&& touch $LOG
fi
logHead() {
	if [[ -f $LOG ]]; then
		echo "$1"
	fi
}
all() {
	pre() {
		logHead "## Pre"
		perms() {
			logHead "### Perms"
			EXT=( \
				pl \
				sh \
				py \
			)
			shopt -s globstar nullglob
			for e in ${EXT[@]}; do
				for f in **/*.$e; do
					[ -f $f ] && chmod +x $f
				done
			done
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
			./main.py
		}
		logHead "## Main"
		if ! $DEV; then
			css
			js
			pages
		fi
		if $DEV; then
			python
		fi
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
	pre
	main
	if ! $DEV; then
		post
	fi
}
all
