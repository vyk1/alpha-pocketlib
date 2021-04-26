import Livro from './js/livro.js';
import Categoria from './js/categoria.js';

const addBtn = document.querySelector("#addBtn")
const listarBtn = document.querySelector("#listarBtn")
const nome = document.querySelector('#nome')
const categoria = document.querySelector('#categoria')
const qtdpg = document.querySelector('#qtdpg')
const qtdpglida = document.querySelector('#qtdpglida')
const addCategoriaBtn = document.querySelector('#addCategoriaBtn')
const id = document.querySelector('#id')
const graph = document.querySelector('#graph')
const ctx = document.getElementById('myChart').getContext('2d');

function gerarGrafico(nome, qtd, qtdlida) {

    if(myChart){
        myChart.destroy();
    }
    
    let qtdPercentLida = qtd/qtdlida
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Total Livro', 'Faltante'],
            datasets: [{
                data: [qtd, qtdPercentLida],
                backgroundColor: ['black', 'red']
            }]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Relação Total/Faltante para a conclusão de Leitura do Livro ' + nome
            }
        }
    });

}

window.onload = function () {
    const cat = new Categoria()
    let arr = cat.getAllCat()

    for (let i = 0; i < arr.length; i++) {
        categoria.options[categoria.options.length] = new Option(arr[i], i);
    }

    listarBtn.click()
}

addCategoriaBtn.addEventListener('click', e => {
    let categoria = window.prompt("Insira a nova categoria")
    if (categoria == "" || categoria == null) {
        alert("A categoria não pode ser nula.")
    } else {
        console.log(categoria);
        const cat = new Categoria(categoria)
        cat.storeCat(categoria)
        alert("Categoria inserida com sucesso!")
        location.reload(true)
    }

})

addBtn.addEventListener('click', e => {
    if (id.value == null || id.value == "") {
        if (nome.value == "" || qtdpg.value == "") {
            alert("O nome do livro e a quantidade de páginas não podem ser vazias.")
        } else {
            const livro = new Livro(nome.value, categoria.value, qtdpg.value, qtdpglida.value)
            livro.store(livro)
            alert("Livro adicionado com sucesso")
            location.reload(true)

        }
    } else {
        let response = window.confirm("Deseja realmente atualizar a leitura? Clique em 'Cancelar' para adicionar uma nova leitura")
        if (response) {

            const livro = new Livro(nome.value, categoria.value, qtdpg.value, qtdpglida.value)
            let dados = livro.getAll()

            for (let i = 0; i < dados.length; i++) {
                if (i == id.value) {
                    console.log('acho');

                    dados[i] = livro
                }
            }
            localStorage.removeItem("livros")

            dados.forEach(obj => {
                livro.store(obj)
            });
        } else {
            location.reload(true)
        }
    }

})

listarBtn.addEventListener('click', e => {
    const livro = new Livro()
    const dados = livro.getAll()
    // console.log(dados);

    let array = dados
    const table = document.querySelector("#table")

    // function checkVer ultimo child da table e add ultimo elemento
    table.innerHTML = "";
    var t = document.createElement("table");
    t.className = "gridable"
    // t.
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    ["#", "Categoria", "Nome", "Qtd Pag", "Qtd Pag Lidas"].forEach(function (el) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(el));
        headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    t.appendChild(thead);

    for (let j = 0; j < array.length; j++) {
        let el = array[j]

        var tr = document.createElement("tr");
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(j))
        tr.appendChild(td2)

        for (var i in el) {
            //i é o atributo

            if (i == "storageName") {
                i + 1
            } else {
                if (i == "categoria") {
                    let cat = new Categoria()
                    let arrayDCat = cat.getAllCat()

                    for (let index = 0; index < arrayDCat.length; index++) {
                        const element = arrayDCat[index];
                        if (el[i] == index) {
                            el[i] = element
                        }
                    }
                }
                var td = document.createElement("td");
                td.appendChild(document.createTextNode(el[i]))
                tr.appendChild(td)
            }
        }

        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn";
        btn.value = "Apagar";
        btn.onclick = function (e) {
            let idApagar = e.path[1].cells[0].innerText

            let arraySemItem = new Array()
            localStorage.removeItem("livros")

            for (let i = 0; i < dados.length; i++) {
                if (i != idApagar) {
                    arraySemItem.push(dados[i])
                }
            }

            if (arraySemItem.length < dados.length) {
                arraySemItem.forEach(obj => {
                    livro.store(obj)
                });
                alert("Item apagado com sucesso. Recarregando...")
                location.reload(true)
            } else {
                alert("Algo de estranho ocorreu. Recarregando...")
                location.reload(true)

            }
        }
        var btn2 = document.createElement('input');
        btn2.type = "button";
        btn2.className = "btn";
        btn2.value = "Atualizar";
        btn2.onclick = function (e) {
            let idUpdate = e.path[1].cells[0].innerText
            let name = e.path[1].cells[2].innerText
            let qtd = e.path[1].cells[3].innerText
            let qtdlida = e.path[1].cells[4].innerText

            id.value = idUpdate
            document.getElementsByTagName('label')[0].innerText = "Atualizando"

            nome.value = name
            nome.className = "validate valid"
            let labels = document.getElementsByTagName('label');
            labels[0].className = "active"
            labels[1].className = "active"
            labels[2].className = "active"
            labels[3].className = "active"

            qtdpg.value = qtd
            qtdpglida.value = qtdlida
        }
        var btn3 = document.createElement('input');
        btn3.type = "button";
        btn3.className = "btn";
        btn3.value = "Gerar Gráfico (qtd/qtdlida)";
        btn3.onclick = function (e) {
            console.log(e);
            
            let name = e.path[1].cells[2].innerText
            let qtd = e.path[1].cells[3].innerText
            let qtdlida = e.path[1].cells[4].innerText
            let myChart = new Chart(ctx,{})
            myChart.destroy();
            gerarGrafico(name, qtd, qtdlida)
        }
        tr.appendChild(btn)
        tr.appendChild(btn2)
        tr.appendChild(btn3)
        tbody.appendChild(tr);

    }
    t.appendChild(tbody)
    table.appendChild(t)

})