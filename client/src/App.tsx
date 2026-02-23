import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  nom: string;
  prenom: string;
  role: string;
  isActive: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((result: User[]) => {
        setUsers(result);
        setError(null);
      })
      .catch((err: unknown) => {
        console.error(err);
        setError("Impossible de récupérer la BDD des users.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des différents users...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="App">
      <h1>Liste des users</h1>
      {users.length === 0 ? (
        <p>Aucun users trouvé.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.prenom} {user.nom} — {user.role}{" "}
              {user.isActive ? "(actif)" : "(inactif)"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
