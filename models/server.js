import express from "express";

export class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.port = process.env.PORT;
    this.routes();
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto`, this.port);
    });
  }
}
