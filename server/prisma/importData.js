const fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const rows = [];

fs.createReadStream("data/colleges.csv")
  .pipe(csv())
  .on("data", (data) => rows.push(data))
  .on("end", async () => {
    try {
      console.log(`📥 Read ${rows.length} rows from CSV`);

      for (const item of rows) {
        // Upsert college (unique by name)
        const college = await prisma.college.upsert({
          where: { name: item.college },
          update: {
            nirf: Number(item.nirf),
            hostel: item.hostel,
            campus: item.campus,
            fees: item.fees,
          },
          create: {
            name: item.college,
            nirf: Number(item.nirf),
            hostel: item.hostel,
            campus: item.campus,
            fees: item.fees,
          },
        });

        // Upsert branch (unique by name + exam + category + quota + collegeId)
        await prisma.branch.upsert({
          where: {
            name_exam_category_quota_collegeId: {
              name: item.branch,
              exam: item.exam,
              category: item.category,
              quota: item.quota,
              collegeId: college.id,
            },
          },
          update: {
            closingRank: Number(item.closingRank),
            averagePackage: item.package,
            codingCulture: item.codingCulture,
            placementScore: Number(item.placementScore),
          },
          create: {
            name: item.branch,
            exam: item.exam,
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
      console.log("✅ CSV data imported/updated successfully");

      // Import qualitative insights
      const insightsData = require("../data/college_insights.json");
      for (const insight of insightsData) {
        const college = await prisma.college.findUnique({
          where: { name: insight.name }
        });
        
        if (college) {
          await prisma.collegeInsight.upsert({
            where: { collegeId: college.id },
            update: {
              pros: insight.pros,
              cons: insight.cons,
              campusVibe: insight.campusVibe,
              codingCultureReview: insight.codingCultureReview,
              placementReality: insight.placementReality,
              hostelReview: insight.hostelReview,
              peerCompetitiveness: insight.peerCompetitiveness,
              attendanceStrictness: insight.attendanceStrictness,
              cityLife: insight.cityLife,
              startupCulture: insight.startupCulture,
              facultyQuality: insight.facultyQuality,
              aiRecommendation: insight.aiRecommendation
            },
            create: {
              collegeId: college.id,
              pros: insight.pros,
              cons: insight.cons,
              campusVibe: insight.campusVibe,
              codingCultureReview: insight.codingCultureReview,
              placementReality: insight.placementReality,
              hostelReview: insight.hostelReview,
              peerCompetitiveness: insight.peerCompetitiveness,
              attendanceStrictness: insight.attendanceStrictness,
              cityLife: insight.cityLife,
              startupCulture: insight.startupCulture,
              facultyQuality: insight.facultyQuality,
              aiRecommendation: insight.aiRecommendation
            }
          });
        }
      }
      console.log("✅ Qualitative insights imported successfully");

    } catch (error) {
      console.error("❌ Import error:", error);
    } finally {
      await prisma.$disconnect();
    }
  });