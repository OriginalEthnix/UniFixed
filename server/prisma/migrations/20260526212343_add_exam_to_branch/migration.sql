-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nirf" INTEGER NOT NULL,
    "hostel" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "fees" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quota" TEXT NOT NULL,
    "closingRank" INTEGER NOT NULL,
    "averagePackage" TEXT NOT NULL,
    "codingCulture" TEXT NOT NULL,
    "placementScore" INTEGER NOT NULL,
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_exam_category_quota_collegeId_key" ON "Branch"("name", "exam", "category", "quota", "collegeId");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
