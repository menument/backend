const Ingredient = require("../models/Ingredient");

const addIngredient = async (req, res) => {
  console.log("ingred body", req.body)
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(200).send({
      message: "Ingredient Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// all multiple Ingredient
const addAllIngredient = async (req, res) => {
  // console.log("Ingredient", req.body);
  try {
    await Ingredient.deleteMany();

    await Ingredient.insertMany(req.body);

    res.status(200).send({
      message: "Ingredient Added Successfully!",
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).send({
      message: err.message,
    });
  }
};

// get status show Ingredient
const getShowingIngredient = async (req, res) => {
  try {
    const Ingredients = await Ingredient.find({ status: "show" }).sort({
      _id: -1,
    });

    const IngredientList = readyToParentAndChildrenIngredient(Ingredients);
    // console.log("Ingredient list", IngredientList.length);
    res.send(IngredientList);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// get all Ingredient parent and child
const getAllIngredient = async (req, res) => {
  console.log("getAllIng")
  try {
    const ingredients = await Ingredient.find({}).sort({ _id: -1 });
    const ingredientList = readyToParentAndChildrenIngredient(ingredients);     
    res.send(ingredientList);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    }); 
  }
  
};



const getAllIngredients = async (req, res) => {
  try {
    const Ingredients = await Ingredient.find({}).sort({ _id: -1 });

    res.send(Ingredients);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.send(ingredient);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
    console.log("err", err)
  }
};

// Ingredient update
const updateIngredient = async (req, res) => {
  console.log("req.body.propriedades",req.body.propriedades)
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (ingredient) {
      ingredient.nome = req.body.nome;
      ingredient.nome_en = req.body.nome_en;
      ingredient.nome_es = req.body.nome_es;
      ingredient.nome_fr = req.body.nome_fr;
      ingredient.foto = req.body.foto;
      ingredient.categoria = req.body.categoria;
      ingredient.quantidade = req.body.quantidade;
      ingredient.unidade = req.body.unidade;
      ingredient.calorias = req.body.calorias;
      ingredient.proteinas = req.body.proteinas;
      ingredient.lipidos = req.body.lipidos;
      ingredient.carbo = req.body.carbo;
      ingredient.propriedades = req.body.propriedades;

      await ingredient.save();
      res.send({ message: "Ingredient Updated Successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// udpate many Ingredient
const updateManyIngredient = async (req, res) => {
  try {
    const updatedData = {};
    for (const key of Object.keys(req.body)) {
      if (
        req.body[key] !== "[]" &&
        Object.entries(req.body[key]).length > 0 &&
        req.body[key] !== req.body.ids
      ) {
        updatedData[key] = req.body[key];
      }
    }

    await Ingredient.updateMany(
      { _id: { $in: req.body.ids } },
      {
        $set: updatedData,
      },
      {
        multi: true,
      }
    );

    res.send({
      message: "Ingredients update successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Ingredient update status
const updateStatus = async (req, res) => {
  // console.log('update status')
  try {
    const newStatus = req.body.status;

    await Ingredient.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Ingredient ${
        newStatus === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
//single Ingredient delete
const deleteIngredient = async (req, res) => {
  try {
    console.log("id cat >>", req.params.id);
    await Ingredient.deleteOne({ _id: req.params.id });
    await Ingredient.deleteMany({ parentId: req.params.id });
    res.status(200).send({
      message: "Ingredient Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }

  //This is for delete children Ingredient
  // Ingredient.updateOne(
  //   { _id: req.params.id },
  //   {
  //     $pull: { children: req.body.title },
  //   },
  //   (err) => {
  //     if (err) {
  //       res.status(500).send({ message: err.message });
  //     } else {
  //       res.status(200).send({
  //         message: 'Ingredient Deleted Successfully!',
  //       });
  //     }
  //   }
  // );
};

// all multiple Ingredient delete
const deleteManyIngredient = async (req, res) => {
  try {
    const Ingredients = await Ingredient.find({}).sort({ _id: -1 });

    await Ingredient.deleteMany({ parentId: req.body.ids });
    await Ingredient.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Ingredients Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const readyToParentAndChildrenIngredient = (ingredients, parentId = null) => {
  const IngredientList = [];
  let Ingredients;
  if (parentId == null) {
    Ingredients = ingredients.filter((ing) => ing.parentId == undefined);
  } else {
    Ingredients = ingredients.filter((ing) => ing.parentId == parentId);
  }

  for (let ing of Ingredients) {
    IngredientList.push({
      _id: ing._id,
      nome: ing.nome,
      nome_en: ing.nome_en,
      nome_es: ing.nome_es,
      nome_fr: ing.nome_fr,
      categoria: ing.categoria,
      unidade: ing.unidade,
      quantidade: ing.quantidade,
      foto: ing.foto,
      calorias: ing.calorias,
      proteinas: ing.proteinas,
      lipidos: ing.lipidos,
      carbo: ing.carbo,
      status: ing.status,
      propriedades: ing.propriedades,
      children: readyToParentAndChildrenIngredient(Ingredients, ing._id),
    });
  }

  return IngredientList;
};

module.exports = {
  addIngredient,
  addAllIngredient,
  getAllIngredient,
  getShowingIngredient,
  getIngredientById,
  updateIngredient,
  updateStatus,
  deleteIngredient,
  deleteManyIngredient,
  getAllIngredients,
  updateManyIngredient,
};
