function loadUsers() {
  fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      const list = document.getElementById('list');
      list.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'bg-white p-2 rounded shadow flex justify-between items-center';
        li.innerHTML = `<span>${user.nom} ${user.prenom}</span>
          <button class="bg-red-500 text-white px-2 rounded">X</button>`;
        li.querySelector('button').addEventListener('click', () => {
          fetch(`/api/users/${user.id}`, { method: 'DELETE' })
            .then(() => loadUsers());
        });
        list.appendChild(li);
      });
    });
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  
  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom, prenom })
  }).then(() => {
    document.getElementById('nom').value = '';
    document.getElementById('prenom').value = '';
    loadUsers();
  });
});

loadUsers();
