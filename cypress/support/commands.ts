/// <reference types="cypress" />
Cypress.Commands.add('addBunAndIngredient', () => {
  cy.get('[data-cy="bun_0"] > .common_button').should('exist').click();
  cy.get(':nth-child(4) > [data-cy="ingredient_0"] > .common_button')
    .should('exist')
    .click();
});

Cypress.Commands.add('checkConstructorStateWithIngredients', () => {
  cy.get('[data-cy="bun_constructor_item_up"]').should('exist');
  cy.get('[data-cy="bun_constructor_item_down"]').should('exist');
  cy.get('[data-cy="ingredient_constructor_item"]').should('exist');
});

Cypress.Commands.add(
  'openIngredientModal',
  (ingredientSelector: string, expectedName: string) => {
    cy.get(ingredientSelector).click();
    cy.get('[data-cy="modal_ingredient"]').should('be.visible');
    cy.get('[data-cy="ingredient_modal"] > .text_type_main-medium').should(
      'contain.text',
      expectedName
    );
  }
);

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('[data-cy="modal_overlay"]').click({ force: true });
  cy.get('[data-cy="modal_ingredient"]').should('not.exist');
});

Cypress.Commands.add('closeModalByButton', () => {
  cy.get('[data-cy="btn_close_modal"]').click();
  cy.get('[data-cy="modal_ingredient"]').should('not.exist');
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      addBunAndIngredient(): Chainable;

      checkConstructorStateWithIngredients(): Chainable;

      openIngredientModal(selector: string, expectedName: string): Chainable;

      closeModalByOverlay(): Chainable;

      closeModalByButton(): Chainable;
    }
  }
}
