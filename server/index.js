const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("UniFixed API Running 🚀");
});

app.get("/colleges", async (req, res) => {
  try {
    const colleges = await prisma.college.findMany();

    res.json(colleges);
  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch colleges",
    });
  }
});

app.get("/predict", async (req, res) => {
  try {
    const rank = Number(req.query.rank);

    const colleges = await prisma.college.findMany();

    const results = colleges.map((college) => {
      let category = "Dream";

      if (rank <= college.closingRank * 0.7) {
        category = "Safe";
      } else if (rank <= college.closingRank) {
        category = "Target";
      }

      return {
        id: college.id,
        name: college.name,
        branch: college.branch,
        closingRank: college.closingRank,
        nirf: college.nirf,
        package: college.package,
        hostel: college.hostel,
        campus: college.campus,
        codingCulture: college.codingCulture,
        fees: college.fees,
        placementScore: college.placementScore,
        category,
      };
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