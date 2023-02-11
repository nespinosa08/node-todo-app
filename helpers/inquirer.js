const inquirer = require ('inquirer');
const Tarea = require('../models/tarea');
require('colors');


const inquirerMenu = async()=>{
    // console.clear();
    console.log('======================'.blue)
    console.log('Seleccione una opción'.yellow)
    console.log('======================\n'.blue)

    const preguntas = [
        {
            type:'list',
            name:'opcion',
            message:'¿Que desea hacer?',
            choices:[
                {
                    value: '1',
                    name: `${'1.'.blue} Crear tarea`
                },
                {
                    value: '2',
                    name: `${'2.'.blue} Listar tareas`
                },
                {
                    value: '3',
                    name: `${'3.'.blue} Listar tareas completadas`
                },
                {
                    value: '4',
                    name: `${'4.'.blue} Listar tareas pendientes`
                },
                {
                    value: '5',
                    name: `${'5.'.blue} Completar tarea(s)`
                },
                {
                    value: '6',
                    name: `${'6.'.blue} Borrar tareas`
                },
                {
                    value: '0',
                    name: `${'0.'.blue} Salir`
                }
               ] // Puede ser arrego de sring o arreglo de objetos para dar un valor
    
        }
    ]

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

}



const pausa = async ()=>{
    console.log('\n');
    
    const preguntas = {
        type:'input',
        name:'pausa',
        message:`Presione ${'ENTER'.blue} para continuar`,
    }

    const pausa = await inquirer.prompt(preguntas);
    return pausa;
}

//Funcion general para pedir info al usuario
const leerInput = async (message)=>{
    const preguntas = {
        type:'input',
        name:'desc',
        message,    /* `Indique la descripcion de la ${'TAREA'.blue}` */
        validate( value ){
            if (value.length===0){
                return 'Descripcion no valida, Por favor ingrese un valor'
            }
            return true
        }
    }
    const {desc} = await inquirer.prompt(preguntas);
    return desc;
}

const listadoTareasBorrar = async(tareas=[])=>{
    
    conta=0
    const choices = tareas.map(tarea=>{
        conta++
        return {
            value: tarea.id,
            name: `${conta}. ${tarea.desc}`
        }
    })
// Para agrgar la opcion de cancelar la accion de borrar
choices.unshift(
    {
        value: '0',
        name: `0. Salir`
    }
    );

    // console.log(choices);

    const preguntas = [
        {type: 'list' ,
        name: 'id',
        message:'Seleccione la tarea que desea borrar',
        choices, 
        
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
    
    

}

const confirmacion = async(message)=>{
    const preguntas = [
        {type: 'confirm' ,
        name: 'ok',
        message,       
        }
    ]
    const {ok} = await inquirer.prompt(preguntas);
    return ok;

}
const salirCrearTarea = async()=>{
    const preguntas = [
        {type: 'list' ,
        name: 'salir',
        message: 'Que desea hacer'       ,
        choices:[
            {
                value: '0',
                name: 'Volver a menu anterior'
            },
            {
                value: '1',
                name: 'Crear tarea'
            }
        ]
        }
    ]
    const {salir} = await inquirer.prompt(preguntas);
    return salir;

}

const mostrarListadoChecklist = async(tareas=[])=>{
    
    conta=0
    const choices = tareas.map(tarea=>{
        conta++
        return {
            value: tarea.id,
            name: `${conta}. ${tarea.desc}`,
            checked: (tarea.completadoEn)? true : false
        }
    })

    const preguntas = [
        {type: 'checkbox' ,
        name: 'ids',
        message:'Seleccione',
        choices, 
        
        }
    ]

    const {ids} = await inquirer.prompt(preguntas);
    return ids;
    
    

}

module.exports ={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmacion,
    salirCrearTarea,
    mostrarListadoChecklist
}





