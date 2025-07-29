import { useState } from 'react';

export default function BooksList({ books, onSelectBook }) {
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
                        onClick={() => onSelectBook(book.id)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelectBook(book.id); }}
                    >
                        <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{book.title}</span>
                        <div>
                            <button
                                title="Adicionar nota"
                                style={{
                                    marginRight: '8px',
                                    background: '#1976d2',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    width: '32px',
                                    height: '32px',
                                    fontSize: '1.5em',
                                    fontWeight: 'bold',
                                    lineHeight: '32px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    display: 'inline-block',
                                    padding: 0,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                                    transition: 'background 0.2s',
                                }}
                                onClick={e => { e.stopPropagation(); alert(`Adicionar nota para: ${book.title}`); }}
                            >
                                +
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
