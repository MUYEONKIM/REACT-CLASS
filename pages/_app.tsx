// import '/styles/globals.css'
import { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";
import ApolloSetting from "../src/components/commons/apollo";

export default function App({ Component }: AppProps): JSX.Element {
  const allStyle = {
    // 여기서 css지정해둬도 되고 import해서 지정해줘도 됨
    fontSize: 10,
    color: "gray",
  };



  return (
    <div>
      <div style={allStyle}>
        ============== _app.js 컴포넌트 시작 부분 입니다. ================
      </div>
      <ApolloSetting>
        <Layout>
        <Component />
        </Layout>
      </ApolloSetting>
      <div style={allStyle}>
        ============== _app.js 컴포넌트 마지막 부분 입니다. ================
      </div>
    </div>
  );
}
// 각 파일에 있는 component의 return값들이 위의 <Component {...pageProps} />에 들어가서 실행되는 것
// 즉 _app.js는 전체에 적용되는 파일이 되는 것
