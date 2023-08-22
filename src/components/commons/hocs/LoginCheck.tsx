import { useRouter } from "next/router";
import { useEffect } from "react";

// 1. 클래스형 컴포넌트에서 로그인체크
export const LoginCheck = (Component: any) => (props: any): any => {
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("accessToekn") === null) {
      alert("로그인 후 이용가능합니다.")
      void router.push("/section23/23-05-login-check-hoc")
    }
  }, []);

  return <Component {...props}/>
}