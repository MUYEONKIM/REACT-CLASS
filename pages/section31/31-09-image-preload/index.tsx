import { useRouter } from "next/router";
import { useEffect } from "react";

const qqq = [];

export default function ImagePreload(): JSX.Element {
    // 여기서 저장이 된건 렌더링이 되면 다시 재선언 되지만 위의 qqq처럼 밖에서 선언하면 전역변수로 렌더링 되도 재선언 안됨
    const router = useRouter();
    useEffect(() => {
        const img = new Image(); // 이렇게하면 img태그가 만들어 지는 거임 <img /> 이상태임 지금
        img.src =
            "https://upload.wikimedia.org/wikipedia/commons/8/85/%22_Shot_From_The_Sky%22_Army_Show_1945_Oak_Ridge_%2824971013612%29.jpg";
        img.onload = () => {
            qqq.push(img);
        };
    }, []);

    const onClickMovedPage = (): void => {
        void router.push("/section31/31-09-image-preload-moved");
    };
    return <button onClick={onClickMovedPage}>페이지 이동하기</button>;
}
