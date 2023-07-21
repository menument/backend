const express = require('express');
const router = express.Router();
const {
  addIngredient,
  addAllIngredient,
  getAllIngredient,
  getAllIngredients,
  getShowingIngredient,
  getIngredientById,
  updateIngredient,
  updateStatus,
  deleteIngredient,
  deleteManyIngredient,
  updateManyIngredient

} = require('../controller/ingredientController');

//add a Ingredient
router.post('/add', addIngredient);

//add all Ingredient
router.post('/add/all', addAllIngredient);

//get only showing Ingredient
router.get('/show', getShowingIngredient);

//get all Ingredient
router.get('/', getAllIngredient);
//get all Ingredient
router.get('/all', getAllIngredients);

//get a Ingredient
router.get('/:id', getIngredientById);

//update a Ingredient
router.put('/:id', updateIngredient);

//show/hide a Ingredient
router.put('/status/:id', updateStatus);

//delete a Ingredient
router.delete('/:id', deleteIngredient);

// delete many Ingredient
router.patch('/delete/many', deleteManyIngredient);

// update many Ingredient
router.patch('/update/many', updateManyIngredient);

module.exports = router;
