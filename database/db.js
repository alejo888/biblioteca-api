const mongoose = require("mongoose");

//Conectar a la base de datos
const dbCONN = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.db_CONN);
        console.log("Conectado a la base de datos MongoDB");
    } catch (error) {
        console.log("Error", error);
        process.exit(1);
    }
}

module.exports = { dbCONN };