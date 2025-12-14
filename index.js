import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import FileStoreInit from "session-file-store";
import flash from "express-flash";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

// Inicialização do app Express
const app = express();

// Configura paths corretos para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexão com o banco de dados
import conn from "./db/conn.js";

// Importa models
import Vibe from "./models/Vibe.js";
import User from "./models/User.js";

// IMporta rota
import vibesRoutes from './routes/vibesRoutes.js'
import authRoutes from './routes/authRoutes.js'

// import controller
import VibesController from "./controllers/VibesController.js";


// Inicialização do FileStore para sessões
const FileStore = FileStoreInit(session);

// Configuração do Handlebars como template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Middleware para tratar dados de formulários e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configuração da sessão com armazenamento em arquivo
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {}, // desativa logs
      path: path.join(os.tmpdir(), "sessions"), // usa pasta temp do SO
    }),
    cookie: {
      secure: false, // HTTP (não HTTPS)
      maxAge: 3600000, // validade da sessão
      httpOnly: true, // impede acesso via JS no frontend
    },
  })
);

// Middleware de mensagens flash
app.use(flash());

// Middleware para disponibilizar a sessão na view
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});


// Rota
app.use('/', authRoutes)
app.use('/Vibes', vibesRoutes)

app.get('/', VibesController.showVibes)

// Conexão com o banco e inicialização do servidor
conn
  .sync()
  .then(() => {
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((err) => console.log(err));
