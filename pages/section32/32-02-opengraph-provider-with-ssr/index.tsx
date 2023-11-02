// 제공자일때 => 네이버, 다음, 쿠팡
import { gql, useQuery } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import Head from "next/head";

const FETCH_USEDITEM = gql`
    query fetchUseditem($useditemId: ID!) {
        fetchUseditem(useditemId: $useditemId) {
            _id
            name
            remarks
            images
        }
    }
`;

export default function OpenGraphProvider(props: any): JSX.Element {
    console.log("나의 props", props);

    const { data } = useQuery(FETCH_USEDITEM, {
        variables: {
            useditemId: "644f6404aef9f000281ba9da",
        },
    });

    return (
        <>
            <Head>
                <meta property="og:title" content={props?.qqq.name} />
                <meta property="og:description" content={props?.qqq.remarks} />
                <meta property="og:image" content={props?.qqq.images} />
            </Head>
            <div>중고마켓에 오신 것을 환영합니다!(여기는 Body입니다.)</div>
        </>
    );
}

// 이름 못 바꿈 고정임, 페이지에서 실행해야 함, app.tsx 이런데서 안됨
// getServerSideProps는 서버에서 실행되는 것, 브라우저가 아니라
// useEffect가 브라우저에서 실행되는 것, getServerSideProps는 제일 먼저 실행이 되는 것임
// 가장 먼저 실행되기 때문에 여기서 백엔드에 데이터 요청 로직을 넣어 줌
// getServerSideProps의 return값은 위의 export default의 props로 들어감
// 프론트엔드 서버 프로그램 = webpack 서버프로그램
export const getServerSideProps = async (): Promise<any> => {
    console.log("여기는 서버입니다.");

    // 1. 여기서 api요청
    const graphQLclient = new GraphQLClient(
        "https://backend-practice.codebootcamp.co.kr/graphql"
    );
    const result: any = await graphQLclient.request(FETCH_USEDITEM, {
        useditemId: "644f6404aef9f000281ba9da",
    });

    // 2. 받은 결과를 return
    return {
        props: {
            qqq: {
                name: result.fetchUseditem.name,
                remarks: result.fetchUseditem.remarks,
                images: result.fetchUseditem.images,
            },
        },
    };
};
