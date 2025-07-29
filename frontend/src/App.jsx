import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import BooksTable from './components/BooksTable'
import BookForm from './components/BookForm'
import BooksList from './components/BooksList'
import NotesList from './components/NotesList'
import { API_BASE_URL } from './apiConfig'
import { useEffect, useState } from 'react'
import './App.css'

function HomePage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [notes, setNotes] = useState([])

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

  useEffect(() => {
    if (selectedBookId) {
      fetch(`${API_BASE_URL}/notes/${selectedBookId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch book details')
          return res.json()
        })
        .then((notes) => {
          setNotes(notes || [])
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }, [selectedBookId])

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <div style={{ width: '100%', marginBottom: '32px' }}>
        <h1 style={{ textAlign: 'center', margin: 0 }}>Read Books</h1>
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <BooksList books={books} onDelete={handleDelete} onSelectBook={setSelectedBookId} />
        </div>
        <div style={{ flex: 1, minWidth: '340px' }}>
          {selectedBookId && <NotesList notes={notes} />}
        </div>
      </div>
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
