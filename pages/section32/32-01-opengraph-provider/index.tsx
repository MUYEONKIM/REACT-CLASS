// 제공자일때 => 네이버, 다음, 쿠팡
import Head from "next/head";

export default function OpenGraphProvider(): JSX.Element {
    return (
        <>
            <Head>
                <meta property="og:title" content="중고마켓" />
                <meta
                    property="og:content"
                    content="나의 중고마켓에 오신 것을 환영합니다!"
                />
                <meta
                    property="og:image"
                    content="https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"
                />
            </Head>
            <div>중고마켓에 오신 것을 환영합니다!(여기는 Body입니다.)</div>
        </>
    );
}
