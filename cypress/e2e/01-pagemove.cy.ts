it("페이지 이동 시나리오", () => {
    // 엔터 기능 입력안해도 자동으로 엔터 쳐서 들어감
    cy.visit("http://localhost:3000/section33/33-06-cypress-e2e-test");

    cy.get("button").click();

    cy.get("div").contains("철수야 놀자~~");
});
