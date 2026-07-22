class ErroBase extends Error {
  constructor(message = "Erro interno do servidor.", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }

  enviarResposta(res) {
    res.status(this.statusCode).send({ message: this.message, status: this.statusCode });
  }
}

export default ErroBase;