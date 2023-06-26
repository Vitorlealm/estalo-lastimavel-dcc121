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

function popularSelecaoCartas() {
   const mao = document.getElementById('campoPC');
    maoP1.forEach((carta) => {
        let divCarta = document.createElement('div');
        divCarta.innerHTML = `<h1> ${carta.Nome} E:${carta.Energia} F:${carta.Força}`;
        mao.appendChild(divCarta);
    })
}

function popularSelecaoGinasios() {
    const selecaGinasios = document.getElementById("ginasios");

    ginasios.forEach((ginasio) => {
      const option = document.createElement("option");
      option.value = ginasio.id;
      option.textContent = `${ginasio.nome}`;
      selecaGinasios.appendChild(option);
    });
}

let rodada = 0;
let baralhoP1 = cartas.slice();
let baralhoAI = cartas.slice();
let maoP1 = embaralhaCartas(true, 4);
let maoAI = embaralhaCartas(false, 4);
popularSelecaoCartas();
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

