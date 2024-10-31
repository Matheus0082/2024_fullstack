//console.log("hello, node!!")


// let filmes = [
//     {
//         titulo: "Carros",
//         sinopse: "Ao viajar para a Califórnia, o famoso carro de corridas Relâmpago McQueen se perde e vai parar em Radiator Springs, uma cidadezinha na Rota 66. Ele conhece novos amigos e aprende lições que mudam sua forma de encarar a vida."
//     },
//     {
//         titulo: "Hallowen - A Noite do Terror",
//         sinopse: "Em 1963, durante uma noite fria de Halloween, o pequeno Michael Myers, de seis anos, assassina brutalmente sua irmã adolescente, Judith. Ele é condenado e fica detido por 15 anos em uma instituição sob vigilância constante do Dr. Sam Loomis. Em 1978, na véspera de Halloween, Michael rouba um carro e escapa do sanatório Smith's Grove. Ele retorna à sua pacata cidade natal de Haddonfield, Illinois, onde procura suas próximas vítimas."
//     }
// ]



const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema ({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator)

const Usuario = mongoose.model("Usuário", usuarioSchema)

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://Matheus_br_082:mongodb123@projetofullstack.dujzv.mongodb.net/?retryWrites=true&w=majority&appName=projetoFullStack
`)
}

//get http://localhost:3000/oi
app.get ('/oi', (req, res) => {
    res.send('oi')
})

app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post('/filmes', async (req, res) => {
    //capturar as informações enviadas e trazer para o contexto
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post('/signup', async (req, res) => {
    try{
        const login = req.body.login
        const password = req.body.password
        const password_criptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario ({login: login, password: password_criptografada})
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (e){
        console.log(e)
        res.status(409).end()
    }
})

app.post('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    //verifica se o usuário existe
    const usuarioExiste = await Usuario.findOne({login: login})
    if (!usuarioExiste) {
        return res.status(401).json({mensagem: "Login inválido"})
    }
    //verificar senha e dar continuidade
    const senhaValida = await bcrypt.compare (password, usuarioExiste.password)
    if (!senhaValida){
        return res.status(401).json({mensagem: "Senha inválida"})
    }
    //gerar o web token, já já
    const token = jwt.sign(
        {login:login},
        "id-secreto",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token}) 
})

app.listen (3000, () => {
    try {
        conectarAoMongo()
        console.log("server up & running and connection ok")
    }
    catch (e) {
        console.log('erro de conexão', e)
    }
})
