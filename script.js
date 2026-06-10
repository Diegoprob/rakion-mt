```javascript
let jugadores =
    JSON.parse(localStorage.getItem("rakionJugadores")) || [
        "Diego",
        "Juan",
        "Razzo",
        "Golemcito",
        "Gerardo",
        "Maseku"
    ];

const listaJugadores = document.getElementById("listaJugadores");
const participantesDiv = document.getElementById("participantes");
const bombosContainer = document.getElementById("bombosContainer");

const equipoA = document.getElementById("equipoA");
const equipoB = document.getElementById("equipoB");

const ruleta = document.getElementById("ruleta");

function guardarJugadores(){
    localStorage.setItem(
        "rakionJugadores",
        JSON.stringify(jugadores)
    );
}

function renderJugadores(){

    listaJugadores.innerHTML = "";

    jugadores.forEach((nombre,index)=>{

        const div = document.createElement("div");

        div.className = "jugador-item";

        div.innerHTML = `
            <span>${nombre}</span>

            <button
                class="eliminar"
                onclick="eliminarJugador(${index})"
            >
                Eliminar
            </button>
        `;

        listaJugadores.appendChild(div);

    });

    renderParticipantes();
}

function eliminarJugador(index){

    jugadores.splice(index,1);

    guardarJugadores();

    renderJugadores();

}

document
.getElementById("btnAgregar")
.addEventListener("click",()=>{

    const input =
        document.getElementById("nuevoJugador");

    const nombre = input.value.trim();

    if(nombre==="") return;

    jugadores.push(nombre);

    guardarJugadores();

    input.value="";

    renderJugadores();

});

function renderParticipantes(){

    participantesDiv.innerHTML = "";

    jugadores.forEach(nombre=>{

        const div = document.createElement("div");

        div.className = "participante";

        div.innerHTML = `
            <input
                type="checkbox"
                class="chkJugador"
                value="${nombre}"
            >

            <span>${nombre}</span>

            <select class="bombo">
                <option value="">Bombo</option>
                <option value="1">Bombo 1</option>
                <option value="2">Bombo 2</option>
                <option value="3">Bombo 3</option>
                <option value="4">Bombo 4</option>
                <option value="5">Bombo 5</option>
            </select>
        `;

        participantesDiv.appendChild(div);

    });

}

function mezclar(arr){

    return [...arr].sort(
        ()=>Math.random()-0.5
    );

}

async function animarRuleta(opciones){

    return new Promise(resolve=>{

        let vueltas = 0;

        const intervalo = setInterval(()=>{

            const random =
                opciones[
                    Math.floor(
                        Math.random()*opciones.length
                    )
                ];

            ruleta.innerText = random;

            vueltas++;

            if(vueltas > 25){

                clearInterval(intervalo);

                const ganador =
                    opciones[
                        Math.floor(
                            Math.random()*opciones.length
                        )
                    ];

                ruleta.innerText =
                    "🏆 " + ganador;

                resolve(ganador);

            }

        },120);

    });

}

document
.getElementById("btnSortear")
.addEventListener(
"click",
async ()=>{

    equipoA.innerHTML="";
    equipoB.innerHTML="";

    const checks =
        document.querySelectorAll(".participante");

    let bombos = {};

    checks.forEach(item=>{

        const activo =
            item.querySelector("input").checked;

        const nombre =
            item.querySelector("input").value;

        const bombo =
            item.querySelector("select").value;

        if(activo){

            if(bombo===""){
                return;
            }

            if(!bombos[bombo]){
                bombos[bombo]=[];
            }

            bombos[bombo].push(nombre);
        }

    });

    const equipo1 = [];
    const equipo2 = [];

    const ordenBombos =
        Object.keys(bombos).sort();

    for(const b of ordenBombos){

        const jugadoresBombo =
            bombos[b];

        if(jugadoresBombo.length !== 2){

            alert(
              "Cada bombo debe tener exactamente 2 jugadores."
            );

            return;
        }

        const ganador =
            await animarRuleta(
                jugadoresBombo
            );

        const perdedor =
            jugadoresBombo.find(
                x=>x!==ganador
            );

        equipo1.push(ganador);
        equipo2.push(perdedor);

    }

    equipo1.forEach(j=>{

        const li =
            document.createElement("li");

        li.textContent=j;

        equipoA.appendChild(li);

    });

    equipo2.forEach(j=>{

        const li =
            document.createElement("li");

        li.textContent=j;

        equipoB.appendChild(li);

    });

});
renderJugadores();
```
