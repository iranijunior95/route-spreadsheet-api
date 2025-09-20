import jwt from "jsonwebtoken";
import environmentVariables from "../config/environmentVariables.js";

function validateLoginData(req, res, next) {
    const { usuario, senha } = req.body;
    const errors = [];

    if (!usuario) errors.push({ campo: "usuario", message: "Campo 'usuário' é obrigatório'" });
    if (!senha) errors.push({ campo: "senha", message: "Campo 'senha' é obrigatório'" });

    if (errors.length > 0) {
        return res.status(422).json({
            status: false,
            message: "Erro de validação",
            errors
        });
    }

    next();
}

function authenticateTokenRequest(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const { secret_jwt } = environmentVariables;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Token não fornecido"
        });
    }
    
    try {
        const decoded = jwt.verify(token, secret_jwt);

        req.usuario = decoded;

        next();
        
    } catch (error) {
        console.log(`Erro validação do token: ${error}`);

        return res.status(403).json({
            status: false,
            message: "Token inválido ou expirado"
        });
    }
}

export default {
    validateLoginData,
    authenticateTokenRequest
}