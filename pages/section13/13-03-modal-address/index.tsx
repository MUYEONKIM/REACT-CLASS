import React, { useState } from 'react';
import { Modal } from 'antd';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';

export default function ModalPage(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [add, setAdd] = useState("")

    const showModal = (): void => {
        setIsOpen(true);
    }

    const handleOk = (): void => {
        setIsOpen(false);
    }
    
    const handleCancle = (): void => {
        setIsOpen(false);
    }
    
    const handleComplete = (data: Address): void => {
        setAdd(data.address)
        console.log(data.address)
        setIsOpen(false)
    }
    
    const showModal2 = (): void => {
        setIsOpen2(true);
    }

    const handleOk2 = (): void => {
        setIsOpen2(false);
    }
    
    const handleCancle2 = (): void => {
        setIsOpen2(false);
    }
    

    return (
        <>
            <div>1. 모달종료방식 (모달 숨기는 방법 ex. 이력서와 같이 취소되도 사라지면 안되는 것)</div>
            <button onClick={showModal}>
                모달창 열기
            </button>
            <Modal title="모달 제목" open={isOpen} onOk={handleOk} onCancel={handleCancle}>
                <input type='password' />
            </Modal>
            <div>2. 모달종료방식 (모달 삭제하는 방법 ex. 신용카드, 비밀번호와 같이 취소되면 사라지고 초기화)</div>
            <button onClick={showModal2}>
                모달창 열기
            </button>
            {isOpen2 && (
            <Modal title="모달 제목" open={true} onOk={handleOk2} onCancel={handleCancle2}>
                <DaumPostcodeEmbed onComplete={handleComplete}/>
            </Modal>)}
            <br/>
            <div>{add}</div>
        </>
    )
}