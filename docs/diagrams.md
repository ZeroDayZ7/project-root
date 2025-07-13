# Podstawowe znaczenia kształtów w diagramach

Lista najczęściej spotykanych kształtów i ich typowego znaczenia w projektowaniu systemów, procesów biznesowych i architektury IT.

| Kształt / Ikona           | Znaczenie typowe                       | Przykład użycia                            |
|---------------------------|----------------------------------------|--------------------------------------------|
| 🧍‍♂️ Aktor / Użytkownik     | Użytkownik lub system zewnętrzny       | Obywatel, Administrator, System ZUS        |
| 🔲 Kwadrat / Prostokąt     | Moduł systemu / komponent              | AuthService, Portal Next.js, API Gateway   |
| 🔄 Elipsa / Koło           | Proces / działanie                     | Zaloguj się, Wyślij SMS, Weryfikacja PIN   |
| 📀 Cylinder                | Baza danych / magazyn                  | PostgreSQL, Redis, Blockchain              |
| ☁️ Chmura                  | Zewnętrzny system lub infrastruktura   | Google Cloud, Azure, API SMS               |
| 🧩 Hexagon (sześciokąt)    | Mikroserwis                            | UserService, NotificationService           |
| 🧱 Wzorzec cegiełkowy      | Warstwa systemu / granica logiki       | Frontend, Backend, Baza wiedzy             |
| 🔗 Równoległobok           | Wejście / wyjście                     | Formularz, Token, Wiadomość                |
| 🧷 Strzałka jednokierunkowa | Kierunek przepływu informacji          | Request → Response                         |
| 🛠️ Koło zębatego           | Serwis / proces techniczny             | Background Worker, Job Scheduler           |
| 🪪 Prostokąt z zaokr. rogami | Obiekt danych / encja                 | Użytkownik, Firma, Dokument                |
| 📦 Ikona pudełka           | Pakiet / biblioteka                    | Moduł PDF, Zewnętrzne API                  |
| 📁 Folder                  | Grupa komponentów / zbiór zasobów      | Mikroserwisy publiczne, Dokumenty          |
| 🗂️ Książka / dokumentacja  | Specyfikacja, wzorzec, umowa           | Umowa najmu, API Docs                      |
| 🔒 Kłódka                  | Bezpieczeństwo / uwierzytelnienie      | MFA, Szyfrowanie, Zgoda RODO               |
| 🖥️ Monitor                 | UI / Interfejs                         | Panel administracyjny, Aplikacja mobilna   |

---

## Legenda użycia kolorów (opcjonalna)

| Kolor       | Znaczenie                          |
|-------------|------------------------------------|
| 🔵 Niebieski | Mikroserwis / backend              |
| 🟠 Pomarańczowy | Frontend / UI                  |
| 🟢 Zielony   | Dane / bazy danych / rejestry      |
| 🟡 Żółty     | Zewnętrzne API lub system          |
| 🔴 Czerwony  | Komponenty krytyczne lub alertowe  |

---

## Przykładowy flow

```plaintext
🧍‍♂️ Obywatel
    |
    v
🔲 Portal Obywatelski (Next.js)
    |
    v
🔲 AuthService
    |
    v
📀 Users DB
    |
    v
🔄 Generowanie TOTP
    |
    v
📱 Google Authenticator
