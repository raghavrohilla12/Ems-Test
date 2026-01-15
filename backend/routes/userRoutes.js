

const router = require("express").Router();
const auth = require("../midlleware/auth");
const role = require("../midlleware/role");

const {
  listForView,
  getMyProfile,
  updateMyProfile,
  adminCreateUser,
  adminEditUser,
  adminDeleteUser,
} = require("../controllers/userController");

/**
 * @openapi
 * /api/users/view/list:
 *   get:
 *     summary: View role - List all users except admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users (excluding admin)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (role not allowed)
 */
// router.get("/view/list", auth, role("view"), listForView);
router.get("/view/list", auth, role("admin", "user", "view"), listForView);


/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get current user's own profile (Admin/User/View)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/me", auth, role("admin", "user", "view"), getMyProfile);

/**
 * @openapi
 * /api/users/admin/create:
 *   post:
 *     summary: Admin - Create a new user (user/view)
 *     security:
 *       - bearerAuth: []
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
 *                 example: User One
 *               email:
 *                 type: string
 *                 example: user1@gmail.com
 *               password:
 *                 type: string
 *                 example: User@123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only admin)
 *       409:
 *         description: Email already exists
 */
router.post("/admin/create", auth, role("admin"), adminCreateUser);

/**
 * @openapi
 * /api/users/admin/edit/{id}:
 *   put:
 *     summary: Admin - Edit user (name/role/profileImage)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f0c8c2e2c1a2b3c4d5e6f7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               role:
 *                 type: string
 *                 example: view
 *               profileImage:
 *                 type: string
 *                 example: https://example.com/profile.png
 *     responses:
 *       200:
 *         description: Updated user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only admin)
 *       404:
 *         description: User not found
 */
router.put("/admin/edit/:id", auth, role("admin"), adminEditUser);
/**
 * @openapi
 * /api/users/me:
 *   put:
 *     summary: Update own profile (name/profileImage)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Name
 *               profileImage:
 *                 type: string
 *                 example: https://example.com/profile.png
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */
router.put("/me", auth, role("admin", "user", "view"), updateMyProfile);

/**
 * @openapi
 * /api/users/admin/delete/{id}:
 *   delete:
 *     summary: Admin - Delete user (cannot delete admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f0c8c2e2c1a2b3c4d5e6f7
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only admin / cannot delete admin)
 *       404:
 *         description: User not found
 */
// router.delete("/admin/delete/:id", auth, role("admin"), adminDeleteUser);

router.delete("/admin/delete/:id", auth, role("admin"), adminDeleteUser);


module.exports = router;
