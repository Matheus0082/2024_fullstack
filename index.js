//console.log("hello, node!!")

const express = require('express')
const app = express()
app.use(express.json())

//get http://localhost:3000/oi
app.get ('/oi', (req, res) => {
    res.send('oi')
})

let filmes = [
    {
        titulo: "Carros",
        sinopse: "Ao viajar para a Califórnia, o famoso carro de corridas Relâmpago McQueen se perde e vai parar em Radiator Springs, uma cidadezinha na Rota 66. Ele conhece novos amigos e aprende lições que mudam sua forma de encarar a vida."
    },
    {
        titulo: "Hallowen - A Noite do Terror",
        sinopse: "Em 1963, durante uma noite fria de Halloween, o pequeno Michael Myers, de seis anos, assassina brutalmente sua irmã adolescente, Judith. Ele é condenado e fica detido por 15 anos em uma instituição sob vigilância constante do Dr. Sam Loomis. Em 1978, na véspera de Halloween, Michael rouba um carro e escapa do sanatório Smith's Grove. Ele retorna à sua pacata cidade natal de Haddonfield, Illinois, onde procura suas próximas vítimas."
    }
]

app.get('/filmes', (req, res) => {
    res.json(filmes)
})

app.post('/filmes',(req, res) => {
    //capturar as informações enviadas e trazer para o contexto
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um json novo com as informações recebidas
    const filme_novo = {titulo: titulo, sinopse: sinopse}
    //acrescenta o novo filme à base
    filmes.push(filme_novo)
    //exibir a base atualizada
    res.json(filmes)
})

app.listen (3000, () => console.log("server up & running"))