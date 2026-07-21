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

export default app

