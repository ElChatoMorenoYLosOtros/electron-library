SET TIME  ZONE 'UTC';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "client" (
    "clientId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "typeUser" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("clientId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "client_email_key" ON "client"("email");

CREATE UNIQUE INDEX IF NOT EXISTS "client_phoneNumber_key" ON "client"("phoneNumber");

CREATE TABLE IF NOT EXISTS "admin" (
    "adminId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "admin_email_key" ON "admin"("email");

CREATE TABLE IF NOT EXISTS "material" (
    "materialId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "type_material" TEXT NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("materialId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "material_isbn_key" ON "material"("isbn");

CREATE TABLE IF NOT EXISTS "office" (
    "officeId" TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "office_name_key" ON "office"("name");

CREATE TABLE IF NOT EXISTS "materials_changes" (
    "changeId" SERIAL PRIMARY KEY,
    "officeId" TEXT NOT NULL,
    "materialId" INTEGER NOT NULL,
    "changeType" TEXT NOT NULL,
    "changeDate" TIMESTAMPTZ DEFAULT NOW(),
    "oldData" JSONB,
    "newData" JSONB,

    CONSTRAINT "materials_changes_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "office"("officeId") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "loan" (
    "loanId" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "loanDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMPTZ(3) NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("loanId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "loan_loanId_key" ON "loan"("loanId");

CREATE UNIQUE INDEX IF NOT EXISTS "loan_loanId_key" ON "loan"("loanId");

CREATE OR REPLACE FUNCTION update_updatedAt()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_office_updatedAt
BEFORE UPDATE
ON "office"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt();

CREATE TRIGGER trigger_update_admin_updatedAt
BEFORE UPDATE
ON "admin"
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt();


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.table_constraints
        WHERE  constraint_name = 'loan_clientId_fkey'
    ) THEN
        ALTER TABLE "loan" ADD CONSTRAINT "loan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.table_constraints
        WHERE  constraint_name = 'loan_materialId_fkey'
    ) THEN
        ALTER TABLE "loan" ADD CONSTRAINT "loan_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("materialId") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
