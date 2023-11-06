import { graphql } from "msw";

const gql = graphql.link("http://mock.com/graphql")
// const server = graphql.link("http://mock.com/graphql");

// test에서 사용할 미니 백엔드 서버
// request, response, ctx(헤더같은것) 으로 콜백 함수에 들어옴

export const apis = [
  gql.mutation("createBoard", (req, res, ctx) => {
    const { writer, title, contents } = req.variables.createBoardInput

    return res(
      ctx.data({
        createBoard: {
          _id: "qqq",
          writer,
          title,
          contents,
          __typepname: "Board",
        },
      })
    );
  }),
  // gql.query("fetchBoards", () => {})
];