import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true,
  },

  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  price: {
    type: Number,
    default: 0,
  },

  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },

  description: {
    type: String,
  },

  available: {
    type: Boolean,
    default: true,
  },
});

export const Product = model("Product", ProductSchema);
