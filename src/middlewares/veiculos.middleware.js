function validateVehicleData(req, res, next) {
    const { placa } = req.body;
    const errors = [];

    if(!placa) errors.push({ campo: "placa", message: "O campo 'placa' é obrigatório" });

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
    validateVehicleData
}