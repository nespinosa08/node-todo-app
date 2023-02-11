// FUNCION PARA CREAR ARCHIVO DEONDE SE VAN A GUARDAR LAS TAREAS Y HACER PERSISTENTE
const fs = require('fs');

const path = './db/info.json'

const guardarDB = (data)=>{
    fs.writeFileSync(path, JSON.stringify(data))
}

const leerDB = ()=>{

    if (!fs.existsSync(path)){
        return null;
    }
    const trans = fs.readFileSync(path, {encoding:'utf-8'})
    // console.log(trans); 
    const data = JSON.parse(trans);
    //console.log(data);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
};
