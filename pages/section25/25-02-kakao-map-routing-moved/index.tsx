import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
}

export default function KakaoMapPage(): JSX.Element {
  useEffect(() => {
    const script = document.createElement("script") // 이렇게 하면 <script></script>가 생기는 것
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1cb22d0e18abc571542487e53c65c3b2"
    document.head.appendChild(script)
    // <head>
    //   <script />
    // </head>
    // 이렇게 된다는 뜻
    script.onload = () => {
      window.kakao.maps.load(function() {
        const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        const options = { // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(35.524317, 129.335043), // 지도의 중심좌표.
          level: 3 // 지도의 레벨(확대, 축소 정도)
        };
    
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // 마커가 표시될 위치입니다 
        const markerPosition  = new window.kakao.maps.LatLng(35.524317, 129.335043); 

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        marker.setMap(map);
      })
    }
  }, []);

  return (
    <>
      <div id="map" style={{width: '500px', height: '400px'}}></div>
    </>    
  );
}