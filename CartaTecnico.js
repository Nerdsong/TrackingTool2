class CartaTecnico{
    legajoTecnico = "";
    nombre = "";
    skill = "";
    horario = "";
    disponible = "";
    cartasGeneradas =[];

    constructor(legajo,nombre,skill,horario,disponible){
        this.legajoTecnico =legajo;
        this.nombre = nombre;
        this.skill = skill;
        this.horario = horario;
        this.disponible = disponible;
    }
}

export{CartaTecnico};