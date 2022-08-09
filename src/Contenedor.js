const fs = require('fs/promises');
const { mainModule } = require('process');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async getAll () {
        try {
            const objs = JSON.parse(await fs.readFile(this.archivo, 'utf-8'), null, 2);
            return objs;
        }
        catch(error) {
            console.log(error)
        }
    }

    async save(obj) {
        try {
            const objs = await this.getAll();
            let newId;
            
            if (objs.length == 0) {
                newId = 1;
            } else {
                newId = objs[objs.length - 1].id + 1;
            }
            
            const newObj = {id: newId, ...obj}
            objs.push(newObj)
             
            await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            return newId;
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        let objData;
        try {
            const objs = await this.getAll();
            const indexObj = objs.findIndex((o)=> o.id == id);

            if (indexObj == -1) {
                return 'Objeto no encontrado'
            } else {
                objData = {
                    producto: objs[indexObj].producto,
                    precio: objs[indexObj].precio}
            }
            return objData;

        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const objs = await this.getAll();
            const indexObj = objs.findIndex((o)=> o.id == id)
            
            if (indexObj == -1) {
                return 'Objeto no encontrado'
            } else {
                objs.splice(indexObj, 1)
            }

            await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            return 'Objeto eliminado'
        } catch (error) {
            return 'Error: No se pudo eliminar'
        }
    }

    async deleteAll() {
        try {
            const objs = await this.getAll();
            
            if (objs == undefined) {
                return 'No hay nada que eliminar'
            } else {
                await fs.writeFile(this.archivo, JSON.stringify([], null, 2))
                return 'Archivo reiniciado. Ya no hay elementos en el documento json'
            }
            
        } catch (error) {
            return 'Error: No se pudo eliminar'
        }
    }
}

module.exports = Contenedor;