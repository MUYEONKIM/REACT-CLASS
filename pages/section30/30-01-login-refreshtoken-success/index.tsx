import { gql, useApolloClient, useMutation } from "@apollo/client";
// import { IQuery } from "../../../src/commons/types/generated/typed";
import { wrapAsyncFunc } from "../../../src/commons/libaries/asyncFunc";
import { withAuth } from "../../../src/components/commons/hocs/withAuth";
import { useRouter } from "next/router";

const FETCH_USER_LOGGED_IN = gql`
    query {
        fetchUserLoggedIn {
            _id
            email
            name
        }
    }
`;

const LOGOUT_USER = gql`
    mutation logoutUser {
        logoutUser
    }
`;

const LoginSuccessPage = (): JSX.Element => {
    const router = useRouter();
    // 1. 페이지 접속하면 자동으로 데이터 받아오는 법(data는 글로벌스테이트 저장)이 되고 리렌더링이 됨
    // const { data } =
    // useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

    // 2. 버튼 클릭시 data에 받아지고(data는 글로벌스테이트에 저장), 이후 리렌더링 (lazyquery)
    // const [나의함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);

    // const aaa = async () => {
    //     await 나의함수();
    //     console.log(data);
    // };

    // 3. axios처럼 사용하는 방법(data는 글로벌스테이트에 저장)
    // const client = useApolloClient();
    // client.query()

    const [logoutUser] = useMutation(LOGOUT_USER);
    const client = useApolloClient();

    const onClickButton = async (): Promise<void> => {
        const result = await client.query({
            query: FETCH_USER_LOGGED_IN,
        });
        console.log(result);
    };

    const onClickLogout = (): void => {
        void logoutUser();
        void router.push("/section30/30-01-login-refreshtoken");
    };
    return (
        <>
            로그인에 성공하였습니다.
            {/* {data?.fetchUserLoggedIn.name}님 환영합니다. */}
            <button onClick={wrapAsyncFunc(onClickButton)}>클릭하세요</button>
            <button onClick={onClickLogout}>로그아웃</button>
        </>
    );
};

export default withAuth(LoginSuccessPage);
