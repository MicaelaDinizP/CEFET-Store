const { assert } = require("console");

Feature("Home page com 6 produtos mais vendidos");

Scenario("Pesquisar por home do cefet shop", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
});

Scenario("Elementos de navegação presentes", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.seeElement("#link-login");
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
    I.seeElement(
      ".mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.mdl-button--accent.botao-padrao"
    );
  }
);

Scenario("Redirect correto dos botões e links da página", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.click(
    ".mdl-button.mdl-js-button.mdl-button--raised.mdl-js-ripple-effect.mdl-button--accent.botao-padrao#detalhes-produto_2"
  );
  I.seeInCurrentUrl(
    "http://localhost/2023-1-pis-g3/app/src/produto/produto.html?id=2"
  );
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.click({
    xpath:
      "//a[@href='./produtos/produtos.html' and normalize-space()='VER MAIS']"
  });
  I.seeInCurrentUrl(
    "http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html"
  );
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.click("#link-login");
  I.seeInCurrentUrl(
    "http://localhost/2023-1-pis-g3/app/src/autenticacao/login.html"
  );
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.click(".mdl-button.mdl-js-button.mdl-button--icon.mdl-button--colored");
  I.seeInCurrentUrl(
    "http://localhost/2023-1-pis-g3/app/src/carrinho/carrinho.html"
  );
});

Scenario("Exibição dos produtos correta", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.see("5% OFF", ".taxa-desconto");
  I.see("Boné Sistemas de Informação");
  I.see("R$ 99.99", ".preco-original");
  I.see("R$ 94.99", ".preco-desconto");
  I.see("Calça Sistemas de Informação");
  I.see("R$ 323.13", ".preco-produto");
  I.dontSee("R$ 323.13", ".preco-original");
});

Scenario("Login faz aparecer o dropdown", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.click("#link-login");
  I.fillField("#usuario", "123456");
  I.fillField("#senha", "12345");
  I.click("#botao-login");
  I.waitForNavigation();
  I.seeInCurrentUrl(
    "http://localhost/2023-1-pis-g3/app/src/carrinho/carrinho.html"
  );
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.seeElement("#user-dropdown");
  I.dontSee("#link-login");
  // I.click("#user-dropdown");
  // I.click(
  //   'li a[href="http://localhost/2023-1-pis-g3/app/src/usuario/usuario.html"]'
  // );
  //I.waitForNavigation();
  // I.seeInCurrentUrl(
  //   "http://localhost/2023-1-pis-g3/app/src/usuario/usuario.html"
  // );
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/");
  I.click("#user-dropdown");
  I.click("li a#logout-link");
  I.seeElement("#link-login");
});
