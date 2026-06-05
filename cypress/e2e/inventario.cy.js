const validarTodosOrdenadosMenorAMayor = () => {
  cy.get('[data-test="product-sort-container"]').select("lohi");
  cy.get('[data-test="product-sort-container"]').should("have.value", "lohi");

  cy.get(".inventory_item_price").then(($precios) => {
    // Convertimos "$7.99", "$9.99"... a números [7.99, 9.99...]
    const precios = [...$precios].map((el) =>
      parseFloat(el.textContent.replace("$", "")),
    );

    cy.log("Precios: " + precios.join(" | "));

    // Verificamos que cada precio sea menor o igual al siguiente
    for (let i = 0; i < precios.length - 1; i++) {
      expect(precios[i]).to.be.lte(precios[i + 1]);
    }
  });
};

const validarAltDeImagenes = () => {
  // Recorremos cada producto con .each()
  cy.get(".inventory_item").each(($item) => {
    // Dentro de cada producto obtenemos el título y la imagen
    const titulo = $item.find(".inventory_item_name").text();
    const alt = $item.find("img").attr("alt");

    // Verificamos que el alt de la imagen coincida con el título
    expect(alt, `La imagen de "${titulo}" tiene alt incorrecto`).to.equal(
      titulo,
    );
  });
};

describe("Sauce Demo - Inventario", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
  });

  it("6.0 Verificar cantidad de productos en inventario", () => {
    cy.get('[data-test="inventory-item-name"]').should("have.length", 6);
  });

  it("8.0 Ordenar productos por precio (menor a mayor)", () => {
    validarTodosOrdenadosMenorAMayor();
  });

  it("El alt de cada imagen coincide con el título del producto", () => {
    validarAltDeImagenes();
  });
});
