ALTER TABLE "users" ADD COLUMN "document" varchar(11) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_document_unique" UNIQUE("document");