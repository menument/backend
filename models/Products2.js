const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    ingrediente_en: {
      type: String,
      required: false,
    },
    ingrediente_es: {
      type: String,
      required: true,
    },
    ingrediente_fr: {
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
    categoria: {
        type: String,
        required: true,
    },
    proteinas: {
        type: String,
        required: true,
    },
    hidratos: {
        type: String,
        required: true,
    },
    gordura: {
        type: String,
        required: true,
    },
    image: {
      type: Array,
      required: false,
    },
    tag: [String],

    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
