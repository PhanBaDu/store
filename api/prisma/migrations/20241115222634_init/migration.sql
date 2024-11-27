-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userAgent" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
