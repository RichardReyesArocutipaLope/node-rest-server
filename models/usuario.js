import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "la contraseña es obligatoria"],
  },

  img: {
    type: String,
  },

  role: {
    type: String,
    required: [true],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  state: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

export const User = model("User", UsuarioSchema);
