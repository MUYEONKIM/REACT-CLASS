export default function Page() {
  const divstyle = {
    backgroundColor:"red",
    width: "300px",
    height: "100px",
  }
  return(
    <div
      style = {divstyle} 
      onClick={(event) => {
        console.log(event.target)
        console.log(event.currentTarget)
    }}>
      <input placeholder="여기를 클릭해서 current target과 target의 차이를 알아보세요"></input>
      <p>current target은 연결된 부모태그를 가리키고 target은 내가 현재 짚은 자식 태그를 가르킴</p>
    </div>
  )
}