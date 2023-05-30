export default function TypeScriptPage() {
    // typescript 에는 타입추론이 존재
    // 그래서 이미 처음에 담길떄 string으로 담겨서 자동으로 지정해버림
    let aaa = "안녕하세요"
    aaa = "ㅁㄴ"

    // 타입명시
    let abc : string = '321'
    abc = '123'

    // 타입 명시가 필요한 상황
    let ccc: number | string = 1000
    ccc = "1000원"

    // 숫자 타입
    let ddd: number = 10
    ddd = 123

    //boolean 타입
    let eee: boolean = true
    eee = false
    // 가끔 "false" 이렇게 받아올 때가 있음 (주의!)

    //배열 타입
    let fff: number[] = [1,2,3] // 문자열은 못들어옴
    fff = [2,3,4]

    let ggg: string[] = ['a','b','c'] // 숫자는 못 들어옴
    ggg = ['q','w','e']

    // 타입추론
    let hhh = ["철수", "영희", "훈이", 10]
    
    // 객체타입
    interface IProfile { // typescript는 ,가 없음
        name: string
        age: number | string
        school: string
        hobby?: string // 물음표는 있어도 되고 없어도 되고의 뜻, 있으면 string
    }
    const profile: IProfile = {
        name: "철수",
        age : 8,
        school : "다람쥐유치원"
    }
    profile.name = "훈이"
    profile.age = "9살"
    profile.hobby = "수영"


    //함수 타입
    // 마지막에 :string은 return의 타입이 됨
    function add(price1: number, price2: number, unit: string): string { 
        return price1+price2+unit
    }
    const result = add(1000,2000,"원") // 결과의 리턴 타입도 예측 가능!!


    const add2 = (price1: number, price2: number, unit: string): string => { 
        return price1+price2+unit
    }
    const result2 = add(1000,2000,"원") // 결과의 리턴 타입도 예측 가능!!

    // any 타입 js랑 똑같음, 모든것이 다 들어갈 수 있는것
    let qqq: any = "철수"
    qqq = true
    return <></>
}