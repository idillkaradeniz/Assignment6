import { useReducer, useEffect, useState } from 'react'
import { fetchPosts } from './api/postsApi.js'
import { postsReducer, initialState } from './reducers/postsReducer.js'
import PostList from './components/PostList.jsx'
import FilterForm from './components/FilterForm.jsx'

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState)
  const [filter, setFilter] = useState('')
  const { posts, loading, error } = state

  useEffect(() => {
    let ignore = false

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' })
      try {
        const data = await fetchPosts()
        if (!ignore) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data })
        }
      } catch (err) {
        if (!ignore) {
          dispatch({ type: 'FETCH_ERROR', payload: err.message })
        }
      }
    }

    loadPosts()

    return () => {
      ignore = true
    }
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Post Dashboard</h1>

      <FilterForm filter={filter} onFilterChange={setFilter} />

      {loading && <p>Loading posts...</p>}

      {!loading && error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && posts.length === 0 && <p>No posts found.</p>}

      {!loading && !error && posts.length > 0 && (
        filteredPosts.length > 0
          ? <PostList posts={filteredPosts} />
          : <p>No posts match your filter.</p>
      )}
    </div>
  )
}

export default App
