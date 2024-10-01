let isSidebarActive = false;
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
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
  isLoggedIn = false;
  toggleSidebar();
  document.getElementById('logoutMenu').style.display = 'none';
}

function showPopup() {
  document.getElementById('loginPopup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('loginPopup').style.display = 'none';
}

function redirectTo(page) {
  window.location.href = `/${page}.html`;
}
