document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const credentials = { email: email, password: password };
    console.log("Credenciais do usuário:", credentials);

    // Aqui você pode adicionar a lógica de autenticação via API, por exemplo:
    // fetch("http://localhost:8080/api/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(credentials),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     if (data.success) {
    //         // Redirecionar para a página de dashboard ou página inicial
    //         window.location.href = "/dashboard.html";
    //     } else {
    //         alert("Erro no login. Verifique suas credenciais.");
    //     }
    // })
    // .catch(error => {
    //     console.error("Erro:", error);
    // });
});