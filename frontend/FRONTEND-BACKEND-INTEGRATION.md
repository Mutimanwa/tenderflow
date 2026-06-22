## Intégration Frontend ↔ Backend (rapide)

Ce fichier montre comment utiliser le backend Express depuis le frontend React déjà présent.

1) URL de base
- Le client utilise `REACT_APP_API_URL` (ex: `http://localhost:4000`). Si non défini, il pointe vers `http://localhost:4000`.

2) Fichier helper
- `src/api/client.js` expose : `login`, `register`, `getOffers`, `createOffer`, `uploadDocument`.

3) Exemple d'utilisation dans un composant React (Login)

```jsx
import { useState } from 'react';
import api from '../api/client';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.login({ email, password });
      // Sauvegarder token dans localStorage
      localStorage.setItem('tf_token', res.token);
      // redirection ou update d'état
      console.log('Logged:', res.user);
    } catch (err) {
      console.error(err);
      alert(err.body?.message || 'Erreur de connexion');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
      <button>Se connecter</button>
    </form>
  );
}
```

4) Exemple pour récupérer les offres

```jsx
import { useEffect, useState } from 'react';
import api from '../api/client';

export default function OffersList() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    api.getOffers().then(setOffers).catch(console.error);
  }, []);
  return (
    <div>
      {offers.map((o) => (
        <div key={o._id}>{o.title}</div>
      ))}
    </div>
  );
}
```

5) Upload de document

```js
const file = input.files[0];
const token = localStorage.getItem('tf_token');
api.uploadDocument(file, token).then(console.log).catch(console.error);
```

6) Notes
- Les endpoints protégés attendent l'entête `Authorization: Bearer <token>`.
- Avant d'appeler les routes authentifiées, assure-toi que l'utilisateur est connecté et que `token` est stocké.
