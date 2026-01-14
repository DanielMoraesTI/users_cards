var users = document.getElementById("usersList");
var UserClass = /** @class */ (function () {
    function UserClass(id, name, email, active) {
        if (active === void 0) { active = true; }
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
    }
    UserClass.prototype.inactive = function () {
        this.active = false;
    };
    return UserClass;
}());
var listUsers = [];
listUsers = [
    new UserClass(1, "Daniel", "teste@gmail.com", false),
    new UserClass(2, "Natália", "testeprof@gmail.com"),
    new UserClass(3, "Tais Dias", "meaguenta@obrigado.com"),
    new UserClass(4, "Debora", "thelastofus@tlou.com"),
    new UserClass(5, "Gabriela", "esperança@seguimos.com"),
    new UserClass(6, "Prof", "ajuda@socorrooooo.com", false),
    new UserClass(7, "Rebeca", "obrigado@alura.com")
];
function renderUsers() {
    users.innerHTML = "";
    listUsers.forEach(function (user) {
        var cardDiv = document.createElement("div");
        cardDiv.className = "user-card"; // Classe para o CSS
        var statusText = user.active ? "Ativo" : "Inativo";
        var statusClass = user.active ? "status-active" : "status-inactive";
        cardDiv.innerHTML = "\n            <h3><strong>Nome:</strong> ".concat(user.name, "</h3>\n            <p><strong>E-mail:</strong> ").concat(user.email, "</p>\n            <p><strong>Estado:</strong> <span class=\"").concat(statusClass, "\">").concat(statusText, "</span></p>\n        ");
        users.appendChild(cardDiv);
    });
}
renderUsers();
