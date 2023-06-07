Feature("Página de login");

Scenario("Login correto redireciona para o carrinho", async ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/autenticacao/login.html");
  I.fillField("#usuario", "123456");
  I.fillField("#senha", "12345");
  I.click("#botao-login");
  I.waitForNavigation();
  I.seeInCurrentUrl(
    "http://localhost/2023-1-pis-g3/app/src/carrinho/carrinho.html"
  );
});
Scenario("Login incorreto exibe mensagem de erro", async ({ I }) => {
  I.amOnPage("http://localhost/2023-1-pis-g3/app/src/autenticacao/login.html");
  I.fillField("#usuario", "1234");
  I.fillField("#senha", "12345");
  I.click("#botao-login");
  I.seeElement("#mensagem");
  I.see("Usuário ou senha incorretos");
  I.seeInCurrentUrl(
    "http://localhost/2023-1-pis-g3/app/src/autenticacao/login.html"
  );
});
