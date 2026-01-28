# Messages API - Backend

REST API do zarządzania wiadomościami zbudowane w oparciu o Node.js, Express i Sequelize ORM z bazą danych MySQL/MariaDB.

## 📋 Spis treści

- [Technologie](#technologie)
- [Wymagania](#wymagania)
- [Instalacja](#instalacja)
- [Konfiguracja](#konfiguracja)
- [Uruchomienie](#uruchomienie)
- [API Endpoints](#api-endpoints)
- [Struktura projektu](#struktura-projektu)
- [Migracje i Seedery](#migracje-i-seedery)
- [Docker](#docker)

## 🛠 Technologie

- **Node.js** - środowisko uruchomieniowe
- **Express** - framework webowy
- **Sequelize** - ORM dla MySQL/MariaDB
- **MySQL/MariaDB** - baza danych
- **express-validator** - walidacja danych
- **dotenv** - zarządzanie zmiennymi środowiskowymi
- **Docker** - konteneryzacja aplikacji

## ⚙️ Wymagania

- Node.js 16 lub wyższy
- MySQL lub MariaDB
- npm lub yarn
- (Opcjonalnie) Docker i Docker Compose

## 📦 Instalacja

1. Sklonuj repozytorium:
```bash
git clone <repository-url>
cd backend
```

2. Zainstaluj zależności:
```bash
npm install
```

## 🔧 Konfiguracja

1. Utwórz plik `.env` w katalogu głównym projektu:
```env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=interview123
NODE_ENV=development
```

2. Dostosuj wartości do swojego środowiska:
   - `PORT` - port na którym będzie działać serwer (domyślnie 8080)
   - `DB_HOST` - host bazy danych (localhost lub nazwa serwisu Docker)
   - `DB_USER` - nazwa użytkownika bazy danych
   - `DB_PASSWORD` - hasło do bazy danych
   - `DB_NAME` - nazwa bazy danych
   - `NODE_ENV` - środowisko (development/test/production)

## 🚀 Uruchomienie

### Tryb deweloperski (z auto-reloadem):
```bash
npm run dev
```

### Tryb produkcyjny:
```bash
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:8080`

## 📡 API Endpoints

Wszystkie endpointy znajdują się pod prefiksem `/api/messages`

### Pobierz wszystkie wiadomości
```http
GET /api/messages?order=DESC
```

**Parametry zapytania:**
- `order` (opcjonalny) - kolejność sortowania: `ASC` lub `DESC` (domyślnie: `DESC`)

**Odpowiedź (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "content": "Przykładowa wiadomość",
      "createdAt": "2026-01-27T12:00:00.000Z",
      "updatedAt": "2026-01-27T12:00:00.000Z"
    }
  ]
}
```

### Pobierz wiadomość po ID
```http
GET /api/messages/:messageId
```

**Odpowiedź (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "content": "Przykładowa wiadomość",
    "createdAt": "2026-01-27T12:00:00.000Z",
    "updatedAt": "2026-01-27T12:00:00.000Z"
  }
}
```

**Odpowiedź (404 Not Found):**
```json
{
  "success": false,
  "message": "Wiadomość nieznaleziona"
}
```

### Utwórz nową wiadomość
```http
POST /api/messages
Content-Type: application/json

{
  "content": "Treść nowej wiadomości"
}
```

**Walidacja:**
- `content` - wymagane, tekst od 1 do 1000 znaków

**Odpowiedź (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "content": "Treść nowej wiadomości",
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  },
  "message": "Wiadomość pomyślnie utworzona"
}
```

**Odpowiedź (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Wiadomość musi mieć treść"
    }
  ]
}
```

### Aktualizuj wiadomość
```http
PUT /api/messages/:messageId
Content-Type: application/json

{
  "content": "Zaktualizowana treść"
}
```

**Walidacja:**
- `content` - wymagane, tekst od 1 do 1000 znaków

**Odpowiedź (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "content": "Zaktualizowana treść",
    "createdAt": "2026-01-27T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:30:00.000Z"
  },
  "message": "Wiadomość pomyślnie zaktualizowana"
}
```

### Usuń wiadomość
```http
DELETE /api/messages/:messageId
```

**Odpowiedź (200 OK):**
```json
{
  "success": true,
  "message": "Wiadomość pomyślnie usunięta"
}
```

**Odpowiedź (404 Not Found):**
```json
{
  "success": false,
  "message": "Wiadomość nieznaleziona"
}
```

## 📁 Struktura projektu

```
backend/
├── app.js                      # Główny plik aplikacji
├── package.json                # Zależności i skrypty npm
├── Dockerfile                  # Konfiguracja Docker
├── config/
│   └── config.js              # Konfiguracja bazy danych
├── controllers/
│   └── messagesController.js  # Logika biznesowa dla wiadomości
├── middleware/
│   └── validateMessage.js     # Middleware walidacji
├── migrations/
│   └── 20260127004751-create-messages-table.cjs  # Migracja tabeli Messages
├── models/
│   ├── index.js               # Eksport modeli
│   └── Message.js             # Model Sequelize dla wiadomości
├── routes/
│   └── messages.js            # Definicje endpointów
├── seeders/
│   └── 20260127011318-demo-messages.cjs  # Dane testowe
└── utils/
    └── database.js            # Konfiguracja połączenia z bazą danych
```

## 🗄️ Migracje i Seedery

### Uruchomienie migracji
```bash
npx sequelize-cli db:migrate
```

### Cofnięcie ostatniej migracji
```bash
npx sequelize-cli db:migrate:undo
```

### Uruchomienie seederów (dane testowe)
```bash
npx sequelize-cli db:seed:all
```

### Cofnięcie seederów
```bash
npx sequelize-cli db:seed:undo:all
```

## 🐳 Docker

Projekt zawiera Dockerfile do konteneryzacji aplikacji.

### Zbuduj obraz Docker
```bash
docker build -t messages-api .
```

### Uruchom kontener
```bash
docker run -p 8080:8080 --env-file .env messages-api
```

**Uwaga:** W przypadku używania Docker Compose upewnij się, że zmienna `DB_HOST` wskazuje na nazwę serwisu bazy danych (np. `mysql` zamiast `localhost`).

## 📝 Notatki

- Wszystkie odpowiedzi API zawierają pole `success` wskazujące na powodzenie operacji
- Walidacja danych odbywa się na poziomie middleware oraz modelu Sequelize
- Timestamps (`createdAt`, `updatedAt`) są automatycznie zarządzane przez Sequelize
- Globalna obsługa błędów zapewnia spójne komunikaty błędów

## 📄 Licencja

MIT
