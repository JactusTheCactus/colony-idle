sudo apt-get update > /dev/null
sudo apt-get install -y build-essential > /dev/null 2>&1
npm ci > /dev/null
git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "GitHub Actions Bot"
rm -rf *.css *.html *.js *.md
make
git add .
git commit -m "Commit Make changes" || :
git push origin main