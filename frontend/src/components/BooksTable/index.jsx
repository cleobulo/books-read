export default function BooksTable({ books }) {
    if (!books.length) {
        return <p>No records found.</p>;
    }

    return (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Author</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Comment</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}