import JestUnitTestPage from "../../pages/section33/33-03-jest-unit-test";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("기존이랑 바뀐게 없는지 비교해보자!! - 스냅샷 테스트", () => {
    // const result = screen.getByText("철수는 13살 입니다.");
    // expect(result).toBeInTheDocument();

    // const result2 = screen.getByText("취미 :");
    // expect(result2).toBeInTheDocument();

    // const result3 = screen.getByText("철수랑 놀러가기");
    // expect(result3).toBeInTheDocument();

    const result = render(<JestUnitTestPage />);
    expect(result.container).toMatchSnapshot();
});
