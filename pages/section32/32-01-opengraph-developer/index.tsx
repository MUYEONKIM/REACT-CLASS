// 개발자일때 => 디스코드, 카카오톡, 슬랙 등
import axios from "axios";
import { wrapAsyncFunc } from "../../../src/commons/libaries/asyncFunc";

export default function OpenGraphDeveloper(): JSX.Element {
    const onClickEnter = async (): Promise<void> => {
        // 1. 채팅 데이터에 주소가 있는지 찾기(ex: http~로 시작하는 것)

        // 2. 해당 주소로 스크래핑하기
        const result = await axios.get(
            "http://localhost:3000/section32/32-01-opengraph-provider"
        );
        // 원래는 cheerio 같은 라이브러리를 써서 op: 를 뽑음
        console.log(
            result.data
                .split("<meta")
                .filter((el: string) => el.includes("og:"))
        );
        // 3. meta태그에서 오픈그래프 찾기 (op: 으로 시작하는 것)
    };

    return (
        <button onClick={wrapAsyncFunc(onClickEnter)}>
            채팅 입력 후 엔터치기!!
        </button>
    );
}
