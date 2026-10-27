# Birthday Surprise Website

A romantic, interactive birthday website for Mounii. Birthday answers are emailed through Gmail and are not stored in a database.

## Quick Start

### Configure Gmail

1. Enable 2-Step Verification for the Gmail account that will send the answers.
2. Create a Google App Password in the account's security settings.
3. Keep the app password private. Set it as `SMTP_PASS` in `server/.env`. Do not use your normal Gmail password or commit the app password.

### Start the backend

```powershell
cd server
copy .env.example .env
# Set SMTP_PASS in .env to your Google App Password
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

### Start the frontend

In another terminal:

```powershell
cd client
npm install
npm run dev
```

Vite prints the website URL, usually `http://localhost:5173`.

## Email configuration

Set these values in `server/.env`:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=kowshikkayala29@gmail.com
SMTP_PASS=your_google_app_password
ANSWERS_EMAIL=kowshikkayala29@gmail.com
PORT=5000
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
NODE_ENV=development
```

The ten answers are sent as plain-text email to `ANSWERS_EMAIL`. They are not stored in a database. Email providers may retain sent messages according to their own policies.

## Personalization

Edit `client/src/data/content.js` to change Mounii's name, birthday date, photo captions, romantic messages, and final letter. Place gallery photos in `client/public/photos/`.

## API

`POST /api/birthday/answers` validates and emails the ten answers. The API does not expose a route to retrieve answers. `GET /api/birthday/health` reports server status and whether SMTP credentials are configured.

The API limits requests to 20 per 15 minutes. CORS is restricted to the origins listed in `CLIENT_ORIGIN`.
The answers endpoint returns HTTP 503 until the SMTP account and app password are configured.

## Deployment

Deploy the frontend from `client/` and set `VITE_API_URL` to the backend URL. Deploy the backend from `server/` and set the SMTP variables above plus `CLIENT_ORIGIN` to the deployed frontend origin. Never commit `.env` or expose SMTP credentials to the frontend.
