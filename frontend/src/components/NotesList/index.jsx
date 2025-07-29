export default function NotesList({ notes }) {
    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {notes.map(note => (
                    <li
                        key={note.id}
                        style={{
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                            padding: '16px',
                            marginBottom: '16px',
                            maxWidth: '320px'
                        }}
                    >
                        <div style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: '8px' }}>
                            {note.title || <span style={{ color: '#888' }}>(Sem título)</span>}
                        </div>
                        <div>{note.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}