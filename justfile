set shell := ["bash","-eu","-o","pipefail","-c"]
all :
	echo "# Build"
	JUST=(pre main post) \
	&& for j in ${JUST[@]}; do ( \
		just "$j" \
	) done
pre :
	echo "## Pre"
	just perms
perms :
	echo "### Perms"
	chmod -R +x *.pl *.sh || true
main :
	echo "## Main"
	TYPES=(css js pages) \
	&& for j in ${TYPES[@]}; do ( \
		just "$j" \
	) done
css :
	echo "### CSS"
	SCSS=*.scss \
	&& for s in ${SCSS[@]}; do ( \
		out="${s%.scss}.css" \
		&& npx sass "$s" "$out" \
		&& rm -f "$out.map" \
		&& echo "- \`$s\` => \`${s%.scss}.css\`" \
	) done
js :
	echo "### JS"
	TS=*.ts \
	&& for t in ${TS[@]}; do ( \
		npx tsc "$t" \
			--target esnext \
			--skipLibCheck true \
		&& echo "- \`$t\` => \`${t%.ts}.js\`" \
	) done \
	&& for d in *.d.js; do ( \
		rm -rf "$d" \
	) done
pages :
	echo "### HTML & MD"
	PAGES=(html md) \
	&& for ext in ${PAGES[@]}; do ( \
		echo "#### ${ext^^}" \
		&& PUG=*.pug \
		&& for p in ${PUG[@]}; do ( \
			base="${p%.pug}" \
			&& out="$base.$ext" \
			&& node page.js "$out" \
			&& echo "- \`$p\` => \`$out\`" \
		) done \
	) done
post :
	echo "## Post"
	just format
format :
	echo "### Format"
	./clean.pl \
	./mini.sh \
	npx prettier . --write
