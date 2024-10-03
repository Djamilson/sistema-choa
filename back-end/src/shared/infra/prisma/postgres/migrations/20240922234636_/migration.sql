-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "located_id" TEXT;

-- CreateTable
CREATE TABLE "localeds" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "car_id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,

    CONSTRAINT "localeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "localeds_id_idx" ON "localeds"("id");

-- CreateIndex
CREATE INDEX "institutions_id_idx" ON "institutions"("id");

-- AddForeignKey
ALTER TABLE "localeds" ADD CONSTRAINT "localeds_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localeds" ADD CONSTRAINT "localeds_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
