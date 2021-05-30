const adminDashboard = require("../app/http/controllers/adminDashboard");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

router.get("/dashboard", adminDashboard.dashboard);
// router.get("/dashboard", verifyInstitute, adminDashboard.dashboard);
router.post("/dashboard", verifyInstitute, adminDashboard.postDashboard);
