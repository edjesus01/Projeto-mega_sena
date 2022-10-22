//criando arrays
var quadro = [];
var jogoAtual = [];
var jogosSalvos = [];

//criando o objeto state

var state = { quadro: [], jogoAtual: [], jogosSalvos: [] };

//criando a função start

function start() {
  criarQuadro();
  novoJogo();
  //console.log(state.quadro);
}

//criar interface - quadro de numeros

function criarQuadro() {
  state.quadro = [];

  for (var i = 1; i <= 60; i++) {
    state.quadro.push(i);
  }
}

//função novo jogo

function novoJogo() {
  resetaJogo();
  render();

  console.log(state.jogoAtual);
}

//função render

function render() {
  renderQuandro();
  renderBotoes();
  renderSalvarJogo();
}

//função renderQuandro (Insere os numeros no html)

function renderQuandro() {
  var divSalvedGames = document.querySelector('#megasena-numero');
  divSalvedGames.innerHTML = '';

  var ulNumeros = document.createElement('ul');
  ulNumeros.classList.add('numbers');

  for (var i = 0; i < state.quadro.length; i++) {
    var jogoAtual = state.quadro[i];

    var liNumeros = document.createElement('li');
    liNumeros.textContent = jogoAtual;

    liNumeros.classList.add('number');

    liNumeros.addEventListener('click', handleNumbeClick);

    if (verificaNumeroRepetido(jogoAtual)) {
      liNumeros.classList.add('selected-number');
    }
    ulNumeros.appendChild(liNumeros);
  }

  divSalvedGames.appendChild(ulNumeros);
}

//função que permite clicar nos numeros

function handleNumbeClick(event) {
  var valor = Number(event.currentTarget.textContent);
  if (verificaNumeroRepetido(valor)) {
    removeNumeroDoJogo(valor);
  } else {
    addNumeroAoJogo(valor);
  }

  console.log(state.jogoAtual);
  render();
}

//render botões

function renderBotoes() {
  var divButtons = document.querySelector('#megasena-botoes');
  divButtons.innerHTML = '';

  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function createRandomGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Jogo Aleatório';

  button.addEventListener('click', randomGame);

  return button;
}

function createNewGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Novo Jogo';

  button.addEventListener('click', novoJogo);

  return button;
}

function createSaveGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Salvar Jogo';
  button.disabled = !jogoEstaCompleto();

  button.addEventListener('click', salvarJogo);

  return button;
}

//render salvar jogo

function renderSalvarJogo() {
  var divSalvedGames = document.querySelector('#megasena-salvar-jogo');
  divSalvedGames.innerHTML = '';

  if (state.jogosSalvos.length === 0) {
    divSalvedGames.innerHTML = '<p>Nenhum jogo salvo</p>';
  } else {
    var ulsalvedGames = document.createElement('ul');
    for (var i = 0; i < state.jogosSalvos.length; i++) {
      var jogoAtual = state.jogosSalvos[i];

      var liGame = document.createElement('li');

      liGame.textContent = jogoAtual.join(' | ');

      ulsalvedGames.appendChild(liGame);
    }

    divSalvedGames.appendChild(ulsalvedGames);
  }
}

//função que adiciona numeros ao jogo
function addNumeroAoJogo(numeroParaAdd) {
  if (numeroParaAdd < 1 || numeroParaAdd > 60) {
    // regra impede numeros maiores que 60 e menores que 1
    console.error('Número invalido', numeroParaAdd);
    return;
  }
  //-------------------------------------------------------------------------

  if (state.jogoAtual.length >= 6) {
    // regra impede que seja colocado mais de 6 dezenas
    console.error('O jogo já está completo');
    return;
  }
  //------------------------------------------------------------------------

  if (verificaNumeroRepetido(numeroParaAdd)) {
    console.error(
      'Este número já está no jogo, escolha um diferente!',
      numeroParaAdd
    );
    return;
  }

  //--------------------------------------------------- -----------------------
  state.jogoAtual.push(numeroParaAdd); // após verificada as regras o push adiciona os numeros ao jogo
}

//----------------------------------------------------------------------------------------------------

//função para excluir um numero escolhido

function removeNumeroDoJogo(removeNumero) {
  if (removeNumero < 1 || removeNumero > 60) {
    // regra impede numeros maiores que 60 e menores que 1
    console.error('Número invalido', removeNumero);
    return;
  }
  var novoJogo = [];

  for (var i = 0; i < state.jogoAtual.length; i++) {
    var numeroAtual = state.jogoAtual[i];

    if (numeroAtual === removeNumero) {
      continue;
    }

    novoJogo.push(numeroAtual);
  }
  state.jogoAtual = novoJogo;
}

//função que verifica se o numero escolhido já está no jogo
function verificaNumeroRepetido(NumeroParaChecar) {
  //if (state.jogoAtual.includes(NumeroParaChecar)) {
  //return true;

  return state.jogoAtual.includes(NumeroParaChecar);
  //}
}

//função para salvar o jogo

function salvarJogo() {
  if (!jogoEstaCompleto()) {
    console.error('O jogo não está completo!');
    return;
  }
  state.jogosSalvos.push(state.jogoAtual);

  novoJogo();
  console.log(state.jogosSalvos);
}

//Função para verificar se o jogo está completo

function jogoEstaCompleto() {
  return state.jogoAtual.length === 6;
}

function resetaJogo() {
  state.jogoAtual = [];
}

function randomGame() {
  resetaJogo();

  while (!jogoEstaCompleto()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumeroAoJogo(randomNumber);
  }

  console.log(state.jogoAtual);
  render();
}

start(); //chamando a função start
