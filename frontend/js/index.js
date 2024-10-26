let isSidebarActive = false;
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
  // Atualiza o ano atual no rodapé
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Verifica se o usuário está logado
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  const userName = localStorage.getItem('userName');
  const userType = localStorage.getItem('userType');

  if (storedIsLoggedIn === 'true' && userName && userType) {
    // Exibe a saudação personalizada
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    if (welcomeMessageElement) {
      welcomeMessageElement.innerHTML = `Bem-vindo ${userType} ${userName}!`;
    }

    // Exibe o menu de logout e oculta as opções de login e cadastro
    document.getElementById('logoutMenu').style.display = 'block';
    document.getElementById('loginMenu').style.display = 'none';
    document.getElementById('registerMenu').style.display = 'none';

    // Lógica para exibir opções de coordenador
    if (userType.toLowerCase() === 'coordenador') {
      document.getElementById('addRoomMenu').style.display = 'block';
      document.getElementById('addLabMenu').style.display = 'block';
    } else {
      // Se não for coordenador, oculte as opções
      document.getElementById('addRoomMenu').style.display = 'none';
      document.getElementById('addLabMenu').style.display = 'none';
    }
  } else {
    // Se o usuário não estiver logado, esconda o menu de logout
    document.getElementById('logoutMenu').style.display = 'none';
    document.getElementById('loginMenu').style.display = 'block';
    document.getElementById('registerMenu').style.display = 'block';

    // Oculta as opções de adicionar sala e laboratório para usuários não logados
    document.getElementById('addRoomMenu').style.display = 'none';
    document.getElementById('addLabMenu').style.display = 'none';
  }
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  isSidebarActive = !isSidebarActive;
  if (isSidebarActive) {
    sidebar.classList.add('active');
  } else {
    sidebar.classList.remove('active');
  }
}

function handleMenuClick(option) {
  if (option === 'home') {
    toggleSidebar();
  } else if (option === 'viewRooms' || option === 'viewLabs') {
    if (!isLoggedIn) {
      showPopup();
    } else {
      window.location.href = option === 'viewRooms' ? '/view-rooms' : '/view-labs';
    }
    toggleSidebar();
  } else if (option === 'login') {
    window.location.href = '../../src/pages/login.html'; // Redireciona para a página de login
  } else if (option === 'register') {
    window.location.href = '../../src/pages/register.html'; // Redireciona para a página de cadastro
  }
}

function handleCardClick(room) {
  if (!isLoggedIn) {
    showPopup();
  } else {
    console.log(`Espaço reservado: ${room}`);
  }
}

function logout() {
  // Remove informações de login
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
  localStorage.removeItem('userType');
  
  isLoggedIn = false;
  toggleSidebar();
  document.getElementById('logoutMenu').style.display = 'none';
  
  // Redireciona para a página de index após logout
  window.location.href = '../../src/pages/index.html';
}

function showPopup() {
  document.getElementById('loginPopup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('loginPopup').style.display = 'none';
}

function redirectTo(page) {
  window.location.href = `../../src/pages/${page}.html`;
}
