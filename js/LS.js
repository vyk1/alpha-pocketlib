export default class LS {
    constructor() {
        this.storageName = 'livros'
        this.categoria = 'categorias'
    }
    //para transformar vindo do LS
    o2s = (obj) => {
        return JSON.stringify(obj)
    }
    //para transformar em LS
    s2o = (str) => {
        return JSON.parse(str)
    }
    store = (registro) => {
        let current = this.s2o(localStorage.getItem(this.storageName)) || []
        current.push(registro)
        localStorage.setItem(this.storageName, this.o2s(current))
    }
    getAll = () => {
        return this.s2o(localStorage.getItem(this.storageName)) || []
    }
    storeCat = (categoria) => {
        let current = this.s2o(localStorage.getItem(this.categoria)) || []
        current.push(categoria)
        localStorage.setItem(this.categoria, this.o2s(current))
    }
    getAllCat = () => {
        return this.s2o(localStorage.getItem(this.categoria)) || []
    }
}  