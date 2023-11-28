// variaveis direcionadas ao HTML
var linha = document.querySelector('.linha');
var button = document.querySelectorAll('.button');
var tittle = document.querySelector('.tittle');
var reload = document.querySelector('.reload');
var dica = document.querySelector('#dica');
var vidas = document.querySelector('#vidas');
var partes_corpo = document.querySelectorAll('.parte_corpo');
var pontos_layer = document.querySelector('#pontos');

// variaveis do game
var lista_palavras = [
    ['FRUTA', ['graviola', 'manga', 'acerola', 'pitanga', 'carambola', 'abacaxi', 'cereja', 'abacate','amora','cacau','caqui','figo','kiwi', 'framboesa', 'goiaba', 'groselha', 'jabuticaba', 'jenipapo', 'ameixa', 'melancia', 'banana','laranja','lima','tangerina', 'manga','morango','pequi','pitaya','siriguela','tamarindo','']],
    ['ANIMAL', ['Elefante', 'coala', 'rinoceronte', 'javali', 'carangueijo', 'molusco', 'quati', 'morcego', 'avestruz', 'pinguim', 'golfinho', 'ornitorrinco', 'jaguatirica', 'urso', 'flamingo', 'guaxinin', 'hiena', 'orangutango', 'sagui', 'urubu', 'zebra', 'raposa', 'pato', 'ganso', 'tigre', 'baiacu', 'cacatua','canguru','caracol','centopeia', 'coruja', 'esquilo','gaivota','hamster','iguana','jumento','marreco','orangotango','ovelha','pantera','suricato','tucano', 'urubu','zebra']],
    ['PAÍS',['Angola','Senegal','Argentina','Equador','Jamaica','Filipinas','Maldivas','Hungria','Portugal','Vaticano' ]]
];

var lista_sortida = lista_palavras[Math.floor(Math.random() * lista_palavras.length)];
var tema = lista_sortida[0];
var palavra = lista_sortida[1][Math.floor(Math.random() * lista_sortida[1].length)];
var lista_letras_tentativas = [];
var tentativas = document.querySelectorAll('.parte_corpo').length;
var lost = false;
var quantidade_certas = 0;
var pontos = 100;


console.log(tema);
console.log(palavra);

for (var i = 0; i < palavra.length; i++) {
    // Criação de um elemento linha
    var letra = document.createElement('p');
    letra.classList.add('letra', `${palavra[i].toUpperCase()}${palavra[i].toUpperCase()}`);
    //letra.innerHTML = palavra[i].toUpperCase();
    

    // Adiciona o elemento linha à div principal
    linha.appendChild(letra);
  }

dica.innerHTML = tema;
vidas.innerHTML = tentativas + ' TENTATIVAS';

function end_game (condition) {

    let letras = document.querySelectorAll('.letra');
    let color = 'rgb(161, 0, 0)';
    let text_color = 'Black';
    let text = 'Você Perdeu!';

    if (condition) {
        color = 'rgb(14, 184, 8)';
        text_color = 'White';
        text = 'Você Ganhou!';
    }

    tittle.innerHTML = text;
    tittle.style.background = color;

    for (i = 0; i < letras.length; i++) {
        let digito = letras[i].classList[1][0];
        letras[i].innerHTML = digito;
        letras[i].style.background = color;
        
    }

    reload.style.display = 'flex';

    pontos_layer.style.display = 'flex';
    pontos_layer.innerHTML = `${pontos} Pontos`;
    

}
// funcao ao errar letra
var arrayDeElementos = [0,1,2,3,4,5];
function onPlayerError (digito) {

    if (lista_letras_tentativas.includes(digito)) {
        return;
    }
    tentativas--;
    

    let num_aleatorio = Math.floor(Math.random() * arrayDeElementos.length);
    let escolhido = arrayDeElementos[num_aleatorio];
    partes_corpo[escolhido].style.opacity = 1;
    lista_letras_tentativas.push(digito);
    
    arrayDeElementos.splice(num_aleatorio, 1);

    let num_aleatorio_pontos = Math.floor(Math.random() * (palavra.length/1.5));
    let porcentagem = num_aleatorio_pontos / palavra.length * 50;
    pontos -= Math.floor(porcentagem);
    
    pontos = pontos < 0 ? 0 : pontos;
    console.log(pontos);


    if (tentativas == 0) {
        lost = true;
        pontos = 0
        end_game(false);  
        
    }

        
        
}

// evento ao clique
function onButtonClick (event) {
    letra_clicada = event.srcElement;
    let digito_letra = event.srcElement.innerText;
    let letras = document.querySelectorAll('.letra');

    if (lost || lista_letras_tentativas.includes(digito_letra)) {
        return;
    }
    
    let tentativa = false;

    for (i = 0; i < letras.length; i++) {
        let digito = letras[i].classList[1][0];

        if (digito_letra == digito) {
            letras[i].innerHTML = digito;

            letra_clicada.style.background = 'rgb(14, 184, 8)';
            letra_clicada.style.color = 'Black';
            tentativa = true;
            quantidade_certas++;
        }
    }
    if (tentativa == false) {
        onPlayerError(digito_letra);
        letra_clicada.style.background = 'rgb(161, 0, 0)';
    }

    if (quantidade_certas == letras.length) {
        end_game(true);
        lost = true;

    }
    lista_letras_tentativas.push(digito_letra);
    vidas.innerHTML = tentativas + ' TENTATIVAS';
    

}

// adicionar uma funcao a cada botao da lista query
for (i = 0; i < button.length; i++) {
    button[i].addEventListener('click' , onButtonClick);
}

