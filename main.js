const users = document.getElementById("usersList");
const userCountDisplay = document.getElementById("userCount");
const activeCountDisplay = document.getElementById("activeCount");
const inactiveCountDisplay = document.getElementById("inactiveCount");
const userDetailsSection = document.getElementById("userDetails");
const detailsContent = document.getElementById("detailsContent");
const btnCloseDetails = document.getElementById("closeDetails");
const activityRateDisplay = document.getElementById("activityRate");
const activityBar = document.getElementById("activityBar");
class UserClass {
    constructor(id, name, email, active = true) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
    }
    toggleEstado() {
        this.active = !this.active;
    }
    inactive() {
        this.active = false;
    }
}
let listUsers = [];
function showUserDetails(id) {
    const user = listUsers.find(u => u.id === id);
    if (!user)
        return;
    detailsContent.innerHTML = `
        <h3>Detalhes do Utilizador</h3>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Nome:</strong> ${user.name}</p>
        <p><strong>E-mail:</strong> ${user.email}</p>
        <p><strong>Estado:</strong> ${user.active ? "Ativo" : "Inativo"}</p>
    `;
    userDetailsSection.style.display = "block";
}
btnCloseDetails === null || btnCloseDetails === void 0 ? void 0 : btnCloseDetails.addEventListener("click", () => userDetailsSection.style.display = "none");
function renderUsers(arrayToRender = listUsers) {
    users.innerHTML = "";
    const totalUsers = listUsers.length;
    const totalActive = listUsers.filter(u => u.active).length;
    const totalInactive = totalUsers - totalActive;
    const activityPercentage = totalUsers > 0 ? Math.round((totalActive / totalUsers) * 100) : 0;
    if (userCountDisplay)
        userCountDisplay.textContent = arrayToRender.length.toString();
    if (activeCountDisplay)
        activeCountDisplay.textContent = totalActive.toString();
    if (inactiveCountDisplay)
        inactiveCountDisplay.textContent = totalInactive.toString();
    if (activityRateDisplay)
        activityRateDisplay.textContent = `${activityPercentage}%`;
    if (activityBar)
        activityBar.style.width = `${activityPercentage}%`;
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
            const target = e.target;
            if (!target.tagName.toLowerCase().includes('button')) {
                showUserDetails(user.id);
            }
        });
        users.appendChild(cardDiv);
    });
    const toggleButtons = document.querySelectorAll(".btnDeactivate, .btnActivate");
    toggleButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const target = e.target;
            const id = parseInt(target.getAttribute("data-id") || "0");
            toggleUserStatus(id);
        });
    });
    const removeButtons = document.querySelectorAll(".btnRemove");
    removeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const target = e.target;
            const id = parseInt(target.getAttribute("data-id") || "0");
            removeUser(id);
        });
    });
}
function removeUser(id) {
    if (confirm("Tem a certeza que deseja remover este utilizador?")) {
        listUsers = listUsers.filter(user => user.id !== id);
        renderUsers();
    }
}
const btnFilterActive = document.getElementById("filterActive");
const btnShowAll = document.getElementById("showAll");
btnFilterActive.addEventListener("click", () => {
    const activeUsers = listUsers.filter(user => user.active === true);
    renderUsers(activeUsers);
});
btnShowAll.addEventListener("click", () => {
    renderUsers(listUsers);
});
const btnSortName = document.getElementById("sortName");
btnSortName.addEventListener("click", () => {
    listUsers.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    renderUsers();
});
function deactivateUser(id) {
    const user = listUsers.find(u => u.id === id);
    if (user instanceof UserClass) {
        user.inactive();
        renderUsers();
    }
}
function toggleUserStatus(id) {
    const user = listUsers.find(u => u.id === id);
    if (user) {
        if (user instanceof UserClass) {
            user.toggleEstado();
        }
        else {
            user.active = !user.active;
        }
        renderUsers();
    }
}
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredUsers = listUsers.filter(user => user.name.toLowerCase().includes(searchTerm));
    renderUsers(filteredUsers);
});
const formAdd = document.getElementById("formAdd");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const erro = document.getElementById("erro");
formAdd.addEventListener("submit", (event) => {
    erro.innerHTML = "";
    event.preventDefault();
    const nameValue = inputName.value.trim();
    const emailValue = inputEmail.value.trim();
    if (nameValue === "" || emailValue === "") {
        erro.innerHTML = `Preencha os campos corretamente`;
        erro.className = "erro";
        return;
    }
    else if (!emailValue.includes("@")) {
        erro.innerHTML = `Inclua o "@" no seu endereço de e-mail`;
        erro.className = "erro";
        return;
    }
    ;
    const newId = listUsers.length > 0 ? listUsers[listUsers.length - 1].id + 1 : 1;
    const newUser = new UserClass(newId, nameValue, emailValue, true);
    listUsers.push(newUser);
    renderUsers();
    formAdd.reset();
});
