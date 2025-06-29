import DeleteButton from '../DeleteButton';
import { API_BASE_URL } from '../../apiConfig';
import { useState } from 'react';

export default function BooksTable({ books, onDelete }) {
    const [deletingId, setDeletingId] = useState(null);

    if (!books.length) {
        return <p>No records found.</p>;
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        setDeletingId(id);
        try {
            const res = await fetch(`${API_BASE_URL}/books/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            if (onDelete) onDelete(id);
        } catch (err) {
            alert('Error deleting book.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Author</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Comment</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.title}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.author}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.comment}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                            {new Date(book.created_date).toLocaleString('pt-BR')}
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                            <DeleteButton
                                onClick={() => handleDelete(book.id)} 
                                disabled={deletingId === book.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}