import styled from "@emotion/styled"

const Wrapper = styled.div`
    height: 50px;
    border: 2px solid red;
`

export default function LayoutHeader(): JSX.Element {
    return (
        <Wrapper>여기는 헤더입니다</Wrapper>
    )
}