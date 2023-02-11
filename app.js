require('colors');

const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const { inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmacion,
  salirCrearTarea,
  mostrarListadoChecklist }
  = require('./helpers/inquirer');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();


const main = async()=>{
  let opt ='';
  const tareas = new Tareas(); // Inicializar la clase para un objeto vacio.
  
  const tareasDB =  leerDB();
  if (tareasDB){
    // Establecer las tareas desde DB
    tareas.cargarTareasFromArray(tareasDB)
  }
  //  await pausa();
  
  do{
     //do while para hacer persistente el menu mientras tenga opcion diferente de cero-Salir
       //para obtener la opcion debo transformarla funcion mostrarMenu a una promesa para que me resuelva la opcion y obtenerla con un await en app.js
      opt= await inquirerMenu();
      // console.log(opt);

      switch(opt){
        case '1':
          //crear tarea
          // se debe pedir un input ( con funcion general leerInput que sirve para pedir varias informaciones) al usuario para que indique la tarea 
          const salir = await salirCrearTarea();
          if (salir!=='0'){
            const desc = await  leerInput(`Descripcion de la ${'TAREA'.blue}`)
            tareas.crearTarea(desc); // Se crea la primera tarea y se agrega al listado

          }

          break;
        case '2':
          //Listar tarea
          //Mostrar las tareas como menu ( no es necesario). Se puede mostrar con un console.log
          // console.log(tareas.listadoArr);
          // console.log(tareas._listado);
          tareas.listadoCompleto();
          

          break;
        case '3':
          //Listar tareas completadas
          // mostrar las tareas como menu ( no es necesario). Se puede mostrar con un console.log
          // poner completadoEn=fecha de completado
          tareas.listadoPendientesCompletadas(true);

          break;
        case '4':
          //Listar tareas pendientes
          //Mostrar las tareas como menu ( no es necesario). Se puede mostrar con un console.log
          // publicar completadoEn = null
          tareas.listadoPendientesCompletadas(null);  

          break;
        case '5':
          //Mostrar las tareas como menu. Es necesario que sea interactivo para poder seleccionar (requiere el uso del inquire)
          //Completar tarea(s)
          // pasar en completadoEn de null a la fecha  e inverso
          const ids= await mostrarListadoChecklist(tareas.listadoArr);
          tareas.toogleCompletadas(ids);
          
          break;
        case '6':
          //Mostrar las tareas como menu. Es necesario que sea interactivo para poder seleccionar (requiere el uso del inquire)
          //Borrar tareas
          // Hacer delete de la tarea delecionada
          // Validacion en caso de cancelar la opcion de borrar
          const id = await listadoTareasBorrar(tareas.listadoArr);
          // console.log(id);
          if (id !== '0'){
          const ok = await confirmacion('¿Está seguro?');
            if (ok){
              tareas.borrarTarea(id);
            }
          }

          break;
        case '0':
          //Salir

          break;
        default:
          console.log('La opción seleccionada no es válida');

        }
    
  guardarDB(tareas.listadoArr);




     //debo hacer la pausa para que no siga el ciclo infinito. debo transformar la pausa en una promesa para hacer el await en app.js y poder hacer la pausa.
     if (opt !=='0'){
       await pausa();
     }

   }while (opt !== '0')
   

}

main();