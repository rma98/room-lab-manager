document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        type: document.getElementById('type').value
    };

    // Simulando uma requisição usando fetch
    fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: formData.name,
            email: formData.email,
            senha: formData.password,
            tipo: formData.type.toUpperCase()
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao cadastrar o usuário');
    })
    .then(data => {
        document.getElementById('message').innerHTML = `<div class="success">Usuário cadastrado com sucesso!</div>`;
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    })
    .catch(error => {
        document.getElementById('message').innerHTML = `<div class="error">${error.message}</div>`;
    });
});
