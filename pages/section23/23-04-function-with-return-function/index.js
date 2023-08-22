// 1. 함수를 return하는 함수
// function aaa() {
//   const apple = 10;

//   return function bbb() {
//     const banana = 20;
//     console.log(banana)
//     console.log(apple)
//   };
// }

// aaa()();

// 2. 함수를 return하는 함수 - 인자
// function aaa(apple) {
//   return function(banana) {
//       console.log(banana);
//       console.log(apple);
//   };
// }

// aaa(100)(500)

// 3. 함수를 return하는 함수 -화살표함수 더 축약시키기
// const aaa = (apple) => (banana) => {
//     console.log(banana);
//     console.log(apple);
// };

// aaa(50)(60)

// 4. 만약 인자가 많아진다면?
const aaa = (apple) => (banana) => (tomato) => (orange) => {
  console.log(banana);
  console.log(apple);
  console.log(tomato);
  console.log(orange);
};

aaa(50)(60)(20)(30)