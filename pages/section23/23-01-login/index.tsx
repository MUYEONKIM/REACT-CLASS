import { gql, useMutation } from "@apollo/client"
import type { ChangeEvent } from "react"
import type { IMutation, IMutationLoginUserArgs } from "../../../src/commons/types/generated/typed"
import { useState } from 'react'
import { useRecoilState } from "recoil"
import { accessTokenState } from "../../../src/commons/stores"
import { useRouter } from "next/router"

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!){
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`

export default function LoginPage():JSX.Element {
  const router = useRouter()
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginUser ] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs>(LOGIN_USER);

  // 이렇게 state를 안쓰면 지워도 가능 대신 ,는 지우면 안됨 (구조할당 때문에)
  const [, setAccessToken ] = useRecoilState(accessTokenState);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const onClickLogin = async (): Promise<void> => {
    try {
      // 1. login Mutation날려서 accesstoken 받아오기
      const result = await loginUser({
        variables: {
          email,
          password,
        }  
      });
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      // 2. 받아온 accessToken을 global state에 저장하기
      if(accessToken === undefined) {
        alert("로그인에 실패하였습니다.");
        return;
      }
      setAccessToken(accessToken);
      void router.push("/section23/23-01-login-success")
    } catch(error) {
      if(error instanceof Error) alert(error.message)
    }
  }
  return (
    <>
      이메일: <input onChange={onChangeEmail} type="text" />
      비밀번호: <input onChange={onChangePassword} type="password" />
      <button onClick={onClickLogin} type="submit">로그인</button>
    </>
  )
}