declare namespace Cypress {
  interface Chainable {
    checkToastMessage(toastId, message): Chainable<void>;
  }
}
