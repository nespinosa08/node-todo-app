require('colors');

const mostrarMenu =()=>{

    return new Promise((resolve, reject)=>{

        console.clear();
        console.log('======================'.blue)
        console.log('Seleccione una opción'.yellow)
        console.log('======================\n'.blue)
    
        console.log(`${'1.'.green} Crear tarea`)
        console.log(`${'2.'.green} Listar tareas`)
        console.log(`${'3.'.green} istar tareas completadas`)
        console.log(`${'4.'.green} Listar tareas pendientes`)
        console.log(`${'5.'.green} Completar tarea(s)`)
        console.log(`${'6.'.green} Borrar tarea(s)`)
        console.log(`${'0.'.green} Salir\n`)
    
        // para solicitar la opcion al usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Seleccione una opcion'+' ', (opt)=>{
            //console.log(opt);
            readline.close();
            resolve(opt);
        })

    })
}

const pausa= ()=>{
    return new Promise((resolve, reject)=>{
        // console.clear();
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\nPresione ${'ENTER'.blue} para continuar`, ()=>{
            readline.close();
            resolve();
        })

    })


}




module.exports = {
    mostrarMenu,
    pausa
}