/*
  Warnings:

  - You are about to drop the column `isRadiant` on the `Match` table. All the data in the column will be lost.
  - Added the required column `radiant_win` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "match_id" REAL NOT NULL PRIMARY KEY,
    "winner" TEXT NOT NULL,
    "date" REAL NOT NULL,
    "radiant_win" BOOLEAN NOT NULL
);
INSERT INTO "new_Match" ("date", "match_id", "winner") SELECT "date", "match_id", "winner" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
