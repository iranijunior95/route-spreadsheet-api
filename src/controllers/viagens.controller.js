import Viagem from "../models/viagens.model.js";
import { objectIdIsValid } from "../utils/isValidObjectId.js";

async function searchAllTrips(req, res) {
    try {
        const listaViagens = await Viagem.find()
            .populate("motorista")
            .populate("veiculo")
            .populate("ajudantes")

        if(listaViagens.length === 0) {
            return res.status(200).json({
                status: true,
                message: "Nenhuma viagem encontrada",
                viagens: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Viagens encontradas com sucesso",
            viagens: listaViagens
        });

    } catch (error) {
        console.log(`Erro ao buscar viagens: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro interno ao buscar viagens"
        });
    }
}

async function searchForTripsById(req, res) {
    const { id } = req.params;

    try {
        const viagem = await Viagem.findById(id)
            .populate("motorista")
            .populate("veiculo")
            .populate("ajudantes")

        if(!viagem) {
            return res.status(404).json({
                status: false,
                message: "Viagem não localizada"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Viagem localizada com sucesso",
            viagem
        });

    } catch (error) {
        console.log(`Erro ao buscar viagem pelo ID: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro interno ao buscar viagem pelo ID"
        });
    }
}

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

async function changeTrips(req, res) {
    const { id } = req.params;
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
        if (!objectIdIsValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        const viagemAlterada = await Viagem.findOneAndUpdate(
            { _id: id },
            {
                dataSaida, 
                dataChegada,
                diaria,
                peso,
                carregamentos,
                cidades,
                motorista,
                veiculo,
                ajudantes
            },
            {
                new: true,
                runValidators: true
            }
        )
        .populate("motorista")
        .populate("veiculo")
        .populate("ajudantes");

        if (!viagemAlterada) {
            return res.status(404).json({
                status: false,
                message: "Viagem não encontrada"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Viagem alterada com sucesso",
            viagem: viagemAlterada
        });

    } catch (error) {
        console.log(`Erro ao alterar viagem: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao alterar viagem"
        });
    }
}

async function deleteTrips(req, res) {
    const { id } = req.params;

    try {
        if (!objectIdIsValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        const viagemDeletada = await Viagem.findOneAndDelete(id);

        if (!viagemDeletada) {
            return res.status(404).json({
                status: false,
                message: "Viagem não encontrada"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Viagem deletada com sucesso"
        });

    } catch (error) {
        console.log(`Erro ao deletar viagem: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao deletar viagem"
        });
    }
}

export default {
    searchAllTrips,
    searchForTripsById,
    addNewTrip,
    changeTrips,
    deleteTrips
}