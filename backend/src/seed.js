/**
 * TenderFlow — Seed Script
 * Crée les utilisateurs système par défaut dans la base de données.
 *
 * Usage :
 *   node src/seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const User = require('./models/User');

// ─── Définition des utilisateurs par défaut ────────────────────────────────
const DEFAULT_USERS = [
    {
        name: 'Super Admin',
        email: 'admin@tenderflow.com',
        password: 'Admin@1234',
        role: 'admin',
        status: 'active',
    },
    {
        name: 'Acheteur Principal',
        email: 'buyer@tenderflow.com',
        password: 'Buyer@1234',
        role: 'buyer',
        status: 'active',
    },
    {
        name: 'Fournisseur Demo',
        email: 'supplier@tenderflow.com',
        password: 'Supplier@1234',
        role: 'supplier',
        status: 'active',
    },
];

// ─── Logique principale ─────────────────────────────────────────────────────
async function seed() {
    await connectDB();

    console.log('\n🌱  TenderFlow — Seed en cours...\n');

    let created = 0;
    let skipped = 0;

    for (const userData of DEFAULT_USERS) {
        const existing = await User.findOne({ email: userData.email });

        if (existing) {
            console.log(`  ⏭️  Ignoré  : ${userData.email}  (existe déjà)`);
            skipped++;
            continue;
        }

        const hashed = await bcrypt.hash(userData.password, 10);
        await User.create({ ...userData, password: hashed });

        console.log(`  ✅  Créé    : ${userData.email}  [${userData.role}]  — MDP: ${userData.password}`);
        created++;
    }

    console.log(`\n📊  Résumé : ${created} créé(s), ${skipped} ignoré(s)\n`);
    console.log('─'.repeat(60));
    console.log(' COMPTES PAR DÉFAUT');
    console.log('─'.repeat(60));
    console.log(' 👑  admin@tenderflow.com      →  Admin@1234');
    console.log(' 🏢  buyer@tenderflow.com       →  Buyer@1234');
    console.log(' 🏭  supplier@tenderflow.com    →  Supplier@1234');
    console.log('─'.repeat(60));
    console.log('\n⚠️  Pensez à changer les mots de passe en production !\n');

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Erreur seed :', err.message);
    process.exit(1);
});
