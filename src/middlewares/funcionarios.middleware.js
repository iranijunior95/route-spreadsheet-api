function validateEmployeeData(req, res, next) {
    const { nome, funcao } = req.body;
    const errors = [];

    if(!nome) errors.push({ campo: "nome", message: "O campo 'nome' é obrigatório" });
    if(!funcao) errors.push({ campo: "funcao", message: "O campo 'funcao' é obrigatório" });

    if(errors.length > 0) {
        return res.status(422).json({
            status: false,
            message: "Erro de validação",
            errors
        });
    }

    next();
}

export default { 
    validateEmployeeData
};