let form = document.querySelector('.form-itens')
let btnSubmit = document.querySelector('.btn-submit')
let alertDiv = document.querySelector('.alert-container')
let alert = document.querySelector('.alert')
let btnClear = document.querySelector('.btn-clear')
let list = document.querySelector('.itens-list-container')
let item = document.querySelector('.item-input')
let btnDelete = document.querySelector('.btn-delete')

form.addEventListener('submit', addItem)
btnClear.addEventListener('click', clearList)

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
                        <p class="value-item">${value}</p>
                        <div class="btn-container">
                            <button type="button" class="btn-delete">Deletar</button>
                        </div>
        `
        const btnDelete = element.querySelector('.btn-delete')
        btnDelete.addEventListener('click', deleteItem)

        list.appendChild(element)

        saveLocalStorage(id, value)
        item.value = ''
        item.focus()
    } else if(value == "") {
        alertDiv.classList.add('show')
        alert.textContent = "Digite o nome de um item"
    }
}

function saveLocalStorage(id, name) {
    let itemList = {id, name}
    let arrItens = getLocalStorage()
    arrItens.push(itemList)
    localStorage.setItem('itens', JSON.stringify(arrItens))
}

function getLocalStorage() {
    let arr = localStorage.getItem('itens')

    if(arr) {
        return JSON.parse(localStorage.getItem('itens'))
    } else {
        return []
    }
}

function removeLocalStorage(id) {
    let arrItens = getLocalStorage()
    let index = arrItens.findIndex(item => item.id === id)
    if(index > -1) {
        arrItens.splice(index, 1)
    }

    localStorage.setItem('itens', JSON.stringify(arrItens))
}

function loadItensLocalStorage() {
    let arr = getLocalStorage()
    
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

        const btnDelete = element.querySelector('.btn-delete')
        btnDelete.addEventListener('click', deleteItem)

        list.appendChild(element)
    }
}

function clearList() {
    const items = document.querySelectorAll('.item-div')

    if(items.length > 0) {
        items.forEach((n) => {
            list.removeChild(n)
        })
    }

    localStorage.removeItem('itens')
}

function deleteItem(e) {
    const tag = e.currentTarget.parentElement.parentElement
    const id = tag.dataset.id
    list.removeChild(tag)

    
    removeLocalStorage(id)
}

loadItensLocalStorage()