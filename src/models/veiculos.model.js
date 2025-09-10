import mongoose from "mongoose";

const veiculosSchema = new mongoose.Schema({
    placa: {
        type: String,
        unique: true,
        minlength: 7,
        maxlength: 8,
    }
});

const Veiculo = mongoose.model('veiculo', veiculosSchema);

export default Veiculo;

