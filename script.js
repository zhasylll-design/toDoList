const main = document.getElementsByClassName("main");
const form = document.getElementById("todo");
const todos = document.querySelector(".toDos");
const deleteButtons = document.querySelectorAll(".delete");

let listOfProjects = JSON.parse(localStorage.getItem("projects")) || [];

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(listOfProjects));
}

function createProject(name) {
    return {
        name,
        status: false,
        id: crypto.randomUUID(),
        todo: [],
    };
}

function createToDo(name) {
    return {
        name,
        status: false,
        id: crypto.randomUUID()
    };
}

function getName(index) {
    return listOfProjects[index].name;
}

function getId(index) {
    return listOfProjects[index].id;
}

function getStatus(index) {
    return listOfProjects[index].status;
}

function getToDo(index) {
    return listOfProjects[index].todo;
}

function display() {
    todos.replaceChildren();

    for (let i = 0; i < listOfProjects.length; ++i) {
        const card = document.createElement("div");
        const name = document.createElement("h1");
        const status = document.createElement("input");
        const viewMore = document.createElement("button");
        const deleteCard = document.createElement("button");

        const project_info = document.createElement("dialog");
        const header = document.createElement("h2");
        const todoForm = document.createElement("form");
        const nameToDo = document.createElement("input");
        const addToDo = document.createElement("button");
        const viewLess = document.createElement("button");
        const container = document.createElement("div");

        header.textContent = getName(i);

        viewLess.textContent = "Close";
        addToDo.textContent = "Add";

        nameToDo.placeholder = "Go for a walk";
        nameToDo.type = "text";
        nameToDo.name = "name";

        addToDo.type = "submit";
        viewLess.type = "button";

        container.id = `container-${getId(i)}`;
        container.className = "container";

        project_info.id = `project-${getId(i)}`;
        project_info.className = "info";

        viewLess.classList.add("orange-button", "close-button");
        addToDo.classList.add("orange-button");

        todoForm.append(nameToDo);
        todoForm.append(addToDo);
        todoForm.append(viewLess);

        project_info.append(header);
        project_info.append(todoForm);

        for (let j of getToDo(i)) {
            const todo = document.createElement("div");
            const todoName = document.createElement("h1");
            const checkbox = document.createElement("input");
            const deleteButton = document.createElement("button");

            todo.id = `todo-${j.id}`;
            todoName.textContent = j.name;

            checkbox.type = "checkbox";
            checkbox.checked = j.status;

            deleteButton.id = j.id;
            deleteButton.textContent = "delete";
            deleteButton.className = "orange-button";

            checkbox.addEventListener("change", () => {
                j.status = checkbox.checked;
                saveProjects();
            });

            deleteButton.addEventListener("click", () => {
                const toDoToDelete = document.querySelector(
                    `#todo-${deleteButton.id}`
                );

                const index = getToDo(i).findIndex(
                    item => item.id === deleteButton.id
                );

                if (index !== -1) {
                    listOfProjects[i].todo.splice(index, 1);
                    saveProjects();
                }

                toDoToDelete.remove();
            });

            todo.append(checkbox);
            todo.append(todoName);
            todo.append(deleteButton);

            container.append(todo);
        }

        project_info.append(container);

        name.textContent = getName(i);
        name.className = "name";

        card.classList.add("card", getId(i));

        status.type = "checkbox";
        status.checked = getStatus(i);

        viewMore.classList.add(
            "viewMore",
            getId(i),
            "orange-button"
        );

        viewMore.textContent = "View";

        deleteCard.textContent = "Delete";

        deleteCard.classList.add(
            "delete",
            getId(i),
            "orange-button"
        );

        card.append(status);
        card.append(name);
        card.append(viewMore);
        card.append(deleteCard);
        card.append(project_info);

        todos.appendChild(card);

        status.addEventListener("change", () => {
            listOfProjects[i].status = status.checked;
            saveProjects();
        });

        deleteCard.addEventListener("click", () => {
            listOfProjects.splice(i, 1);
            saveProjects();
            display();
        });

        todoForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(todoForm);
            const data = formData.get("name");

            if (!data || data.trim() === "") {
                return;
            }

            getToDo(i).push(createToDo(data));
            saveProjects();

            const old_container = document.querySelector(
                `#container-${getId(i)}`
            );

            const new_container = document.createElement("div");

            new_container.className = "container";
            new_container.id = `container-${getId(i)}`;

            for (let j of getToDo(i)) {
                const todo = document.createElement("div");
                const todoName = document.createElement("h1");
                const checkbox = document.createElement("input");
                const deleteButton = document.createElement("button");

                todo.id = `todo-${j.id}`;
                todoName.textContent = j.name;

                checkbox.type = "checkbox";
                checkbox.checked = j.status;

                deleteButton.id = j.id;
                deleteButton.textContent = "delete";
                deleteButton.className = "orange-button";

                checkbox.addEventListener("change", () => {
                    j.status = checkbox.checked;
                    saveProjects();
                });

                deleteButton.addEventListener("click", () => {
                    const index = getToDo(i).findIndex(
                        item => item.id === deleteButton.id
                    );

                    if (index !== -1) {
                        listOfProjects[i].todo.splice(index, 1);
                        saveProjects();
                    }

                    todo.remove();
                });

                todo.append(checkbox);
                todo.append(todoName);
                todo.append(deleteButton);

                new_container.append(todo);
            }

            project_info.replaceChild(
                new_container,
                old_container
            );

            nameToDo.value = "";
        });

        viewMore.addEventListener("click", () => {
            project_info.showModal();
        });

        viewLess.addEventListener("click", () => {
            project_info.close();
        });
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = formData.get("add");

    if (!data || data.trim() === "") {
        return;
    }

    listOfProjects.push(createProject(data));

    saveProjects();
    display();

    form.reset();
});

display();