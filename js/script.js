let form = document.querySelector('.form-itens')
let btnSubmit = document.querySelector('.btn-submit')
let alertDiv = document.querySelector('.alert-container')
let btnClear = document.querySelector('.btn-clear')
let list = document.querySelector('.itens-list-container')
let item = document.querySelector('.item-input')
let btnDelete = document.querySelector('.btn-delete')

form.addEventListener('submit', addItem)

function addItem(e) {
    e.preventDefault();
    const value = item.value
    const id = new Date().getTime().toString()

    if(value !== "") {
        const element = document.createElement('article')
        let attribute = document.createAttribute('data-id')
        attribute.value = id
        element.setAttributeNode(attribute)
        element.classList.add('item-div')
        element.innerHTML = `
                        <p>${value}</p>
                        <div class="btn-container">
                            <button type="button" class="btn-delete">Deletar</button>
                        </div>
        `
        // const btnDelete = element.querySelector('.btn-delete')
        // btnDelete.addEventListener('click', deleteItem)

        list.appendChild(element)

        saveLocalStorage(id, value)
        item.value = ''
        item.focus()
    }
}

function saveLocalStorage(id, name) {
    const itemLista = {id, name}
    const items = getLocalStorage()
    items.push(itemLista)
    localStorage.setItem('itens', JSON.stringify(items))
}

function getLocalStorage() {
    let arr = localStorage.getItem('itens')

    if(arr != []) {
        return JSON.parse(localStorage.getItem('itens'))
    } else {
        return []
    }
}

function loadItensLocalStorage() {
    let arrString = localStorage.getItem('itens')
    let arr = JSON.parse(arrString)
    
    for(let i = 0; i<=arr.length; i++) {
        let value = arr[i].name
        let id = arr[i].id

        const element = document.createElement('article')
        let attribute = document.createAttribute('data-id')
        attribute.value = id
        element.setAttributeNode(attribute)
        element.classList.add('item-div')
        element.innerHTML = `
                        <p>${value}</p>
                        <div class="btn-container">
                            <button type="button" class="btn-delete">Deletar</button>
                        </div>
        `

        list.appendChild(element)
    }
}

loadItensLocalStorage()
document.addEventListener("DOMContentLoaded", loadItensLocalStorage())

