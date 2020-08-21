/// <reference types="cypress" />

describe('conote - welcome page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the title header', () => {
    cy.contains('conote');
  });

  it('renders a functional create note button', () => {
    cy.get(`[data-cy='create-button']`).click();
    cy.url().should('contain', '/note/');
    cy.get(`[data-cy='note-input']`);
  });
  
  it('renders a functional code input', () => {
    cy.get(`[data-cy='code-input']`).type('123456');
    cy.get(`[data-cy='code-form']`).submit();
    cy.url().should('contain', '/note/123456');
    cy.get(`[data-cy='note-input']`);
  });

  it('renders an arielbk', () => {
    cy.contains('arielbk')
  });
});

describe('conote - welcome page - mobile view', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('iphone-5');
  });

  it('renders the title header', () => {
    cy.contains('conote');
  });

  it('renders a functional create note button', () => {
    cy.get(`[data-cy='create-button']`).click();
    cy.url().should('contain', '/note/');
    cy.get(`[data-cy='note-input']`);
  });
  
  it('renders a functional code input', () => {
    cy.get(`[data-cy='code-input']`).type('123456');
    cy.get(`[data-cy='code-form']`).submit();
    cy.url().should('contain', '/note/123456');
    cy.get(`[data-cy='note-input']`);
  });

  it('renders an arielbk', () => {
    cy.contains('arielbk')
  });
});
