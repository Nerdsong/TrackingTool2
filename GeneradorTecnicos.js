
import { Tecnico } from "./Tecnico.js";

class GeneradorDeTecnicos{
    tecnicosGenerados= [];
    legajos=[];

    leerYGeneradTecnicos(matrizDatos){
        let i = 0;
        for( i = 0 ; i < matrizDatos.length; i++ ){
            this.tecnicosGenerados[i]= new Tecnico();
            this.tecnicosGenerados[i].setLegajo(matrizDatos[i][1]);
            this.tecnicosGenerados[i].setNombre(matrizDatos[i][0]);
            this.tecnicosGenerados[i].setSkill(matrizDatos[i][2]);
            this.tecnicosGenerados[i].setHorario(matrizDatos[i][3]);
            this.tecnicosGenerados[i].setDisponible(matrizDatos[i][4]);
        };
        this.generarListadoConLegajos();
    }

    generarListadoConLegajos(){
        let i = 0 ;
        let dato = "";
        for(i=0; i< this.tecnicosGenerados.length;i++){
            dato = this.tecnicosGenerados[i].getLegajoTecnico();
            this.legajos.push(dato);
         }
    }

    getLegajos(){
        return this.legajos;
    }

}

export {GeneradorDeTecnicos};