const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sSequencial = document.querySelector('#m-sequencial')
const sCodEmpresa = document.querySelector('#m-codempresa')
const sCodConta = document.querySelector('#m-codconta')
const sTipoConta = document.querySelector('#m-tipoconta')
const sDescricaoConta= document.querySelector('#m-descricao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sSequencial.value = itens[index].sequencial
    sCodEmpresa.value = itens[index].codempresa
    sCodConta.value = itens[index].codconta
    sTipoConta.value = itens[index].tipoconta
    sDescricaoConta.value = itens[index].descricao
    id = index
  } else {
    sSequencial.value = ''
    sCodEmpresa.value = ''
    sCodConta.value = ''
    sTipoConta.value = ''
    sDescricaoConta.value = ''
  }
  
}

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sSequencial.value = itens[index].sequencial
    sCodEmpresa.value = itens[index].codempresa
    sCodConta.value = itens[index].codconta
    sTipoConta.value = itens[index].tipoconta
    sDescricaoConta.value = itens[index].descricao
    id = index
  } else {
    sSequencial.value = ''
    sCodEmpresa.value = ''
    sCodConta.value = ''
    sTipoConta.value = ''
    sDescricaoConta.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.sequencial}</td>
    <td>${item.codempresa}</td>
    <td>${item.codconta}</td>
    <td>${item.tipoconta}</td>
    <td>${item.descricao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sSequencial.value == '' || sCodEmpresa.value == '' || sCodConta.value == '' || sTipoConta.value == '' || sDescricaoConta.value == ''
    )   {  
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].sequencial = sSequencial.value
    itens[id].codempresa = sCodEmpresa.value
    itens[id].codconta = sCodConta.value
    itens[id].tipoconta = sTipoConta.value
    itens[id].descricao = sDescricaoConta.value

  } else {
    itens.push({
        'sequencial': sSequencial.value, 
        'codempresa': sCodEmpresa.value, 
        'codconta': sCodConta.value, 
        'tipoconta': sTipoConta.value, 
        'descricao': sDescricaoConta.value, 
    })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
