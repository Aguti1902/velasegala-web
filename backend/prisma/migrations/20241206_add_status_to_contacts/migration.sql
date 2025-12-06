-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN "treatment" TEXT;
ALTER TABLE "ContactSubmission" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE INDEX "ContactSubmission_status_idx" ON "ContactSubmission"("status");

