import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
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
});

export const Category = model("Category", CategorySchema);
