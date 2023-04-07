/*
  Warnings:

  - Added the required column `isRadiant` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "match_id" REAL NOT NULL PRIMARY KEY,
    "winner" TEXT NOT NULL,
    "date" REAL NOT NULL,
    "isRadiant" BOOLEAN NOT NULL
);
INSERT INTO "new_Match" ("date", "match_id", "winner") SELECT "date", "match_id", "winner" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
