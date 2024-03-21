/// <reference types="cypress" />
export {};
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("checkAndCloseToastMessage", (toastId, message) => {
  cy.get(`[id=${toastId}]`).should("contain", message);
  cy.get(`[id=${toastId}]`).within(() => {
    cy.get("button").click();
    cy.root().should("not.exist");
  });
});

Cypress.Commands.add("pressKey", (key: string, keys: string[]) => {
  cy.get('[data-testid="key"]').eq(keys.indexOf(key)).click();
});

Cypress.Commands.add("expectPlayingAudio", () => {
  cy.get("audio").then(($els) => {
    let audible = false;
    $els.each((_: number, el: HTMLAudioElement) => {
      console.log(el);
      console.log(el.duration, el.paused, el.muted, el.currentTime);
      if (
        el.duration &&
        el.duration > 0 &&
        el.currentTime > 0 &&
        !el.paused &&
        !el.muted
      ) {
        audible = true;
      }
    });
    expect(audible).to.eq(true);
  });
});

Cypress.Commands.add("expectNotPlayingAudio", () => {
  cy.get("audio").then(($els) => {
    let audible = false;
    $els.each((_: number, el: HTMLAudioElement) => {
      console.log(el);
      console.log(el.duration, el.paused, el.muted, el.currentTime);
      if (
        (el.duration && el.duration > 0 && el.currentTime === 0) ||
        el.paused ||
        el.muted
      ) {
        audible = false;
      }
    });
    expect(audible).to.eq(false);
  });
});
