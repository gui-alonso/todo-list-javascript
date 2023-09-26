const localStorageKey = 'to-do-list-ga'

function validateIfExistNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exist = values.find(x => x.name == inputValue)
    return !exist ? false : true
}

function newTask() {
    let input = document.getElementById('input-new-task');
    input.style.border = ''

    //validation
    if(!input.value){
        input.style.border = '2px solid red'
        alert('Digite algo para inserir na sua lista!');
    }
    else if(validateIfExistNewTask()){
        alert("Já existe uma task com esse nome.")
    }
    else{
        // increment localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values));
        showValues();
    }
    //limpar campo após enviar task
    input.value = ''
}

function showValues(){
    // JSON.parse é usado para analisar (converter de uma string JSON para um objeto JavaScript) os dados obtidos do localStorage.
    // Se não houver dados no localStorage, um array vazio [] será usado como valor padrão.
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i< values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg></button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values));
    showValues()
}

showValues()