
## 🧩 URL Shortener Backend – Full Stack Evaluation

This is the **Backend microservice** for a URL Shortener, built using **TypeScript + Express**, as part of the Full Stack Assessment.

> ✅ Includes logging middleware integration with centralized log server (test API).
> ✅ Covers all required API endpoints, expiry logic, and analytics.

---

## 📁 Folder Structure

```
BackendTestSubmission/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   │   └── url.routes.ts
│   ├── controllers/
│   │   └── url.controller.ts
│   ├── services/
│   │   └── url.services.ts
│   ├── utils/
│   │   └── logger.ts  ← 🔄 Reusable logging middleware
│   └── types/
│       └── url.types.ts
│
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔧 Tech Stack

* **Node.js + Express (TypeScript)**
* **NanoID** for shortcode generation
* **Material Logging** to external API
* **In-memory DB** (for demo purposes)
* **Postman/Insomnia** used for testing

---

## 🚀 API Endpoints

### 1. Create Short URL

`POST /shorturls`

```json
{
  "url": "https://example.com/some-very-long-url",
  "validity": 30,              // optional, in minutes
  "shortcode": "custom123"     // optional
}
```

📤 **Response:**

```json
{
  "shortLink": "http://localhost:8080/custom123",
  "expiry": "2025-01-01T00:30:00Z"
}
```

---

### 2. Redirect Short URL

`GET /:shortcode`

* Will redirect to the original URL if valid.
* Returns 410 if expired, 404 if not found.

---

### 3. Get URL Stats

`GET /shorturls/:shortcode`

📤 **Response:**

```json
{
  "shortLink": "http://localhost:8080/custom123",
  "expiry": "2025-01-01T00:30:00Z",
  "clicks": 12,
  "originalUrl": "https://example.com/very-long-url",
  "creationDate": "2025-07-14T09:00:00Z"
}
```

---

## 📋 Logging Middleware

Every major backend event (URL creation, redirect, errors) is logged using the reusable `Log()` function. This logs to the test server with the following structure:

```ts
Log("backend", "info", "controller", "Created short URL: abcd123");
```

Logs include:

* ✅ Informational logs (creation, redirect)
* ❌ Error logs (invalid input, expired links)
* ⚠️ Warnings (invalid shortcode access)

---

## 🖼️ Screenshots (SS)
<img width="1434" height="804" alt="image" src="https://github.com/user-attachments/assets/998ee9a5-7a04-4e75-8a51-6baa4f041562" />
<img width="1832" height="673" alt="image" src="https://github.com/user-attachments/assets/9f8708a2-6946-4307-b174-073c77b4d856" />
<img width="1247" height="778" alt="image" src="https://github.com/user-attachments/assets/2dedd345-5d91-41ef-bfa4-b55956b2e70c" />



### 🔗 Shorten URL (Postman)

![Shorten URL Request](./ss/shorten-url.png)

---

### 📊 Get Stats

![Stats](./ss/get-stats.png)

---

### 🚦 Redirect Link Test

![Redirect](./ss/redirect.png)

---

### 🔐 Log API Console

![Log Console Output](./ss/logging-console.png)

---

## ✅ How to Run Locally

1. Clone repo:

```bash
git clone https://github.com/<your-username>/<roll-number>.git
cd BackendTestSubmission
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your Auth token:

```
AUTH_TOKEN=your_test_server_access_token_here
```

4. Start server:

```bash
npx ts-node-dev src/server.ts
```

---
