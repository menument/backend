const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    nome_en: {
      type: String,
      required: true,
    },
    nome_fr: {
      type: String,
      required: true,
    },
    nome_es: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    unidade: {
      type: String,
      required: true,
    },
    quantidade: {
      type: String,
      required: true,
    },
    calorias: {
      type: String,
      required: true,
    },
    proteinas: {
      type: String,
      required: true,
    },
    lipidos: {
      type: String,
      required: true,
    },
    carbo: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    propriedades: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      lowercase: true,
      required: true,
     }
  },
  {
    timestamps: true,
  }
);


const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
