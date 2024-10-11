ALTER TABLE "employee_service" ADD COLUMN "is_paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "vehicle_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_vehicle_id_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
