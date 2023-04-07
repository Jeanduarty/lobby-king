-- CreateTable
CREATE TABLE "Match" (
    "match_id" DOUBLE PRECISION NOT NULL,
    "winner" TEXT NOT NULL,
    "date" DOUBLE PRECISION NOT NULL,
    "radiant_win" BOOLEAN NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("match_id")
);
