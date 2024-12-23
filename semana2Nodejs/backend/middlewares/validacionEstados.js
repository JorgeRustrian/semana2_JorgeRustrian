import Joi from "joi";
const estado = Joi.object({
      nombre: Joi.string().min(3).max(30).messages({
        "string.base": "El nombre debe ser un texto.",
        "string.empty": "El nombre no puede estar vacío.",
        "string.min": "El nombre debe tener al menos 3 carácteres",
        "string.max": "El nombre no puede exceder los 100 caracteres.",
        "any.required": "El nombre es obligatorio."
      }),
      id_tipo_estado: Joi.number().integer().min(1).required().messages({
        "number.base": "El id tipo estado debe ser un número entero.",
        "number.min": "El id tipo estado no puede ser menor que 1.",
        "any.required": "El id tipo estado es obligatorio.",
      })

});

const validarEstado= (req,res,next)=>{
    const {error}= estado.validate(req.body,{abortEarly:false});
    if (error) {
        return res.status(400).json({
            errors: error.details.map((detail) => detail.message),
        });
    }

    next();
};
const actualizacionEstado=Joi.object({
    idestados: Joi.number().integer().required().messages({
        "number.base": "El ID del estado debe ser un número entero.",
        "any.required": "El ID del estado es obligatorio para actualizar",
    }),
    datos_a_actualizar: Joi.object()
    .pattern(
        Joi.string(),
        Joi.alternatives().try(
            Joi.string().min(3).max(30).messages({
                "string.min": "El campo debe tener al menos 1 carácter.",
                "string.max": "El campo no debe superar los 30 caracteres"
            }),
            Joi.number().integer().min(1).messages({
                "number.base": "El campo debe ser un número entero.",
                "number.min": "El campo no puede ser negativo o 0",
            }),
          
        )
    )
    .required()
    .messages({
        "object.base": "Los datos a actualizar deben ser un objeto válido.",
        "any.required": "Los datos a actualizar son obligatorios.",
    }),
});
const validarActualizacionEstado=(req,res,next)=>{
    const {error}= actualizacionEstado.validate(req.body,{abortEarly:false});
    if (error) {
        return res.status(400).json({
            errors: error.details.map((detail) => detail.message),
        });
    }
    next();
};
const eliminacionEstado=Joi.object({
    idestados: Joi.number().integer().required().messages({
        "number.base": "El ID del estado debe ser un número entero.",
        "any.required": "El ID del estado es obligatorio para eliminar.",
    }),
});
const validarEliminacionEstado= (req,res,next)=>{
      const{error}=eliminacionEstado.validate(req.body,{abortEarly:false});
      if(error){
        return res.status(400).json({  errors: error.details.map((detail) => detail.message),});
      }
      next();
};


export  { validarEstado,validarActualizacionEstado,validarEliminacionEstado};