const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

async function obterFilmes() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data

    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let filme of filmes) {
        //para cada filme, inserir uma linha
        let linha = corpoTabela.insertRow(0)
        //para cada linha, insere 2 células
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        //atribui o HTML para cada célula
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
//     console.log(filmes)
 }
 async function cadastrarFilme() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    let tituloInput  = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value 
    let sinopse = sinopseInput.value
    tituloInput.value = ""
    sinopseInput.value = "" 
    const filmes = (await axios.post (URLcompleta, {titulo, sinopse})).data
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes) {
        //para cada filme, inserir uma linha
        let linha = corpoTabela.insertRow(0)
        //para cada linha, insere 2 células
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        //atribui o HTML para cada célula
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
 }