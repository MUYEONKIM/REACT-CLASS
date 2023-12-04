import axios from 'axios'
import 나만의페이지 from '../../section01/01-01-example' //이렇게 다른 컴포넌트 불러오기 가능

export default function RestGetPage() {

    // function onClickAsync() {
    //     const result = axios.get("https://koreanjson.com/posts/1")    => 함수 중복선언 문제
    //     console.log(result) // promise
    // }
    const onClickAsync = () => {
        const result = axios.get("https://koreanjson.com/posts/1") // 함수 요청
        console.log(result) // promise
    }

    // async function onClickSync() {                                   => 함수 중복선언 문제
    // const result2 = await axios.get("https://koreanjson.com/posts/1")
    // console.log(result2) // 제대로된 결과
    // console.log(result2.data.title)
    // }

    const onClickSync = async () => {
        const result2 = await axios.get("https://koreanjson.com/posts/1")
        console.log(result2) // 제대로된 결과
        console.log(result2.data.title)
    }
    return (
        <div>

            <button onClick={onClickAsync}>REST-API (비동기) 요청하기</button>
            <button onClick={onClickSync}>REST-API (동기) 요청하기</button>
            <나만의페이지 />
        </div>
    )
}