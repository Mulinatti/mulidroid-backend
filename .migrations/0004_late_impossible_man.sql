ALTER TABLE "employee" RENAME COLUMN "nickname" TO "alias";--> statement-breakpoint
ALTER TABLE "employee" DROP CONSTRAINT "employee_nickname_unique";--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_alias_unique" UNIQUE("alias");