BEGIN;

DROP TABLE IF EXISTS "user", "city";


CREATE TABLE IF NOT EXISTS "user" (
  "id" serial PRIMARY KEY,
  "firstname" text NULL,
  "lastname" text NULL,
  "email" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "city" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "user_id" integer NOT NULL REFERENCES "user" ("id")
);


INSERT INTO "user" ("id", "firstname", "lastname", "email", "password") VALUES 
  (1, 'marcel', 'patulacci', 'marcel@patulacci.gouv', 'god');

INSERT INTO "city" ("id", "name", "user_id") VALUES
  (1, 'marseille', 1);

COMMIT;