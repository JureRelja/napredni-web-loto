-- CreateTable
CREATE TABLE "LotteryRounds" (
    "id" INTEGER NOT NULL,
    "areSubmissionsAllowed" BOOLEAN NOT NULL DEFAULT true,
    "drawnNumbers" INTEGER[],

    CONSTRAINT "LotteryRounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "qrCodeLink" TEXT NOT NULL,
    "predictedNumbers" INTEGER[],
    "idCardNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
