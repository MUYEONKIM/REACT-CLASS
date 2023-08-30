// 1. 클래스 컴포넌트에서 hoc를 이용해서 체크하는 것
// import { LoginCheck } from "../../../src/components/commons/hocs/withAuth"


// function CustomHooksUseAuthPage(): JSX.Element {
  
  //   return <div>프로필 페이지입니다.</div>
  // }
  
  // export default LoginCheck(CustomHooksUseAuthPage)
  
// 2. 함수형 컴포넌트에서 커스텀훅을 만들어서 체크하는 법
import { useAuth } from "../../../src/components/commons/hooks/useAuth";

export default function CustomHooksUseAuthPage(): JSX.Element {
  useAuth()
  return <div>프로필 페이지입니다.</div>
} 