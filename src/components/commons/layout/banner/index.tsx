import styled from "@emotion/styled"

const Wrapper = styled.div`
    height: 100px;
    border: 2px solid black;
`

export default function LayoutBanner(): JSX.Element {
    return (
        <Wrapper>여기는 배너입니다</Wrapper>
    )
}