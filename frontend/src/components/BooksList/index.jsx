import { useState } from 'react';

export default function BooksList({ books, onDelete }) {
    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {books.map(book => (
                    <li
                        key={book.id}
                        style={{
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                            padding: '16px',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            maxWidth: '320px',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.2s',
                            userSelect: 'none',
                            outline: 'none',
                        }}
                        tabIndex={0}
                        onClick={() => alert(`Livro: ${book.title}`)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') alert(`Livro: ${book.title}`); }}
                    >
                        <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{book.title}</span>
                        <button onClick={e => { e.stopPropagation(); onDelete(book.id); }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
