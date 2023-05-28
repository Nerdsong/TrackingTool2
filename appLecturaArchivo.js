class DatosLectura{
    datos="";
    datosTecnicos="";
    datosCSV = ``;
datosTecnicosCSV = 
``;

    getDatosCSV(){
        return this.datosCSV;
    }

    setDatosCSV(datos){
        this.datosCSV = datos;
    }

    getDatosTecnicosCSV(){
        return this.datosTecnicosCSV;
    }
    setDatosTecnicosCSV(datos){
        this.datosTecnicosCSV = datos;
    }

    convertirDatos(){
        this.datos = Papa.parse(this.datosCSV).data; 
        this.datosTecnicos = Papa.parse(this.datosTecnicosCSV).data;
    }

    ordenarDatos(){};

}
export {DatosLectura};