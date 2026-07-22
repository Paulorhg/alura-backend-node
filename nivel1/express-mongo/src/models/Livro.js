import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "Título é obrigatório"],
    },
    editora: {
      type: String,
    },
    preco: { type: Number },
    paginas: { type: Number },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "Autor é obrigatório"],
    },
  },
  { versionKey: false },
);

const Livro = mongoose.model("livros", livroSchema);

export default Livro;
