export class Autenticacao {
  private _login: string;
  private _senha: string;

  constructor(login: string, senha: string) {
    this._login = login;
    this._senha = senha;
  }

  public set login(login: string) {
    this._login = login;
  }

  public get login(): string {
    return this._login;
  }

  public set senha(senha: string) {
    this._senha = senha;
  }

  public get senha(): string {
    return this._senha;
  }
}
