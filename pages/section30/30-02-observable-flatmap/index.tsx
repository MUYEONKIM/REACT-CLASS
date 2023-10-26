// import { Observable } from "@apollo/client";
import { from } from "zen-observable";

export default function ObservableFlatmapPage(): JSX.Element {
    const onClickButton = (): void => {
        // new Promise((resolve, reject) => {})
        // new Observable((Observer))

        // 옵저버블을 만들어 주는것 = from , Promise를 옵저버블로 변경해주는 것 = fromPromise
        from(["1번쿼리", "2번쿼리", "3번쿼리"]) // fromPromise라고 가정
            .flatMap((el) =>
                from([`${el}결과에 qqq적용`, `${el} 결과에 zzz 적용`])
            )
            .subscribe((el) => {
                console.log(el);
            });
    };

    return <button onClick={onClickButton}>클릭</button>;
}
