const protocolo = 'http://'
const baseURL = 'localhost:3000'

function exibirFilmes(filmes) {
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

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove(...classesToAdd)
        alert.classList.add(...classesToRemove)
    }, timeout)
}

function escondeModal(seletor, timeout) {
    setTimeout (() => {
        let modalCadastro = bootstrap.Modal.getInstance(
            document.querySelector(seletor)
        )
        modalCadastro.hide()
   }, timeout)
}

async function prepararPagina() {
    const loginLink = document.querySelector('#loginLink')
    const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
    const token = localStorage.getItem('token')
    if (token) {
        loginLink.innerHTML='Logout'
        cadastrarFilmeButton.disabled = false
    }
    else {
        loginLink.innerHTML = 'Login'
        cadastrarFilmeButton.disabled = true
    }
    obterFilmes();    
}

async function obterFilmes() {
    const filmesEndpoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data
    exibirFilmes(filmes)
    //     console.log(filmes)
}

async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    tituloInput.value = ""
    sinopseInput.value = ""
    if (titulo && sinopse) {
        const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data
        exibirAlerta('.alert-filme', 'Filme cadastrado com sucesso', ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
        exibirFilmes(filmes)
    }
    else {
        exibirAlerta('.alert-filme', 'Preencha todos os campos!!!', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro) {
        //vamos cadastrar
        try {
            usuarioCadastroInput.value = ''
            passwordCadastroInput.value = ''
            const cadastroEndpoint = '/signup'
            const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLcompleta,
                { login: usuarioCadastro, password: passwordCadastro }
            )
            exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!!!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            escondeModal('#modalCadastro', 2000)
        }
        catch (e) {
            passwordCadastroInput.value = ''
            exibirAlerta('.alert-modal-cadastro', "Não foi possível cadastrar o usuário!!!", ['show', 'alert-danger'], ['d-none', 'alert-succes'], 2000)
            escondeModal('#modalCadastro', 2000)
        }
    }
    else {
        exibirAlerta('.alert-modal-cadastro', "Preencha todos os campos!!!", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    usuarioLogin = usuarioLoginInput.value
    passwordLogin = passwordLoginInput.value
    if (usuarioLogin && passwordLogin) {
        try {
            const loginEndpoint = '/login'
            const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post (
                URLcompleta,
                {login: usuarioLogin, password: passwordLogin}
            )
            //console.log(response)
            localStorage.setItem('token', response.data)
            usuarioLoginInput.value = ''
            passwordLoginInput.value = ''
            exibirAlerta('.alert-modal-login', 'Login realizado com sucesso', ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            escondeModal('#modalLogin', 2000)
            const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
            cadastrarFilmeButton.disabled = false
            const loginLink = document.querySelector('#loginLink')
            loginLink.innerHTML = 'Logout'
        }
        catch (e) {
            exibirAlerta('.alert-modal-login', "Falha na autenticação!!!", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
        }

    }
    else{
        exibirAlerta('.alert-modal-login', "Preencha todos os campos!!!", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}

