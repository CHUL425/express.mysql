git config --global user.name "JUNG-YEONCHUL"
git config --global user.email "chul.j@hotmail.com"
git config --global core.autocrlf true

echo "# note" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/JUNG-YEONCHUL/note.git
git push -u origin main
