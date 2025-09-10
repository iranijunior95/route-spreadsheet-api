import mongoose from "mongoose";
import Veiculo from "../models/veiculos.model.js";

async function searchAllVehicles(req, res) {
    try {
        const listaVeiculos = await Veiculo.find();

        if(listaVeiculos.length === 0) {
            return res.status(200).json({
                status: true,
                message: "Nenhum veículo encontrado",
                veiculos: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Veículos encontrados com sucesso",
            veiculos: listaVeiculos
        });

    } catch (error) {
        console.log(`Erro ao buscar veículos: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro interno ao buscar veículos"
        });
    }
}

async function searchVehicleById(req, res) {
    const { id } = req.params;

    try {
        const dadosVeiculo = await Veiculo.findById(id);

        if(!dadosVeiculo) {
            return res.status(404).json({
                status: false,
                message: "Veículo não localizado"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Veículo localizado com sucesso",
            veiculo: dadosVeiculo
        });

    } catch (error) {
        console.log(`Erro ao buscar veículo: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao buscar veículo"
        });
    }
}

async function addNewVehicle(req, res) {
    const { placa } = req.body;
    
    try {
        const veiculo = await Veiculo.create({
            placa: placa.toLocaleUpperCase()
        });

        return res.status(201).json({
            status: true,
            message: "Veículo cadastrado com sucesso",
            veiculo
        });

    } catch (error) {
        console.log(`Erro ao inserir novo veículo: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao inserir veículo"
        });
    }
}

async function changeVehicle(req, res) {
    const { id } = req.params;
    const { placa } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        const veiculoAlterado = await Veiculo.findOneAndUpdate(
            { _id: id },
            { placa: placa.toLocaleUpperCase() },
            {
                new: true,
                runValidators: true
            }
        );

        if(!veiculoAlterado) {
            return res.status(404).json({
                status: false,
                message: "Veículo não encontrado"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Veículo alterado com sucesso",
            veiculo: veiculoAlterado
        });

    } catch (error) {
        console.log(`Erro ao alterar veículo: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao alterar veículo"
        });
    }
}

async function deleteVehicle(req, res) {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        const veiculoDeletado = await Veiculo.findByIdAndDelete(id);

        if(!veiculoDeletado) {
            return res.status(404).json({
                status: false,
                message: "Veículo não encontrado"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Veículo deletado com sucesso"
        });

    } catch (error) {
        console.log(`Erro ao deletar veículo: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao deletar veículo"
        });
    }
}

export default {
    searchAllVehicles,
    searchVehicleById,
    addNewVehicle,
    changeVehicle,
    deleteVehicle
}