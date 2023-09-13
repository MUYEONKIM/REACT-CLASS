declare const window: typeof globalThis & {
  IMP: any;
}

export default function PaymentPage(): JSX.Element {
  const onClickPayment = (): void => {
    const IMP = window.IMP;
    IMP.init('imp06553467');

    IMP.request_pay({ // param
      pg: "kakaopay",
      pay_method: "card",
      // merchant_uid: "ORD20180131-0000011", 주문 번호는 겹치면 안되서 이렇게 할 경우 알아서 랜덤이 됨
      name: "키보드",
      amount: 10,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
      m_redirect_url: "http://localhost:3000/section28/28-01-payment", // 모바일에서는 페이지가 이동되기 때문에 결제 이후 어디로 다시 돌아올지 적어 줌
    }, (rsp: any) => { // callback
      if (rsp.success === true) {
        // 결제 성공 시 로직
        // 보통 백엔드에 결제관련 데이터 넘겨주기 => 즉, 뮤테이션 실행
        // gql 백엔드 강의 사이트에
        // createPointTransactionOfLoading 으로 포인트 충전식으로 하기
        // createPointTransactionOfBuyingAndSelling 으로 구매 판매
          console.log(rsp)
      } else {
        // 결제 실패 시 로직
        console.log("실패")
      }
    });
  };

  return (
    <>
      <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  )
}