CREATE TABLE IF NOT EXISTS "employee" (
	"id" text PRIMARY KEY NOT NULL,
	"alias" text NOT NULL,
	"name" text NOT NULL,
	"driver" boolean NOT NULL,
	"birthdate" text NOT NULL,
	"phone_number" text NOT NULL,
	CONSTRAINT "employee_alias_unique" UNIQUE("alias"),
	CONSTRAINT "employee_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_service" (
	"id" text PRIMARY KEY NOT NULL,
	"employee_id" text NOT NULL,
	"service_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service" (
	"id" text PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"neighborhood" text NOT NULL,
	"value" integer NOT NULL,
	"service_date" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
DO $$ BEGIN
 ALTER TABLE "employee_service" ADD CONSTRAINT "employee_service_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_service" ADD CONSTRAINT "employee_service_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
