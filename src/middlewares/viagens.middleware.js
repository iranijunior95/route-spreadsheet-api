import Funcionario from "../models/funcionarios.model.js";
import Veiculo from "../models/veiculos.model.js";
import { objectIdIsValid } from "../utils/isValidObjectId.js";
import { validateDate } from "../utils/isValidDate.js";

async function validateTravelData(req, res, next) {
    const errors = [];

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

    /**
     * Validações campo dataSaida
     */
    if (!dataSaida) errors.push({ campo: "dataSaida", message: "O campo 'dataSaida' é obrigatório" });
    
    if (!validateDate(dataSaida)) errors.push({ campo: "dataSaida", message: "A data de saída não é uma data valída" });

    /**
     * Validações campo dataChegada
     */
    if (dataChegada && !validateDate(dataChegada)) errors.push({ campo: "dataChegada", message: "A data de chegada não é uma data valída" });

    /**
     * Validações campo diaria
     */
    if (!diaria) errors.push({ campo: "diaria", message: "O campo 'diaria' é obrigatório" });

    if (typeof diaria !== "string") errors.push({ campo: "diaria", message: "O tipo do campo não é valído" });

    if (diaria && typeof diaria === "string") {
        const regex = /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})$/;

        if (!regex.test(diaria)) errors.push({ campo: "diaria", message: "O campo 'diaria' não é um formato valido" });
    }

    /**
     * Validações campo peso
     */

    if (peso && typeof peso !== "string") errors.push({ campo: "peso", message: "O tipo do campo não é valído" });

    if (peso && typeof peso === "string") {
        const regex = /^\d+\.\d{3}$/;

        if (!regex.test(peso)) errors.push({ campo: "peso", message: "O campo 'peso' não é um formato valido" });
    }

    /**
     * Validações campo carregamentos
     */
    if (!carregamentos) errors.push({ campo: "carregamentos", message: "O campo 'carregamentos' é obrigatório" });

    /**
     * Validações campo cidades
     */
    if (!cidades) errors.push({ campo: "cidades", message: "O campo 'cidades' é obrigatório" });

    if (cidades && !Array.isArray(cidades)) errors.push({ campo: "cidades", message: "O tipo do campo não é valído" });

    if (cidades && Array.isArray(cidades) && cidades.length === 0) errors.push({ campo: "O campo 'cidades' não pode ser vazio" });

    if (cidades && Array.isArray(cidades) && cidades.length > 0) {
        const validatedArray = cidades.every(cidade => typeof cidade === "string");
        console.log(validatedArray)

        if (!validatedArray) errors.push({ campo: "cidades", message: "O tipo dos valores no campo não é valído" });
    }

    /**
     * Validações campo motorista
     */
    if (!motorista) errors.push({ campo: "motorista", message: "O campo 'motorista' é obrigatório" });

    if (motorista && !objectIdIsValid(motorista)) errors.push({ campo: "motorista", message: "ID do motorista é invalido" });

    if (motorista && objectIdIsValid(motorista)) {
        try {
            const buscarMotorista = await Funcionario.findById(motorista);

            if (!buscarMotorista) errors.push({ campo: "motorista", message: "ID do motorista não localizado" });

            if (buscarMotorista?.funcao !== "motorista") errors.push({ campo: "motorista", message: "ID fornecido não pertence a um motorista" });

        } catch (error) {
            console.log(`Erro ao buscar id do motorista: ${error}`);

            return res.status(500).json({
                status: false,
                message: "Erro interno ao buscar id do motorista"
            });
        }
    }

    /**
     * Validações campo veiculo
     */
    if (!veiculo) errors.push({ campo: "veiculo", message: "O campo 'veículo' é obrigatório" });

    if (veiculo && !objectIdIsValid(veiculo)) errors.push({ campo: "veículo", message: "ID do veiculo é invalido" });

    if (veiculo && objectIdIsValid(veiculo)) {
        try {
            const buscarVeiculo = await Veiculo.findById(veiculo);
            
            if (!buscarVeiculo) errors.push({ campo: "veiculo", message: "ID do veículo não localizado" });

        } catch (error) {
            console.log(`Erro ao buscar id do veículo: ${error}`);

            return res.status(500).json({
                status: false,
                message: "Erro interno ao buscar id do veículo"
            });
        }
    }

    /**
     * Validações de ajudantes
     */
    if (ajudantes?.length > 0) {
        const errorValidIdErrors = ajudantes.filter((ajudante) => !objectIdIsValid(ajudante));

        if (errorValidIdErrors.length > 0) errors.push({ campo: "ajudantes", message: "ID dos ajudantes não são validos" });

        try {
            if (errorValidIdErrors.length === 0) {
                const helpersFound = await Promise.all(
                    ajudantes.map(async (ajudante) => ({ found: await Funcionario.findById(ajudante) }))
                );

                const helperErrorsNotFound = helpersFound.filter((item) => !item.found);

                if (helperErrorsNotFound.length > 0) errors.push({ campo: "ajudantes", message: "ID dos ajudantes não localizados" });

                if (helperErrorsNotFound.length === 0) {
                    const errorsFunctionEmployeesHelpers = helpersFound.filter((item) => item?.found?.funcao !== "ajudante");

                    if (errorsFunctionEmployeesHelpers.length > 0) errors.push({ campo: "ajudantes", message: "IDs fornecidos não pertencem a ajudantes" });
                }
            }
        } catch (error) {
            console.log(`Erro ao buscar id dos ajudantes: ${error}`);

            return res.status(500).json({
                status: false,
                message: "Erro interno ao buscar id dos ajudantes"
            });
        }
    }

    if (errors.length > 0) {
        return res.status(422).json({
            status: false,
            message: "Erro de validação",
            errors
        });
    }

    next();
}

export default {
    validateTravelData
}