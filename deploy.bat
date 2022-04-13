@echo off
cls
echo MAKE SURE THAT YOU BUILT THIS BEFORE YOU PUSH!!!!!!! (ng build)
@REM REM ng build 
@echo on


git pull
git add --all
git commit -m "%date%"
git push
ng build 