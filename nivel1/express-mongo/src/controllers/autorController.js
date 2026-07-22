import NaoEncontrado from "../error/NaoEncontrado.js";
import { Autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const autores = await Autor.find({});
      res.json(autores);
    } catch (err) {
      next(err);
    }
  }

  static async buscarAutorPorId(req, res, next) {
    try {
      const { id } = req.params;
      const autor = await Autor.findById(id);
      console.log('autor :', autor);

      if (!autor) {
        next(new NaoEncontrado("Autor não encontrado"));
        return;
      }

      res.json(autor);
    } catch (err) {
      next(err);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await Autor.create(req.body);
      res.json({ message: "Autor cadastrado com sucesso", autor: novoAutor });
    } catch (err) {
      next(err);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const { id } = req.params;
      const autor = await Autor.findByIdAndUpdate(id, req.body, { new: true });

      if (!autor) {
        next(new NaoEncontrado("Autor não encontrado"));
        return;
      }
      res.json({ message: "Autor atualizado com sucesso", autor });
    } catch (err) {
      next(err);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const { id } = req.params;
      const autor = await Autor.findByIdAndDelete(id);

      if (!autor) {
        next(new NaoEncontrado("Autor não encontrado"));
        return;
      }
      res.json({ message: "Autor excluido com sucesso" });
    } catch (err) {
      next(err);
    }
  }
}

export default AutorController;
