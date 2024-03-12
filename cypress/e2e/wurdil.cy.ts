import { initialKeyboardState } from "../../src/state/state";

const keys = initialKeyboardState.map((item) => {
  return item.key;
});

console.log(keys.indexOf("a"));

describe("Wordle clone app test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("on first load, a number of elements are rendered", () => {
    const wrongAnswer = "aches".split("");
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
    cy.get("@infoButton").click().wait(700);
    cy.get('[data-testid="information"]').should("exist");
    cy.get('[data-testid="close-info"]').should("exist").click();

    // answer
    cy.get('[data-testid="answer"]').then(($answer) => {
      // this will log the answer

      console.log($answer.attr("class")!.split(" ")[1]);
    });

    // entering values
    cy.get("@getTiles").first().should("contain", "");
    cy.get("@getKeys").first().click();
    cy.get("@getTiles").first().should("contain", "Q");

    cy.get("@getTiles").eq(1).should("contain", "");
    cy.get("@getKeys").eq(6).click();
    cy.get("@getTiles").eq(1).should("contain", "U");

    // entering a partial answer
    cy.get('[data-testid="toast-message"]').should("not.exist");

    cy.get("@getKeys").eq(19).click();
    cy.checkAndCloseToastMessage("invalid", "not a valid answer!");

    // deleting
    cy.get("@getTiles").eq(1).should("contain", "U");
    cy.get("@getKeys").eq(27).click();
    cy.get("@getTiles").eq(1).should("contain", "");
    cy.get("@getTiles").eq(0).should("contain", "Q");
    cy.get("@getKeys").eq(27).click();
    cy.get("@getTiles").eq(0).should("contain", "");

    // empty answer
    cy.get("@getKeys").eq(19).click();
    cy.checkAndCloseToastMessage("invalid", "not a valid answer!");

    // complete answer but not a word
    for (let i = 0; i < 5; i++) {
      cy.get("@getKeys").eq(6).click();
    }
    cy.get("@getKeys").eq(19).click();
    cy.checkAndCloseToastMessage("invalid", "not a valid answer!");

    // delete all
    cy.pressKey("Backspace", keys);
    cy.pressKey("Backspace", keys);
    cy.pressKey("Backspace", keys);
    cy.pressKey("Backspace", keys);
    cy.pressKey("Backspace", keys);

    // answer is a word but not correct - we use "aches" which is valid but
    // can never be an answer (it's plural)
    wrongAnswer.forEach((item: string) => {
      cy.pressKey(item, keys);
    });
    cy.pressKey("Enter", keys);

    // attempt to delete a letter of our submitted and accepted answer
    cy.pressKey("Backspace", keys);
    cy.get("@getTiles").eq(4).should("contain", "S");

    // lose the game by inputting the incorrect answer 6 times
    let i = 0;
    while (i < 5) {
      wrongAnswer.forEach((item: string) => {
        cy.pressKey(item, keys);
      });
      cy.pressKey("Enter", keys);
      i++;
    }
  });
});
