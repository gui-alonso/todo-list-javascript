// Define a constant for the localStorage key used in the project
const localStorageKey = 'to-do-list-ga';

// Function to check if a new task with the same name already exists
function validateIfExistNewTask() {
    // Retrieve the task list from localStorage or create an empty array if it doesn't exist
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Get the input value from the 'input-new-task' element
    let inputValue = document.getElementById('input-new-task').value;

    // Check if a task with the same name already exists in the list
    let exist = values.find(x => x.name == inputValue);

    // Return true if a task with the same name exists, otherwise return false
    return exist ? true : false;
}

// Function to add a new task to the list
function newTask() {
    let input = document.getElementById('input-new-task');
    input.style.border = '';

    // Validation: Check if the input field is empty
    if (!input.value) {
        input.style.border = '2px solid red';
        alert('Digite algo para inserir na sua lista!');
    }
    // Validation: Check if a task with the same name already exists
    else if (validateIfExistNewTask()) {
        alert("Já existe uma task com esse nome.");
    } else {
        // Add the new task to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));

        // Display the updated task list
        showValues();
    }

    // Clear the input field after submitting the task
    input.value = '';
}

// Function to display the list of tasks
function showValues() {
    // Retrieve the task list from localStorage or create an empty array if it doesn't exist
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Get the 'to-do-list' element
    let list = document.getElementById('to-do-list');
    
    // Clear the existing list content
    list.innerHTML = '';

    // Iterate through the task list and display each task along with a button to remove it
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg></button></li>`;
    }
}

// Function to remove a task from the list
function removeItem(data) {
    // Retrieve the task list from localStorage or create an empty array if it doesn't exist
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Find the index of the task with the specified name
    let index = values.findIndex(x => x.name == data);

    // Remove the task from the list
    values.splice(index, 1);

    // Update the task list in localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(values));

    // Display the updated task list
    showValues();
}

// Initially display the task list when the page loads
showValues();