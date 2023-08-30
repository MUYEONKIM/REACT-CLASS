import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../../commons/stores";

interface IUseMoveToPageReturn {
  onClickMoveToPage: (path: string) => () => void
  visitedPage: string
}

export const useMoveToPage = (): IUseMoveToPageReturn => {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);


  const onClickMoveToPage = (path: string) => () => {
    setVisitedPage(path); // 로그인 페이지일때는 set하지 않도록 조건 추가
    localStorage.setItem("visitedPage", path); // 아니면 localstorage에 저장하기
    void router.push(path);
  };

  return {
    onClickMoveToPage,
    visitedPage
  };
};