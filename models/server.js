import express from "express";
import cors from "cors";
import { router } from "../routes/user.route.js";
import { dbConnection } from "../database/config.js";
import { authRouter } from "../routes/auth.route.js";
import { categoriesRouter } from "../routes/categories.route.js";
import { productsRouter } from "../routes/products.route.js";
import { searchRouter } from "../routes/search.route.js";
import { uploadsRouter } from "../routes/uploads.route.js";
import fileUpload from "express-fileupload";
export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      users: "/api/usuarios",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/uploads",
    };

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

    // Fileupload Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.users, router);
    this.app.use(this.paths.categories, categoriesRouter);
    this.app.use(this.paths.products, productsRouter);
    this.app.use(this.paths.search, searchRouter);
    this.app.use(this.paths.uploads, uploadsRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto`, this.port);
    });
  }
}
