import JestUnitTestPage from "../../pages/section33/33-04-jest-unit-test-event";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

it("버튼을 눌렀을 때, 제대로 작동하는지 테스트하자!!", () => {
    render(<JestUnitTestPage />);

    // 현재 스크린에서 count-button이란 role을 가진 아이를 가져와줘
    // screen.getByRole("count-button")

    // 나 대신에 클릭해주고, 입력해주는 기능 fireEvent
    fireEvent.click(screen.getByRole("count-button"));

    // count라는 role의 text값은 1일거야
    expect(screen.getByRole("count")).toHaveTextContent("1");
});
