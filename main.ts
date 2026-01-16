const users = document.getElementById("usersList") as HTMLUListElement;
const userCountDisplay = document.getElementById("userCount") as HTMLSpanElement;
const activeCountDisplay = document.getElementById("activeCount") as HTMLSpanElement;
const inactiveCountDisplay = document.getElementById("inactiveCount") as HTMLSpanElement;
const userDetailsSection = document.getElementById("userDetails") as HTMLElement;
const detailsContent = document.getElementById("detailsContent") as HTMLDivElement;
const btnCloseDetails = document.getElementById("closeDetails") as HTMLButtonElement;
const activityRateDisplay = document.getElementById("activityRate") as HTMLSpanElement;
const activityBar = document.getElementById("activityBar") as HTMLDivElement;

interface User {
    id: number;
    name: string;
    email: string;
    active?: boolean;
}

class UserClass implements User {
    id: number;
    name: string;
    email: string;
    active?: boolean;

    constructor(id: number, name: string, email: string, active: boolean = true) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
    }

    toggleEstado(): void {
        this.active = !this.active;
    }

    inactive(): void {
        this.active = false;
    }
}

let listUsers: User[] = [];

function showUserDetails(id: number): void {
    const user = listUsers.find(u => u.id === id);
    if (!user) return;
    detailsContent.innerHTML = `
        <h3>Detalhes do Utilizador</h3>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Nome:</strong> ${user.name}</p>
        <p><strong>E-mail:</strong> ${user.email}</p>
        <p><strong>Estado:</strong> ${user.active ? "Ativo" : "Inativo"}</p>
    `;
    userDetailsSection.style.display = "block";
}

btnCloseDetails?.addEventListener("click", () => userDetailsSection.style.display = "none");


function renderUsers(arrayToRender: User[] = listUsers): void {
    users.innerHTML = "";

    const totalUsers = listUsers.length;
    const totalActive = listUsers.filter(u => u.active).length;
    const totalInactive = totalUsers - totalActive;
    const activityPercentage = totalUsers > 0 ? Math.round((totalActive / totalUsers) * 100) : 0;

    if (userCountDisplay) userCountDisplay.textContent = arrayToRender.length.toString();
    if (activeCountDisplay) activeCountDisplay.textContent = totalActive.toString();
    if (inactiveCountDisplay) inactiveCountDisplay.textContent = totalInactive.toString();
    if (activityRateDisplay) activityRateDisplay.textContent = `${activityPercentage}%`;
    if (activityBar) activityBar.style.width = `${activityPercentage}%`;


    arrayToRender.forEach(user => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "user-card";

        const statusText = user.active ? "Ativo" : "Inativo";
        const statusClass = user.active ? "status-active" : "status-inactive";

        const toggleBtnText = user.active ? "Desativar" : "Ativar";
        const toggleBtnClass = user.active ? "btnDeactivate" : "btnActivate";

        cardDiv.innerHTML = `
            <h3><strong>Nome:</strong> ${user.name}</h3>
            <p><strong>E-mail:</strong> ${user.email}</p>
            <p><strong>Estado:</strong> <span class="${statusClass}">${statusText}</span></p>
            <div class="tasks-area">
                <hr>
                <p><strong>Tarefas:</strong> 0 tarefas atribuídas</p>
            </div>
            <div class="card-actions">
                <button class="${toggleBtnClass}" data-id="${user.id}">${toggleBtnText}</button>
                <button class="btnRemove" data-id="${user.id}">Remover</button>
            </div>
        `;

        cardDiv.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (!target.tagName.toLowerCase().includes('button')) {
                showUserDetails(user.id);
            }
        });

        users.appendChild(cardDiv);
    });

        const toggleButtons = document.querySelectorAll(".btnDeactivate, .btnActivate");
        toggleButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const target = e.target as HTMLButtonElement;
                const id = parseInt(target.getAttribute("data-id") || "0");
                toggleUserStatus(id);
            });
        });

        const removeButtons = document.querySelectorAll(".btnRemove");
            removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const target = e.target as HTMLButtonElement;
                const id = parseInt(target.getAttribute("data-id") || "0");
                removeUser(id);
            });
        });
    }

function removeUser(id: number): void {
    if (confirm("Tem a certeza que deseja remover este utilizador?")) {
        listUsers = listUsers.filter(user => user.id !== id);

        renderUsers();
    }
}

const btnFilterActive = document.getElementById("filterActive") as HTMLButtonElement;
const btnShowAll = document.getElementById("showAll") as HTMLButtonElement;

btnFilterActive.addEventListener("click", () => {
    const activeUsers = listUsers.filter(user => user.active === true);
        
    renderUsers(activeUsers);
});

btnShowAll.addEventListener("click", () => {
    renderUsers(listUsers);
});


const btnSortName = document.getElementById("sortName") as HTMLButtonElement;

btnSortName.addEventListener("click", () => {

    listUsers.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    renderUsers();
});

function deactivateUser(id: number): void {
    const user = listUsers.find(u => u.id === id);

    if (user instanceof UserClass) {
        user.inactive();
        
        renderUsers();
    }
}

function toggleUserStatus(id: number): void {
    const user = listUsers.find(u => u.id === id);

    if (user) {
        if (user instanceof UserClass) {
            user.toggleEstado();
        } else {
            user.active = !user.active;
        }
        renderUsers();
    }
}

const searchInput = document.getElementById("searchInput") as HTMLInputElement;

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredUsers = listUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );

    renderUsers(filteredUsers);
});

const formAdd = document.getElementById("formAdd") as HTMLFormElement;
const inputName = document.getElementById("name") as HTMLInputElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const erro = document.getElementById("erro") as HTMLSpanElement;

formAdd.addEventListener("submit", (event: Event) => {
    erro.innerHTML = "";
    event.preventDefault();

    const nameValue = inputName.value.trim();
    const emailValue = inputEmail.value.trim();

    if(nameValue === "" || emailValue === "") {    
        erro.innerHTML = `Preencha os campos corretamente`;
        erro.className = "erro";
        return;
    } else if(!emailValue.includes("@")) {
        erro.innerHTML = `Inclua o "@" no seu endereço de e-mail`;
        erro.className = "erro";
        return;
    };

    const newId = listUsers.length > 0 ? listUsers[listUsers.length - 1].id + 1 : 1;
    const newUser = new UserClass(newId, nameValue, emailValue, true);

    listUsers.push(newUser);

    renderUsers();
    formAdd.reset();
});