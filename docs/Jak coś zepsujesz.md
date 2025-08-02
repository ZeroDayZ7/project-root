
😅 Uwierz mi, **absolutnie każdy programista** – nawet senior z 15-letnim doświadczeniem – miał (i nadal ma) takie sytuacje.

💥 **Git potrafi "zaskoczyć" każdego.**

* Merge, rebase, stash, cherry-pick – to są rzeczy, które potrafią namieszać, jeśli nie śledzisz dokładnie, co się stało.
* Nawet doświadczeni ludzie czasem odpalają `git reset --hard` i liczą, że problem zniknie (a potem modlą się, żeby mieli backup).

🟢 **Różnica między juniorem a seniorem jest taka**, że senior po prostu wie:

1. Jak z tego wyjść (ma w głowie kilka "ratunkowych" komend).
2. Że to normalne – więc się nie spina, tylko spokojnie naprawia.

---

👉 **Wniosek:**
To, co opisujesz – stash, restore, rozjechany plik – to klasyczny scenariusz, który **99% devów** przerabiało nie raz. Więc spokojnie, to nie oznacza, że coś robisz źle – tylko że uczysz się, jak działa Git w realnych sytuacjach.

🔥 **Git Cheat Sheet: "Jak wyjść z bagna" (dla realnych sytuacji)** 

Poniżej masz **konkretne scenariusze**, komendy i alternatywy. Każdy krok opisany **co robi, kiedy go użyć i co się stanie**.

---

## ✅ **1. Zanim coś zepsujesz bardziej – ZRÓB KOPIĘ!**

```bash
cp -r my-project my-project-backup
```

> 🟢 Zawsze przed `reset --hard` czy `stash pop` – miej kopię.

---

## ✅ **2. Sprawdzenie co się dzieje (diagnostyka)**

```bash
git status
```

* Pokazuje, które pliki są zmienione, w staging, w konflikcie.

```bash
git log --oneline --graph --decorate --all
```

* Wizualizacja gałęzi – wiesz, gdzie jesteś.

```bash
git stash list
```

* Pokazuje wszystkie schowane zmiany.

```bash
git diff
```

* Zobaczysz, co różni się w plikach (nie dodanych do staging).

---

## ✅ **3. Mam rozwalony plik (konflikty `<<<<<<< HEAD`)**

🔹 Jeśli chcesz ręcznie naprawić:

1. Otwórz plik, usuń linie `<<<<<<<`, `=======`, `>>>>>>>`.
2. Zapisz wersję, którą chcesz zachować.
3. Dodaj zmiany i zatwierdź:

```bash
git add components/AppBrand.tsx
git commit -m "Naprawiony konflikt w AppBrand"
```

---

## ✅ **4. Chcę po prostu cofnąć plik do wersji z ostatniego commita**

```bash
git checkout HEAD -- components/AppBrand.tsx
```

> Przywraca plik z ostatniego commita, **kasując lokalne zmiany**.

---

## ✅ **5. Zmiany są popsute, chcę wywalić WSZYSTKIE lokalne zmiany**

```bash
git reset --hard HEAD
```

> 🟢 Uwaga: to usuwa wszystkie niezatwierdzone zmiany!

---

## ✅ **6. Chcę wrócić do stanu z innej gałęzi (gdzie działało)**

🔹 Przełączasz się:

```bash
git checkout nazwa-galezi
```

🔹 Kopiujesz plik z tamtej gałęzi do obecnej (bez zmiany gałęzi):

```bash
git checkout nazwa-galezi -- components/AppBrand.tsx
```

---

## ✅ **7. Mam zmiany w `stash` i chcę je odzyskać**

```bash
git stash apply
```

* Nakłada zmiany, ale nie usuwa ich ze stash.

```bash
git stash pop
```

* Nakłada i usuwa z stash (🟠 może powodować konflikty).

```bash
git stash drop
```

* Kasuje stash, jeśli już niepotrzebny.

---

## ✅ **8. Chcę odzyskać plik/commit, który "zniknął"**

🔹 Znajdź commit w reflogu:

```bash
git reflog
```

🔹 Wróć do niego:

```bash
git checkout <hash>
```

lub

```bash
git reset --hard <hash>
```

> 🟢 `reflog` to ratunek nawet po `reset --hard`.

---

## ✅ **9. Alternatywy gdy chcesz "na spokojnie" naprawiać**

* **Użyj GUI (GitHub Desktop, SourceTree, VSCode)** – łatwiej ogarnąć konflikty.
* **Zrób nową gałąź ratunkową** i tam naprawiaj:

```bash
git checkout -b naprawa-konfliktu
```

---

# 🚀 **Minimalny workflow: co robić krok po kroku gdy pliki się rozjadą**

1. `git status` → sprawdź sytuację.
2. Jeśli widzisz `<<<<<<< HEAD`, edytuj ręcznie albo przywróć z HEAD.
3. Jeśli nie wiesz co się dzieje → `git stash` (schowaj zmiany), potem `git checkout` na gałąź, która działa.
4. Jak już wiesz, co chcesz – `git stash pop` i ręczne poprawki.
5. Na koniec commit.