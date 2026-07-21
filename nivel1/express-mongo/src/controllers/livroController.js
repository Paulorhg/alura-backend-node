import { Autor } from "../models/Autor.js"
import Livro from "../models/Livro.js"

class LivroController {
    static async listarLivros(req, res) {
        try{
            const livros = await Livro.find({})
            res.json(livros)
        } catch(err) {
            res.status(500).json({ message: `Erro ao listar livros: ${err.message}` })
        }
    }

    static async buscarLivroPorId(req, res) {
        try{
            const { id } = req.params
            const livro = await Livro.findById(id)
            res.json(livro)
        } catch(err) {
            res.status(500).json({ message: `Livro não encontrado: ${err.message}` })
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body
        
        try{
            const autorEncontrado = await Autor.findById(novoLivro.autor)
            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc} }
            const livroCriado = await Livro.create(livroCompleto)
            res.json({ message: "Livro cadastrado com sucesso", livro: livroCriado })
        } catch(err) {
            res.status(500).json({ message: `Erro ao cadastrar livro: ${err.message}` })
        }
    }

    static async atualizarLivro(req, res) {
        try{
            const { id } = req.params
            const livro = await Livro.findByIdAndUpdate(id, req.body, { new: true })
            res.json({message: "Livro atualizado com sucesso", livro})
        } catch(err) {
            res.status(500).json({ message: `Erro ao atualizar livro: ${err.message}` })
        }
    }

    static async excluirLivro(req, res) {
        try{
            const { id } = req.params
            await Livro.findByIdAndDelete(id)
            res.json({message: "Livro excluido com sucesso"})
        } catch(err) {
            res.status(500).json({ message: `Erro ao excluir livro: ${err.message}` })
        }
    }

    static async buscarLivrosPorEditora(req, res) {
        const editora = req.query.editora
        try{
            const livros = await Livro.find({ editora })
            res.json(livros)
        } catch(err) {
            res.status(500).json({ message: `Erro ao buscar livros por editora: ${err.message}` })
        }
    }
}

export default LivroController