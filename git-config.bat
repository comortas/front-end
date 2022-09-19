cls
git status
git add .
git status
set /p msg="Type your commit message: "
git commit -m "%msg%"
pause
git pull
pause
git pull origin development
@echo Do you want to push the code? please press enter
pause
git push
exit