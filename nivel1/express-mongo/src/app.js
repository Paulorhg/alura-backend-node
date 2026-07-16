import express from "express"
import dbConnect from "./config/dbConnect.js"
import routes from "./routes/index.js"

const conexao = await dbConnect()

conexao.on("error", (err) => {
    console.error("Erro de conexão com o mongodb: ", err)
})

conexao.once("open", () => {
    console.log("Conexão com o mongodb estabelecida")
})

const app = express()
routes(app)

app.delete("/livros/:id", (req, res) => {
    const { id } = req.params
    const index = livros.findIndex((l) => l.id === Number(id))
    livros.splice(index, 1)
    res.send("Livro excluído com sucesso")
})

app.get("/autores", (req, res) => {
    res.send("Autores")
})

export default app

