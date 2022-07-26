/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {

  })
  it('navigate to register', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.register-btn').click();
  });
  it('type first name', () => {
    cy.get('[id="firstName"]').type("Hello");
  });
  it('type last name', () => {
    cy.get('[id="lastName"]').type("Everyone");
  });
  it('type email', () => {
    cy.get('[id="email"]').type("good.luck.in.interviews@whenever.they.actually.happen");
  });
  it('type password', () => {
    cy.get('[id="password"]').type("12A11111");
  });
  it('click register', () => {
    cy.get('.MuiButton-root').contains('Sign Up').click();
  });
})