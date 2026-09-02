const main = document.getElementsByClassName("main")
const form = document.getElementById("todo")
const todos = document.querySelector('.toDos')
const deleteButtons = document.querySelectorAll('.delete')

let listOfProjects = []

function createProject(name) {
    return {
        name,
        complete: false,
        id: crypto.randomUUID(),
        todo: [],
    }
};

function displayToDos() {
    todos.replaceChildren();
    
    for (let i = 0; i < listOfProjects.length; ++i) {
        const card = document.createElement('div');
        const name = document.createElement('h1');
        const status = document.createElement('input')
        const viewMore = document.createElement('button')
        const deleteCard = document.createElement('button')

        name.textContent = listOfProjects[i].name;
        name.className = "name";
        card.classList.add('card', listOfProjects[i].id)
        status.type = "checkbox";
        viewMore.classList.add('viewMore', listOfProjects[i].id);
        viewMore.textContent = 'View';
        deleteCard.textContent = "Delete";
        deleteCard.classList.add('delete', listOfProjects[i].id);

        if (listOfProjects[i].complete == true) {
            status.checked = true;
        };

        card.append(status);
        card.append(name);
        card.append(viewMore);
        card.append(deleteCard);
        todos.appendChild(card);

        card.querySelector(".delete").addEventListener("click", () => {
            const className = card.className.slice(5)
            const index = listOfProjects.findIndex(item => item.id == className);

            listOfProjects.splice(index, 1)

            card.remove();
        });

        viewMore.addEventListener('click', () => {
            
        })
    };
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = formData.get('add');

    console.log(data);
    listOfProjects.push(createProject(data));

    displayToDos()
});

const dialog = document.getElementById('dialog');
const openBtn = document.getElementById('openBtn');

                // Open the dialog as a modal
openBtn.addEventListener('click', () => {
    dialog.showModal(); 
});
