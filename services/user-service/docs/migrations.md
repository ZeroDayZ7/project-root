### 

```
migrate -path database/migrations -database "postgres://postgres:password@localhost:5432/authdb?sslmode=disable" -verbose up
```

```
migrate -path database/migrations -database "postgres://postgres:password@localhost:5432/authdb?sslmode=disable" -verbose down 1
```

```
make migrate-up       # uruchomi wszystkie migracje
make migrate-down     # cofnie ostatnią migrację
make migrate-create   # stworzy nową migrację interaktywnie

```