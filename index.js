/* 
*    Autor: João Pedro Mascena
*    Data: 06/11/2023
*
*    @function iniciar - Inicia o jogo
*
*/

let pontuacao = 0

const alfabeto = [
     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
     'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
     'S', 'T', 'U', 'V', 'X', 'W', 'Y', 'Z', 'Á',
     'Ã', 'À', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Õ', 'Ô',
     'Ú', 'Ç'
]

const lista_palavras = [
     "abacate", "banana", "caju", "damasco", "figo", "goiaba", "laranja", "manga", "melancia", "melão", "morango", "pêssego", "uva",
     "abacaxi", "acerola", "amora", "carambola", "cereja", "framboesa", "jabuticaba", "kiwi", "limão", "maçã", "maracujá", "melão",
     "pêra", "tangerina", "abóbora", "abobrinha", "alcachofra", "alface", "alho", "batata", "berinjela", "beterraba", "brócolis",
     "cebola", "cenoura", "chuchu", "couve", "ervilha", "espinafre", "inhame", "mandioca", "mandioquinha", "milho", "nabo", "palmito",
     "pepino", "pimentão", "quiabo", "repolho", "rúcula", "tomate", "vagem", "alcatra", "almondega", "bacon", "bife", "calabresa",
     "carne", "carneiro", "costela", "cupim", "filé", "frango", "hambúrguer", "linguiça", "maminha", "picanha", "presunto", "salame",
     "salsicha", "salsichão", "sobrecoxa", "vaca", "vitela", "arroz", "biscoito", "bolo", "bomba", "brigadeiro", "broa", "chocolate",
     "churros", "coockie", "cupcake", "doce", "empada", "empadão", "esfirra", "gelatina", "macarrão", "mousse", "panqueca", "pastel",
     "pavê", "pão", "pudim", "quindim", "salgado", "sorvete", "torta", "tortinha", "acarajé", "arroz", "bolo", "biscoito", "canjica",
     "caruru", "cocada", "feijoada", "farofa", "mungunzá", "pamonha", "pé-de-moleque", "pirão", "quibebe", "tapioca", "vatapá", "vinagrete",
]

lista_palavras.forEach((palavra, index) => {
     lista_palavras[index] = palavra.toUpperCase()
})

function escolherPalavras(n) {
     return Array.from({ length: n }, () => lista_palavras[Math.floor(Math.random() * lista_palavras.length)]);
}

const palavras = [...escolherPalavras(15)];

/**
 * Inicia o jogo
 */

function iniciar() {
     const lista_palavras = document.getElementById('lista_palavras');
     const tabela_letras = document.getElementById('tabela_letras');
     const pont = document.getElementById('pontos')
     const colunas = 14;
     const linhas = 14;

     pont.innerText = pontuacao;

     /**
      * Inicializa o timer.
      */
     function initTimer() {
          const timer = document.getElementById('timer');
          let hr = 0;
          let min = 0;
          let sec = 0;

          setInterval(() => {
               sec++;
               if (sec === 60) {
                    sec = 0;
                    min++;
               }
               if (min === 60) {
                    min = 0;
                    hr++;
               }
               const formattedSec = sec < 10 ? `0${sec}` : sec;
               const formattedMin = min < 10 ? `0${min}` : min;
               const formattedHr = hr < 10 ? `0${hr}` : hr;
               timer.innerText = `${formattedHr}:${formattedMin}:${formattedSec}`;
          }, 1000);
     }
     /**
      * Cria a tabela.
      * @param {number} c - Números de colunas.
      * @param {number} r - Número de linhas.
      */

     function criarTabela(c, r) {
          let matriz = Array.from({ length: r }, () => Array.from({ length: c }, () => ''));
          palavras.forEach(palavra => {
               let direcao = Math.random() < 0.33 ? 'horizontal' : 'vertical';
               let posicao = { x: 0, y: 0 };

               if (direcao === 'horizontal') {
                    posicao.x = Math.floor(Math.random() * (c - palavra.length + 1));
                    posicao.y = Math.floor(Math.random() * r);
               } else {
                    posicao.x = Math.floor(Math.random() * c);
                    posicao.y = Math.floor(Math.random() * (r - palavra.length + 1));
               }

               let colisao = false;
               for (let i = 0; i < palavra.length; i++) {
                    const x = posicao.x + (direcao === 'horizontal' ? i : 0);
                    const y = posicao.y + (direcao === 'vertical' ? i : 0);
                    if (matriz[y][x] !== '' && matriz[y][x] !== palavra[i]) {
                         colisao = true;
                         break;
                    }
               }

               if (colisao) {
                    let found = false;
                    for (let i = 0; i < r && !found; i++) {
                         for (let j = 0; j < c && !found; j++) {
                              if (matriz[i][j] === '' || matriz[i][j] === palavra[0]) {
                                   let newpos = { x: j, y: i };
                                   let newcolisao = false;
                                   for (let k = 0; k < palavra.length; k++) {
                                        const x = newpos.x + (direcao === 'horizontal' ? k : 0);
                                        const y = newpos.y + (direcao === 'vertical' ? k : 0);
                                        if (matriz[y][x] !== '' && matriz[y][x] !== palavra[k]) {
                                             newcolisao = true;
                                             break;
                                        }
                                   }
                                   if (!newcolisao) {
                                        posicao = newpos;
                                        colisao = false;
                                        found = true;
                                   }
                              }
                         }
                    }
                    if (!found) {
                         console.error(`Could not place word "${palavra}"`);
                         return;
                    }
               }

               for (let i = 0; i < palavra.length; i++) {
                    const x = posicao.x + (direcao === 'horizontal' ? i : 0);
                    const y = posicao.y + (direcao === 'vertical' ? i : 0);
                    matriz[y][x] = palavra[i];
               }

               const li = document.createElement('li');
               li.innerText = palavra;
               lista_palavras.appendChild(li);
          });
          for (let i = 0; i < r; i++) {
               const tr = document.createElement('tr');
               for (let j = 0; j < c; j++) {
                    const td = document.createElement('td');
                    td.innerText = matriz[i][j] || alfabeto[Math.floor(Math.random() * alfabeto.length)];
                    tr.appendChild(td);
                    td.id = 'td' + i + j;
               }
               tabela_letras.appendChild(tr);
          }

     }

     criarTabela(colunas, linhas)
     initTimer()

}

