function loadUsers() {
  fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      const list = document.getElementById('list');
      list.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'group flex items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 shadow-sm shadow-slate-950/40 hover:border-indigo-400/80 hover:bg-slate-900 transition';
        li.innerHTML = `
          <div class="flex flex-col">
            <span class="font-medium leading-tight">${user.nom} ${user.prenom}</span>
            <span class="text-[11px] uppercase tracking-wide text-slate-500">ID&nbsp;#${user.id}</span>
          </div>
          <button
            class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-rose-500/60 bg-rose-500/10 text-[11px] font-semibold text-rose-200 shadow-sm shadow-rose-900/40 hover:bg-rose-500/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition"
            title="Supprimer cet utilisateur"
          >
            X
          </button>`;
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
