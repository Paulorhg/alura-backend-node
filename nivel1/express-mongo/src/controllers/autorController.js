import { Autor } from "../models/Autor.js"

class AutorController {
    static async listarAutores(req, res) {
        try{
            const autores = await Autor.find({})
            res.json(autores)
        } catch(err) {
            res.status(500).json({ message: `Erro ao listar autores: ${err.message}` })
        }
    }

    static async buscarAutorPorId(req, res) {
        try{
            const { id } = req.params
            const autor = await Autor.findById(id)
            res.json(autor)
        } catch(err) {
            res.status(500).json({ message: `Autor não encontrado: ${err.message}` })
        }
    }

    static async cadastrarAutor(req, res) {
        try{
            const novoAutor = await Autor.create(req.body)
            res.json({ message: "Autor cadastrado com sucesso", autor: novoAutor })
        } catch(err) {
            res.status(500).json({ message: `Erro ao cadastrar autor: ${err.message}` })
        }
    }

    static async atualizarAutor(req, res) {
        try{
            const { id } = req.params
            const autor = await Autor.findByIdAndUpdate(id, req.body, { new: true })
            res.json({message: "Autor atualizado com sucesso", autor})
        } catch(err) {
            res.status(500).json({ message: `Erro ao atualizar autor: ${err.message}` })
        }
    }

    static async excluirAutor(req, res) {
        try{
            const { id } = req.params
            await Autor.findByIdAndDelete(id)
            res.json({message: "Autor excluido com sucesso"})
        } catch(err) {
            res.status(500).json({ message: `Erro ao excluir autor: ${err.message}` })
        }
    }
}

export default AutorController