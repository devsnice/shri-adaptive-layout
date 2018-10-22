/// <reference types="Cypress" />

const applicationDomain = "http://localhost:3000";

context("Main page", () => {
  beforeEach(() => {
    cy.visit(applicationDomain);
  });

  it("page available, has correct title", () => {
    return cy
      .get(".dashboard-title")
      .first()
      .then(element => expect(element[0].innerText).be.eq("Лента событий"));
  });
});
