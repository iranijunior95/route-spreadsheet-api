import bcrypt from "bcrypt";
import Usuario from "../models/usuarios.model.js";
import { objectIdIsValid } from "../utils/isValidObjectId.js";

async function searchAllUsers(req, res) {
    try {
        const listaUsuarios = await Usuario.find().select("-senha");

        if(listaUsuarios.length === 0) {
            return res.status(200).json({
                status: true,
                message: "Nenhum usuário encontrado",
                usuarios: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Usuários encontrados com sucesso",
            usuarios: listaUsuarios
        });

    } catch (error) {
        console.log(`Erro ao buscar usuários: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro interno ao buscar usuários"
        });
    }
}

async function addNewUser(req, res) {
    const { nomeCompleto, nomeUsuario, senha, disponibilidade } = req.body;

    try {
        const novoUsuario = await Usuario.create({
            nomeCompleto: nomeCompleto.toLocaleLowerCase(),
            nomeUsuario: nomeUsuario.toLocaleLowerCase(),
            senha: await bcrypt.hash(senha, 10),
            disponibilidade: disponibilidade !== 'ativo' && disponibilidade !== 'inativo' ? 'inativo' : disponibilidade
        });

        return res.status(201).json({
            status: true,
            message: "Usuário cadastrado com sucesso",
            usuario: novoUsuario
        })

    } catch (error) {
        console.log(`Erro ao inserir novo usuário: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao inserir usuário"
        });
    }
}

async function changeUsers(req, res) {
    const { nomeCompleto, nomeUsuario, disponibilidade } = req.body;
    const { id } = req.params;

    try {
        if(!objectIdIsValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        if(!nomeCompleto && !nomeUsuario && !disponibilidade) {
            return res.status(400).json({
                status: false,
                message: "Dados não localizados para alteração"
            });
        }

        const dadosParaAlterar = {};

        if (nomeCompleto) dadosParaAlterar.nomeCompleto = nomeCompleto.toLowerCase();
        if (nomeUsuario) dadosParaAlterar.nomeUsuario = nomeUsuario.toLowerCase();

        if(disponibilidade && disponibilidade === 'ativo' || disponibilidade === 'inativo') {
            dadosParaAlterar.disponibilidade = disponibilidade;
        }

        const usuarioAlterado = await Usuario.findOneAndUpdate(
            { _id: id },
            dadosParaAlterar,
            {
                new: true,
                runValidators: true
            }
        ).select("-senha");

        if(!usuarioAlterado) {
            return res.status(404).json({
                status: false,
                message: "Usuário não encontrado"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Usuário alterado com sucesso",
            usuario: usuarioAlterado
        });

    } catch (error) {
        console.log(`Erro ao alterar usuários: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao alterar usuários"
        });
    }
}

async function deleteUsers(req, res) {
    const { id } = req.params;

    try {
        if(!objectIdIsValid(id)) {
            return res.status(400).json({
                status: false,
                message: "ID não localizado"
            });
        }

        const usuarioDeletado = await Usuario.findByIdAndDelete(id);

        if(!usuarioDeletado) {
            return res.status(404).json({
                status: false,
                message: "Usuário não encontrado"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Usuário deletado com sucesso"
        });

    } catch (error) {
        console.log(`Erro ao deletar usuários: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao deletar usuários"
        });
    }
}

export default {
    searchAllUsers,
    addNewUser,
    changeUsers,
    deleteUsers
}