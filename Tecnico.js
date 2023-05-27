class Tecnico{
    #legajoTenico = "";
    #nombre = "";
    #skill = "";
    #horario = "";
    #disponible = "";
    servicios=[0];

    getLegajoTecnico(){
        return this.#legajoTenico;
    }

    setLegajo(legajo){
        this.#legajoTenico = legajo;
    }

    getNombre(){
        return this.#nombre;
    }

    setNombre(nombre){
        this.#nombre = nombre;
    }

    getSkill(){
        return this.#skill;
    }

    setSkill(skill){
        this.#skill = skill;
    }

    getHorario(){
        return this.#horario;
    }

    setHorario(horario){
        this.#horario = horario;
    }

    getDisponible(){
        return this.#disponible;
    }

    setDisponible(disponible){
        this.#disponible = disponible;
    }


    /**
     * 
     * @param {Object} servicio 
     */
    setServicios(servicio){
        this.servicios.push(servicio);
    }
}

export {Tecnico}; 