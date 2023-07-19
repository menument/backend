const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    //name: {
    //  type: Object,
    //  required: true,
    //},
    name: {
      type: String,
      required: true,
    },
    name_en: {
      type: String,
      required: true,
    },
    name_es: {
      type: String,
      required: true,
    },
    name_fr: {
      type: String,
      required: true,
    },
   // description: {
   //   type: Object,
   //   required: false,
   // },
   // slug: {
   //   type: String,
   //   required: false,
   // },
   // parentId: {
   //   type: String,
   //   required: false,
   // },
   // parentName: {
   //   type: String,
   //   required: false,
   // },
   // id: {
   //   type: String,
   //   required: false,
   // },
   // icon: {
   //   type: String,
   //   required: false,
   //  },
   //7 status: {
   //  type: String,
   //  lowercase: true,
   //   enum: ['show', 'hide'],
   //   default: 'show',
   /// },
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

// module.exports = categorySchema;

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
