import { AutenticacaoRepositorio } from "../app/src/autenticacao/autenticacao-repositorio";
import { AutenticacaoErro } from "../app/src/autenticacao/autenticacao-erro";

describe("AutenticacaoRepositorio", () => {
  let repositorio: AutenticacaoRepositorio;
  let autenticacao: object;
  let mockUsuario: object;
  beforeAll(() => {
    repositorio = new AutenticacaoRepositorio();
    autenticacao = {
      login: "123456",
      senha: "12345"
    };
    mockUsuario = {
      id: 1,
      matricula: "123456",
      nome: "Meg",
      saldo: 400
    };
  });
  describe("logar", () => {
    test("deve logar um usuário com sucesso", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsuario)
      });
      const usuario = await repositorio.logar(autenticacao);
      expect(usuario).toEqual(mockUsuario);
      //console.log(usuario);
    });
    test("deve lançar AutenticacaoErro ao não conseguir obter o usuário", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false
      });
      //const usuario = await repositorio.logar(autenticacao);
      //console.log(usuario);
      await expect(repositorio.logar(autenticacao)).rejects.toThrow(
        AutenticacaoErro
      );
    });
  });
  describe("deslogar", () => {
    test("deve delogar um usuário com sucesso", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true
      });
      const usuarioDeslogado = await repositorio.deslogar();
      expect(usuarioDeslogado).toBeTruthy();
      //console.log(usuarioDeslogado);
    });
    test("deve lançar um AutenticacaoErro ao não conseguir deslogar o usuário", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false
      });
      await expect(repositorio.logar(autenticacao)).rejects.toThrow(
        AutenticacaoErro
      );
    });
  });
});
