CREATE TABLE IF NOT EXISTS "employee" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"driver" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
