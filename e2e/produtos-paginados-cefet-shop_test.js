const { assert } = require("codeceptjs");
Feature("Página com todos dos produtos paginados");

Scenario("Pesquisar ver mais", async ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html");
});

Scenario("Exibe 10 produtos na primeira página", async ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html");
  I.seeElement("#card1");
  I.seeElement("#card2");
  I.seeElement("#card3");
  I.seeElement("#card4");
  I.seeElement("#card5");
  I.seeElement("#card6");
  I.seeElement("#card7");
  I.seeElement("#card8");
  I.seeElement("#card9");
  I.seeElement("#card10");
});

Scenario("Verificar elementos de paginação", async ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html");
  I.seeElement(".paginacao");
});

Scenario("Elementos de navegação presentes", ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html");
  I.seeElement("#link-login");
  I.seeElement(
    ".mdl-button.mdl-js-button.mdl-button--icon.mdl-button--colored"
  );
});

Scenario(
  "Verificar se acessa a página 2 e volta para a primeira corretamente",
  async ({ I }) => {
    I.amOnPage("http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html");
    I.seeElement("button.botao-padrao");
    I.click(locate("button.botao-padrao").withText("2"));
    //I.waitForNavigation();
    I.seeInCurrentUrl(
      "http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html"
    );
    I.see("Camiseta Turismo");
    I.dontSee("Boné Turismo");
    I.dontSee("Blusa de Frio Física");
    I.click(locate("button.botao-padrao").withText("1"));
    I.see("Boné Turismo");
  }
);
Scenario("Verificar se possui todos botões de página", async ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/produtos/produtos.html");
  I.seeElement("button.botao-padrao");
  I.seeElement(locate("button.botao-padrao").withText("1"));
  I.seeElement(locate("button.botao-padrao").withText("2"));
  I.seeElement(locate("button.botao-padrao").withText("3"));
  I.seeElement(locate("button.botao-padrao").withText("4"));
  I.dontSeeElement(locate("button.botao-padrao").withText("5"));
});
