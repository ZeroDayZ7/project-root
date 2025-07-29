### **1. Ogólne zasady organizacji projektu**
- **Modułowość**: Dziel kod na logiczne moduły, które odzwierciedlają funkcjonalność aplikacji.
- **Konwencja nazw**: Używaj spójnych nazw (np. kebab-case dla folderów, PascalCase dla komponentów React).
- **Unikanie bałaganu**: Każdy plik i folder powinien mieć jasno określony cel.
- **Skalowalność**: Struktura powinna być łatwa do rozszerzenia w miarę wzrostu aplikacji.
- **Dobre praktyki Next.js**: Wykorzystuj wbudowane funkcje Next.js, takie jak App Router, API Routes czy statyczne generowanie stron.

---

### **2. Struktura folderów w aplikacji Next.js**

Poniżej proponuję strukturę folderów dla dużej aplikacji Next.js, opartą na App Routerze (zalecanym w Next.js 13 i nowszych). Jeśli używasz Pages Routera, niektóre elementy (np. folder `pages`) będą miały inne znaczenie.

```
my-next-app/
├── app/                     # Główny folder dla App Routera
│   ├── (auth)/              # Grupowanie tras związanych z autentykacją
│   │   ├── login/           # Strona logowania
│   │   │   ├── page.tsx     # Strona logowania
│   │   │   ├── layout.tsx   # Layout specyficzny dla logowania
│   │   ├── register/        # Strona rejestracji
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   ├── dashboard/           # Moduł dla panelu użytkownika
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── [id]/            # Dynamiczne trasy (np. /dashboard/:id)
│   │   │   ├── page.tsx
│   │   ├── components/      # Komponenty specyficzne dla dashboardu
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardSidebar.tsx
│   ├── api/                 # API Routes
│   │   ├── auth/            # Endpoints API dla autentykacji
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   ├── users/[id]/route.ts
│   ├── layout.tsx           # Główny layout aplikacji
│   ├── page.tsx             # Strona główna (/)
│   ├── globals.css          # Globalne style
│   ├── favicon.ico          # Ikona aplikacji
├── components/              # Komponenty współdzielone (globalne)
│   ├── ui/                  # Komponenty UI (np. przyciski, formularze)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   ├── layout/              # Komponenty layoutu
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
├── lib/                     # Biblioteki i funkcje pomocnicze
│   ├── api/                 # Funkcje do komunikacji z API
│   │   ├── fetchUsers.ts
│   │   ├── auth.ts
│   ├── utils/               # Narzędzia i funkcje pomocnicze
│   │   ├── formatDate.ts
│   │   ├── validators.ts
│   ├── types/               # Definicje typów (TypeScript)
│   │   ├── user.ts
│   │   ├── product.ts
├── public/                  # Statyczne zasoby
│   ├── images/              # Obrazki
│   ├── fonts/               # Czcionki
├── styles/                  # Style CSS/SCSS (jeśli nie używasz CSS-in-JS)
│   ├── components/          # Style dla komponentów
│   ├── themes/              # Style dla motywów (np. ciemny/jasny)
├── hooks/                   # Customowe hooki React
│   ├── useAuth.ts
│   ├── useFetchData.ts
├── context/                 # Konteksty React
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
├── middleware.ts            # Middleware Next.js
├── prisma/                  # Konfiguracja i schematy Prisma (jeśli używasz)
│   ├── schema.prisma
│   ├── migrations/
├── tests/                   # Testy jednostkowe i integracyjne
│   ├── components/
│   ├── pages/
│   ├── __mocks__/
├── scripts/                 # Skrypty (np. seed bazy danych)
│   ├── seed.ts
├── .env                     # Zmienne środowiskowe
├── .env.local               # Lokalne zmienne środowiskowe
├── next.config.js           # Konfiguracja Next.js
├── tsconfig.json            # Konfiguracja TypeScript
├── package.json             # Zależności projektu
├── README.md                # Dokumentacja projektu
```

---

### **3. Opis folderów i ich zawartości**

