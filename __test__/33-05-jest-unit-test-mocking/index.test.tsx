import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import StaticRoutingMovedPage from "../../pages/section33/33-05-jest-unit-test-mocking";
import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import mockRouter from "next-router-mock";
// import { server } from "../../src/commons/mocks";

// 순서
// 1. 렌더링
// 2. 작성자, 제목, 내용 인풋창에 값 입력
// 3. 등록하기 버튼 클릭
// 4. mutation 날리기(가짜 API만들기, 가짜 API쪽으로 응답이 날라감, result의 id를 qqq로 받음)

// 5. 등록된 페이지로 이동 ( router.push("/boards/qqq")가 실행이 되면 정상적으로 작동이 된것! )

// jest.mock는 안에 들어간 녀석들은 전부 다 가짜로 되는 거임
// 원본 파일의 router는 browser에서 밖에 실행이 안되기 때문에
// next/router 를 "next-router-mock" 로 import 해줘 라는 뜻임
jest.mock("next/router", () => require("next-router-mock"));

// 백엔드 서버 키기
// beforeAll(() => server.listen());
// 백엔드 서버 끄기
// afterAll(() => server.close());
// 이걸 따로 셋팅으로 빼두는 법이 있음 jest.setup.js 파일을 만들어서 거기서 써줌

it("게시글이 잘 등록되는지 테스트 하자!", async () => {
    const client = new ApolloClient({
        // link: new HttpLink({
        //     uri: "http://mock.com/graphql",
        //     fetch,
        // }),
        link: new HttpLink({ uri: "http://mock.com/graphql", fetch }),
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <StaticRoutingMovedPage />
        </ApolloProvider>
    );

    fireEvent.change(screen.getByRole("input-writer"), {
        target: { value: "맹구" },
    });
    fireEvent.change(screen.getByRole("input-title"), {
        target: { value: "안녕하세요" },
    });
    fireEvent.change(screen.getByRole("input-contents"), {
        target: { value: "방가방가" },
    });

    // 이렇게 하면 진짜 백엔드 api가 날라가게 됨, 때문에 render에서 ApolloProvider로 감싸줘야 함
    fireEvent.click(screen.getByRole("submit-button"));

    await waitFor(() => {
        expect(mockRouter.asPath).toEqual("/boards/qqq");
    });
});
