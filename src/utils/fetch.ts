// GET fetch api request
export async function GET(url: string) {
  const res = await fetch(url, {
    credentials: 'include',
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

// POST fetch api request
export async function POST(url: string, { arg }: { arg: { body: any } }) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.body),
  }).then(res => res.json())
}

// PATCH fetch api request
export async function PATCH(url: string, { arg }: { arg: { body: any } }) {
  return fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.body),
  }).then(res => res.json())
}

// DELETE fetch api request
export async function DELETE(url: string, { arg }: { arg: { body: any } }) {
  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.body),
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}
