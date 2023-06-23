export default function User() {
  return (
    <section style={{ marginTop: '10rem' }}>
      <div
        style={{
          marginTop: '10rem',
          position: 'relative',
          paddingTop: '7rem',
          paddingInline: '2rem',
          width: 'min(1300px, 100%)',
        }}
      >
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--secondary-background-color)',
            borderRadius: '1rem',
            paddingTop: '13rem',
            marginBottom: '2rem',
            width: '100%',
          }}
        >
          <div
            style={{
              padding: '100px',
              borderRadius: '1rem',
              position: 'absolute',
              top: '0',
            }}
            className='skeleton animate-pulse'
          ></div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBlock: '2rem',
              paddingInline: '7rem',
              gap: '2rem',
              width: '100%',
            }}
          >
            <div>
              <h1
                style={{ padding: '10px 100px' }}
                className='skeleton animate-pulse'
              ></h1>
            </div>
            <div
              className={'skeleton animate-pulse'}
              style={{ padding: '10px 150px' }}
            ></div>
            <div
              className={'skeleton animate-pulse'}
              style={{ padding: '10px 150px' }}
            ></div>
            <div
              className={'skeleton animate-pulse'}
              style={{ padding: '10px 100px' }}
            ></div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div
                style={{ padding: '10px 30px' }}
                className='skeleton animate-pulse'
              ></div>
              <div
                style={{ padding: '10px 30px' }}
                className='skeleton animate-pulse'
              ></div>
              <div
                style={{ padding: '10px 30px' }}
                className='skeleton animate-pulse'
              ></div>
              <div
                style={{ padding: '10px 30px' }}
                className='skeleton animate-pulse'
              ></div>
            </div>
            <div
              className={'skeleton animate-pulse'}
              style={{ padding: '10px 150px' }}
            ></div>
          </div>
        </main>
      </div>
    </section>
  )
}
