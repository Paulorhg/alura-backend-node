// import { Autor } from "../models/Autor.js";
import NaoEncontrado from "../error/NaoEncontrado.js";
import Livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const livros = await Livro.find({});
      res.json(livros);
    } catch (err) {
      next(err);
    }
  }

  static async buscarLivroPorId(req, res, next) {
    try {
      const { id } = req.params;
      const livro = await Livro.findById(id);
      if (!livro) {
        next(new NaoEncontrado("Livro não encontrado"));
        return;
      }
      res.json(livro);
    } catch (err) {
      next(err);
    }
  }

  static async cadastrarLivro(req, res, next) {
    try {
      let livro = new Livro(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (err) {
      next(err);
    }
    // const novoLivro = req.body;

    // try {
    //   const autorEncontrado = await Autor.findById(novoLivro.autor);
    //   const livroCompleto = {
    //     ...novoLivro,
    //     autor: { ...autorEncontrado?._doc },
    //   };
    //   const livroCriado = await Livro.create(livroCompleto);
    //   res.json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
    // } catch (err) {
    //   next(err);
    // }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const { id } = req.params;
      const livro = await Livro.findByIdAndUpdate(id, req.body, { new: true });
      if (!livro) {
        next(new NaoEncontrado("Livro não encontrado"));
        return;
      }
      res.json({ message: "Livro atualizado com sucesso", livro });
    } catch (err) {
      next(err);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const { id } = req.params;
      const livro = await Livro.findByIdAndDelete(id);

      if (!livro) {
        next(new NaoEncontrado("Livro não encontrado"));
        return;
      }
      res.json({ message: "Livro excluido com sucesso" });
    } catch (err) {
      next(err);
    }
  }

  static async buscarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livros = await Livro.find({ editora });
      if (!livros || livros.length === 0) {
        next(new NaoEncontrado("Nenhum livro encontrado"));
        return;
      }
      res.json(livros);
    } catch (err) {
      next(err);
    }
  }
}

export default LivroController;
