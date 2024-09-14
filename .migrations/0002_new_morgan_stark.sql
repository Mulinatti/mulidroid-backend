CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	"employee_id" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle" (
	"id" text PRIMARY KEY NOT NULL,
	"plate" text NOT NULL,
	"model" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "vehicle_plate_unique" UNIQUE("plate")
);
--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "alias" text NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "birthdate" timestamp NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employee" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_alias_unique" UNIQUE("alias");