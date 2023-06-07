import React, { useState } from 'react';
import { Modal } from 'antd';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';

export default function ModalPage(): JSX.Element {
    const [isOpen2, setIsOpen2] = useState(false)
    const [add, setAdd] = useState("")

    // 하드 코딩 보다는 !prev를 통해서 반대의 값이다~ 명시해주는게 좋음
    // 이런 녀석들을 switch (껏다켯다 한다고) 또는 ontoggle modal이라고 함

    const onToggleModal = (): void => {
        setIsOpen2((prev) => !prev);
    };

    const handleComplete = (data: Address): void => {
        setAdd(data.address);
        console.log(data.address);
        onToggleModal();
    };

    // const showModal2 = (): void => {
    //     onToggleModal();
    // };

    // const handleOk2 = (): void => {
    //     onToggleModal();
    // };
    
    // const handleCancle2 = (): void => {
    //     onToggleModal();
    // };
    // 대신에 전부 onToggleModal로 통일
    

    return (
        <>
            <div> 모달종료방식 (모달 삭제하는 방법 ex. 신용카드, 비밀번호와 같이 취소되면 사라지고 초기화)</div>
            <button onClick={onToggleModal}>
                모달창 열기
            </button>
            {isOpen2 && (
            <Modal title="모달 제목" open={true} onOk={onToggleModal} onCancel={onToggleModal}>
                <DaumPostcodeEmbed onComplete={handleComplete}/>
            </Modal>)}
            <br/>
            <div>{add}</div>
        </>
    )
}