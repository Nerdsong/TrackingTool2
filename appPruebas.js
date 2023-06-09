
import { GeneradorDeServicios } from "./GeneradorDeServicios.js";
import { GeneradorDeTecnicos } from "./GeneradorTecnicos.js";
import { GeneradorCartasTecnicos } from "./GeneradorCartaTecnico.js";
import { GeneradorCartasServicios } from "./GeneradorCartaServicio.js";
import { Servicio } from "./Servicio.js";
import { DatosLectura } from "./appLecturaArchivo.js";


const drop_dom_element_1 = document.getElementById("drop_dom_element_1");
const drop_dom_element_2 = document.getElementById("drop_dom_element_2");
let datosCSV_1 = "";
let datosCSV_2 = "";

// Este es el manejador de eventos que se activa cuando se suelta un archivo en el área de "drop" 1
async function handleDropAsync_1(e) {
  e.stopPropagation();
  e.preventDefault();
  
  e.target.classList.add("drop")

  const f = e.dataTransfer.files[0]; // Se obtiene el archivo que se ha soltado
  const data = await f.arrayBuffer(); // Se convierte el archivo en un ArrayBuffer
  const workbook = XLSX.read(data); // Se lee el archivo de Excel con la biblioteca XLSX
  
  // Convertir la primera hoja de cálculo en formato CSV y guardarla en la variable datosCSV_1
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  datosCSV_1 = csv;
  
  console.log("Datos CSV 1:", datosCSV_1);
}

// Este es el manejador de eventos que se activa cuando se suelta un archivo en el área de "drop" 2
async function handleDropAsync_2(e) {
  e.stopPropagation();
  e.preventDefault();

  e.target.classList.add("drop")
  
  const f = e.dataTransfer.files[0]; // Se obtiene el archivo que se ha soltado
  const data = await f.arrayBuffer(); // Se convierte el archivo en un ArrayBuffer
  const workbook = XLSX.read(data); // Se lee el archivo de Excel con la biblioteca XLSX
  
  // Convertir la primera hoja de cálculo en formato CSV y guardarla en la variable datosCSV_2
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  datosCSV_2 = csv;
  
  console.log("Datos CSV 2:", datosCSV_2);

  aplicacionEjecutable();
}

// Estos son los manejadores de eventos que se activan cuando se arrastra un archivo sobre las áreas de "drop"
function handleDragEnter(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.add("dragover");
}

function handleDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
}

function handleDragLeave(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.remove("dragover");
}

function resetBox(){
    datosCSV_2 = "";
    drop_dom_element_2.classList.remove("drop");
    drop_dom_element_2.classList.remove("dragover");
}

// Aquí se registran los manejadores de eventos que se activan cuando se suelta un archivo en las áreas de "drop"
drop_dom_element_1.addEventListener("drop", handleDropAsync_1, false);
drop_dom_element_1.addEventListener("dragenter", handleDragEnter, false);
drop_dom_element_1.addEventListener("dragleave", handleDragLeave, false);

drop_dom_element_2.addEventListener("drop", handleDropAsync_2, false);
drop_dom_element_2.addEventListener("dragenter", handleDragEnter, false);
drop_dom_element_2.addEventListener("dragleave", handleDragLeave, false);






