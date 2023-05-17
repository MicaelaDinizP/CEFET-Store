export class Produto {
  private _id: number;
  private _descricao: string;
  private _precoDeVenda: number;
  private _lancamento: Date;
  private _detalhes: string;
  private _quantidade: number;
  private _taxaDesconto: number;
  private _categoria: string;
  private _precoDesconto: number;
  private _imagem: string;

  constructor(
    id: number,
    descricao: string,
    precoDeVenda: number,
    lancamento: Date,
    detalhes: string,
    quantidade: number,
    taxaDesconto: number,
    categoria: string,
    precoDesconto: number,
    imagem: string
  ) {
    this._id = id;
    this._descricao = descricao;
    this._precoDeVenda = precoDeVenda;
    this._lancamento = lancamento;
    this._detalhes = detalhes;
    this._quantidade = quantidade;
    this._taxaDesconto = taxaDesconto;
    this._categoria = categoria;
    this._precoDesconto = precoDesconto;
    this._imagem = imagem;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public set descricao(descricao: string) {
    this._descricao = descricao;
  }

  public get descricao(): string {
    return this._descricao;
  }

  public set precoDeVenda(precoDeVenda: number) {
    this._precoDeVenda = precoDeVenda;
  }

  public get precoDeVenda(): number {
    return this._precoDeVenda;
  }

  public set lancamento(lancamento: Date) {
    this._lancamento = lancamento;
  }

  public get lancamento(): Date {
    return this._lancamento;
  }

  public set detalhes(detalhes: string) {
    this._detalhes = detalhes;
  }

  public get detalhes(): string {
    return this._detalhes;
  }

  public set quantidade(quantidade: number) {
    this._quantidade = quantidade;
  }

  public get quantidade(): number {
    return this._quantidade;
  }

  public set taxaDesconto(taxaDesconto: number) {
    this._taxaDesconto = taxaDesconto;
  }

  public get taxaDesconto(): number {
    return this._taxaDesconto;
  }

  public set categoria(categoria: string) {
    this._categoria = categoria;
  }

  public get categoria(): string {
    return this._categoria;
  }

  public set precoDesconto(precoDesconto: number) {
    this._precoDesconto = precoDesconto;
  }

  public get precoDesconto(): number {
    return this._precoDesconto;
  }

  public set imagem(imagem: string) {
    this._imagem = imagem;
  }

  public get imagem(): string {
    return this._imagem;
  }
}
