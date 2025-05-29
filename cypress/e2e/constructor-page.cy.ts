import { SELECTORS } from '../support/constants';

describe('Checking application availability', () => {
  it('The service should be available at baseUrl', () => {
    cy.visit('/');
  });
});

beforeEach(() => {
  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');

  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients'
  }).as('getIngredients');

  cy.intercept('GET', 'api/auth/user', {
    fixture: 'user'
  }).as('getUser');

  cy.visit('/');
  cy.wait('@getIngredients');
  cy.wait('@getUser');
});

afterEach('Clear localStorage and cookies', () => {
  cy.clearAllLocalStorage();
  cy.clearAllCookies();
});

describe('ConstructorPage functionality test', () => {
  it('Should add ingredients to constructor', () => {
    cy.get(SELECTORS.bunClearUp).should('exist');
    cy.get(SELECTORS.bunClearDown).should('exist');
    cy.get(SELECTORS.ingredientItem).should('not.exist');

    cy.addBunAndIngredient();
    cy.checkConstructorStateWithIngredients();
  });

  it('Should open and close ingredient modal via overlay', () => {
    cy.get(SELECTORS.ingredientModal).should('not.exist');
    cy.openIngredientModal(SELECTORS.bun0, 'Краторная булка N-200i');
    cy.get(SELECTORS.ingredientModalOverlay).should('exist');
    cy.closeModalByOverlay();
    cy.get(SELECTORS.ingredientModalOverlay).should('not.exist');
  });

  it('Should open and close ingredient modal via close button', () => {
    cy.get(SELECTORS.ingredientModal).should('not.exist');
    cy.openIngredientModal(SELECTORS.bun0, 'Краторная булка N-200i');
    cy.closeModalByButton();
  });

  it('Should complete full product order cycle', () => {
    cy.get(SELECTORS.bunClearUp).should('exist');
    cy.get(SELECTORS.bunClearDown).should('exist');
    cy.get(SELECTORS.ingredientItem).should('not.exist');

    cy.addBunAndIngredient();

    cy.intercept('POST', 'api/orders', {
      fixture: 'newOrder'
    }).as('newOrder');

    cy.get(SELECTORS.newOrderBtn).click();
    cy.wait('@newOrder');

    cy.fixture('newOrder').then((newOrder) => {
      cy.get(SELECTORS.newOrderNumber).contains(newOrder.order.number);
    });

    cy.get(SELECTORS.bunClearUp).should('exist');
    cy.get(SELECTORS.bunClearDown).should('exist');
    cy.get(SELECTORS.ingredientItem).should('not.exist');

    cy.closeModalByButton();
  });
});
