:: the code needs to be built to docs/ and thats what the app looks to to run
@REM build the app
@REM builder.bat

@REM back up code to master which will then be up to date with prod
git pull
git add --all
git commit -m "%date%"
git push


