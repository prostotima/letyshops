
  // Застосування стилів
  function applyStyles() {
  const bgColor = document.getElementById('bgColorPicker').value;
  const fontSize = document.getElementById('fontSizePicker').value;

  document.body.style.background = bgColor; // Замість backgroundColor
  document.body.style.fontSize = fontSize + 'px';
}


  // 📦 API – Завантаження користувачів
  function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('userList');
        list.innerHTML = ''; // очищення перед оновленням

        data.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `${user.name} – ${user.email}`;
          list.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Помилка при завантаженні:', error);
        document.getElementById('userList').innerHTML = '<li>Помилка при завантаженні даних.</li>';
      });
  }

