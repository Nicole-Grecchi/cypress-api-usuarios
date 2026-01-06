const Joi = require('joi')

const usuariosSchema = Joi.object({
  quantidade: Joi.number().required(),
  usuarios: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      nome: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } }) // 🔥 AQUI ESTÁ A CHAVE
        .required(),
      administrador: Joi.boolean().required()
    })
  ).required()
})

module.exports = usuariosSchema


