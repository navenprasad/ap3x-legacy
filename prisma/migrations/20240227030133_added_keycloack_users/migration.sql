-- CreateTable
CREATE TABLE "UserEntity" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "email_constraint" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "federation_link" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "realm_id" TEXT,
    "username" TEXT,
    "created_timestamp" INTEGER,
    "service_account_client_link" TEXT,
    "not_before" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserEntity_pkey" PRIMARY KEY ("id")
);
