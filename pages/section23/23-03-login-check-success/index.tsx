import { gql, useQuery } from "@apollo/client"
import { IQuery } from "../../../src/commons/types/generated/typed"
import { useRouter } from "next/router";
import { useEffect } from "react";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function LoginSuccessPage():JSX.Element {
  const router = useRouter()
  
  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN, {
    fetchPolicy: "cache-first"
  });

  useEffect(() => {
    if(localStorage.getItem("accessToekn") === null) {
      alert("로그인 후 이용가능합니다.")
      void router.push("/section23/23-03-login-check")
    }
  }, [])

  return (
    <>
      로그인에 성공하였습니다.
      {data?.fetchUserLoggedIn.name}님 환영합니다.
    </>
  )
}