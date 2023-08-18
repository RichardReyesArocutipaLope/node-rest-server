import express from "express";
import cors from "cors";
import { router } from "../routes/user.js";
export class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.usuariosRoutePath = "/api/usuarios";

    this.port = process.env.PORT;
    this.routes();
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
    this.app.use(this.usuariosRoutePath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto`, this.port);
    });
  }
}
