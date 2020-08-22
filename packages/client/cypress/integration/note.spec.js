/// <reference types="cypress" />

describe('conote - note page', () => {
  describe('new note', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get(`[data-cy='create-button']`).click();
    });

    it('renders the note input', () => {
      cy.get(`[data-cy='note-input']`);
    });

    it('persists the note data', () => {
      cy.get(`[data-cy='note-input']`).type('Note input');
      cy.reload();
      cy.contains('Note input');
    });

    // cypress is still working on this https://github.com/cypress-io/cypress/issues/2386
    // it('copies the note', () => {
    //   cy.get(`[data-cy='note-input']`).type('Note to copy');
    //   cy.get(`[data-cy='copy-note']`).click();
    //   cy.get(`[data-cy='note-input']`).clear();
    //   cy.get(`[data-cy='note-input']`).should('be.empty');
    //   cy.get(`[data-cy='note-input']`).type('{meta}v');
    //   cy.contains('Note to copy');
    // });
  });
  
  describe('existing note', () => {
    beforeEach(() => {
      const randomCode = Math.floor(Math.random() * 10000);
      cy.visit(`/note/${randomCode}`);
    });

    it('renders the note input', () => {
      cy.get(`[data-cy='note-input']`);
    });

    it('persists the note data', () => {
      cy.get(`[data-cy='note-input']`).type('Note input');
      cy.reload();
      cy.contains('Note input');
    });
  });
});

describe('conote - note page - mobile view', () => {
  describe('new note', () => {
    beforeEach(() => {
      cy.viewport('iphone-5');
      cy.visit('/');
      cy.get(`[data-cy='create-button']`).click();
    });

    it('renders the note input', () => {
      cy.get(`[data-cy='note-input']`);
    });

    it('persists the note data', () => {
      cy.get(`[data-cy='note-input']`).type('Note input');
      cy.reload();
      cy.contains('Note input');
    });

    // cypress is still working on this https://github.com/cypress-io/cypress/issues/2386
    // it('copies the note', () => {
    //   cy.get(`[data-cy='note-input']`).type('Note to copy');
    //   cy.get(`[data-cy='copy-note']`).click();
    //   cy.get(`[data-cy='note-input']`).clear();
    //   cy.get(`[data-cy='note-input']`).should('be.empty');
    //   cy.get(`[data-cy='note-input']`).type('{meta}v');
    //   cy.contains('Note to copy');
    // });
  });
  
  describe('existing note', () => {
    beforeEach(() => {
      const randomCode = Math.floor(Math.random() * 10000);
      cy.visit(`/note/${randomCode}`);
    });

    it('renders the note input', () => {
      cy.get(`[data-cy='note-input']`);
    });

    it('persists the note data', () => {
      cy.get(`[data-cy='note-input']`).type('Note input');
      cy.reload();
      cy.contains('Note input');
    });
  });
});