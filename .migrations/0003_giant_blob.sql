ALTER TABLE "employee" RENAME COLUMN "alias" TO "nickname";--> statement-breakpoint
ALTER TABLE "employee" DROP CONSTRAINT "employee_alias_unique";--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_nickname_unique" UNIQUE("nickname");