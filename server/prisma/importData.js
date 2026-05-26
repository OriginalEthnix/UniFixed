const fs = require("fs");
const csv = require("csv-parser");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const results = [];

fs.createReadStream("data/colleges.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {
    try {
      for (const item of results) {

        // Create college
        const college = await prisma.college.upsert({
        where: {
            name: item.college,
        },

        update: {},

        create: {
            name: item.college,
            nirf: Number(item.nirf),
            hostel: item.hostel,
            campus: item.campus,
            fees: item.fees,
        },
    });

        // Create branch
        await prisma.branch.create({
      data: {
    name: item.branch,

    category: item.category,
    quota: item.quota,

    closingRank: Number(item.closingRank),

    averagePackage: item.package,
    codingCulture: item.codingCulture,
    placementScore: Number(item.placementScore),

    collegeId: college.id,
  },
});
      }

      console.log("✅ CSV data imported successfully");
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  });