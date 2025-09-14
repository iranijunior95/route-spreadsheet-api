import mongoose from "mongoose";

const viagensSchema = new mongoose.Schema({
    dataSaida: { 
        type: Date,
        required: true,
        default: Date.now 
    },
    dataChegada: { type: Date },
    diaria: { type: String },
    peso: { type: String },
    carregamentos: { type: String },
    cidades: { type: [String] },
    motorista: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "funcionario",
        required: true
    },
    veiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "veiculo",
        required: true
    },
    ajudantes: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "funcionario"
            }
        ]
    }
});

const Viagem = mongoose.model('viagem', viagensSchema);

export default Viagem;