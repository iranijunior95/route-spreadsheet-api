import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios.model.js";
import environmentVariables from "../config/environmentVariables.js";

async function login(req, res) {
    const { usuario, senha } = req.body;
    const { secret_jwt } = environmentVariables;

    try {
        const usuarioLogin = await Usuario.findOne({ nomeUsuario: usuario.toLowerCase() });

        if (!usuarioLogin) {
            return res.status(401).json({
                status: false,
                message: "Usuário ou Senha inválidos"
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuarioLogin.senha);

        if (!senhaValida) {
            return res.status(401).json({
                status: false,
                message: "Usuário ou Senha inválidos"
            });
        }

        const token = jwt.sign(
            { 
                id: usuarioLogin._id, 
                nomeUsuario: usuarioLogin.nomeUsuario,
                nomeUsuarioCompleto: usuarioLogin.nomeCompleto 
            },
            secret_jwt,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            status: true,
            message: "Login realizado com sucesso",
            token
        });

    } catch (error) {
        console.log(`Erro ao fazer o login: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro internoa o fazer login"
        });
    }
}

export default {
    login
}