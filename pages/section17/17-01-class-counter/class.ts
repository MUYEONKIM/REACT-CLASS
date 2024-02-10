// class Date {
//   qqq = 3

//   getFullYear(){

//   }

//   getMonth(){

//   }
// }

// const date = new Date()
// console.log(date.getFullYear())
// console.log(data.getMonth() + 1)

class Monster {
    power = 50;
    attack(): void {
        console.log("공격합니다!");
    }
}

// 상속
class SuperMonster extends Monster {
    run(): void {
        console.log("도망가자!!");
    }

    // 오버라이딩 (덮어쓰기)
    attack(): void {
        // 상속받아와도 다시 선언해주면 위에 것이 삭제됨
        console.log("슈퍼몬스터 필살기");
    }
}
const monster = new Monster();
monster.attach(); // 공격합니다!

const mymonster = new SuperMonster();
mymonster.attack(); // 슈퍼몬스터 필살기
