const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("UniFixed API Running 🚀");
});

app.get("/predict", async (req, res) => {
  try {
    const rank = Number(req.query.rank);
    const category = req.query.category;
    const quota = req.query.quota;

    const colleges = await prisma.college.findMany({
      include: {
        branches: true,
      },
    });

    const results = [];

    colleges.forEach((college) => {
      college.branches.forEach((branch) => {

        if (
          branch.category !== category ||
          branch.quota !== quota
        ) {
          return;
        }

        let categoryTag = "Dream";

        if (rank <= branch.closingRank * 0.7) {
          categoryTag = "Safe";
        } else if (rank <= branch.closingRank) {
          categoryTag = "Target";
        }

        results.push({
          id: branch.id,

          name: college.name,
          branch: branch.name,

          closingRank: branch.closingRank,

          nirf: college.nirf,
          hostel: college.hostel,
          campus: college.campus,
          fees: college.fees,

          package: branch.averagePackage,
          codingCulture: branch.codingCulture,
          placementScore: branch.placementScore,

          category: categoryTag,
        });
      });
    });

    res.json(results);

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      error: "Prediction failed",
    });
  }
});
app.get("/predict", async (req, res) => {
  try {
    const rank = Number(req.query.rank);
    const category = req.query.category;
    const quota = req.query.quota;
    console.log("Rank:", rank);
    console.log("Category:", category);
    console.log("Quota:", quota);

    const colleges = await prisma.college.findMany({
      include: {
        branches: true,
      },
    });

    const results = [];

    colleges.forEach((college) => {
      college.branches.forEach((branch) => {
        console.log(branch);

        if (
          branch.category !== category ||
          branch.quota !== quota
        ) {
          return;
        }

    let category = "Dream";

    if (rank <= branch.closingRank * 0.7) {
      category = "Safe";
    } else if (rank <= branch.closingRank) {
      category = "Target";
    }

    results.push({
      id: branch.id,

      name: college.name,
      branch: branch.name,

      closingRank: branch.closingRank,

      nirf: college.nirf,
      hostel: college.hostel,
      campus: college.campus,
      fees: college.fees,

      package: branch.averagePackage,
      codingCulture: branch.codingCulture,
      placementScore: branch.placementScore,

      category,
    });
  });
});

    res.json(results);

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      error: "Prediction failed",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});