-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "deployedLink" DROP NOT NULL,
ALTER COLUMN "deployedLink" DROP DEFAULT,
ALTER COLUMN "githubLink" DROP NOT NULL,
ALTER COLUMN "githubLink" DROP DEFAULT,
ALTER COLUMN "techStack" DROP NOT NULL,
ALTER COLUMN "techStack" DROP DEFAULT;
