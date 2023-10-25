import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
    fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import {
    accessTokenState,
    restoreAccessTokenLoadable,
} from "../../../commons/stores";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../../commons/libaries/getAccessToken";

// 리렌더링 되면 안되니깐 컴포넌트, 따라서 컴포넌트를 불러와도 GLOBAL_STATE는 유지가 됨
const GLOBAL_STATE = new InMemoryCache();

interface IApolloprops {
    children: JSX.Element;
}

export default function ApolloSetting(props: IApolloprops): JSX.Element {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
    const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
    // 1. process.browser
    // if(process.browser){
    //   const result = localStorage.getItem('accessToken');
    //   setAccessToken(result ?? "");
    //   console.log("나는 지금 브라우저다!")
    // } else {
    //   console.log(
    //     "지금은 yarn dev 프로그램 내부다"
    //   );
    // };

    // 2. window
    // if(typeof window !== "undefined"){
    //   const result = localStorage.getItem('accessToken');
    //   setAccessToken(result ?? "");
    //   console.log("나는 지금 브라우저다!")
    // } else {
    //   console.log(
    //     "지금은 yarn dev 프로그램 내부다"
    //   );
    // };

    // 3. useEffect
    useEffect(() => {
        // 1. 기존방식 (refreshtoken 이전)
        // const result = localStorage.getItem("accessToken");
        // setAccessToken(result ?? "");

        // 2. 새로운방식(refreshToken 이후)
        // void getAccessToken().then((newAccessToken) => {
        //     setAccessToken(newAccessToken ?? "");
        // });

        // 2-2. 좋은 방식 (toPromise를 이용해 recoil함수를 공유)
        void aaa.toPromise().then((newAccessToken) => {
            setAccessToken(newAccessToken ?? "");
        });
    }, []);

    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
        // 1. 에러를 캐치
        if (typeof graphQLErrors !== "undefined") {
            for (const err of graphQLErrors) {
                // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
                if (err.extensions.code === "UNAUTHENTICATED") {
                    return fromPromise(
                        // 2. refreshToken으로 accessToken을 재발급 받기
                        getAccessToken().then((newAccessToken) => {
                            setAccessToken(newAccessToken ?? "");

                            // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
                            // 이전 api요청을 그대로 보내면서 헤더등 기본정보들을 그대로 가져오는것 getContext
                            // 수정은 setContext
                            operation.setContext({
                                headers: {
                                    ...operation.getContext().headers, // 기존의 headers 복사하기
                                    Authorization: `Bearer ${
                                        newAccessToken ?? ""
                                    }`, // 토큰만 새로운 토큰으로 덮어씌우기
                                },
                            });
                        })
                        // 요청 다시 날리기
                    ).flatMap(() => forward(operation));
                }
            }
        }
    });

    const uploadLink = createUploadLink({
        uri: "https://backend-practice.codebootcamp.co.kr/graphql",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
    });

    const client = new ApolloClient({
        link: ApolloLink.from([errorLink, uploadLink]),
        cache: GLOBAL_STATE, // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기
    });

    // prettier-ignore
    return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
    )
}
