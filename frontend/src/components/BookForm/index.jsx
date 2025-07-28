import { useState } from 'react'
import { API_BASE_URL } from '../../apiConfig'
import './BookForm.css'

function BookForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch(`${API_BASE_URL}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      })
      if (!res.ok) throw new Error('Failed to create book')
      setSuccess(true)
      setTitle('')
      setAuthor('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="book-form-container">
      <h2>New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <label>
          Title:
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Author:
          <input value={author} onChange={e => setAuthor(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      </form>
      {success && <p className="success">Book created successfully!</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default BookForm
