function Show-Menu {
    Clear-Host
    Write-Host "Wybierz email do wyslania:"
    Write-Host "1. test@example.pl"
    Write-Host "2. user1@example.com"
    Write-Host "3. admin@example.com"
    Write-Host "4. wlasny email"
    Write-Host "5. Wyjscie"
}

while ($true) {
    Show-Menu
    $choice = Read-Host "Twoj wybor (1-5)"

    switch ($choice) {
        "1" { $email = "test@example.com" }
        "2" { $email = "user1@example.com" }
        "3" { $email = "admin@example.com" }
        "4" {
            $email = Read-Host "Podaj swoj email"
        }
        "5" {
            Write-Host "Zamykam..."
            break
        }
        default {
            Write-Host "Nieprawidlowy wybor, sprobuj ponownie." -ForegroundColor Red
            Start-Sleep -Seconds 2
            continue
        }
    }

    # Wysylanie emaila
    if ($email) {
        $body = @{ email = $email } | ConvertTo-Json
        try {
            Invoke-RestMethod -Uri "http://localhost:5000/check-email" -Method Post -Body $body -ContentType "application/json"
        } catch {
            Write-Host "Blad podczas wysylania zapytania:" -ForegroundColor Red
            Write-Host $_.Exception.Message
        }
        Pause
        $email = $null  # wyczysc email przed nastepna iteracja
    }
}
