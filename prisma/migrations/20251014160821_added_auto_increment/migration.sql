-- AlterTable
CREATE SEQUENCE lotteryrounds_id_seq;
ALTER TABLE "LotteryRounds" ALTER COLUMN "id" SET DEFAULT nextval('lotteryrounds_id_seq');
ALTER SEQUENCE lotteryrounds_id_seq OWNED BY "LotteryRounds"."id";
