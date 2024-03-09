import getRandomArbitrary from "../../src/utils/utils";

describe("Wordle clone app test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("on first load, a number of elements are rendered", () => {
    // aliases
    cy.get('[data-testid="info-button"]').as("infoButton");

    // items are rendered
    // navbar, keyboard, tiles, info button
    cy.get('[data-testid="nav-bar"]').should("exist");
    cy.get("@infoButton").should("exist");
    cy.get('[data-testid="keyboard"]').should("exist");
    cy.get('[data-testid="guess"]').should("exist").should("have.length", 6);
    cy.get('[data-testid="tile"]').should("exist").should("have.length", 30);

    // information
    cy.get('[data-testid="information"]').should("not.exist");
    cy.get("@infoButton").click();
    cy.get('[data-testid="information"]').should("exist");
    cy.get('[data-testid="close-info"]').should("exist").click();
  });
});
