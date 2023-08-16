import { isEditState } from "../../../src/commons/stores";
import BoardWrite from "../../../src/components/units/22-global-state/BoardWrite.container";
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'

export default function GlobalStateWithRecoilPage(): JSX.Element {
  const [isEdit, setIsEdit] = useRecoilState(isEditState)
  
  const onClickIsEdit = (): void => {
    setIsEdit(curr => !curr)
    console.log(isEditState)
    console.log(isEdit)
  }

  return (
      <>
        <BoardWrite />
        <button onClick={onClickIsEdit}>asd</button>
      </>
  )
}