import { gql, useQuery } from "@apollo/client"
import { IQuery } from "../../../src/commons/types/generated/typed"

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
  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN, {
    fetchPolicy: "cache-first"
  });

  return (
    <>
      로그인에 성공하였습니다.
      {data?.fetchUserLoggedIn.name}님 환영합니다.
    </>
  )
}