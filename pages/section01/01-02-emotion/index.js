import {MyEmail, Myinput} from '../../../styles/01-02-emotion'
export default function EmotionPage() {

    return (
        <div>
            <MyEmail>이메일:</MyEmail>
            <Myinput type="text" placeholder="값을 입력하세요" />
            <button>클릭하세요!</button>
            <img src="/vercel.svg" />
        </div>
    )
}