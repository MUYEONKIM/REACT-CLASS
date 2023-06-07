import React, { useState } from 'react';
import { Rate } from 'antd';


// 나눠서 쓰는 법
// const App: React.FC = () => {
//   const [value, setValue] = useState(3);

//   return (
//     <span>
//       <Rate onChange={setValue} value={value} />
//     </span>
//   );
// };

// export default App;

// 한 줄로 쓰는 법
export default function App(): JSX.Element { // 타입추론이 가능하겠다 싶으면 굳이 명시 안해도 알아서 추론됨
    const [value, setValue] = useState(3);
    console.log(value)

    
    // 1단계 방식 타입을 모르겠으면 함수 위에 커서를 올려서 함수추론을 통해 무엇인지 알아봐라
    // const onChangeStar = (value: number): void => {
    //     setValue(value)
    // }

    // 2단계 방식
    // const onChangeStar = (value: number) => setValue(value);

    // 3단계 방식
    // const onChangeStar = (value: number) => setValue(value); 여기서 말고 밑에서 바로 선언


    return (
        // <Rate onChange={onChangeStar} value={value} /> 1단계 방식
        // <Rate onChange={onChangeStar} value={value} /> 2단계 방식
        // <Rate onChange={(value) => setValue(value)} value={value} /> 3단계 방식
        // <Rate onChange={setValue} value={value} /> // 4단계 방식 value란 값이 인자와 밑에 똑같이 인자로 들어가 있으면 생략 또 가능
        <Rate onChange={setValue} value={value} />
    );
};
  