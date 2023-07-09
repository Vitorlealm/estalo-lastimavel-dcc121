import { getCartas } from "./cartas.js";
import { getGinasios } from "./ginasios.js";
const cartas = getCartas();
const ginasios = getGinasios();
let rodada = 1;

function embaralhaCartas(jogador, nCartas) {
    let cartasAux = jogador ? baralhoP1.slice() : baralhoAI.slice();
    if(nCartas > cartasAux){
        console.error(`Não é possível remover ${nCartas} do baralho que contem ${cartasAux.length} cartas.`);
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

function identificaCartas(jogador, baralho){
    if(jogador){
        for(let carta of baralho){
            carta.id = 'P' + carta.id;
        }
    }
    else{
        for(let carta of baralho){
            carta.id = 'A' + carta.id;
        }
    }
    return baralho;
}

function popularSelecaoCartas(jogador) {
    if(jogador){
        const mao = document.getElementById('maoP1');
        mao.innerHTML = '';
        maoP1.forEach((carta) => {
            let imgCarta = document.createElement('img');
            imgCarta.classList.add('posicaoCarta');
            imgCarta.src = `./assets/${carta.Nome}.jpg`;
            imgCarta.draggable = true;
            imgCarta.ondragstart = drag;
            imgCarta.id = carta.id;
            imgCarta.alt = `${carta.Nome} F: ${carta.Força} E: ${carta.Energia}`;
            mao.appendChild(imgCarta);
        })
    }
    else{
        const mao = document.getElementById('maoAI');
        mao.innerHTML = '';
        maoAI.forEach((carta) => {
            let imgCarta = document.createElement('img');
            imgCarta.classList.add('posicaoCarta');
            imgCarta.src = './assets/TraseiraCarta.jpg';
            imgCarta.draggable = true;
            imgCarta.ondragstart = drag;
            imgCarta.id = carta.id;
            mao.appendChild(imgCarta);
    })
   }
}

function drag(event){
    event.dataTransfer.setData("text", event.target.id);
}

function largar(event) {
    
    event.preventDefault();
    const cartaId = event.dataTransfer.getData("text");
    const ginasio = ginasios[Number(event.target.id)];
    let cont = 0;
    if(cartaId.includes('P')){
        for(let carta of ginasio.cartas){
            if(carta.id.includes('P')){
                cont++;
            }
        }
    }else{
        for(let carta of ginasio.cartas){
            if(carta.id.includes('A')){
                cont++;
            }
        }
    }
    if(cont >= 4){
        console.error('limite de cartas no ginasio atingido!');
        return '';
    } 
    let carta = cartas.filter((card) => card.id == cartaId.slice(1));
    ginasios[ginasio.id].cartas.push({
        id: cartaId,
        Nome: carta[0].Nome,
        Energia: carta[0].Energia,
        Força: carta[0].Força
    })
    console.log(ginasios[ginasio.id].cartas)
    console.log(carta);
    event = null;
    

    popularSelecaoGinasios();
    //event.target.appendChild(carta);
}

function permiteArrastar(event){
    event.preventDefault();
}

function popularSelecaoGinasios() {
    const selecaGinasios = document.getElementById("ginasios");
    //limpa ginasios
    selecaGinasios.innerHTML = '';

    //cria e preenche os ginasios a partir do estado atual;
    ginasios.forEach((ginasio) => {
        let ginasioCriado = document.createElement("div");
        ginasioCriado.classList.add('ginasio');
        ginasioCriado.id = ginasio.id;
        ginasioCriado.ondragover = permiteArrastar;
        ginasioCriado.ondrop = largar;
        ginasioCriado.innerHTML = 
            ` <div class="nomeGinasio">
                <p>${ginasio.nome}</p>
            </div>`;
        ginasio.cartas.forEach((carta) => {
            ginasioCriado.innerHTML += `<p>${carta.Nome} - E: ${carta.Energia} F:${carta.Força}</p>`;
        })
        selecaGinasios.appendChild(ginasioCriado);
    });
}

function jogadaIA(){

}

function confirmarJogada(){
    jogo(rodada++);
}

const botaoConfirmarJogada = document.getElementById('jogar');
botaoConfirmarJogada.addEventListener('click', confirmarJogada);
let baralhoP1 = identificaCartas(true, structuredClone(cartas.slice()));
let baralhoAI = identificaCartas(false, structuredClone(cartas.slice()));
let maoP1 = embaralhaCartas(true, 4);
let maoAI = embaralhaCartas(false, 4);
popularSelecaoCartas(true);
popularSelecaoCartas(false);
popularSelecaoGinasios();
jogo(rodada);

function jogo(rodada){
    if(rodada > 6){
        //calcularResultado()
        alert('fim de jogo');
    }else {
        //Movimentos da IA:
        if(rodada<=3){
            for(let [i,carta] of maoAI.entries()){
                if(carta.Energia <= rodada){
                    ginasios[rodada-1].cartas.push(carta);
                    maoAI.splice(i,1);
                    break;
                }
            }
        }
        else{
            for(let [i,carta] of maoAI.entries()){
                if(carta.Energia <= rodada){
                    ginasios[rodada-4].cartas.push(carta);
                    maoAI.splice(i,1);
                    break;
                }
            }
        }

        if(maoAI.length < 4){
            let novaCarta = embaralhaCartas(false,1);
            maoAI.push(novaCarta[0]);
        }
        console.log(rodada)
        popularSelecaoCartas(false);
        popularSelecaoGinasios();

        // jogador

        
        //jogadaEmAndamento = true;
    }
}

