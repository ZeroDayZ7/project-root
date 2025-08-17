### Migracje
## Ręczne

```bash
migrate -path database/migrations -database "postgres://postgres:password@localhost:5432/authdb?sslmode=disable" -verbose up
```

```bash
migrate -path database/migrations -database "postgres://postgres:password@localhost:5432/authdb?sslmode=disable" -verbose down 1
```

## make

```bash
make migrate-up       # uruchomi wszystkie migracje
make migrate-down     # cofnie ostatnią migrację
make migrate-create   # stworzy nową migrację interaktywnie

```

```sql
INSERT INTO users (username, email, password, two_factor_enabled, two_factor_secret)
VALUES
('alice', 'alice@example.com', 'argon2id$examplehash1', FALSE, NULL),
('bob', 'bob@example.com', 'argon2id$examplehash2', TRUE, 'JBSWY3DPEHPK3PXP'),
('carol', 'carol@example.com', 'argon2id$examplehash3', FALSE, NULL),
('dave', 'dave@example.com', 'argon2id$examplehash4', TRUE, 'KZTWY4DPNHPK2LXP'),
('eve', 'eve@example.com', 'argon2id$examplehash5', FALSE, NULL);

```