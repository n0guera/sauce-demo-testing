describe("Checkout - Sauce Demo", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
    cy.agregarBackpackAlCarrito();
  });

  it("13.0 Completar checkout con datos válidos", () => {
    cy.completarCheckout("Juan", "Pérez", "5000");

    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="checkout-complete-container"]').should(
      "contain",
      "Thank you for your order!",
    );
  });

  it("14.0 Mostrar error si faltan datos obligatorios", () => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should(
      "contain",
      "Error: First Name is required",
    );
  });
});
