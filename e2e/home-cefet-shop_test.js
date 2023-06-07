const { assert } = require("console");

Feature("Home page com 6 produtos mais vendidos");

Scenario("Pesquisar por home do cefet shop", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
});

Scenario("Elementos de navegação presentes", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.seeElement("#link-login");
  I.see("CEFET Shop", { css: "span.mdl-layout-title" });
  I.seeElement(
    ".mdl-button.mdl-js-button.mdl-button--icon.mdl-button--colored"
  );
});

Scenario(
  "Container de produtos mais vendidos exibido na tela",
  async ({ I }) => {
    I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
    I.seeElement("main.mdl-layout__content");
    let qtdDivsProduto = await I.grabNumberOfVisibleElements(
      ".produtos.mdl-grid .mdl-card.demo-card-square.mdl-shadow--2dp.produto.mdl-cell"
    );
    if (qtdDivsProduto !== 6) {
      I.fail("Não exibe os 6 mais vendidos.");
    }
  }
);
