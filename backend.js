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
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema ({
    titulo: {type: String},
    sinopse: {type: String}
}))

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

app.listen (3000, () => {
    try {
        conectarAoMongo()
        console.log("server up & running and connection ok")
    }
    catch (e) {
        console.log('erro de conexão', e)
    }
})
