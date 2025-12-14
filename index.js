const express = require("express");
const cors = require("cors");
const { dbCONN } = require("./database/db");

//Crear servidor
const app = express();

dbCONN();

//Configurar CORS para permitir solicitudes desde el frontend
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

app.use('/api', require('./routes/inventario'));


// app.get("/", (req, res) => {
//     // res.send("Hello world");
//     res.status(200).json({
//         success: true,
//         msg: 'OK'
//     });
// });

app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});