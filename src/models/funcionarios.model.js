import mongoose from "mongoose";

const funcionariosSchema = new mongoose.Schema({
    nome: { type: 'String' },
    funcao: {
        type: 'String',
        enum: ["motorista", "ajudante"]
    }
});

const Funcionario = mongoose.model('funcionario', funcionariosSchema);

export default Funcionario;