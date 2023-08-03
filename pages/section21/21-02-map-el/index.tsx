export default function Map(): JSX.Element {

  // 1.기본방법
  // ["철수", "영희", "훈이"].forEach((el, index) => {
  //   console.log("el " , el)
  //   console.log("index " , index)
  // })

  // 2.매개변수 변경
  // ["철수", "영희", "훈이"].forEach((qwee, eqww) => {
  //   console.log("el " , qwee)
  //   console.log("index " , eqww)
  // })

  // 3. 함수선언식 방법
  ["철수", "영희", "훈이"].forEach(function(qwee, eqww) {
    console.log("el " , qwee)
    console.log("index " , eqww)
  })
  return(
    <></>
  )
}