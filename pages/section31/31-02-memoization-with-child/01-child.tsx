import { memo } from "react";

function ChildPage(props: any): JSX.Element {
    console.log("자식이 렌더링 되었습니다.");

    return (
        <>
            <div>==========================</div>
            <div>나는 자식 컴포넌트입니다</div>;
            <div>==========================</div>
        </>
    );
}

export default memo(ChildPage);
