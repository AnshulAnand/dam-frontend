export default function NotFound() {
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
      <h1 style={{ fontSize: 'clamp(3.5rem, 5vw, 6.5rem)' }}>404</h1>
      <h1 style={{ fontSize: 'clamp(3rem, 5vw, 6rem)' }}>Not Found</h1>
      <p style={{ marginTop: '2rem' }}>
        Make sure you do not have a typo in the URL
      </p>
    </section>
  )
}
