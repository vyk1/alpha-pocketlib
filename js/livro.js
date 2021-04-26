import LS from './LS.js'

export default class Livro extends LS {
    constructor(nome, categoria, qtdpg, qtdpglida) {
        super()
        this.nome = nome
        this.categoria = categoria
        this.qtdpg = qtdpg
        this.qtdpglida = qtdpglida
    }
}

