-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isPreAuthorized" BOOLEAN,
ADD COLUMN     "isRecurring" BOOLEAN,
ADD COLUMN     "payee" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "color" TEXT;

-- CreateTable
CREATE TABLE "Recurrence" (
    "id" SERIAL NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Recurrence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recurrence" ADD CONSTRAINT "Recurrence_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
