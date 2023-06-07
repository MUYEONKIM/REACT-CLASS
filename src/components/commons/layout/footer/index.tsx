import styled from "@emotion/styled"

const Wrapper = styled.div`
    height: 50px;
    border: 2px solid blue;
`

export default function LayoutFooter(): JSX.Element {
    return (
        <Wrapper>여기는 푸터입니다</Wrapper>
    )
}