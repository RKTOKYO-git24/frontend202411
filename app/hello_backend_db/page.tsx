'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page() {
    const [data, setData] = useState({ message: '' })

    useEffect(() => {
        axios.get('/api/hello_db/backend')
            .then((res) => res.data)
            .then((data) => {
                setData(data)
            })
    }, [])
    return <div>hello {data.message}!</div>
}
