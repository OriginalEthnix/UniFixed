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

// ─── GET /colleges ────────────────────────────────────────────────────────────
app.get("/colleges", async (req, res) => {
  try {
    const colleges = await prisma.college.findMany({
      include: { branches: true, insights: true },
    });
    res.json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
});

// ─── GET /predict ─────────────────────────────────────────────────────────────
app.get("/predict", async (req, res) => {
  try {
    const rank     = Number(req.query.rank);
    const exam     = req.query.exam     || "";
    const category = req.query.category || "";
    const quota    = req.query.quota    || "";

    console.log(`[Predict] rank=${rank} | exam="${exam}" | category="${category}" | quota="${quota}"`);

    const colleges = await prisma.college.findMany({
      include: { branches: true, insights: true },
    });

    console.log(`[Predict] Fetched ${colleges.length} colleges from DB`);

    let totalBranches = 0;
    const results = [];

    colleges.forEach((college) => {
      college.branches.forEach((branch) => {
        totalBranches++;

        // ── 1. Exam matching ──────────────────────────────────────────────────
        const branchExam = (branch.exam || "").trim().toLowerCase();
        const reqExam    = exam.trim().toLowerCase();
        if (branchExam !== reqExam) return;

        // ── 2. Category matching (case-insensitive, trimmed) ──────────────────
        const branchCategory = (branch.category || "").trim().toLowerCase();
        const reqCategory    = category.trim().toLowerCase();
        if (branchCategory !== reqCategory) return;

        // ── 3. Quota matching (case-insensitive, trimmed) ─────────────────────
        const branchQuota = (branch.quota || "").trim().toLowerCase();
        const reqQuota    = quota.trim().toLowerCase();
        if (branchQuota !== reqQuota) return;

        // ── 4. Realistic rank filtering ───────────────────────────────────────
        if (rank > branch.closingRank * 1.35) return;

        let categoryTag = "Dream";
        if (rank <= branch.closingRank * 0.75) {
          categoryTag = "Safe";
        } else if (rank <= branch.closingRank) {
          categoryTag = "Target";
        }

        results.push({
          id:             branch.id,
          name:           college.name,
          branch:         branch.name,
          exam:           branch.exam,
          closingRank:    branch.closingRank,
          nirf:           college.nirf,
          hostel:         college.hostel,
          campus:         college.campus,
          fees:           college.fees,
          package:        branch.averagePackage,
          codingCulture:  branch.codingCulture,
          placementScore: branch.placementScore,
          category:       categoryTag,
          insights:       college.insights || null,
        });
      });
    });

    console.log(`[Predict] Scanned ${totalBranches} branches → ${results.length} eligible results`);
    res.json(results);

  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});