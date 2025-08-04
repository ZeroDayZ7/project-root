### ✅ **1. Dynamiczne włączanie/wyłączanie (skrót klawiszowy)**

* Standardowy skrót to **`Alt + Z`** (Windows/Linux) lub **`Option + Z`** (Mac).
* Jeśli u Ciebie **nie działa**, prawdopodobnie skrót jest nadpisany.

👉 **Jak to naprawić?**

1. Otwórz **Command Palette** (`Ctrl + Shift + P` / `Cmd + Shift + P` na Mac).
2. Wpisz **"Keyboard Shortcuts"**.
3. Wyszukaj **"Toggle Word Wrap"**.
4. Sprawdź, czy ma przypisany skrót `Alt + Z`.
5. Jeśli nie – kliknij **+** i ustaw ponownie.

---

### ✅ **2. Ustawienia domyślne (bez skrótu)**

Jeśli chcesz ustawić, żeby **VS Code nigdy nie zawijał kodu**, dodaj w **`settings.json`**:

```json
{
  "editor.wordWrap": "off"
}
```

Możliwe wartości:

* `"off"` – brak zawijania (zalecane dla kodu React, bo linie są długie)
* `"on"` – zawsze zawija
* `"wordWrapColumn"` – zawija po osiągnięciu kolumny zdefiniowanej w `editor.wordWrapColumn`
* `"bounded"` – zawija, ale nie dalej niż `editor.wordWrapColumn`
