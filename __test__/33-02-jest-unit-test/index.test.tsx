import JestUnitTestPage from "../../pages/section33/33-02-jest-unit-test";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("내가 원하는대로 그려지는지 테스트하기", () => {
    render(<JestUnitTestPage />);

    const result = screen.getByText("철수는 13살 입니다.");
    expect(result).toBeInTheDocument();

    const result2 = screen.getByText("취미 :");
    expect(result2).toBeInTheDocument();

    const result3 = screen.getByText("철수랑 놀러가기");
    expect(result3).toBeInTheDocument();
});
