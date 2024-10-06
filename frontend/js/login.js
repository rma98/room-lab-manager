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
            return response.json(); 
        }
        throw new Error('Falha no login');
    })
    .then(data => {
        const usuario = data.usuario;

        // Armazena o nome e tipo do usuário no localStorage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', usuario.nome);
        localStorage.setItem('userType', usuario.tipo);

        // Exibe a mensagem de boas-vindas
        showWelcomeMessage(`Bem-vindo ${usuario.tipo} ${usuario.nome}!`, 'success');

        // Redireciona após 2 segundos
        setTimeout(() => {
            window.location.href = '../../src/pages/index.html';
        }, 2000);
    })
    .catch(error => {
        // Exibe a mensagem de erro
        showWelcomeMessage(`Erro: ${error.message}`, 'error');
    });
});

// Função para exibir a mensagem com o ícone
function showWelcomeMessage(message, type) {
    const welcomeElement = document.getElementById('welcomeMessage');
    const welcomeIcon = document.getElementById('welcomeIcon');

    if (welcomeElement) {
        // Aplica a classe de tipo (sucesso ou erro)
        welcomeElement.className = `welcome-message ${type}`; // Apenas adiciona a classe de tipo

        // Define o ícone com base no tipo
        if (type === 'success') {
            welcomeIcon.className = 'icon fas fa-check-circle'; // Ícone de sucesso
            welcomeElement.innerHTML = `${welcomeIcon.outerHTML} ${message}`; // Atualiza a mensagem
        } else if (type === 'error') {
            welcomeIcon.className = 'icon fas fa-exclamation-circle'; // Ícone de erro
            welcomeElement.innerHTML = `${welcomeIcon.outerHTML} ${message}`; // Atualiza a mensagem
        }

        // Exibe a mensagem
        welcomeElement.style.display = 'block'; // Certifique-se de que a mensagem esteja visível

        // Limpa a mensagem após 3 segundos, se necessário
        setTimeout(() => {
            welcomeElement.style.display = 'none'; // Oculta a mensagem após 3 segundos
            welcomeElement.innerHTML = ''; // Limpa o conteúdo após ocultar
        }, 3000);
    }
}
