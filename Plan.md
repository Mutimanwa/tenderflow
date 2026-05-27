src/
├── assets/               # Images, logos, illustrations (ex: le vecteur de la boîte aux lettres)
├── components/           # Composants réutilisables globaux
│   ├── ui/               # Petites briques d'interface atomiques
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Badge.jsx     # Statuts : Ouvert, En cours, Accepté, Refusé
│   │   └── Card.jsx
│   └── layout/           # Squelettes de structure
│       ├── AppLayout.jsx # Sidebar + Topbar pour la partie connectée
│       └── AuthLayout.jsx# Structure coupée en 2 pour Login / Sign-up
├── views/                # Les pages de l'application par module
│   ├── public/           # Partie vitrine
│   │   └── LandingPage.jsx
│   ├── auth/             # Connexion / Inscription
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   └── ForgotPassword.jsx
│   ├── admin/            # Vues de Nelson (Administrateur / Acheteur)
│   │   ├── DashboardAdmin.jsx
│   │   ├── ManageOffers.jsx    # Tableaux de bord des appels d'offres
│   │   ├── CreateOffer.jsx     # Formulaire d'ajout d'offre
│   │   ├── SubmissionsList.jsx # Gestion des soumissions reçues
│   │   └── UsersManagement.jsx # Gestion des utilisateurs
│   └── client/           # Vues de Daniel (Fournisseur / Candidat)
│       ├── DashboardClient.jsx
│       ├── AvailableOffers.jsx # Grille des offres ouvertes
│       ├── OfferDetails.jsx    # Description + dépôt de fichier
│       ├── SubmitProposal.jsx  # Nouvelle soumission
│       ├── MyDocuments.jsx     # Gestion de la bibliothèque de fichiers
│       └── ProfileSettings.jsx # Paramètres du profil
├── App.jsx               # Configuration de React Router
└── index.css             # Directives Tailwind CSS