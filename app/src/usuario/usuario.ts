export class Usuario {
  private _id: number;
  private _matricula: string;
  private _nome: string;
  private _saldo: number;

  constructor(id: number, matricula: string, nome: string, saldo: number) {
    this._id = id;
    this._matricula = matricula;
    this._nome = nome;
    this._saldo = saldo;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public set matricula(matricula: string) {
    this._matricula = matricula;
  }

  public get matricula(): string {
    return this._matricula;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public get nome(): string {
    return this._nome;
  }

  public set saldo(saldo: number) {
    this._saldo = saldo;
  }

  public get saldo(): number {
    return this._saldo;
  }
}
