// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (user, pass) => {
  cy.visit("https://www.saucedemo.com/");
  cy.get('[data-test="username"]').type(user);
  cy.get('[data-test="password"]').type(pass);
  cy.get('[data-test="login-button"]').click();
  cy.url().should("include", "/inventory.html");
});

Cypress.Commands.add("agregarAlCarrito", (producto) => {
  cy.get(`[data-test="add-to-cart-${producto}"]`).click();
});

Cypress.Commands.add("irAlCarrito", () => {
  cy.get(".shopping_cart_link").click();
  cy.url().should("include", "/cart.html");
});

Cypress.Commands.add("confirmarPedido", () => {
  cy.get('[data-test="finish"]').click();
  cy.get(".complete-header").should("have.text", "Thank you for your order!");
});
