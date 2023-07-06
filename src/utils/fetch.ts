// GET fetch api request
export async function GET(url: string) {
  try {
    const res = await fetch(url, {
      credentials: 'include',
    })
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  } catch (e) {
    throw new Error('Failed to fetch data')
  }
}

// POST fetch api request
export async function POST(url: string, { arg }: { arg: { body: any } }) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg.body),
    })
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  } catch (e) {
    console.log({ e })
    throw new Error('Failed to fetch data')
  }
}

// PATCH fetch api request
export async function PATCH(url: string, { arg }: { arg: { body: any } }) {
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg.body),
    })
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  } catch (e) {
    throw new Error('Failed to fetch data')
  }
}

// DELETE fetch api request
export async function DELETE(url: string, { arg }: { arg: { body: any } }) {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg.body),
    })
    if (!res.ok) {
      const error: any = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  } catch (e) {
    throw new Error('Failed to fetch data')
  }
}
