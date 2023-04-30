Feature('Pesquisa no Google');

Scenario('Pesquisar por "CodeceptJS"', ({ I }) => {
  // Navegar até a página inicial do Google
  I.amOnPage('https://www.google.com/');

  // Preencher o campo de busca com "CodeceptJS" e pressionar Enter
  I.fillField('input[name="q"]', 'CodeceptJS');
  I.pressKey('Enter');

  // Verificar que a página de resultados contém a palavra "CodeceptJS"
  I.see('CodeceptJS');
});
