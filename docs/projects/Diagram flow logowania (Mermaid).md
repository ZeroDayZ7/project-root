flowchart TD
    subgraph Web [Next.js Frontend]
        A[Wpisanie emaila] --> B[Kliknij "Zaloguj"]
        G[Wyświetlenie formularza hasła] --> H[Wpisanie hasła]
        J[Wpisanie kodu 2FA] --> K[Otrzymanie cookies + redirect do dashboard]
        E[Wyświetlenie błędu] 
    end

    subgraph Gateway [Express Gateway]
        B --> L[Sprawdzenie sesji]
        L -->|Sesja istnieje| K
        L -->|Brak sesji| M[Forward do Auth Service]
    end

    subgraph Auth [Express Auth Service]
        M --> N[Sprawdzenie email w User Service]
        N -->|Email istnieje| G
        N -->|Email nie istnieje| E
        H --> O[Sprawdzenie hasła]
        O -->|Hasło poprawne| J
        O -->|Hasło niepoprawne| E
        J --> P[Weryfikacja 2FA]
        P -->|2FA poprawny| K
        P -->|2FA niepoprawny| E
    end

    subgraph UserService [Go + PostgreSQL]
        N --> Q[Query: czy email istnieje?]
        O --> R[Query: sprawdzenie hash hasła]
        P --> S[Query: weryfikacja 2FA]
        K --> T[Tworzenie sesji w DB i wysyłka cookies]
    end