import Link from "next/link";
import { useRouter } from "next/router";

export default function KakaoMapPage(): JSX.Element {
  const router = useRouter()
  
  const onClickMove = (): void => {
    void router.push('/section25/25-02-kakao-map-routing-moved')
  }
  return (
    <>
      <button onClick={onClickMove}>페이지 이동하기</button>

      {/* 매 페이지를 새로 다운로드 받으므로 SPA를 활용 못함 */}
      <a href="/section25/25-02-kakao-map-routing-moved">페이지 이동하기</a>

      {/* SPA를 활용하려면 Link 태그나, router를 사용해야 함 
        next에서 제공하는 a태그 이므로, SPA 활용 가능 + <a> 태그를 써서
        SEO성능 향상됨 */}
      <Link href='/section25/25-02-kakao-map-routing-moved'>
        <a>페이지 이동하기2</a>
      </Link>
      <p>페이지 이동하기 1 , 2 눌러보면 딱 봐도 속도차이가 남</p>
      {/* 시멘틱 태그 점수 - 다 점수가 다름 */}
      <h1>요리</h1>
      <div>요리</div>
      <section>요리</section>
    </>
  );
}