document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const credentials = { email: email, password: password };

    // Faz a requisição para o backend
    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
    .then(response => {
        if (response.ok) {
            return response.text();  // Pode receber a mensagem do servidor
        } else {
            throw new Error('Falha na autenticação');
        }
    })
    .then(message => {
        console.log(message);
        // Redirecionar para o dashboard ou página inicial
        window.location.href = "/index.html";
    })
    .catch(error => {
        document.getElementById('message').innerHTML = `<div class="error">${error.message}</div>`;
        console.error("Erro:", error);
    });
});
