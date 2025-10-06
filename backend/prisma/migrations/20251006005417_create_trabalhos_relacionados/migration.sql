/*
  Warnings:

  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."products";

-- CreateTable
CREATE TABLE "public"."trabalhos_relacionados" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "doi" VARCHAR(255) NOT NULL,
    "resumo" TEXT NOT NULL,
    "autor" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trabalhos_relacionados_pkey" PRIMARY KEY ("id")
);
