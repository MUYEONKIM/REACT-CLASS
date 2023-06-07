interface IExampleProps {
    school: string;
    children: JSX.Element;
}

export default function Example(props: IExampleProps): JSX.Element{
    return (
        <div>
            <div>일반적인 props넘기는 방식</div>
            <div>{props.school}에 다니고 있습니다.</div>
            <div>안녕하세요 영희입니다</div>
            <br/>
            <div>props children으로 넘기기</div>
            <div>{props.children}</div>
        </div>
    )
}