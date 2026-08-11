-- CreateEnum
CREATE TYPE "requestStatus" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "isImage" BOOLEAN,
    "imageSrc" TEXT,
    "username" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupID" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastOnline" TIMESTAMP(3) NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "avatar" TEXT NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "friendShip" (
    "senderUsername" TEXT NOT NULL,
    "receiverUsername" TEXT NOT NULL,
    "status" "requestStatus" NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "_chatTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_chatTouser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "friendShip_senderUsername_receiverUsername_key" ON "friendShip"("senderUsername", "receiverUsername");

-- CreateIndex
CREATE INDEX "_chatTouser_B_index" ON "_chatTouser"("B");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendShip" ADD CONSTRAINT "friendShip_senderUsername_fkey" FOREIGN KEY ("senderUsername") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendShip" ADD CONSTRAINT "friendShip_receiverUsername_fkey" FOREIGN KEY ("receiverUsername") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chatTouser" ADD CONSTRAINT "_chatTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chatTouser" ADD CONSTRAINT "_chatTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE CASCADE;
