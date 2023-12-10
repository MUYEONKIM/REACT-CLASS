import { useRouter } from "next/router";
import { useEffect } from "react";
import { restoreAccessTokenLoadable } from "../../../commons/stores";
import { useRecoilValueLoadable } from "recoil";
// import { getAccessToken } from "../../../commons/libaries/getAccessToken";

export const withAuth =
    (Component: any) =>
    (props: any): any => {
        const router = useRouter();
        const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

        // 1. 클래스형 컴포넌트에서 로그인체크
        // useEffect(() => {
        //     if (localStorage.getItem("accessToekn") === null) {
        //         alert("로그인 후 이용가능합니다.");
        //         void router.push("/section23/23-05-login-check-hoc");
        //     }
        // }, []);

        // 2. refreshToken 이후 (안좋음) apollo에 이어서 두 번 요청하기 때문에
        // useEffect(() => {
        //     void getAccessToken().then((newAccessToken) => {
        //       if(newAccessToken === undefined) {
        //         alert("로그인 후 이용가능합니다.");
        //         void router.push("/section23/23-05-login-check-hoc");
        //       }
        //     });
        // }, []);

        // 3. refreshToken 좋음 => 함수를 공유하므로 apollo에 이어 1번만 요청하게 됨
        useEffect(() => {
            console.log("withauth가 실행되었습니다");
            void aaa.toPromise().then((newAccessToken) => {
                console.log(newAccessToken, "withauth결과입니다");
                console.log(aaa);
                if (newAccessToken === undefined) {
                    alert("로그인 후 이용가능합니다.");
                    void router.push("/section30/30-01-login-refreshtoken");
                }
            });
        }, []);

        return <Component {...props} />;
    };
