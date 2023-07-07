import axios from 'axios'
import { useEffect, useState } from 'react'

export default function TestAPI() {
    const [dog, setDog] = useState("")

    useEffect(()=> {
        const fetchDog = async () => {
            const result = await axios.get("https://dog.ceo/api/breeds/image/random")
            setDog(result.data.message)
            console.log(result.data.message)
        }
        fetchDog()
    }, [])

    return (
        <div>
            <img src={dog} />
        </div>
    )}