const router = require("express").Router();
const { signup, login, me } = require("../controllers/authController");
const auth = require("../midlleware/auth");

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: Signup (User/View only - Admin not allowed)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: John@123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Signup success
 *       409:
 *         description: Email already exists
 */
router.post("/signup", signup);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user (Admin/User/View)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Returns token and user
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current user
 *       401:
 *         description: Unauthorized
 */
router.get("/me", auth, me);

module.exports = router;
