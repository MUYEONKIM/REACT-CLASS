/* eslint-disable */

import { useState } from "react";

// 1. 문자/숫자/불린 (primitive) 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

// 아래와 같이 하면 빨간 줄 나오면서 오류가 뜸!
// getPrimitive(123, 123, true)

// result에 마우스를 가져다 대면 해당 타입에 대해서 설명이 떠 줌
const result = getPrimitive("철수", 123, true);

// 2. any타입 => js와 같은 것, 모든 타입 다 가능
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  // any는 아래처럼 console을  실행 가능
  console.log(arg1 * 1000);
  return [arg3, arg2, arg1];
};

const result2 = getAny("철수", 123, true);

// 3. unknown 타입 => any보다 안정성 높음
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  // any와는 다르게 오류가 남 따라서 타입을 지정 안해주면 오류가 나서 못 실행함
  // console.log(arg1 * 1000);
  if (typeof arg1 === "number") console.log(arg1 * 1000)

  return [arg3, arg2, arg1]
};

const result3 = getUnknown("철수", 123, true);

// 4. generic 타입 => unknown보다 안정성 높음, 자동으로 타입유추를 해서 고정하기 때문에 안전하게 쓸 수 있음
function getGeneric<Mytype1, Mytype2, Mytype3>(arg1: Mytype1, arg2: Mytype2,  arg3: Mytype3): [Mytype3, Mytype2, Mytype1] {
  return [arg3, arg2, arg1];
}
// 안에 넣는 것에 따라 자동으로 type이 지정이 됨
const result4 = getGeneric("철수", 123, true);

// 타입 강제하기
const result5 = getGeneric<string, string, number>("철수", '123', 123);


// generic은 useState에서 명시해준 타입과 같음
const [ count, setCount ] = useState<number>(0)

// 5. generic 타입(축약)
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2,  arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}
// 안에 넣는 것에 따라 자동으로 type이 지정이 됨
const result6 = getGeneric2("철수", 123, true);

// 6. generic 타입 (함수버전)
const getGeneric3 = <T1, T2, T3>(arg1: T1, arg2: T2,  arg3: T3): [T3, T2, T1] => {
  return [arg3, arg2, arg1];
}
// 안에 넣는 것에 따라 자동으로 type이 지정이 됨
const result7 = getGeneric3("철수", 123, true);