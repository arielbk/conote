/// <reference types="cypress" />

describe('conote - welcome page', () => {
  it('actually works', () => {
    cy.visit('/');
    cy.contains('conote');
  })
});
