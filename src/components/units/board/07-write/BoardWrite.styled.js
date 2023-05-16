import styled from '@emotion/styled'

export const RedInput = styled.input`
    border-color: ${(props) => props.mycolor === true ? 'yellow' : "blue"};
`

export const BlueButton = styled.button`
    background-color: ${(props) => props.isActive === true ? "yellow" : ""};
    cursor: pointer;
`