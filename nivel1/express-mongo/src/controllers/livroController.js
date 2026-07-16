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
            res.status(500).json({ message: `Erro ao listar livros: ${err.message}` })
        }
    }

    static async cadastrarLivro(req, res) {
        try{
            const novoLivro = await Livro.create(req.body)
            res.json({ message: "Livro cadastrado com sucesso", livro: novoLivro })
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
        } catch(err) {
            res.status(500).json({ message: `Erro ao excluir livro: ${err.message}` })
        }
    }
}

export default LivroController