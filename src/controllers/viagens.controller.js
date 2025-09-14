import Viagem from "../models/viagens.model.js";

async function addNewTrip(req, res) {
    const { 
        dataSaida, 
        dataChegada,
        diaria,
        peso,
        carregamentos,
        cidades,
        motorista,
        veiculo,
        ajudantes
    } = req.body;

    try {
        const viagem = await Viagem.create({
            dataSaida, 
            dataChegada,
            diaria,
            peso,
            carregamentos,
            cidades,
            motorista,
            veiculo,
            ajudantes
        });

        return res.status(201).json({
            status: true,
            message: "Viagem cadastrada com sucesso",
            viagem
        });

    } catch (error) {
        console.log(`Erro ao inserir nova viagem: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao inserir viagem"
        });
    }
}

export default {
    addNewTrip
}