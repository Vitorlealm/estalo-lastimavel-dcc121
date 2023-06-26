import { getCartas } from "./cartas.js";
import { getGinasios } from "./ginasios.js";
const cartas = getCartas();
const ginasios = getGinasios();

function embaralhaCartas(jogador, nCartas) {
    let cartasAux = jogador ? baralhoP1.slice() : baralhoAI.slice();
    if(nCartas > cartasAux){
        throw new Error(`Não é possível remover ${nCartas} do baralho que contem ${cartasAux.length} cartas.`)
    }

    for (let i = cartasAux.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cartasAux[i];
        cartasAux[i] = cartasAux[j];
        cartasAux[j] = temp;
    }
    
    const cartasSelecionadas = cartasAux.slice(0,nCartas);
    if(jogador){
        for(let item of cartasSelecionadas){
            for(let i = 0; i < baralhoP1.length; i++){
                if(baralhoP1[i].id === item.id){
                    baralhoP1.splice(i,1);
                    break;
                }
            }
        }
    }
    else{
        for(let item of cartasSelecionadas){
            for(let i = 0; i < baralhoAI.length; i++){
                if(baralhoAI[i].id === item.id){
                    baralhoAI.splice(i,1);
                    break;
                }
            }
        }
    }
    return cartasSelecionadas;
}

function popularSelecaoCartas(jogador) {
    if(jogador){
        const mao = document.getElementById('maoP1');
        maoP1.forEach((carta) => {
            let imgCarta = document.createElement('img');
            imgCarta.classList.add('posicaoCarta');
            imgCarta.src = `./assets/${carta.Nome}.jpg`;
            mao.appendChild(imgCarta);
        })
    }
    else{
        const mao = document.getElementById('maoAI');
        maoAI.forEach((carta) => {
            let imgCarta = document.createElement('img');
            imgCarta.classList.add('posicaoCarta');
            imgCarta.src = './assets/TraseiraCarta.jpg';
            mao.appendChild(imgCarta);
    })
   }
}

function popularSelecaoGinasios() {
    const selecaGinasios = document.getElementById("ginasios");

    ginasios.forEach((ginasio) => {
        let ginasioCriado = document.createElement("div");
        ginasioCriado.classList.add('ginasio')
        ginasioCriado.innerHTML = 
            ` <div class="nomeGinasio">
                <p>Ginásio de ${ginasio.nome}</p>
            </div>`;
        ginasio.cartas.forEach((carta) => {
            ginasioCriado.innerHTML += `<p>${carta.Nome} - E: ${carta.Energia} F:${carta.Forca}</p>`;
        })
        selecaGinasios.appendChild(ginasioCriado);
    });
}

function posicionarCarta(cartaId, ginasioId){
    const cartaAux = getCartas();
    cartaAux = cartaAux.filter(carta => carta.id == cartaId);
    for(let ginasio of ginasios){
        if(ginasio.id === ginasioId){
            ginasio.cartas.push(cartaAux);
        } 
    }
}

let rodada = 0;
let baralhoP1 = cartas.slice();
let baralhoAI = cartas.slice();
let maoP1 = embaralhaCartas(true, 4);
let maoAI = embaralhaCartas(false, 4);
popularSelecaoCartas(true);
popularSelecaoCartas(false);

popularSelecaoGinasios();

async function jogo(rodada){
    if(rodada > 6){
        //calcularResultado()
    }else {
        await new Promise((resolve) => {
            document.querySelector("form").addEventListener("submit", resolve);
        });
        console.log("ola")
    }
}

