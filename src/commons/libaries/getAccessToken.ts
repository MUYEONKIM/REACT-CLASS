import { GraphQLClient, gql } from "graphql-request";
import { IMutation } from "../types/generated/typed";

const RESTORE_ACCESS_TOKEN = gql`
    mutation {
        restoreAccessToken {
            accessToken
        }
    }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
    try {
        console.log("getAccessToken이 실행됬습니다");
        const graphqlClient = new GraphQLClient(
            "https://backend-practice.codebootcamp.co.kr/graphql",
            { credentials: "include" }
        );
        const result = await graphqlClient.request<
            Pick<IMutation, "restoreAccessToken">
        >(RESTORE_ACCESS_TOKEN);
        console.log(result, "getaccesstoken 결과입니다");
        const newAccessToken = result.restoreAccessToken.accessToken;
        return newAccessToken;
    } catch (error) {
        if (error instanceof Error) console.log(error.message);
    }
};
