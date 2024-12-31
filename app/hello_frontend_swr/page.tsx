'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Page() {
    const { data, error } = useSWR('/api/hello', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return <div>hello {data.name}!</div>
}

