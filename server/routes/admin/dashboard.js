const {
  postDashboard,
  dashboard,
} = require("../../app/http/controllers/adminDashboard");
const {
  verifyInstitute,
} = require("../../app/http/middlewares/verifyInstitute");
const router = require("../category");

router.get("/", verifyInstitute, dashboard);
// router.get("/dashboard", verifyInstitute, adminDashboard.dashboard);
router.post("/", verifyInstitute, postDashboard);

module.exports = router;