#### **app/**
- **Cel**: Główny folder dla App Routera, zawierający trasy, strony, layouty i API Routes.
- **Zawartość**:
  - **page.tsx**: Definiuje stronę dla danej trasy (np. `/` dla strony głównej).
  - **layout.tsx**: Definiuje layout dla danej trasy lub grupy tras.
  - **(group)/**: Grupowanie tras w nawiasach, np. `(auth)` dla tras związanych z autentykacją, które nie wpływają na URL.
  - **[id]/**: Dynamiczne trasy, np. `/dashboard/[id]` dla dynamicznych ID.
  - **api/**: Definicje endpointów API (np. `/api/users/[id]/route.ts`).
  - **globals.css**: Globalne style CSS dla całej aplikacji.
- **Techniki**:
  - Używaj **grup tras** (`(group)`) do organizacji bez wpływu na URL.
  - Wykorzystuj **dynamiczne trasy** (`[param]`) i **catch-all routes** (`[...param]`) dla elastyczności.
  - Stosuj **Server Components** jako domyślne w App Routerze, oznaczając komponenty jako `'use client'` tylko tam, gdzie potrzebne (np. dla interakcji z użytkownikiem).
  - Używaj **Parallel Routes** i **Intercepting Routes** dla zaawansowanego routingu.

#### **components/**
- **Cel**: Przechowywanie komponentów React, zarówno współdzielonych, jak i specyficznych dla modułów.
- **Zawartość**:
  - **ui/**: Małe, reużywalne komponenty UI (np. `Button`, `Input`, `Card`).
  - **layout/**: Komponenty związane z układem strony (np. `Navbar`, `Sidebar`, `Footer`).
  - Komponenty specyficzne dla modułów (np. `DashboardHeader`) powinny być w folderze `app/[moduł]/components/`.
- **Techniki**:
  - **Atomic Design**: Dziel komponenty na atomy (np. `Button`), molekuły (np. `Form`), organizmy (np. `Header`) i szablony.
  - Używaj **TypeScript** do typowania propsów komponentów.
  - Stosuj **Server Components** w Next.js, aby zminimalizować JavaScript wysyłany do klienta.
  - Używaj **CSS Modules**, **Tailwind CSS** lub **CSS-in-JS** (np. Emotion, Styled-Components) dla stylizacji.

#### **lib/**
- **Cel**: Funkcje i narzędzia pomocnicze, które nie są komponentami React.
- **Zawartość**:
  - **api/**: Funkcje do wywoływania API (np. `fetchUsers`, `postData`).
  - **utils/**: Funkcje narzędziowe (np. formatowanie dat, walidacja danych).
  - **types/**: Definicje typów TypeScript (np. `User`, `Product`).
- **Techniki**:
  - Centralizuj logikę API w `lib/api` dla łatwego ponownego użycia.
  - Używaj **TypeScript** dla bezpieczeństwa typów.
  - Eksportuj funkcje jako moduły ES dla łatwego importowania.

#### **public/**
- **Cel**: Statyczne zasoby dostępne publicznie, serwowane z `/`.
- **Zawartość**:
  - **images/**: Obrazki (np. logo, ikony).
  - **fonts/**: Czcionki niestandardowe.
- **Techniki**:
  - Optymalizuj obrazki (np. WebP) za pomocą wbudowanego `next/image`.
  - Używaj statycznych importów dla zasobów w `public`.

#### **styles/**
- **Cel**: Style CSS/SCSS, jeśli nie używasz CSS-in-JS.
- **Zawartość**:
  - **components/**: Style dla konkretnych komponentów (np. `Button.module.css`).
  - **themes/**: Style dla motywów (np. ciemny/jasny).
- **Techniki**:
  - Używaj **CSS Modules** dla lokalnego zakresu stylów.
  - Rozważ **Tailwind CSS** dla szybkiego prototypowania i spójności.
  - Zdefiniuj zmienne CSS w `globals.css` dla kolorów, fontów itp.

#### **hooks/**
- **Cel**: Customowe hooki React.
- **Zawartość**:
  - Hooki takie jak `useAuth`, `useFetchData`, `useForm`.
- **Techniki**:
  - Używaj hooków do enkapsulacji logiki stanu i efektów ubocznych.
  - Typuj hooki za pomocą TypeScript.
  - Unikaj nadmiernego skomplikowania hooków – dziel je na mniejsze.

#### **context/**
- **Cel**: Konteksty React dla zarządzania globalnym stanem.
- **Zawartość**:
  - Konteksty takie jak `AuthContext`, `ThemeContext`.
- **Techniki**:
  - Używaj kontekstów do globalnego stanu (np. autentykacja, motyw).
  - Rozważ **Zustand** lub **Redux Toolkit** dla bardziej złożonego zarządzania stanem.

#### **middleware.ts**
- **Cel**: Logika middleware dla Next.js (np. autentykacja, przekierowania).
- **Techniki**:
  - Używaj middleware do ochrony tras (np. sprawdzanie tokenów JWT).
  - Minimalizuj logikę w middleware, aby nie spowalniać aplikacji.

#### **prisma/**
- **Cel**: Konfiguracja i schematy dla Prisma ORM (jeśli używasz).
- **Zawartość**:
  - **schema.prisma**: Definicje modeli bazy danych.
  - **migrations/**: Migracje bazy danych.
- **Techniki**:
  - Używaj Prisma dla łatwego dostępu do bazy danych.
  - Centralizuj logikę zapytań w `lib/api`.

#### **tests/**
- **Cel**: Testy jednostkowe i integracyjne.
- **Zawartość**:
  - Testy dla komponentów (`components/`), stron (`pages/`), hooków itp.
  - **__mocks__/**: Mocki dla testów (np. API, moduły).
- **Techniki**:
  - Używaj **Jest** i **React Testing Library** dla testów.
  - Testuj zarówno Server Components, jak i Client Components.
  - Mockuj zewnętrzne API w testach.

#### **scripts/**
- **Cel**: Skrypty narzędziowe (np. seed bazy danych).
- **Zawartość**:
  - Skrypty takie jak `seed.ts` do inicjalizacji danych.
- **Techniki**:
  - Używaj Node.js do pisania skryptów.
  - Integruj skrypty z `package.json` (np. `npm run seed`).

#### **Pliki konfiguracyjne**
- **.env, .env.local**: Zmienne środowiskowe (np. klucze API, URL bazy danych).
- **next.config.js**: Konfiguracja Next.js (np. Webpack, environment variables).
- **tsconfig.json**: Konfiguracja TypeScript.

---

### **4. Dzielenie komponentów**

#### **Rodzaje komponentów**
1. **Komponenty UI** (`components/ui/`):
   - Małe, reużywalne elementy (np. `Button`, `Input`, `Card`).
   - Nie zawierają logiki biznesowej.
   - Przykład: `<Button variant="primary">Click me</Button>`.

2. **Komponenty specyficzne dla modułu** (`app/[moduł]/components/`):
   - Komponenty używane tylko w danym module (np. `DashboardHeader` w `app/dashboard/components/`).
   - Mogą zawierać logikę specyficzną dla modułu.

3. **Komponenty layoutu** (`components/layout/`):
   - Elementy takie jak `Navbar`, `Sidebar`, `Footer`.
   - Często współdzielone między modułami.

#### **Techniki dzielenia komponentów**
- **Atomic Design**: Organizuj komponenty według hierarchii (atomy, molekuły, organizmy).
- **Colocation**: Przechowuj komponenty specyficzne dla strony w folderze tej strony (np. `app/dashboard/components/`).
- **Server vs Client Components**:
  - Domyślnie używaj Server Components w Next.js dla lepszej wydajności.
  - Oznacz komponenty jako `'use client'` tylko tam, gdzie potrzebna jest interaktywność (np. `useState`, `useEffect`).
- **Props drilling**: Unikaj nadmiernego przekazywania propsów, stosując konteksty lub biblioteki stanu (np. Zustand).

---

### **5. Techniki i dobre praktyki**

#### **Routing**
- Używaj **App Routera** dla nowych projektów (Next.js 13+).
- Grupuj trasy w folderach `(group)` dla lepszej organizacji.
- Wykorzystuj **dynamiczne trasy** (`[param]`) i **catch-all routes** (`[...param]`) dla elastyczności.
- Stosuj **Parallel Routes** dla renderowania wielu widoków jednocześnie (np. dashboard + modal).

#### **API i dane**
- Używaj **API Routes** (`app/api/`) dla prostych endpointów.
- Centralizuj logikę API w `lib/api` dla łatwego ponownego użycia.
- Wykorzystuj **Server Actions** (Next.js 14+) dla mutacji danych w formularzach.
- Używaj **Prisma** lub innych ORM dla łatwego zarządzania bazą danych.

#### **Stylizacja**
- **CSS Modules**: Dla lokalnych stylów specyficznych dla komponentów.
- **Tailwind CSS**: Dla szybkiego prototypowania i spójności.
- **CSS-in-JS**: Jeśli preferujesz (np. Emotion, Styled-Components).
- Używaj zmiennych CSS w `globals.css` dla łatwego zarządzania stylami.

#### **Zarządzanie stanem**
- **Lokalny stan**: Używaj `useState` i `useReducer` dla prostych komponentów.
- **Globalny stan**: Używaj `React Context` dla prostych przypadków (np. motyw, autentykacja).
- **Zaawansowany stan**: Rozważ **Zustand**, **Redux Toolkit** lub **React Query** dla złożonych aplikacji.

#### **Testowanie**
- Używaj **Jest** i **React Testing Library** dla testów jednostkowych i integracyjnych.
- Testuj zarówno Server Components, jak i Client Components.
- Mockuj zewnętrzne zależności (np. API) w `__mocks__/`.

#### **Optymalizacja wydajności**
- Wykorzystuj **Server Components** dla mniejszej ilości JavaScriptu wysyłanego do klienta.
- Używaj **next/image** dla automatycznej optymalizacji obrazów.
- Stosuj **Incremental Static Regeneration (ISR)** lub **Static Site Generation (SSG)** dla statycznych stron.
- Włącz **lazy loading** dla komponentów i danych (np. `dynamic` w Next.js).

#### **TypeScript**
- Używaj TypeScript dla bezpieczeństwa typów.
- Definiuj typy w `lib/types/` i eksportuj je jako moduły.
- Typuj propsy komponentów, hooki i funkcje API.

#### **Dokumentacja**
- Utrzymuj aktualny plik `README.md` z instrukcjami uruchomienia projektu.
- Dokumentuj komponenty i funkcje za pomocą JSDoc lub TypeScript.
- Używaj narzędzi takich jak **Storybook** dla dokumentacji komponentów UI.

---

### **6. Przykładowa struktura dla komponentu**

Przykład dla komponentu `Button` w `components/ui/Button/`:

```
components/ui/Button/
├── Button.tsx           # Logika komponentu
├── Button.module.css    # Style CSS (jeśli używasz CSS Modules)
├── Button.test.tsx      # Testy jednostkowe
├── index.ts             # Eksport komponentu
├── types.ts             # Typy TypeScript dla propsów
```

**Button.tsx**:
```tsx
'use client';

import { ButtonProps } from './types';
import styles from './Button.module.css';

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
```

**types.ts**:
```ts
export interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}
```

**index.ts**:
```ts
export { Button } from './Button';
```

---

### **7. Dodatkowe uwagi**
- **Konwencja nazw**:
  - Foldery: `kebab-case` (np. `app/dashboard/components`).
  - Komponenty: `PascalCase` (np. `DashboardHeader.tsx`).
  - Funkcje/utils: `camelCase` (np. `fetchUsers.ts`).
- **Skalowanie zespołu**:
  - Ustal jasne konwencje z zespołem (np. ESLint, Prettier).
  - Używaj **monorepo** (np. z Turborepo), jeśli aplikacja składa się z wielu modułów.
- **CI/CD**:
  - Skonfiguruj pipeline CI/CD (np. GitHub Actions) dla testów i deploymentu.
  - Automatyzuj formatowanie kodu (Prettier) i linting (ESLint).
- **Bezpieczeństwo**:
  - Przechowuj sekrety w `.env` i nigdy nie commituj ich do repozytorium.
  - Używaj middleware do ochrony tras (np. weryfikacja tokenów).

---

### **8. Przykład modularnego podejścia**

Dla dużego modułu, np. `dashboard`, struktura może wyglądać tak:

```
app/dashboard/
├── page.tsx                    # Główna strona dashboardu
├── layout.tsx                  # Layout dla dashboardu
├── [id]/                       # Dynamiczna trasa (np. /dashboard/:id)
│   ├── page.tsx
├── components/                 # Komponenty specyficzne dla dashboardu
│   ├── DashboardHeader.tsx
│   ├── DashboardSidebar.tsx
├── actions/                    # Server Actions dla dashboardu
│   ├── updateUser.ts
├── lib/                        # Logika specyficzna dla dashboardu
│   ├── fetchDashboardData.ts
```

**page.tsx** (dla `/dashboard`):
```tsx
import { DashboardHeader } from './components/DashboardHeader';
import { fetchDashboardData } from './lib/fetchDashboardData';

export default async function DashboardPage() {
  const data = await fetchDashboardData();
  return (
    <div>
      <DashboardHeader />
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```