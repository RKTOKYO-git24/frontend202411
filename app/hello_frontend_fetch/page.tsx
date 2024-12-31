'use client'

import { useState, useEffect } from 'react'

export default function Page() {
    const [data, setData] = useState({ name: ''})

    useEffect(() => {
        fetch('/api/hello')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
        })
    }, [])

    return <div>hello {data.name}!</div>
}