import { UpCircleOutlined } from "@ant-design/icons";
import styled from '@emotion/styled'
import { MouseEvent } from "react";
import { useState } from "react";
const MyIcon = styled(UpCircleOutlined)`
    color: red;
    font-size: 130px;
`

export default function LibaryIconPage(): JSX.Element {

    const [ count, setCount] = useState(0)
    const onClickDelete = (event: MouseEvent<HTMLDivElement>): void => {
        console.log(event.currentTarget.id)
        setCount(count + 1)
        console.log(count)
    }
    return (
        <div id="삭제" onClick={onClickDelete}>
            <MyIcon />;
        </div>
    )
}
