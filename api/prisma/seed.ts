import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config"
const prisma = new PrismaClient({adapter:
    new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

const bcrypt = require('bcrypt');

async function main() {
  console.log('🌱 Seeding database with hashed passwords...');

  // 1. Generate the Salt and Hash
  // We use 10 rounds for the salt, which is the standard balance of speed and security.
  const salt = await bcrypt.genSalt();
  
  // For the sake of the seed, we will give everyone the same password: 'password123'
  const defaultPassword = await bcrypt.hash('password123', salt);

  // 2. Create Users
  const alice = await prisma.user.upsert({
    where: { username: 'alice_wonder' },
    update: {},
    create: {
      username: 'alice_wonder',
      password: defaultPassword, // <--- Hashed password injected here
      name: 'Alice',
      lastOnline: new Date(),
      isOnline: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      about: 'I love building Node.js apps!',
    },
  });

  const bob = await prisma.user.upsert({
    where: { username: 'bob_builder' },
    update: {},
    create: {
      username: 'bob_builder',
      password: defaultPassword, // <--- Hashed password injected here
      name: 'Bob',
      lastOnline: new Date(),
      isOnline: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      about: 'Can we fix it? Yes we can.',
    },
  });

  const charlie = await prisma.user.upsert({
    where: { username: 'charlie_chaplin' },
    update: {},
    create: {
      username: 'charlie_chaplin',
      password: defaultPassword, // <--- Hashed password injected here
      name: 'Charlie',
      lastOnline: new Date(),
      isOnline: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      about: 'Silent movies are the best.',
    },
  });

  // 3. Create an Accepted Friendship between Alice and Bob
  await prisma.friendShip.upsert({
    where: {
      senderUsername_receiverUsername: {
        senderUsername: alice.username,
        receiverUsername: bob.username,
      },
    },
    update: {},
    create: {
      senderUsername: alice.username,
      receiverUsername: bob.username,
      status: 'ACCEPTED',
    },
  });

  // 4. Create a Chat Room and add Alice and Bob as members
  const mainChat = await prisma.chat.create({
    data: {
      members: {
        connect: [{ username: alice.username }, { username: bob.username }],
      },
    },
  });

  // 5. Create Messages in that Chat
  await prisma.message.createMany({
    data: [
      {
        // content: "Hey Bob! How is the messaging app going?", 
        username: alice.username,
        groupID: mainChat.id,
        isRead: true,
        isImage: false,
      },
      {
        // content: "It's going great! The Prisma schema is done.",
        username: bob.username,
        groupID: mainChat.id,
        isRead: false,
        isImage: false,
      },
    ],
  });

  console.log('✅ Seeding complete! All users have the password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });