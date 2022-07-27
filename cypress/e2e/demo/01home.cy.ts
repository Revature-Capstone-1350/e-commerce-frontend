/// <reference types="cypress" />

context('Actions', () => {
  it('navigate to home', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(3500);
  });
  it('search for space', () => {
    cy.get('.searchbar').type("space");
    cy.wait(2000);
  });
  it('open dropdown', () => {
    cy.get('[id="demo-simple-select-helper"]')
    .click()
    .get('.MuiList-root')
    .get('.MuiMenuItem-root')
    .contains('Category')
    .click();
  });
  it('open category dropdown', () => {
    cy.get('.MuiSelect-select')
    .contains(/^Category$/)
    .click()
    .get('.MuiMenuItem-root')
    .contains('Cloud')
    .click();
    cy.wait(2000);
  });

  // open first image detail
  it('open first picture', () => {
    cy.get('.detail-product-2').click()
  });

  it('add picture to cart', () => {
    cy.contains('Add to Cart')
    .click()
  });

  it('check cart', () => {
    cy.wait(2000);
    cy.get('.cart-btn').click()
  });

  it('checkout click', () => {
    cy.wait(2000);
    cy.get('button')
    .contains('CHECKOUT NOW')
    .click()
  });
  
  it('type info', () => {
    cy.wait(400);
    cy.get('label')
    .contains('First name')
    .type('Tester');

    cy.wait(400);
    cy.get('label')
    .contains('Last name')
    .type('McTesterson');

    cy.wait(400);
    cy.get('label')
    .contains('Address line 1')
    .type('1st Mctest Lane');
    
    cy.wait(400);
    cy.get('label')
    .contains('Address line 2')
    .type('Apt 5');
        
    cy.wait(400);
    cy.get('label')
    .contains('City')
    .type('TestVille');
        
    cy.wait(400);
    cy.get('label')
    .contains('State')
    .type('District of Test');
            
    cy.wait(400);
    cy.get('label')
    .contains('Zip')
    .type('99999');

    cy.wait(400);
    cy.get('label')
    .contains('Country')
    .type('Testery');

  });

  it('click next', () => {
    cy.wait(300);
    cy.get('button')
    .contains('Next')
    .click();
  });

  it('enter card info', () => {
    cy.wait(300);
    cy.get('label')
    .contains('Name on card')
    .type('Test McTesterson, Jr.');

    cy.wait(300);
    cy.get('label')
    .contains('Card number')
    .type('1234567891011121');

    cy.wait(300);
    cy.get('label')
    .contains('Expiry date')
    .type('07/28');

    cy.wait(300);
    cy.get('label')
    .contains('CVV')
    .type('123');
  });

  it('click next', () => {
    cy.wait(300);
    cy.get('button')
    .contains('Next')
    .click();
  });

  it('Place order', () => {
    cy.wait(3000);
    cy.get('button')
    .contains('Place order')
    .click();
  });
})