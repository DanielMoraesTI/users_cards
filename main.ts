const users = document.getElementById("usersList") as HTMLUListElement;

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

    inactive(): void {
        this.active = false;
    }
}

let listUsers: User[] = [];

listUsers = [
    new UserClass(1, "Daniel", "teste@gmail.com", false),
    new UserClass(2, "Natália", "testeprof@gmail.com"),
    new UserClass(3, "Tais Dias", "meaguenta@obrigado.com"),
    new UserClass(4, "Debora", "thelastofus@tlou.com"),
    new UserClass(5, "Gabriela", "esperança@seguimos.com"),
    new UserClass(6, "Prof", "ajuda@socorrooooo.com", false),
    new UserClass(7, "Rebeca", "obrigado@alura.com")
]

function renderUsers(): void {
    users.innerHTML = "";

    listUsers.forEach(user => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "user-card"; // Classe para o CSS

        const statusText = user.active ? "Ativo" : "Inativo";
        const statusClass = user.active ? "status-active" : "status-inactive";

        cardDiv.innerHTML = `
            <h3><strong>Nome:</strong> ${user.name}</h3>
            <p><strong>E-mail:</strong> ${user.email}</p>
            <p><strong>Estado:</strong> <span class="${statusClass}">${statusText}</span></p>
        `;

        users.appendChild(cardDiv);
    })
}

renderUsers();