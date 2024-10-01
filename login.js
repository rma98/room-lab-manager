document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            senha: formData.password
        })
    })
    .then(response => {
        if (response.ok) {
            // Lida com respostas de texto simples
            return response.text(); 
        }
        throw new Error('Falha no login');
    })
    .then(data => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerHTML = `<div class="success">${data}</div>`;
        }

        setTimeout(() => {
            window.location.href = 'index.html'; // Redireciona após 2 segundos
        }, 2000);
    })
    .catch(error => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerHTML = `<div class="error">${error.message}</div>`;
        }
    });
});
