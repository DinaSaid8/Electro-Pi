# Technical decisions

Notes for reviewers — why the project is structured this way.

## API choice: DummyJSON

DummyJSON provides products with pagination, search, categories, and JWT auth in one place. That keeps the task focused on frontend work without running a custom backend.

## Auth: React Context

Login state is small (user + token) and only a few routes need it. Context avoids extra boilerplate for a single concern. Tokens live in `localStorage`; on `401` the client clears storage and sends the user to login with a session-expired message.

## Products: Redux Toolkit

Filters, pagination (`skip`/`limit`), and “load more” append logic get messy with prop drilling. Redux holds list state, loading flags, and errors in one place. For a production app I’d likely use TanStack Query for server cache and keep Redux only for UI state — or drop Redux entirely if the scope stayed this small.

## Caching

Categories and product details use a short TTL cache (memory + `sessionStorage`) to cut repeat requests during a session. Product lists are not cached because filters and pages change often.

## URL query params

`?q=&category=&sort=` makes filters shareable and restores state on refresh. Search still debounces before hitting the API.

## Favorites

Saved products use `localStorage` only — no backend endpoint. Good enough to show UX thinking without scope creep.

## Sorting

Price sort runs on the loaded page client-side. Sorting the full catalog would need server support or loading all items, which doesn’t scale.

## Tests

Unit tests cover utils, reducers, one component, and one async thunk with mocked API modules. I didn’t mock every layer — focused on logic that’s easy to break during refactors.

## What I’d add with more time

- Refresh token flow
- React Query for products
- E2E test (Playwright) for login → list → detail
- Image fallback when CDN URLs fail
