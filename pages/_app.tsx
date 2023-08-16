// import '/styles/globals.css'
import { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";
import ApolloSetting from "../src/components/commons/apollo";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from 'recoil'
export default function App({ Component }: AppProps): JSX.Element {


  return (
    <div>
      <div>============== _app.js 컴포넌트 시작 부분 입니다. ================</div>
      <RecoilRoot>
      <ApolloSetting>
        <>
          <Global styles={globalStyles}/>
          <Layout>
          <Component />
          </Layout>
        </>
      </ApolloSetting>
      </RecoilRoot>
      <div>============== _app.js 컴포넌트 마지막 부분 입니다. ================</div>
    </div>
  );
}
// 각 파일에 있는 component의 return값들이 위의 <Component {...pageProps} />에 들어가서 실행되는 것
// 즉 _app.js는 전체에 적용되는 파일이 되는 것
