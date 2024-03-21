import { initialKeyboardState } from "../../src/state/state";

const keys = initialKeyboardState.map((item) => {
  return item.key;
});

describe("Wordle clone app test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("on first load, a number of elements are rendered", () => {
    // a known valid but incorrect answer
    const wrongAnswer = "aches".split("");

    // aliases
    cy.get('[data-testid="info-button"]').as("infoButton");
    cy.get('[data-testid="tile"]').as("getTiles");
    cy.get('[data-testid="key"]').as("getKeys");

    // items are rendered
    // navbar, keyboard, tiles, info button
    cy.get('[data-testid="start-playing-prompt"]').should("exist");
    cy.get('[data-testid="nav-bar"]').should("exist");
    cy.get("@infoButton").should("exist");
    cy.get('[data-testid="keyboard"]').should("exist");

    // there are 6 guesses
    cy.get('[data-testid="guess"]').should("exist").should("have.length", 6);

    // a guess has 5 tiles
    cy.get('[data-testid="guess"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="tile"]').should("have.length", 5);
      });

    // there are 30 tiles in total
    cy.get("@getTiles").should("exist").should("have.length", 30);

    // information
    cy.get('[data-testid="information"]').should("not.exist");
    cy.get("@infoButton").click();
    cy.get('[data-testid="information"]').should("exist");
    cy.get('[data-testid="close-info"]').should("exist").click();

    // all alphabetic keys work as expected
    keys.forEach((key) => {
      if (key !== "Enter" && key !== "Backspace") {
        cy.pressKey(key, keys);
        cy.get('[data-testid="tile"]')
          .eq(0)
          .should("contain", key.toLocaleUpperCase());
        cy.pressKey("Backspace", keys);
      }
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
    cy.get('[data-testid="game-over"]').should("not.exist");
    let i = 0;
    while (i < 5) {
      wrongAnswer.forEach((item: string) => {
        cy.pressKey(item, keys);
      });
      cy.pressKey("Enter", keys);
      i++;
    }
    cy.get('[data-testid="game-over"]').should("exist");
    cy.get('[data-testid="answer"]').then(($answer) => {
      cy.checkAndCloseToastMessage(
        "lose",
        `The Answer Was ${$answer.attr("class")!.split(" ")[1].toUpperCase()}`
      );
    });

    // start a new game
    cy.get('[data-testid="new-game"]').should("exist").click();
    cy.get('[data-testid="start-playing-prompt"]').should("exist");

    cy.get("@getTiles").then(($tiles) => {
      for (let i = 0; i < $tiles.length; i++) {
        cy.wrap($tiles).eq(i).should("contain", "");
      }
    });
    // input the correct answer - happy path
    cy.get('[data-testid="game-over"]').should("not.exist");
    cy.get('[data-testid="answer"]').then(($answer) => {
      const answer = $answer.attr("class")!.split(" ")[1];
      answer.split("").forEach((letter) => {
        cy.pressKey(letter, keys);
      });
      cy.pressKey("Enter", keys);
    });
    cy.get('[data-testid="game-over"]').should("exist");
    cy.get('[data-testid="close-button"]').should("exist").click();
    cy.get('[data-testid="new-game-app"]').should("exist").click();
    cy.get('[data-testid="start-playing-prompt"]').should("exist");
    cy.get('[data-testid="game-over"]').should("not.exist");
  });
  it("most keys produce no output to the UI or do not have an effect on the application", () => {
    // first guess tile contains no input
    cy.get('[data-testid="tile"]').should("exist").eq(0).should("contain", "");
    // type non-alpha keys into app
    cy.get("#root").type("1234567890!$%^&*()_+[]{}'#@~;:,.<>/?|\\\"");
    cy.get('[data-testid="tile"]').eq(0).should("contain", "");
    // test alpha
    cy.get("#root").type("A");
    cy.get('[data-testid="tile"]').eq(0).should("contain", "A");
  });
  it.only("audio plays at appropriate time", () => {
    // mute defaults to off, expect audio plays
    cy.get('[data-testid="info-button"]').click().wait(300);
    cy.expectPlayingAudio();
    cy.get('[data-testid="close-info"]').should("exist").click();

    // mute audio, expect audio doesn't play
    cy.get('[data-testid="info-audio"]').should("not.exist");
    cy.get('[data-testid="mute-button"]').should("exist").click();
    cy.get('[data-testid="info-button"]').click().wait(300);
    cy.expectNotPlayingAudio();
  });
});
