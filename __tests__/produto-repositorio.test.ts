import { ProdutoRepositorio } from "../app/src/produto/produto-repositorio";
import { ProdutoErro } from "../app/src/produto/produto-erro";
import { Produto } from "../app/src/produto/produto";

describe("ProdutoRepositorio", () => {
  let repositorio: ProdutoRepositorio;
  let paginaEscolhida: number;
  let idProdutoValido: number;
  let idProdutoInvalido: number;
  beforeAll(() => {
    paginaEscolhida = 1;
    repositorio = new ProdutoRepositorio();
    idProdutoValido = 1;
    idProdutoInvalido = 0;
  });
  describe("obterTodos", () => {
    test("deve obter os produtos corretamente", async () => {
      let camposPresentes = true;
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue([
          {
            id: 1,
            descricao: "Produto 1",
            precoDeVenda: 10,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 10
          },
          {
            id: 2,
            descricao: "Produto 2",
            precoDeVenda: 20,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 20
          }
        ])
      };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);
      const resultado = await repositorio.obterTodos(paginaEscolhida);
      expect(resultado.arrayDeObjetosDeProdutos.length).toBe(2);
      resultado.arrayDeObjetosDeProdutos.forEach((produto) => {
        if (
          produto.id !== undefined &&
          produto.descricao !== undefined &&
          produto.precoDeVenda !== undefined &&
          produto.taxaDesconto !== undefined &&
          produto.imagem !== undefined &&
          produto.precoDesconto !== undefined
        ) {
        } else {
          camposPresentes = false;
        }
      });
      expect(camposPresentes).toBeTruthy();
    });
    test("deve lançar um ProdutoErro ao obter os produtos", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false
      });
      await expect(repositorio.obterTodos(paginaEscolhida)).rejects.toThrow(
        ProdutoErro
      );
    });
  });
  describe("obterProdutosMaisVendidos", () => {
    test("deve retornar um array com 6 produtos", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue([
          {
            id: 1,
            descricao: "Produto 1",
            precoDeVenda: 10,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 10
          },
          {
            id: 2,
            descricao: "Produto 2",
            precoDeVenda: 20,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 20
          },
          {
            id: 3,
            descricao: "Produto 3",
            precoDeVenda: 10,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 10
          },
          {
            id: 4,
            descricao: "Produto 4",
            precoDeVenda: 10,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 10
          },
          {
            id: 5,
            descricao: "Produto 5",
            precoDeVenda: 10,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 10
          },
          {
            id: 6,
            descricao: "Produto 6",
            precoDeVenda: 10,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 10
          }
        ])
      };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);
      const resultado = await repositorio.obterProdutosMaisVendidos();
      expect(resultado.length).toBe(6);
      resultado.forEach((produto: any) => {
        expect(produto).toBeInstanceOf(Produto);
      });
    });
    test("deve lançar ProdutoErro ao não obter sucesso na requisição", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false
      });
      await expect(repositorio.obterProdutosMaisVendidos()).rejects.toThrow(
        ProdutoErro
      );
    });
  });

  describe("obterPorId", () => {
    test("deve um único produto com todos os campos setados quando passar um id válido", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue([
          {
            id: 1,
            descricao: "Produto 1",
            precoDeVenda: 10,
            taxaDesconto: 0,
            imagem: "",
            precoDesconto: 10
          }
        ])
      };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);
      const resultado = await repositorio.obterPorId(idProdutoValido);
      expect(resultado).toBeInstanceOf(Produto);
    });
    test("deve lançar ProdutoErro ao não obter sucesso na requisição", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 403
      });
      await expect(repositorio.obterPorId(idProdutoInvalido)).rejects.toThrow(
        ProdutoErro
      );
    });
  });
  describe("transformaEmObjeto", () => {
    test("deve transformar o json em objeto de produto", async () => {
      const produto = {
        id: 7,
        descricao: "Um produto do cefet-shop",
        precoDeVenda: 200.0,
        lancamento: "2023-01-01",
        detalhes: "Um produto muito bom do cefet-shop com detalhes",
        quantidade: 2,
        taxaDesconto: 0,
        categoria: "Produto",
        precoDesconto: 200.0,
        imagem: "blob da imagem em 8K"
      };
      const resposta = repositorio.transformaEmObjeto(produto);
      expect(resposta).toBeInstanceOf(Produto);
      expect(resposta.id).toBe(7);
      expect(resposta.descricao).toBe("Um produto do cefet-shop");
      expect(resposta.precoDeVenda).toBe(200.0);
      expect(resposta.lancamento).toBe("2023-01-01");
      expect(resposta.detalhes).toBe(
        "Um produto muito bom do cefet-shop com detalhes"
      );
      expect(resposta.quantidade).toBe(2);
      expect(resposta.taxaDesconto).toBe(0);
      expect(resposta.categoria).toBe("Produto");
      expect(resposta.precoDesconto).toBe(200.0);
      expect(resposta.imagem).toBe("blob da imagem em 8K");
    });
    test("deve transformar o json em objeto de produto mesmo se algum campo não for definido", async () => {
      const produto = {
        id: 7,
        descricao: "Um produto do cefet-shop",
        precoDeVenda: 200.0,
        lancamento: "2023-01-01",
        detalhes: "Um produto muito bom do cefet-shop com detalhes",
        quantidade: 2,
        taxaDesconto: 0,
        precoDesconto: 200.0,
        imagem: "blob da imagem em 8K"
      };
      const resposta = repositorio.transformaEmObjeto(produto);
      expect(resposta).toBeInstanceOf(Produto);
      expect(resposta.categoria).toBe(undefined);
    });
  });
});
