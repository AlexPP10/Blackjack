/** 
* 2C = Two of Cubs (Tréboles)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Picas)
*/


let deck= [];

const cartas=['C','D','H','S'];

const figuras=['A','J','Q','K'];

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
pedirCarta();

console.log('documeto',deck);
