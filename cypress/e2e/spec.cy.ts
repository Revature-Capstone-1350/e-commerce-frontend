/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.wait(2000);
    cy.get('.MuiSwitch-input')
      .click();
  });
})