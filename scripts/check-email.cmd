@echo off
:MENU
cls
echo Wybierz email do wyslania:
echo 1. test@example.pl
echo 2. user1@example.com
echo 3. admin@example.com
echo 4. wlasny email
echo 5. Wyjscie
set /p choice=Twoj wybor (1-5): 

if "%choice%"=="1" (
    set email=test@example.pl
    goto SEND
)
if "%choice%"=="2" (
    set email=user1@example.com
    goto SEND
)
if "%choice%"=="3" (
    set email=admin@example.com
    goto SEND
)
if "%choice%"=="4" (
    set /p email=Podaj swoj email: 
    goto SEND
)
if "%choice%"=="5" (
    goto END
)

echo Nieprawidlowy wybor, sprobuj ponownie.
pause
goto MENU

:SEND
curl -X POST http://localhost:4000/check-email -H "Content-Type: application/json" -d "{\"email\": \"%email%\"}"
pause
goto MENU

:END
exit
