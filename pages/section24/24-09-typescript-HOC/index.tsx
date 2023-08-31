/* eslint-disable */
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ComponentType, ReactElement} from "react";

// 1. 클래스형 컴포넌트에서 로그인체크
export const LoginCheck = (Component: ComponentType) => <P extends {}>(props: P): ReactElement<P> => {
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("accessToekn") === null) {
      alert("로그인 후 이용가능합니다.")
      void router.push("/section23/23-05-login-check-hoc")
    }
  }, []);

  return <Component {...props}/>
}