document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('name').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('password').value,
        tipo: document.getElementById('type').value
    };

    // Simulando uma requisição usando fetch
    fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Mantenha os nomes consistentes
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => { // Capture o erro detalhado
            throw new Error(err.message || 'Erro ao cadastrar o usuário');
        });
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
