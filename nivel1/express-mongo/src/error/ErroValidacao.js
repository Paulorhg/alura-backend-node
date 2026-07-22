import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(err) {
    const mensagensErro = Object.values(err.errors).map(error => error.message).join(', ');
    super(`Os seguintes campos estão incorretos: ${mensagensErro}`);
  }
}

export default ErroValidacao;