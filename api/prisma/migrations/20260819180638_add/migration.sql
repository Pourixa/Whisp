-- AlterTable
ALTER TABLE "friendShip" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "friendShip_pkey" PRIMARY KEY ("id");
