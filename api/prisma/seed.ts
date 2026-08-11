import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
const prisma = new PrismaClient({adapter:
    new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

async function main() {
  console.log('🌱 Seeding database for Phase 1...');

  // 1. Create Users
  const alice = await prisma.user.upsert({
    where: { username: 'alice_wonder' },
    update: {},
    create: {
      username: 'alice_wonder',
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
      name: 'Charlie',
      lastOnline: new Date(),
      isOnline: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      about: 'Silent movies are the best.',
    },
  });

  // 2. Create an Accepted Friendship between Alice and Bob
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

  // 3. Create a Chat Room and add Alice and Bob as members
  const mainChat = await prisma.chat.create({
    data: {
      members: {
        connect: [{ username: alice.username }, { username: bob.username }],
      },
    },
  });

  // 4. Create Messages in that Chat
  await prisma.message.createMany({
    data: [
      {
        content: "Hey Bob! How is the messaging app going?", 
        username: alice.username,
        groupID: mainChat.id,
        isImage: false,
      },
      {
        content: "It's going great! The Prisma schema is done.",
        username: bob.username,
        groupID: mainChat.id,
        isImage: false,
      },
    ],
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });