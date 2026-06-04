# Prodexa Store — Product Catalog

A responsive React storefront built against the [DummyJSON](https://dummyjson.com) API: JWT auth, product grid with search/filter/sort, saved items, shareable URLs, and paginated loading.

## Live Demo
[https://prodexastore.netlify.app/](https://prodexastore.netlify.app/)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

Windows PowerShell (if scripts are blocked): `npm.cmd run dev`

Open **http://localhost:5173**

**Demo login** (see README, not hard-coded in the UI): `emilys` / `emilyspass`

## What to try

1. Sign in → browse products  
2. Search and pick a category — notice the URL updates (`?q=…&category=…`)  
3. Sort by price  
4. Star a product → open **Saved** in the header  
5. Scroll for more products (infinite scroll + **Load more**)  
6. Open a product for details  

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run test` | Unit tests |
| `npm run lint` | ESLint |


## Stack

- React 19 + Vite  
- React Router  
- Redux Toolkit (products) + Context (auth, favorites)  
- Tailwind CSS v4  
- Vitest + Testing Library  

## API

Base URL: `https://dummyjson.com` (override with `VITE_API_BASE_URL` in `.env.local`)

| Action | Endpoint |
|--------|----------|
| Login | `POST /auth/login` |
| Register | `POST /users/add` |
| Products | `GET /products?limit=12&skip=0` |
| Search | `GET /products/search?q=…` |
| Category | `GET /products/category/{slug}` |
| Detail | `GET /products/{id}` |
| Categories | `GET /products/categories` |

**Postman:** [DummyJSON collection](https://www.postman.com/yavuz-team/dummyjson/collection/5n9r9xt/dummyjson) · [Docs](https://dummyjson.com/docs)

## Project layout

```
src/
  api/              HTTP client + endpoints
  components/
    common/         Button, spinner, errors, boundary
    layout/         Header, footer, shell
    products/       Grid, card, filters, skeletons
    auth/           Login/register form pieces
  context/          Auth + favorites
  store/            Redux products slice
  hooks/            Debounce, infinite scroll, product detail
  pages/            Route-level views
  utils/            Cache, categories, sort, favorites storage
```

See **`DECISIONS.md`** for architecture notes and trade-offs.
