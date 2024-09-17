-- CreateEnum
CREATE TYPE "PurchaseStatusEnum" AS ENUM ('awaiting', 'processing', 'processed', 'processed in part', 'canceled');

-- CreateEnum
CREATE TYPE "NotificationsWhenInStocksStatusEnum" AS ENUM ('awaiting', 'processed', 'canceled');

-- CreateEnum
CREATE TYPE "GenresEnum" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "GroupsNameEnum" AS ENUM ('role-super-admin', 'role-admin', 'role-user', 'role-client');

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_services" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" DECIMAL(10,2),
    "company_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "maintenance_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenances" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date_out" TIMESTAMP(3) NOT NULL,
    "date_return" TIMESTAMP(3) NOT NULL,
    "car_id" TEXT NOT NULL,
    "user_who_removed_id" TEXT,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "car_id" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forgot_tokens" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "forgot_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones_persons" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" VARCHAR NOT NULL,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "phones_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" VARCHAR,
    "rgss" VARCHAR,
    "birth_date" DATE,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "privacy" BOOLEAN NOT NULL DEFAULT false,
    "promotional_email" BOOLEAN NOT NULL DEFAULT false,
    "gender" "GenresEnum" NOT NULL DEFAULT 'other',
    "avatar" VARCHAR,
    "phone_id" TEXT,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT,
    "is_verified" TIMESTAMP(3),
    "person_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "registers_users" (
    "id" TEXT NOT NULL,
    "code_validation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registers_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifications_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verifications_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwords_reset_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwords_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_companies_groups" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "group_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "users_companies_groups_pkey" PRIMARY KEY ("user_id","group_id")
);

-- CreateIndex
CREATE INDEX "documents_id_idx" ON "documents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- CreateIndex
CREATE INDEX "services_id_idx" ON "services"("id");

-- CreateIndex
CREATE INDEX "maintenance_services_id_company_id_idx" ON "maintenance_services"("id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE INDEX "companies_id_idx" ON "companies"("id");

-- CreateIndex
CREATE INDEX "problems_id_idx" ON "problems"("id");

-- CreateIndex
CREATE INDEX "cars_id_idx" ON "cars"("id");

-- CreateIndex
CREATE INDEX "maintenances_id_idx" ON "maintenances"("id");

-- CreateIndex
CREATE UNIQUE INDEX "status_description_key" ON "status"("description");

-- CreateIndex
CREATE UNIQUE INDEX "status_acronym_key" ON "status"("acronym");

-- CreateIndex
CREATE INDEX "status_id_idx" ON "status"("id");

-- CreateIndex
CREATE INDEX "photos_id_car_id_idx" ON "photos"("id", "car_id");

-- CreateIndex
CREATE INDEX "forgot_tokens_id_idx" ON "forgot_tokens"("id");

-- CreateIndex
CREATE INDEX "groups_id_idx" ON "groups"("id");

-- CreateIndex
CREATE INDEX "phones_persons_id_idx" ON "phones_persons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "persons_cpf_key" ON "persons"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "persons_phone_id_key" ON "persons"("phone_id");

-- CreateIndex
CREATE INDEX "persons_id_idx" ON "persons"("id");

-- CreateIndex
CREATE INDEX "users_id_person_id_idx" ON "users"("id", "person_id");

-- CreateIndex
CREATE INDEX "accounts_user_id_idx" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "registers_users_code_validation_key" ON "registers_users"("code_validation");

-- CreateIndex
CREATE INDEX "registers_users_id_idx" ON "registers_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_tokens_token_key" ON "verifications_tokens"("token");

-- CreateIndex
CREATE INDEX "verifications_tokens_id_email_token_idx" ON "verifications_tokens"("id", "email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_tokens_email_token_key" ON "verifications_tokens"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "passwords_reset_tokens_token_key" ON "passwords_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "passwords_reset_tokens_id_idx" ON "passwords_reset_tokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "passwords_reset_tokens_email_token_key" ON "passwords_reset_tokens"("email", "token");

-- CreateIndex
CREATE INDEX "users_companies_groups_user_id_group_id_idx" ON "users_companies_groups"("user_id", "group_id");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_services" ADD CONSTRAINT "maintenance_services_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_services" ADD CONSTRAINT "maintenance_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_user_who_removed_id_fkey" FOREIGN KEY ("user_who_removed_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forgot_tokens" ADD CONSTRAINT "forgot_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones_persons" ADD CONSTRAINT "phones_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phones_persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies_groups" ADD CONSTRAINT "users_companies_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies_groups" ADD CONSTRAINT "users_companies_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
