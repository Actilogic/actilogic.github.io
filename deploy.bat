:: the code needs to be built to docs/ and thats what the app looks to to run
@REM build the app
@REM builder.bat

@REM make the 404 file which makes it show any page for gihub pages
copy docs\index.html docs\404.html

git pull
git add --all
git commit -m "%time%"
git push


