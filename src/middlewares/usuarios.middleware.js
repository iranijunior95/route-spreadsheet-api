function validateUserData(req, res, next) {
    const { nomeCompleto, nomeUsuario, senha, disponibilidade } = req.body;
    const errors = [];

    if (!nomeCompleto) errors.push({ campo: "nomeCompleto", message: "O campo 'nomeCompleto' é obrigatório" });
    if (!nomeUsuario) errors.push({ campo: "nomeUsuario", message: "O campo 'nomeUsuario' é obrigatório" });
    if (!senha) errors.push({ campo: "senha", message: "O campo 'senha' é obrigatório" });
    if (!disponibilidade) errors.push({ campo: "disponibilidade", message: "O campo 'disponibilidade' é obrigatório" });

    if (disponibilidade && disponibilidade !== 'ativo' && disponibilidade !== 'inativo') {
        errors.push({ campo: "disponibilade", message: "Opção selecionada é inválida" });
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
    validateUserData
}