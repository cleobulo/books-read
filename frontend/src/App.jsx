import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import BooksTable from './components/BooksTable'
import BookForm from './components/BookForm'
import BooksList from './components/BooksList'
import { API_BASE_URL } from './apiConfig'
import { useEffect, useState } from 'react'
import './App.css'

function HomePage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBooks = () => {
    fetch(`${API_BASE_URL}/books`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch books')
        return res.json()
      })
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Read Books</h1>
      <BooksList books={books} onDelete={handleDelete} />
    </div>
  )
}

function App() {
  return (
    <Router basename="/">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<BookForm />} />
      </Routes>
    </Router>
  )
}

export default App
