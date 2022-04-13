@REM build the app
@REM builder.bat

@REM back up code to master which will then be up to date with prod
git pull
git add --all
git commit -m "%date%"
git push

@REM push the code to the branch that the site runs off
git add dist && git commit -m "push to website"
git subtree push --prefix dist origin gh-pages


