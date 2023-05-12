import { useState } from 'react';

export default function SignupStatePage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailerror, setEmailerror] = useState("")

    function onChangeEmail (event) {
        console.log(event) // 나의 행동 딕셔너리 형태로 나옴
        console.log(event.target) // 작동된태그가 나오게 됨
        console.log(event.target.value) // 작동된 태그의 입력된 값이 나옴

        setEmail(event.target.value)
    }

    function onChangePassword (event) {
        setPassword(event.target.value)
    }
    
    function onClickSignup (event) {
        console.log(email)
        console.log(password)
        //  1. 검증하기
        // email.includes("@") === false ?  alert("이메일이 올바르지 않습니다!"): alert("회원가입을 축하합니다!"); alert는 옛날방식
        email.includes("@") === false ? setEmailerror("이메일이 올바르지 않습니다!") : alert("회원 가입을 축하합니다!")

        //  2. 백엔드 컴퓨터에 보내주기 (백엔드 개발자가 만든 함수. 즉 API)
        //  3. 성공 알람 띄워주기
    }

    return (
        <div>
            이메일 : <input type='text' onChange={onChangeEmail}/>
            <div>{emailerror}</div>
            비밀번호 : <input type='password' onChange={onChangePassword}/>
            <button onClick={onClickSignup}>회원가입</button>
        </div>
    )
}