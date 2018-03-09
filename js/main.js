// Objetos de cada personaje
//Images powered by Gema

const arrayPersonajes = [
    {
        nombre: "Elsa",
        ruta: "img/Elsa.png"
    },
    {
        nombre: "Anna",
        ruta: "img/Anna.png"
    },
    {
        nombre: "Campanilla",
        ruta: "img/Campanilla.png"
    },
    {
        nombre: "Genio",
        ruta: "img/Genio.png"
    },
    {
        nombre: "HadaMadrina",
        ruta: "img/HadaMadrina.png"
    },
    {
        nombre: "Kaa",
        ruta: "img/Kaa.png"
    },
    {
        nombre: "Mushu",
        ruta: "img/Mushu.png"
    },
    {
        nombre: "Pascal",
        ruta: "img/Pascal.png"
    },
    {
        nombre: "Pepito",
        ruta: "img/Pepito.png"
    },
    {
        nombre: "Primavera",
        ruta: "img/Primavera.png"
    },
    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel.png"
    },
    {
        nombre: "Flynn",
        ruta: "img/Flynn.png"
    }
]

const arrayPersonajes2 = [
    {
        nombre: "Elsa",
        ruta: "img/Elsa2.png"
    },
    {
        nombre: "Anna",
        ruta: "img/Anna2.png"
    },
    {
        nombre: "Campanilla",
        ruta: "img/Campanilla2.png"
    },
    {
        nombre: "Genio",
        ruta: "img/Genio2.png"
    },
    {
        nombre: "HadaMadrina",
        ruta: "img/HadaMadrina2.png"
    },
    {
        nombre: "Kaa",
        ruta: "img/Kaa2.png"
    },
    {
        nombre: "Mushu",
        ruta: "img/Mushu2.png"
    },
    {
        nombre: "Pascal",
        ruta: "img/Pascal2.png"
    },
    {
        nombre: "Pepito",
        ruta: "img/Pepito2.png"
    },
    {
        nombre: "Primavera",
        ruta: "img/Primavera2.png"
    },
    {
        nombre: "Rapunzel",
        ruta: "img/Rapunzel2.png"
    },
    {
        nombre: "Flynn",
        ruta: "img/Flynn2.png"
    }
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const winner = document.getElementById("winner");

rejilla.setAttribute("class","rejilla");
game.appendChild(rejilla);

const song = document.getElementById("song");
const clic = document.getElementById("clic");
const bounce = document.getElementById("bounce");
const win = document.getElementById("win");
const fail = document.getElementById("fail");
const contEliminar = document.getElementById("elimin");
const parejas = document.getElementById("parejas");

var contador = 0;
var primerSel = "";
var segundoSel = "";
var selPrevio = null;
var eliminados = 0;

var start = document.getElementById("start");
var reloj = document.getElementById("reloj");
var gameover = document.getElementById("game-over");

var segundos = 10;

// Función para barajar los div con cada personaje

function baraja() {
    const personajesDoble = arrayPersonajes.concat(arrayPersonajes2)
                            .sort(() => 0.5 - Math.random());

    personajesDoble.forEach(personaje => {
    const { nombre, ruta } = personaje;

    const tarjeta = document.createElement("div");  // Para cada personaje crea un div
    tarjeta.classList.add("tarjeta");               // de clase tarjeta,
    tarjeta.dataset.name = nombre;                  // el atributo dataset con cada uno de los personajes

    const anverso = document.createElement("div");
    anverso.classList.add("anverso");

    const reverso = document.createElement("div");
    reverso.classList.add("reverso");
    reverso.style.backgroundImage = `url(${ruta})`; // y de fondo la imagen

    rejilla.appendChild(tarjeta);
    tarjeta.appendChild(anverso);
    tarjeta.appendChild(reverso);
    });
    gameover.style.opacity = "0"; //Desaparece el gameover
    winner.classList.remove("open"); //Para que winner desaparezca
    rejilla.classList.remove("out"); //Baja la rejilla
    rejilla.classList.add("start");
    start.style.display = "none";
    reloj.style.display = "initial";
    song.play();
    eliminados = 0;
    reloj.style.color = "yellow";
    parejas.classList.add("start");

    reloj.classList.remove("intermitente");
    reloj.classList.remove("intermitente2");
    // contador = 0;
    // primerSel = "";
    // segundoSel = "";
    // selPrevio = null;
}

// Función de inicio del juego y reloj cuenta atrás

function startGame(){
    
    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice(-2);
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;

    if (eliminados === 24) {
        return;
    }

    if (segundos <= 10) {
        reloj.style.color = "#ff761b";
        reloj.classList.add("intermitente");
    }

    if (segundos <= 5) {
        reloj.style.color = "#f82d2d";
        reloj.classList.add("intermitente2");
    }

    if (segundos > 0) {
        var t = setTimeout(function(){
            startGame();
        },1000)
    } else {
        gameOver();
        reloj.classList.remove("intermitente");
        reloj.classList.remove("intermitente2");
    }
    segundos--; 
}

// Función para ejecutar la lógica de partida perdida

function gameOver(){
    console.log("ejecuto gameOver");
    segundos = 60; // 10 segundos de tiempo hasta que acaba el juego
    song.pause(); // Paursa la música
    song.currentTime = 0; // Para que la música vuelva a comenzar de cero
    fail.play();
    rejilla.classList.add("out"); // La rejilla sube hasta salir de la pantalla
    gameover.style.opacity = "1";
    start.style.display = "initial";
    reloj.style.display= "none";
    var tarjetas = document.querySelectorAll(".tarjeta");
    tarjetas.forEach(function(tarjeta){
        var n = parseInt(Math.random()*4);
        tarjeta.classList.add(`mov${n}`);
    });

    setTimeout(function(){
        while(rejilla.firstChild){
            rejilla.removeChild(rejilla.firstChild);
        }
    }, 1000);
}

// Evento clic para seleccionar cada personaje

rejilla.addEventListener("click",function(evento){
    clic.currentTime = 0;
    clic.play();

    var seleccionado = evento.target;

    if (seleccionado.nodeName === "SECTION" ||
     seleccionado.parentNode === selPrevio || 
     seleccionado.parentNode.classList.contains("eliminado")) { // Cuando el elemento seleccionado tenga ese nombre de nodo
        return;                                                     // return te saca del código, impidiendo que se ejecute la línea 79                 
    }
    if (contador < 2) { // Hace que solo puedan seleccionarse dos tarjetas a la vez
        contador++;
        if (contador === 1) {
            primerSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        } else {
            segundoSel = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado"); 
        }
            // console.log(primerSel, segundoSel);  

        if (primerSel !=="" && segundoSel !=="") {
            if (primerSel === segundoSel) {
                bounce.currentTime = 0;
                bounce.play();
                setTimeout(eliminar,600);
                setTimeout (resetSel,600);
                contEliminados();
                contEliminar.innerHTML/*+*/=eliminados/2;
            } else {
                setTimeout (resetSel,600);
                selPrevio = null;
            }
        }
        selPrevio = seleccionado.parentNode;
    }
});

// Función para eliminar los elementos coincidentes

var eliminar = function() {
    var seleccionados = document.querySelectorAll(".seleccionado");    
    seleccionados.forEach(elemento => {
        elemento.classList.add("eliminado");
    });
}

// Función para resetear los seleccionados después de 2 intentos

var resetSel = function() {
    contador = 0;
    primerSel = "";
    segundoSel = "";
    selPrevio = null; // Para que al fallar puedas vovler a pisar el segundo
    
    var seleccionados = document.querySelectorAll(".seleccionado"); // Quita la clase seleccionado a los que la tengan
    seleccionados.forEach(elemento => {
        elemento.classList.remove("seleccionado");
    });
}

// Función para contar los eliminados, y cuando lleguen a 24 ejecutar la lógica de aprtida ganada
var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length + 2;
    // console.log(eliminados);
    if (eliminados === 24) { // Número de cartas a emparejar
        console.log("ejecuto Winner");
        winner.classList.add("open"); // Aparece Winner!
        win.currentTime = 0; // Comienza la música de win
        win.play();
        segundos = 60;
        song.pause();
        song.currentTime = 0;
        rejilla.classList.add("out");
        start.style.display = "initial";
        reloj.style.display= "none";
        setTimeout(function(){
            while(rejilla.firstChild){
                rejilla.removeChild(rejilla.firstChild);
            }
        }, 1000);
    }
}