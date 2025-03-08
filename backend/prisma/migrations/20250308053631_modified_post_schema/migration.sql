-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "deployedLink" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "githubLink" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "techStack" TEXT NOT NULL DEFAULT '';
