import { atom, selector } from "recoil";
import { getAccessToken } from "../libaries/getAccessToken";

export const isEditState = atom({
    key: "isEditState",
    default: true,
});

export const accessTokenState = atom({
    key: "accessTokenState",
    default: "",
});

export const visitedPageState = atom({
    key: "visitedPageState",
    default: "",
});

export const restoreAccessTokenLoadable = selector({
    key: "restoreAccessTokenLoadable",
    get: async () => {
        const newAccessToken = await getAccessToken();
        console.log(newAccessToken, "restoreaccess 결과입니다");
        return newAccessToken;
    },
});
