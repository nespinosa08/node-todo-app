const Tarea = require("./tarea");

class Tareas {
    _listado = {}; // con _ para indicar qeu es uns propiedad privada


    get listadoArr(){
        const listado=[];
        Object.keys(this._listado).forEach(k=>{
            const tarea = this._listado[k]
            listado.push(tarea);
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    crearTarea(desc){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas=[]){
        tareas.forEach(tarea=>{
            this._listado[tarea.id]=tarea;
        })
    }

    listadoCompleto(){
        console.log();
        let conta=0;
        this.listadoArr.forEach((tarea)=>{
            conta++;
            // console.log(ite)
            console.log(`${conta.toString().blue}. ${tarea.desc} :: ${(tarea.completadoEn)? 'Completado'.green : 'Pendiente'.red}`)
        })
    }

    listadoPendientesCompletadas(completadoEn){
        console.log();
        // if(completadoEn){
        //     const completadoArray = this.listadoArr.filter(tarea=>(tarea.completadoEn));
        //     console.log(completadoArray);
        //     let cont=0;
        //     completadoArray.forEach((elem, index) =>{
        //         cont=index+1;
        //         console.log(`${cont.toString().blue}. ${elem.desc} :: ${'Completado'.green}`)
        //     })
        // }else{
        //     const  pendienteArray = this.listadoArr.filter(tarea=>(!tarea.completadoEn));
        //     console.log(pendienteArray);
        //     let cont=0;
        //     pendienteArray.forEach((elem, index) =>{
        //         cont=index+1;
        //         console.log(`${cont.toString().red}. ${elem.desc} :: ${'Pendiente'.red}`)
        //     })
        // }        
        let conta=0;
        if (completadoEn){//TRUE-LISTAR COMPLETADOS (OPCION 3)
            this.listadoArr.forEach(tarea=>{
                if(tarea.completadoEn){
                    conta++
                    console.log(`${conta.toString().blue}. ${tarea.desc} :: ${('Completado. Fecha: '+tarea.completadoEn).green}`)
                }
            })
        }else{//FALSE-LISTAR PENDIENTES (OPCION 4)
            this.listadoArr.forEach(tarea=>{
                if(!tarea.completadoEn){
                    conta++
                    console.log(`${conta.toString().blue}. ${tarea.desc} :: ${'Pendiente'.red}`)
                }
            })
        }

    }
    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id];
            console.log('Tarea borrada exitosamente');
        }
    }

    toogleCompletadas(ids=[]){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })
        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                tarea.completadoEn=null;
            }
        })
    }




}

module.exports = Tareas;