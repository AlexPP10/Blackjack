/** 
* 2C = Two of Cubs (Tréboles)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Picas)
*/


let deck= [];

const cartas=['C','D','H','S'];
const figuras=['A','J','Q','K'];

let puntosJugador=0, puntosComputadora=0;

const btnPedir=document.querySelector('#btnPedir');

const btnDetener=document.querySelector('#btnDetener');

const divJugadorCartas=document.querySelector('#jugador-cartas');

const divComputadoraCartas=document.querySelector('#computadora-cartas');



const puntosHTML=document.querySelectorAll('small');



const crearDeck = () => {
    for (let i=2; i<=10; i++){
        for (let letra of cartas){
            deck.push(i+letra)
        }
    }
    for (let letra of cartas){
        for (let figura of figuras){
            deck.push(figura+letra)
        }
        
    }
    // console.log('crearDeck',deck, deck.length );

    deck=_.shuffle(deck);
    console.log('crearDeck-shuffle',deck, deck.length );

    return deck;
}



crearDeck(deck);

// Esta función me permite pedir una carta de la baraja

const pedirCarta=() =>{

    if(deck.length === 0){
        throw 'No hay cartas';
    }
    return deck.pop();
}
// let carta = pedirCarta();
// console.log({carta});

console.log('documeto',deck);

const valorCarta = (carta) => {

    const valor=carta.substring(0, carta.length-1);
    let puntos=0;

/*     if(carta.length===2){
        
        if(carta[0]==='A'){
            valor=11;
        }else if(['J','Q','K'].includes(carta[0])){
            valor=10;
        }else{
            valor=carta[0];
        }
    }else if(carta.length===3){
        valor=(carta[0]+carta[1]);
    } */

    if(isNaN(valor)){
        puntos=(valor==='A') ? 11:10;
    }else{
        puntos=valor*1;
    }


    console.log('valorCarta', carta, puntos);
    return puntos;

    
}

// valorCarta(carta);

// Turno computadora

const turnoComputadora = (puntosMinimos) =>{

   do{
        let carta = pedirCarta();
    
        const imgCarta=document.createElement('img');
        imgCarta.src=`./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
    
        divComputadoraCartas.append(imgCarta);
        puntosComputadora+=valorCarta(carta);

        puntosHTML[1].innerText=puntosComputadora;

        if(puntosMinimos>21){
            break;
        }

    } while ((puntosComputadora<puntosMinimos) && (puntosMinimos<=21)) ;

    btnDetener.disabled=true;
}



// Eventos

btnPedir.addEventListener('click', () => {
    let carta = pedirCarta();
    // console.log(carta);

    const imgCarta=document.createElement('img');
    imgCarta.src=`./assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divJugadorCartas.append(imgCarta);

    puntosJugador+=valorCarta(carta);
    // console.log(puntosJugador);

    puntosHTML[0].innerText=puntosJugador;

    if (puntosJugador>21){
        console.warn('Lo siento, perdiste');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador==21){
        console.log('Ganaste!!!');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }   

});


btnDetener.addEventListener('click', ()=>{
    turnoComputadora(puntosJugador);
    btnPedir.disabled=true;
    
});