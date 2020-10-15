function Personaje(value){
    this.nombre = value.nombre;
    this.nivel = value.nivel;
    this.vida = value.vida;
    this.vidaActual = value.vidaActual;
    this.enemigo = value.enemigo;
    this.heal = heal;
    this.ataques = value.ataques;
    this.atacar = atacar;
    
    function atacar(personajeAAtacar, nombreAtaque) {
        //Me fijo si nombreAtaque es igual a alguno de los nombres de mis ataques.
        // Por cada ataque reviso si es correcto sino dar aviso de que no coinciden
        for (var i = 0; i < this.ataques.length; i++) {
            // Reduzco la variable del plural al singular
            var ataque = this.ataques[i];
            console.log(value.nombre + ' ha usado ' + ataque.nombre);
            // Me fijo si el nombreAtaque es igual
            // al nombre de ataque de cada iteracion sino doy aviso de error
            if (nombreAtaque == ataque.nombre && personajeAAtacar.vidaActual > 0) {
                personajeAAtacar.vidaActual -= ataque.poderAtaque // Reducir vida del personaje atacado
                console.log(personajeAAtacar.nombre, personajeAAtacar.vidaActual)
                break;

            } else {
                //console.log('No seleccionaste ' + ataque.nombre + ', probá con otro ataque.') **PROBAR CON LA LINEA DE ABAJO**//
                $('#winModal').modal('show');
                clearInterval(mainTimerId);
                clearInterval(variableDecrementerTimerId);
                break;
            }
        }
    }
}

let miPersonaje = new Personaje({
    nombre: 'Krusty',
    nivel: 10,
    vida: 100,
    vidaActual: 100,
    enemigo: 'Ladron de hamburguesas',
    ataques:  [
        {
            nombre: 'puñetazo',
            poderAtaque: 15,
        },
        {
            nombre: 'patada',
            poderAtaque: 25,
        }
    ],
});


let Rival = new Personaje({
    nombre: 'Ladron de hamburguesas',
    nivel: 10,
    vida: 100,
    vidaActual: 100,
    enemigo: 'Krusty',
    ataques: [
        {
            nombre: 'patada',
            poderAtaque: 20
        },
        {
            nombre: 'puñetazo',
            poderAtaque: 25
        }
    ]
})

//Figura mensaje de vida restante del personaje que se ataco//

let enemyLife = document.getElementById("enemyLifeID")
let myLife = document.getElementById("myLifeID")

// ATAQUE AUTOMATICO DEL ENEMIGO // (Ataque del enemigo al atacar DESACIVADO, SOLO ataca automaticamente)

function attackEnemy() {
    enemyLife.value -= miPersonaje.ataques[0].poderAtaque;

    miPersonaje.atacar(Rival, 'puñetazo'); //Accion de ataque / Nombre del ataque //
    var combatLogUpdate = document.createElement("p");
    var enemyCombatLogText = document.createTextNode('Ataco con ' + miPersonaje.ataques[0].nombre + ' y ' + Rival.nombre + ' pierde ' + miPersonaje.ataques[0].poderAtaque + ' puntos de vida. Vida restante del enemigo: ' + Rival.vidaActual + '.');
    combatLogUpdate.appendChild(enemyCombatLogText);
    var newElement = document.getElementById("combatLog");
    newElement.appendChild(combatLogUpdate);
    combatLogScroll.scrollTop = combatLogScroll.scrollHeight;
}

document.getElementById("atacar").addEventListener("click", attackEnemy); //Boton de ataque en HTML / funcion de ataque //

function heal() {
    myLife.value += 10; //Curarme cierta cantidad de vida / PARTE GRAFICA //
    miPersonaje.vidaActual += 10; // Vida actual del personaje / Cantidad a curar //
    var healLogUpdate = document.createElement("p");
    var myHealthLogText = document.createTextNode('Comí una hamburguesa para curarme. Mi vida ahora es de ' + miPersonaje.vidaActual + '.');
    healLogUpdate.appendChild(myHealthLogText);
    var newElement = document.getElementById("combatLog");
    newElement.appendChild(healLogUpdate);
    combatLogScroll.scrollTop = combatLogScroll.scrollHeight;
}

document.getElementById("curar").addEventListener("click", heal); //Boton de curar en HTML / funcion de curar //

//Mostrar fecha de carga en la web//
var createLoadingDate = document.createElement("small");
var showDate = new Date($.now());
var displayDate = document.createTextNode("Pagina cargada el día "+showDate.getDate()+"-"+(showDate.getMonth()+1)+"-"+showDate.getFullYear()+" a las "+showDate.getHours()+":"+showDate.getMinutes()+":"+showDate.getSeconds());
createLoadingDate.appendChild(displayDate);
var newElementOnLoad = document.getElementById('loadedDate');
newElementOnLoad.appendChild(createLoadingDate);

//Ataque automatico del enemigo al cargar la página//

var mainTimerId, variableDecrementerTimerId;

function mainTimerHandler() {
  if (miPersonaje.vidaActual <= 0) {
    clearInterval(mainTimerId);
    clearInterval(variableDecrementerTimerId);
    $('#gameOverModal').modal('show');
  }
}

function decrementVariable() {
        Rival.atacar(miPersonaje, 'patada'),
        myLife.value -= Rival.ataques[0].poderAtaque,
        combatLogUpdate2 = document.createElement("p"),
        myCombatLogText = document.createTextNode(Rival.nombre + ' ataca con ' + Rival.ataques[0].nombre + ' y pierdo ' + Rival.ataques[0].poderAtaque + ' puntos de vida. Mi vida restante: ' + miPersonaje.vidaActual + '.'),
        combatLogUpdate2.appendChild(myCombatLogText),
        newElement = document.getElementById("combatLog");
        combatLogScroll.scrollTop = combatLogScroll.scrollHeight;
        newElement.appendChild(combatLogUpdate2);
        combatLogScroll.scrollTop = combatLogScroll.scrollHeight;
}

mainTimerId = setInterval(mainTimerHandler, 3000);
variableDecrementerTimerId = setInterval(decrementVariable, 3000);


//SCROLL AUTOMATICO AL FINAL DEL COMBATLOG//
var combatLogScroll = document.getElementById("combatLogTextArea");

//Modales de WIN y GAME OVER//
$('#winModal').modal({ show: false})
$('#gameOverModal').modal({ show: false})

//RELOAD//

$('#reloadWeb').click('reloadWeb', function () {
    location.reload();
   })

var content = document.querySelector('#apiContent')
function getData(){
    fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {
        console.log(data.results[0])
        apiContent.innerHTML = `
        <img src="${data.results[0].picture.large}" width="100px" class="img-fluid rounded-circle">
        <p>Nombre: ${data.results[0].name.first}</p>
        `
    })
}