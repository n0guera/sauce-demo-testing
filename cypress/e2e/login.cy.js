describe("Sauce Demo - Login", () => {
  it("1.0 Login exitoso con usuario estándar", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get(".app_logo").should("have.text", "Swag Labs");
  });

  it("2.0 Login con contraseña incorrecta", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("12345");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and(
        "contain",
        "Epic sadface: Username and password do not match any user in this service",
      );
  });

  it("3.0 Login con campos vacíos", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Username is required");
  });

  it("4.0 Login con usuario bloqueado", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Sorry, this user has been locked out.");
  });

  it("5.0 Logout desde el menú hamburguesa", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get(".bm-menu").should("be.hidden");
    cy.get("#react-burger-menu-btn").click();
    cy.get(".bm-item.menu-item").should("have.length", 4);
    cy.get(".bm-item.menu-item").eq(2).should("have.text", "Logout");
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.url().should("equal", "https://www.saucedemo.com/");
  });
});
