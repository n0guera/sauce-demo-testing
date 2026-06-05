describe("Sauce Demo - Carrito", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("10.0 Agregar un producto al carrito", () => {
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");

    cy.get(".inventory_item_name")
      .first()
      .should("have.text", "Sauce Labs Backpack");

    cy.agregarAlCarrito("sauce-labs-backpack");

    cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible");
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");
  });

  it("11.0 Agregar múltiples productos y verificar contador", () => {
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");

    cy.agregarAlCarrito("sauce-labs-backpack");
    cy.agregarAlCarrito("sauce-labs-bike-light");
    cy.agregarAlCarrito("sauce-labs-onesie");

    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "3");
  });

  it("12.0 Eliminar un producto desde la página del carrito", () => {
    cy.agregarAlCarrito("sauce-labs-backpack");
    cy.agregarAlCarrito("sauce-labs-bike-light");

    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    cy.irAlCarrito();

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");
    cy.get('[data-test="item-4-title-link"]').should("not.exist");
  });
});
