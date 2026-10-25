# Assignment 6 - Post Dashboard

A React app built with Vite that loads posts from an API, shows loading,
error and empty states, and lets the user filter posts by title. Async state
is managed with `useReducer` and data fetching happens inside `useEffect`.

## How to Run
```bash
npm install
npm run dev
```

## File Organization
- `src/main.jsx` – Entry point, renders App into the root element.
- `src/App.jsx` – Owns the async state with `useReducer` and the filter value
  with `useState`. Fetches posts on mount inside `useEffect`, dispatches
  `FETCH_START`, `FETCH_SUCCESS` and `FETCH_ERROR`, renders the loading,
  error and empty states, and derives the filtered posts during render.
- `src/api/postsApi.js` – Contains only the `fetchPosts` function, which uses
  the Fetch API and returns parsed JSON. No JSX and no React imports.
- `src/reducers/postsReducer.js` – Initial state and a pure reducer that
  handles the three fetch actions and always returns a new state object.
- `src/components/PostList.jsx` – Receives posts as props and renders one
  Post per item with `.map()`, using `id` as the key.
- `src/components/Post.jsx` – Presentational component that renders a post's
  `title` and `body`. No state or effects.
- `src/components/FilterForm.jsx` – Controlled input for filtering by title.
  The value lives in App and is passed down with a change handler.

## Challenges
- **Async functions in useEffect:** The effect callback cannot be `async`
  itself, so I defined an async `loadPosts` function inside the effect and
  called it there.
- **Cleanup and StrictMode:** In development, StrictMode runs effects twice,
  so the request was sent two times. I used an `ignore` flag in the cleanup
  function so a response that arrives after unmount does not update state.
- **Fetch error handling:** `fetch` does not throw on HTTP errors like 404 or
  500, so I check `response.ok` and throw an error myself. The error is
  caught with `try/catch` in App and shown to the user.
- **Derived state:** My first idea was to keep the filtered posts in state,
  but that would duplicate data and need an effect to keep it in sync. I
  calculate `filteredPosts` during render from `posts` and `filter` instead.
- **Keeping the reducer pure:** All async work stays in App. The reducer
  only receives actions and returns new state objects without mutating the
  old one.
