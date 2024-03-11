describe("Wordle clone app test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("on first load, a number of elements are rendered", () => {
    // aliases
    cy.get('[data-testid="info-button"]').as("infoButton");
    cy.get('[data-testid="tile"]').as("getTiles");
    cy.get('[data-testid="key"]').as("getKeys");
    // items are rendered
    // navbar, keyboard, tiles, info button
    cy.get('[data-testid="nav-bar"]').should("exist");
    cy.get("@infoButton").should("exist");
    cy.get('[data-testid="keyboard"]').should("exist");
    cy.get('[data-testid="guess"]').should("exist").should("have.length", 6);
    cy.get("@getTiles").should("exist").should("have.length", 30);

    // information
    cy.get('[data-testid="information"]').should("not.exist");
    cy.get("@infoButton").click();
    cy.get('[data-testid="information"]').should("exist");
    cy.get('[data-testid="close-info"]').should("exist").click();

    // answer
    cy.get('[data-testid="answer"]').then(($answer) => {
      // this will log the answer
      console.log($answer.attr("class").split(" ")[1]);
    });

    // entering values
    cy.get("@getTiles").first().should("contain", "");
    cy.get("@getKeys").first().click();
    cy.get("@getTiles").first().should("contain", "Q");

    cy.get("@getTiles").eq(1).should("contain", "");
    cy.get("@getKeys").eq(6).click();
    cy.get("@getTiles").eq(1).should("contain", "U");

    // entering an incorrect answer
    cy.get("@getKeys").eq(19).click();
  });
});
