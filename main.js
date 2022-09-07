// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivoId = null;


//apuntando a documento HTML
let mostrarMovimientos = document.getElementById(`movimientos`)
let mostrarAciertos = document.getElementById(`aciertos`);
let mostrarTiempo = document.getElementById(`t-restante`);

// generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);
funcionConRetraso();

//funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}
//Mostrar tarjetas al inicio
function funcionConRetraso(id){
    for (let i=0; i<30; i++){
        tarjeta1 = document.getElementById(i);
        primerResultado = numeros [i];
        tarjeta1.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;
    }
    setTimeout(function(){
        for(let i=0; i<30; i++){
            tarjeta1 = document.getElementById(i);
            primerResultado = numeros [i];
            tarjeta1.innerHTML="";
        }
    }, 4000);
}

// funcion principal
function destapar(id){

    if (temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros [id];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;

        // desabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros [id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="">`;

        //deshabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;


        if(primerResultado == segundoResultado){
            // Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentor aciertos
            aciertos++;
            mostrarAciertos.innerHTML = ` Aciertos: ${aciertos}`;

            if(aciertos ==8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`
                mostrarTiempo.innerHTML  = `Fantastico! Demoraste${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`
            }
        }else{
            // Mostrar momentaneamentes valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ` `;
                tarjeta2.innerHTML = ` `;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false ;
                tarjetasDestapadas = 0;
            },600);
        }
    }
}

