import { CartaTecnico } from "./CartaTecnico.js";

class GeneradorCartasTecnicos{
    cartasTecnicosGeneradas= [];

    generarCartasConTecnicosGenerados(listadoTecnicos){
        let i = 0;
        for( i = 0 ; i < listadoTecnicos.length; i++ ){
            this.cartasTecnicosGeneradas[i]= new CartaTecnico(listadoTecnicos[i].getLegajoTecnico(),
                listadoTecnicos[i].getNombre(),
                listadoTecnicos[i].getSkill(),
                listadoTecnicos[i].getHorario(),
                listadoTecnicos[i].getDisponible()
            )
        }
    }

    imprimirCartasTecnicos(){
        let i = 0;
        let horario_clase="";
        let dispo_tecnico="";
        document.querySelector("#contenido").innerHTML = "";
        for(i=0; i < this.cartasTecnicosGeneradas.length;i++){
            if(this.cartasTecnicosGeneradas[i].horario == "06:00 A 15:00" || this.cartasTecnicosGeneradas[i].horario == "6:00 A 15:00"){
                horario_clase = "horario_1";
            }
            else if(this.cartasTecnicosGeneradas[i].horario == "07:00 A 16:00" || this.cartasTecnicosGeneradas[i].horario == "7:00 A 16:00"){
                horario_clase = "horario_2";
            }
            else if(this.cartasTecnicosGeneradas[i].horario == "08:00 A 17:00" || this.cartasTecnicosGeneradas[i].horario == "8:00 A 17:00"){
                horario_clase = "horario_3";
            }
            else if(this.cartasTecnicosGeneradas[i].horario == "09:00 A 18:00" || this.cartasTecnicosGeneradas[i].horario == "9:00 A 18:00"){
                horario_clase = "horario_4";
            }
            else if(this.cartasTecnicosGeneradas[i].horario == "10:00 A 19:00"){
                horario_clase = "horario_5";
            }
            else{
                horario_clase = "horario_6";
            }

            if(this.cartasTecnicosGeneradas[i].disponible == "NO DISPONIBLE"){
                dispo_tecnico = "no_disponible";
            }
            else{
                dispo_tecnico="";
            }
            document.querySelector("#contenido").innerHTML += `
            <div class="row row-cols-1" id="${this.cartasTecnicosGeneradas[i].legajoTecnico}"> 
                <div class="card text-bg-dark ${dispo_tecnico} mb-3">
                    <div class="card-body">
                        <h6 class="card-title">${this.cartasTecnicosGeneradas[i].nombre}</h6><br>
                        <h6 class="card-title">${this.cartasTecnicosGeneradas[i].legajoTecnico}</h6></br>
                        <h6 class="card-title">${this.cartasTecnicosGeneradas[i].horario}</h6>
                        <p class="card-text">${this.cartasTecnicosGeneradas[i].skill}  ${this.cartasTecnicosGeneradas[i].disponible}</p>
                        <div class="${horario_clase}"><br></div>
                    </div>
                </div>
            </div>
                `
        }
    }
}

export {GeneradorCartasTecnicos};