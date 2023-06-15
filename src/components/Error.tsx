export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <section
      style={{
        marginTop: '7rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingInline: '1rem',
        height: '90vh',
      }}
    >
      <h1 style={{ fontSize: 'clamp(3.5rem, 5vw, 6.5rem)' }}>{error.name}</h1>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 5rem)' }}>{error.message}</h1>
      <button
        style={{
          padding: '1rem 2rem',
          marginTop: '2rem',
          borderRadius: '100px',
          cursor: 'pointer',
          backgroundColor: 'var(--secondary-background-color)',
        }}
        onClick={() => reset()}
      >
        Try Again
      </button>
    </section>
  )
}
