export default function DeleteButton({ onClick, title = "Delete", disabled = false }) {
  return (
    <button
      style={{
        background: '#c1121f',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
      }}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8" />
      </svg>
    </button>
  );
}
