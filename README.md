Husband 4 Hire

Overview

Husband 4 Hire is a React-based gig platform that connects employers with freelancers for short‑term jobs. This repository contains the front‑end application built with Vite, React, Tailwind CSS, and Bootstrap.



Prerequisites

Node.js v16.x or higher

npm v8.x or higher

Backend API server running at http://localhost:8000


Setup

Clone the repository:
git clone https://github.com/your-username/husband-4-hire.git
cd husband-4-hire

Install dependencies:
npm install

Configure environment variables:
Create a file named .env in the project root

Add the following line: TE_API_BASE_URL=http://localhost:8000


Development

Start the development server with hot module replacement:
npm run dev

Open your browser at http://localhost:3000


Production

Build for production:
npm run build

Preview the production build locally:
npm run preview

Output: dist/ directory



Project Structure
├── src/
│   ├── api.js           # API wrapper (fetch + JWT)
│   ├── auth/            # Authentication context & hooks
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level components
│   ├── App.jsx          # Main application entry
│   ├── main.jsx         # Vite bootstrap
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env                 # Environment overrides
├── package.json         # Project metadata & scripts
├── tailwind.config.js   # Tailwind CSS config
└── vite.config.js       # Vite config


Dependencies

React 18.x
Vite 6.x
Tailwind CSS 4.x
Bootstrap 5.x & bootstrap-icons 1.x
react-router-dom 7.x
jwt-decode
react-icons
prop-types

