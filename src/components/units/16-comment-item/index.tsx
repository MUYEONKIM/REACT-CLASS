import { useState } from "react"

interface Iprops {
 el: any;
 index: any;
}

export default function CommentItem(props: Iprops): JSX.Element {
  const [isEdit, setIsEdit] = useState(false)

  const onClickEdit = (): void => {
    setIsEdit(true)
  }
  return (
    <div>
      {
        !isEdit ? (
        <div>
            <span>{props.index}</span>
            <span style = {{margin: "10px"}}>{props.el.writer}</span>
            <span style = {{margin: "10px"}}>{props.el.title}</span> 
            <span style = {{margin: "10px"}}>{props.el.contents}</span>
            <button onClick={onClickEdit}>수정하기</button>
        </div>
        ) : (
            <input type="text"></input>
        )
      }
    </div>
  )
}