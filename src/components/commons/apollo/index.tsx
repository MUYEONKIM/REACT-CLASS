import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client'
import { accessTokenState } from "../../../commons/stores";
import { useRecoilState } from "recoil";

// 리렌더링 되면 안되니깐 컴포넌트, 따라서 컴포넌트를 불러와도 GLOBAL_STATE는 유지가 됨
const GLOBAL_STATE = new InMemoryCache()

interface IApolloprops {
    children: JSX.Element
}

export default function ApolloSetting(props: IApolloprops): JSX.Element {
  const [ accessToken ] = useRecoilState(accessTokenState)

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization : `Bearer ${accessToken}`
    }
  });
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
    )
}
