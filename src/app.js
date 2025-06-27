const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const PUERTO = process.env.PORT || 8080;
const path = require("path");
const authRoutes = require("./routes/authRoutes.js");
const reservaRoutes = require("./routes/reservaRoutes.js");
const cookieParser = require("cookie-parser");
require("moment/locale/es");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const Usuario = require("./models/user.model.js");

//CONFIGURACION PARA VARIABLES DE ENTORNO
const dotenv = require("dotenv");
dotenv.config();

//CONEXION A LA DB
const conectarDB = require("./config/database");
conectarDB();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// MIDDLEWARE PARA EXTRAER USUARIO DEL TOKEN Y PASAR A VISTAS
app.use(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await Usuario.findById(decoded.id);
      if (usuario) {
        req.usuario = usuario;
        res.locals.usuario = usuario;
      } else {
        res.locals.usuario = null;
      }
    } catch (err) {
      res.locals.usuario = null;
    }
  } else {
    res.locals.usuario = null;
  }
  next();
});

//EXPRESS-HANDLEBARS
const hbs = exphbs.create({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    formatearFecha: function (fecha) {
      return (
        moment(fecha).locale("es").format("D [de] MMMM YYYY, HH:mm") + "hs"
      );
    },
    eq: function (a, b) {
      return a === b;
    },
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// RUTAS
app.use("/", authRoutes); // Ahora las rutas serán /auth/register y /auth/login
app.use("/reservas", reservaRoutes); //

//LISTEN
app.listen(PUERTO, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
});
