describe("Wordle clone app test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("on first load, a number of elements are rendered", () => {
    cy.get('[data-testid="info-button"]').as("infoButton");
    // items are rendered
    // navbar, keyboard, tiles, info button
    cy.get('[data-testid="nav-bar"]').should("exist");
    cy.get("@infoButton").should("exist");
  });
});
