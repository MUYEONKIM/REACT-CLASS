import { useState } from "react";
import { wrapAsyncFunc } from "../../../src/commons/libaries/asyncFunc";

export default function ImageUploadPage(): JSX.Element {
    const [image, setImage] = useState("");

    const onChangeFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const file = event.target.files?.[0];
        if (file === undefined) return;
        console.log(file);

        // 1. 임시URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
        const result = URL.createObjectURL(file);
        console.log(result);

        // 2. 임시URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) => {
            console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유 : event.target은 태그만을 가르키지 않음
            if (typeof event.target?.result === "string") {
                setImage(event.target?.result);
            }
        };
    };

    return (
        <>
            <input
                type="file"
                onChange={wrapAsyncFunc(onChangeFile)}
                multiple
            />
            {/* <img src={`https://storage.googleapis.com/${image}`} /> */}
            <img src={image} />
        </>
    );
}
