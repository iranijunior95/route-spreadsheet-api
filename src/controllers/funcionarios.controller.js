import mongoose from "mongoose";
import Funcionario from "../models/funcionarios.model.js";

async function searchForAllEmployees(req, res) {
    try {
        const listaFuncionarios = await Funcionario.find();

        if(listaFuncionarios.length === 0) {
            return res.status(200).json({
                status: true,
                message: "Nenhum funcionário encontrado",
                funcionarios: []
            });
        }

        return res.status(200).json({ 
            status: true,
            message: "Funcionários encontrados com sucesso", 
            funcionarios: listaFuncionarios 
        });

    } catch (error) {
        console.log(`Erro ao buscar funcionários: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro interno ao buscar funcionários"
        });
    }
}

async function searchEmployeeByID(req, res) {
    const { id } = req.params;

    try {
        const dadosFuncionario = await Funcionario.findById(id);

        if(!dadosFuncionario) {
            return res.status(404).json({
                status: false,
                message: "Funcionário não localizado"
            });
        }

        return res.status(200).json({
                status: true,
                message: "Funcionário localizado com sucesso",
                funcionario: dadosFuncionario
        });

    } catch (error) {
        console.log(`Erro ao buscar funcionário: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao buscar funcionário"
        });
    }
}

async function filterEmployeeList(req, res) {
    const { nome, funcao } = req.body;
    
    let funcionariosFiltrados = [];

    try {
        if (!nome && !funcao) {
            funcionariosFiltrados = await Funcionario.find();
        }

        if (nome && !funcao) {
            funcionariosFiltrados = await Funcionario.find({ nome });
        }
        
        if (!nome && funcao) {
            if (funcao === 'todos') {
                funcionariosFiltrados = await Funcionario.find();
            } else {
                funcionariosFiltrados = await Funcionario.find({ funcao });
            } 
        }

        if (nome && funcao) {
            if (funcao === 'todos') {
                funcionariosFiltrados = await Funcionario.find({ nome });
            } else {
                funcionariosFiltrados = await Funcionario.find({ nome, funcao });
            }
        }

        if (funcionariosFiltrados.length === 0) {
            return res.status(200).json({
                status: false,
                message: "Nenhum funcionário encontrado",
                funcionarios: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Funcionários localizados com sucesso",
            funcionarios: funcionariosFiltrados
        });

    } catch (error) {
        console.log(`Erro ao filtrar lista de funcionários: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao filtrar lista de funcionários"
        });
    }
}

async function addNewEmployee(req, res) {
    const { nome, funcao } = req.body;

    try {
        const funcionario = await Funcionario.create({ 
            nome: nome.toLocaleLowerCase(), 
            funcao
        });

        return res.status(201).json({
            status: true,
            message: "Funcionário cadastrado com sucesso",
            funcionario
        });

    } catch (error) {
        console.log(`Erro ao inserir novo funcionário: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao inserir funcionário"
        });
    }
}

async function changeEmployee(req, res) {
    const { id } = req.params;
    const { nome, funcao } = req.body;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        const funcionarioAlterado = await Funcionario.findOneAndUpdate(
            { _id: id },
            {
                nome: nome.toLocaleLowerCase(), 
                funcao
            },
            {
                new: true,
                runValidators: true
            }
        );

        if(!funcionarioAlterado) {
            return res.status(404).json({
                status: false,
                message: "Funcionário não encontrado"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Funcionário alterado com sucesso",
            funcionario: funcionarioAlterado
        });

    } catch (error) {
        console.log(`Erro ao alterar funcionário: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao alterar funcionário"
        });
    }
}

async function deleteEmployee(req, res) {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        const funcionarioDeletado = await Funcionario.findByIdAndDelete(id);

        if(!funcionarioDeletado) {
            return res.status(404).json({
                status: false,
                message: "Funcionário não encontrado"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Funcionário deletado com sucesso"
        });

    } catch (error) {
        console.log(`Erro ao deletar funcionário: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao deletar funcionário"
        });
    }
}

export default {
    searchForAllEmployees,
    searchEmployeeByID,
    filterEmployeeList,
    addNewEmployee,
    changeEmployee,
    deleteEmployee
}