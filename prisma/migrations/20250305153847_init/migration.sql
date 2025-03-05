-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "language" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "bookImg" VARCHAR(250) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
