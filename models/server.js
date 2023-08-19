import express from "express";
import cors from "cors";
import { router } from "../routes/user.route.js";
import { dbConnection } from "../database/config.js";
import { authRouter } from "../routes/auth.route.js";
export class Server {
  constructor() {
    this.app = express();
    this.usuariosRoutePath = "/api/usuarios";
    this.authRoutePath = "/api/auth";
    this.port = process.env.PORT;

    // Conectar a Mongo
    this.conectarDB();

    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authRoutePath, authRouter);
    this.app.use(this.usuariosRoutePath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto`, this.port);
    });
  }
}
