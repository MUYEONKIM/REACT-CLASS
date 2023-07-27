import axios from 'axios'
import {useState, useEffect} from 'react'

export default function RestGetPage(): JSX.Element {
    const [dog, setDog] = useState()
    useEffect(() => {
        const fetchdog = async (): Promise<void> => {
            const result = await axios.get("https://dog.ceo/api/breeds/image/random")
            setDog(result.data?.message)
        }
        void fetchdog()
    }, [])
    return (
        <div>
            <img src={dog} width={500} height={500}/>
        </div>
    )
}