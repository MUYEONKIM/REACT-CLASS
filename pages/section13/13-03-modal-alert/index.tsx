
import { Modal } from "antd"

export default function ModalPage(): JSX.Element {
    
    const onClickButton = (): void => {
        Modal.success({
            content: 'some messages...some messages...',
          });
    }

    const onClickButton2 = (): void => {
        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
          });
    }
    return (
        <>
            <button onClick={onClickButton}>성공했을때</button>
            <button onClick={onClickButton2}>실패했을때</button>
        </>
    )
}