const tabela_letras = document.getElementById('tabela_letras');
let letrasSelecionadas = [];
let lastSelectedCellId = null;

tabela_letras.addEventListener('click', (event) => {
     const td = event.target;
     const pont = document.getElementById('pontos')
     if (td.tagName === 'TD' && td.style.pointerEvents !== 'none') {
          const tdId = td.id;
          if (letrasSelecionadas.includes(tdId)) {
               td.style.backgroundColor = '';
               letrasSelecionadas = letrasSelecionadas.filter(id => id !== tdId);
               lastSelectedCellId = null;
          } else {
               if (lastSelectedCellId === null) {
                    td.style.backgroundColor = 'yellow';
                    letrasSelecionadas.push(tdId);
                    lastSelectedCellId = tdId;
               } else {
                    if (lastSelectedCellId !== null) {
                         td.style.backgroundColor = 'yellow';
                         letrasSelecionadas.push(tdId);
                         lastSelectedCellId = tdId;
                    } else {
                         td.style.backgroundColor = 'yellow';
                         letrasSelecionadas.push(tdId);
                         lastSelectedCellId = tdId;
                    }
               }
          }

          let palavraSelecionada = '';
          function verificarPalavra(palavraSelecionada) {
               for (let i = 0; i < lista_palavras.length; i++) {
                    if (palavraSelecionada === lista_palavras[i] || palavraSelecionada === lista_palavras[i]) {
                         console.log('Palavra encontrada!');
                         pontuacao += 10;
                         pont.innerText = pontuacao;
                         for (let j = 0; j < letrasSelecionadas.length; j++) {
                              const td = document.getElementById(letrasSelecionadas[j]);
                              const li = document.getElementsByTagName('li');
                              for (let k = 0; k < li.length; k++) {
                                   if (li[k].textContent === palavraSelecionada) {
                                        li[k].style.textDecoration = 'line-through';
                                   }
                              }
                              td.style.backgroundColor = 'green';
                              td.style.pointerEvents = 'none';
                         }
                         letrasSelecionadas = [];
                         lastSelectedCellId = null;
                         const todasPalavrasEncontradas = Array.from(document.getElementsByTagName('li')).every(li => li.style.textDecoration === 'line-through');
                         if (todasPalavrasEncontradas) {
                              alert('Parabéns, você encontrou todas as palavras!');
                              location.reload();
                         }
                         return true;
                    }
               }
               console.log('Palavra não encontrada!');
               return false;
          }

          function juntarLetras() {
               for (let i = 0; i < letrasSelecionadas.length; i++) {
                    const td = document.getElementById(letrasSelecionadas[i]);
                    palavraSelecionada += td.textContent;
               }

               console.log(palavraSelecionada)
               return palavraSelecionada;
          }


          verificarPalavra(juntarLetras());
     }
});


