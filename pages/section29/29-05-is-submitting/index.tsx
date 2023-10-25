import axios from "axios";
import { wrapAsyncFunc } from "../../../src/commons/libaries/asyncFunc";
import { useState } from "react";

export default function RestGetPage(): JSX.Element {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 게시글 등록 함수
    const onClickSync = async (): Promise<void> => {
        // 요청이 날라가서 돌아오기 기다리는 동안에는 이 함수, 또는 버튼이 실행 안되게 막아야 함
        setIsSubmitting(true);

        const result = await axios.get("https://koreanjson.com/posts/1");
        console.log(result); // 제대로된 결과
        console.log(result.data.title);

        setIsSubmitting(false);
    };

    return (
        <div>
            <button
                onClick={wrapAsyncFunc(onClickSync)}
                disabled={isSubmitting}
            >
                REST-API (동기) 요청하기
            </button>
        </div>
    );
}
