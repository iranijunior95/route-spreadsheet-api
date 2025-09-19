import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    nomeCompleto: { 
        type: String, 
        required: true,
        unique: true 
    },
    nomeUsuario: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    disponibilidade: {
        type: String,
        enum: ["ativo", "inativo"],
        default: "inativo"
    } 
});

const Usuario = mongoose.model('usuario', usuariosSchema);

export default Usuario;