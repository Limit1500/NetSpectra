/*
  Warnings:

  - Changed the type of `purpose` on the `email_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "email_tokens" DROP COLUMN "purpose",
ADD COLUMN     "purpose" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DatabaseTokenPurpose";