function aplicacionEjecutable(){
    let datosLectura = new DatosLectura();
    let generadorTecnicos = new GeneradorDeTecnicos();
    let generadorServicios = new GeneradorDeServicios();
    let generadorCartasT = new GeneradorCartasTecnicos();
    let generadorCartasS = new GeneradorCartasServicios();
    let botonCartas ;

    datosLectura.setDatosCSV(datosCSV_2);
    datosLectura.setDatosTecnicosCSV(datosCSV_1);
    datosLectura.convertirDatos()
    generadorTecnicos.leerYGeneradTecnicos(datosLectura.datosTecnicos);
    generadorServicios.leerYGenerarServicios(datosLectura.datos);
    generadorCartasT.generarCartasConTecnicosGenerados(generadorTecnicos.tecnicosGenerados);

    let i = 0;
    let p = 0;

    for(p=0; p < generadorTecnicos.tecnicosGenerados.length; p++){
        for(i=0; i < generadorServicios.serviciosGenerados.length; i++){
            if(generadorTecnicos.tecnicosGenerados[p].getLegajoTecnico() == generadorServicios.serviciosGenerados[i].getLegajoServicio()){
                generadorTecnicos.tecnicosGenerados[p].setServicios(generadorServicios.serviciosGenerados[i]);
            }
            else{};
        };
    };

    generadorCartasT.imprimirCartasTecnicos();
    generadorCartasS.imprimirCartasServiciosGeneradas(generadorTecnicos.getLegajos(),generadorServicios.serviciosGenerados);

    function imprimirServiciostécnico(tecnico){
        console.log(tecnico.servicios);
    } 

    for(p=0; p < generadorTecnicos.tecnicosGenerados.length; p++){
        imprimirServiciostécnico(generadorTecnicos.tecnicosGenerados[p]);
    }

    
    botonCartas = document.querySelectorAll(".card-active");
    var inputAuxiliar = document.getElementById("clipboard_data");
    var botonAux = document.getElementById("botonAux");
    var clipboard = new ClipboardJS(".btn");

    botonCartas.forEach(function (tarjeta){

      tarjeta.addEventListener('click', function (evento){
        let SRDelDOM = evento.currentTarget.id;
        copiarDataAlPortaPapeles(generadorServicios.serviciosGenerados,SRDelDOM,botonAux,inputAuxiliar);
      });
    }
    );
    



    function copiarDataAlPortaPapeles(arrayConServiciosObjetos,tarjeta,botonAux,inputAuxiliar){
      var tiempoDelTimer = document.querySelector("#velocidadCopy").value;
      var tiempoDelTimer2 = tiempoDelTimer * 0.25;
      console.log(tiempoDelTimer);
      let SRDesdeElDom = tarjeta;
      let iterador = 0;
      let SRDeBusqueda = arrayConServiciosObjetos[iterador].getSR();
    

      //Acá estaría buscando la SR en la "base de datos" que coincida con la SR que obtuvimos del elemento al que se le hizo click
        while(SRDesdeElDom != SRDeBusqueda){
          iterador ++;
          SRDeBusqueda = arrayConServiciosObjetos[iterador].getSR();
        }
      //luego de obtener el indice guardamos la info ya que se trata de un objeto 
      let ObjetoConDatosParaCopiarAlPortaPapeles = arrayConServiciosObjetos[iterador];
     //se ejecutan los getters del objeto para extraer la informacion del servicio. 

      let SR = ObjetoConDatosParaCopiarAlPortaPapeles.getSR();
      let task = ObjetoConDatosParaCopiarAlPortaPapeles.getTask();
      let atm = ObjetoConDatosParaCopiarAlPortaPapeles.getServiceTag();
      let fecha = ObjetoConDatosParaCopiarAlPortaPapeles.getScheduleStart();
      let legajo = ObjetoConDatosParaCopiarAlPortaPapeles.getLegajoServicio();
      let separador = `⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧\n${ObjetoConDatosParaCopiarAlPortaPapeles.getNombreDelSitio()}`;
      var timer;
      var timer2;
      var retrasoDelClicker;
    
      let datosParaElPortaPapeles = [separador,legajo,fecha,atm,task,SR];
  
      repetirClicks(datosParaElPortaPapeles,inputAuxiliar,botonAux,timer,timer2,tiempoDelTimer,tiempoDelTimer2);

    }



    resetBox();

}


//---------------------Estas funciones se encargan de copiar al clipboard los datos del array con la informacion del servicio, deberían ir como objetos de momento los mantendré como funciones para optimizar tiempo
function repetirClicks(datos,inputAuxiliar,botonAux,timer,timer2,tiempoDelTimer,tiempoDelTimer2){
  var iterador2 = 0;
  //aqui seteo un intervalo de tiempo para que la funcion se ejecute cada cierto tiempo, creo que el tiempo obtimo viene siendo 350ms, lo quiero bajar despues.
  timer = setInterval(function() {
    //luego igualo el input desde donde se copianlos valores al clipboard basandome en la variable de iteracion para tomarlo como indice del array con los datos.
    inputAuxiliar.value = datos[iterador2];
    //inicio una funcion con timeout(retraso) de 50ms para dar tiempo a que el input se actualice, debe ser menor al intervalo anterior para que pueda contenerla.
    timer2 = setTimeout(function(){
      agregarAlClipboard(iterador2, inputAuxiliar, botonAux,timer2);
      iterador2 ++;
      if(iterador2 == 6){
        detenerRepetidorDeClicks(timer);
        iterador2 = 0;
      }
      else{}
      },tiempoDelTimer2)
    
    }
  ,tiempoDelTimer);
}

function detenerRepetidorDeClicks(timer){
  clearInterval(timer);
}

// esta funcion pude simplificarla evitando el uso de un switch y limitandome a que el aumento de la variable iterador se haga afuera. Ahora solo debe evaluar una condicion en lugar de 6
function agregarAlClipboard(iterador2, inputAuxiliar,botonAux,timer2){
  
  if(iterador2 < 5){
    botonAux.click();
    clearTimeout(timer2);
  }
  else{
    botonAux.click()
    clearTimeout(timer2)
    inputAuxiliar.value = "INFO  COPIADA ✔"
  }
}

//-----------------------------------------------------------

document.getElementById("ir-arriba").addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", function() {
    var boton = document.getElementById("ir-arriba");
    if (window.scrollY > 200) {
      boton.style.display = "block";
    } else {
      boton.style.display = "none";
    }
  });

export {aplicacionEjecutable}
