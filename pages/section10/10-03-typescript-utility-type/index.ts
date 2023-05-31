export interface IProfile {
    name: string
    age: number
    school?: string
    hobby?: string
}

// 1. Partial 타입 : aaa의 타입을 보면 자동으로 ?가 들어가져있음
type aaa = Partial<IProfile>

// 2. Required 타입 : 타입내에서 자동으로 모든 ?를 빼줌
type bbb = Required<IProfile>

// 3. Pick 타입 : 원하는 타입만 뽑아서 쓰고 싶을 때
type ccc = Pick<IProfile, 'name' | 'school'>

// 4. Omit 타입 : 특정 타입을 제외하고 가져올 때
type ddd = Omit<IProfile, 'school'>

// 5. Record 타입 : Iprofile에 있는것이 각가 record에 대한 value로 바뀜
type eee = "철수" | "영희" | "훈이" // Union 타입 (합집합)
let child: eee = "영희"   // 위의 지정한 것만 쓸 수 있음
let child2: string = "복희" // 이건 다 쓸 수 있음

type fff = Record<eee, IProfile>

// 6. keyof 타입: 객체에 있는 키들을 union으로 만드는 법
type ggg = keyof IProfile // key of
let myprofile: ggg = "name"

// 7. type vs interface 의 차이 => interface는 선언 병합 가능
export interface IProfile { // 이렇게 하면 위의 iprofile에 candy가 추가됨
    candy: number
}

// 8. 응용
const test: Partial<IProfile> = {
    age: 23,
    candy: 23
}
