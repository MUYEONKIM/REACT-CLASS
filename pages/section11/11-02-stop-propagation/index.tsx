import { useQuery, gql } from "@apollo/client";
import CheckBox from "./checkbox";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS); // 요청이 여기서 바로 날라가버림

  console.log(data?.fetchBoards);

  const mystyle = {
    margin: "10px",
    pading: "0px",
  };

  const qqq1 = (event: React.MouseEvent<HTMLDivElement>) => {
    alert("1번 클릭");
  };

  const qqq4 = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    alert("4번 클릭");
  };

  // map의 특이점 또는 callback함수의 특이점 : 중괄호{} 로 쓰면return 생략 불가능 , () 로 쓰면 return 생략 가능
  return (
    <>
      <div>
        {data?.fetchBoards.map((el: any) => (
          <div id={el.number} onClick={qqq1}>
            <CheckBox></CheckBox>
            <span style={mystyle} onClick={qqq4}>
              {el.number}
            </span>
            <span style={mystyle}>{el.writer}</span>
            <span style={{ margin: "10px" }}>{el.title}</span>
            <span style={{ margin: "10px" }}>{el.contents}</span>
          </div>
        ))}
      </div>
    </>
  );
}
