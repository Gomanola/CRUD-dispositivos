const mongoose = require('mongoose');

const connectionDB = async() => {
    try {
        await mongoose.connect('mongodb://192.168.1.108:27017/CRUD_Dispositivos');
        console.log('Connect DB!');

    } catch (error) {

        console.error(error);
        //el console log de errores es el throw, hace la funcion y ya no mas
        throw new Error('Error to connection the DB');
    
    }
}
//al trabajar con base de datos se ocupa modulo para exportar sin que sea visto
module.exports = connectionDB;