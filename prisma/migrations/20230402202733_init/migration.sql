/*
  Warnings:

  - The primary key for the `Match` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `date` on the `Match` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `match_id` on the `Match` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "match_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "winner" TEXT NOT NULL,
    "date" INTEGER NOT NULL
);
INSERT INTO "new_Match" ("date", "match_id", "winner") SELECT "date", "match_id", "winner" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
