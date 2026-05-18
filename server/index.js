const express = require("express");
const cors = require("cors");
const localColleges = require("./data/colleges");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("UniFixed API Running 🚀");
});

app.get("/colleges", (req, res) => {
  try {
    res.json(localColleges);
  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch colleges",
    });
  }
});

app.get("/predict", (req, res) => {
  try {
    const rank = Number(req.query.rank);

    const colleges = localColleges;

    const results = colleges.map((college, index) => {
      let category = "Dream";

      if (rank <= college.closingRank * 0.7) {
        category = "Safe";
      } else if (rank <= college.closingRank) {
        category = "Target";
      }

      return {
        id: index + 1,
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