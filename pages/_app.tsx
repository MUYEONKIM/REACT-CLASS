// import '/styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import { AppProps } from 'next/app'


export default function App({Component} : AppProps) {

  const allStyle = { // 여기서 css지정해둬도 되고 import해서 지정해줘도 됨
    fontSize: 10,
    color: 'gray',
  }

  const client = new ApolloClient({
    uri: "http://backend-example.codebootcamp.co.kr/graphql",
    cache : new InMemoryCache() // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기
  })

  return (
    <div>
      <div style={allStyle}>============== _app.js 컴포넌트 시작 부분 입니다. ================</div>  
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
      <div style={allStyle}>============== _app.js 컴포넌트 마지막 부분 입니다. ================</div>  
    </div>
  )
}
// 각 파일에 있는 component의 return값들이 위의 <Component {...pageProps} />에 들어가서 실행되는 것
// 즉 _app.js는 전체에 적용되는 파일이 되는 것