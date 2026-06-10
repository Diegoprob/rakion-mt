const jugadoresBase = [
    "Diego",
    "Juan",
    "Razzo",
    "Golemcito",
    "Gerardo",
    "Maseku"
];

const contenedor = document.getElementById("jugadores");

jugadoresBase.forEach(nombre => {

    const div = document.createElement("div");
    div.className = "jugador";

    div.innerHTML = `
        <input type="checkbox" value="${nombre}">
        <span>${nombre}</span>

        <select>
            <option value="">Bombo</option>
            <option value="1">Bombo 1</option>
            <option value="2">Bombo 2</option>
            <option value="3">Bombo 3</option>
            <option value="4">Bombo 4</option>
            <option value="5">Bombo 5</option>
        </select>
    `;

    contenedor.appendChild(div);

});

function mezclar(array){
    return array.sort(() => Math.random() - 0.5);
}

function crearSorteo(){

    let seleccionados = [];

    document.querySelectorAll(".jugador").forEach(jugador => {

        const check = jugador.querySelector("input");
        const bombo = jugador.querySelector("select").value;

        if(check.checked){

            if(bombo === ""){
                alert("Todos los jugadores deben tener bombo");
                return;
            }

            seleccionados.push({
                nombre: check.value,
                bombo: bombo
            });
        }
    });

    if(seleccionados.length % 2 !== 0){
        alert("Debe haber cantidad par de jugadores");
        return;
    }

    let bombos = {};

    seleccionados.forEach(j => {

        if(!bombos[j.bombo]){
            bombos[j.bombo] = [];
        }

        bombos[j.bombo].push(j.nombre);

    });

    let equipoA = [];
    let equipoB = [];

    for(let bombo in bombos){

        let jugadores = mezclar(bombos[bombo]);

        if(jugadores.length !== 2){
            alert(
                `El bombo ${bombo} debe tener exactamente 2 jugadores`
            );
            return;
        }

        equipoA.push(jugadores[0]);
        equipoB.push(jugadores[1]);
    }

    document.getElementById("resultado").innerHTML = `
        <div class="equipos">

            <div class="equipo">
                <h2>Equipo Azul</h2>
                ${equipoA.map(j=>`<p>${j}</p>`).join("")}
            </div>

            <div class="equipo">
                <h2>Equipo Rojo</h2>
                ${equipoB.map(j=>`<p>${j}</p>`).join("")}
            </div>

        </div>
    `;
}