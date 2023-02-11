require('colors');

const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();


const main = async()=>{
    //do while para hacer persistente el menu mientras tenga opcion diferente de cero-Salir
    let opt ='';
   do{
       //para obtener la opcion debo transformarla funcion mostrarMenu a una promesa para que me resuelva la opcion y obtenerla con un await en app.js
     opt= await mostrarMenu();
     console.log(opt);
     //debo hacer la pausa para que no siga el ciclo infinito. debo transformar la pausa en una promesa para hacer el await en app.js y poder hacer la pausa.

     if (opt !=='0'){
         await pausa();
     }

   }while (opt !== '0')
   

}

main();