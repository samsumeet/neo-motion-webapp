# Neo Motion Clinic Dashboard

A production-ready clinic appointments dashboard built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui-style components, Framer Motion, Recharts, MongoDB, and installable PWA support for iOS and Android.

## Tech stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS 4
- shadcn/ui component structure
- Framer Motion
- MongoDB native driver
- Recharts
- Sonner toasts
- PWA manifest + service worker
- Vercel-ready deployment

## Folder structure

```text
.
├── app
│   ├── api/appointments/route.ts
│   ├── apple-icon.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── icon.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── manifest.ts
│   ├── offline/page.tsx
│   └── page.tsx
├── components
│   ├── dashboard
│   │   ├── appointment-cards.tsx
│   │   ├── appointment-detail-sheet.tsx
│   │   ├── appointments-chart.tsx
│   │   ├── appointments-table.tsx
│   │   ├── dashboard-shell.tsx
│   │   ├── empty-state.tsx
│   │   ├── filter-bar.tsx
│   │   ├── kpi-card.tsx
│   │   ├── section-card.tsx
│   │   └── service-chart.tsx
│   ├── pwa/pwa-register.tsx
│   └── ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       └── table.tsx
├── lib
│   ├── appointment-utils.ts
│   ├── appointments.ts
│   ├── mongodb.ts
│   └── utils.ts
├── public
│   └── sw.js
├── types
│   └── appointment.ts
├── .env.example
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Environment variables

Create a `.env.local` file:

```bash
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=your-database-name
```

The app reads from the `appointments` collection.

Example document:

```json
{
  "name": "Sumeet Bachchas",
  "email": "sumeetfullstackdeveloper@gmail.com",
  "phone": "+4915168697424",
  "service": "Sports Injury Rehabilitation",
  "date": "2026-04-01",
  "time": "12:41",
  "message": "Hello",
  "createdAt": {
    "$date": "2026-03-31T08:40:16.586Z"
  }
}
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables `MONGODB_URI` and `MONGODB_DB`.
4. Deploy.

The app is already structured for Vercel without additional server configuration.

## Features included

- KPI cards for total, today, upcoming, and past appointments
- Search, filters, and sorting
- Responsive desktop table and mobile cards
- Appointment detail drawer with copy actions
- Charts for service demand and booking volume
- Loading, empty, and error states
- Installable PWA with manifest, icons, standalone mode, and offline fallback

## Notes

- `lib/mongodb.ts` provides a reusable MongoDB connection.
- `app/api/appointments/route.ts` exposes a lightweight JSON endpoint.
- `public/sw.js` handles offline caching and fallback navigation.
