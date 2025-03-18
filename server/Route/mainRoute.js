
const express = require('express')
const router = express.Router()
const { addData,getWebsiteConfig,getProduct } = require("../Controller/mainController");
const upload = require("../config/uploadMiddleware"); // Import the upload middleware

// router.route("/AddData").post(upload.fields([{ name: "banner_img" }, { name: "logo" }]),AddData);
router.post("/addData", upload.fields([{ name: "banner_img" }, { name: "logo" },{ name: "template_design_image" }]), addData);
router.route("/getWebsiteConfig").get(getWebsiteConfig);
router.route("/getProduct").get(getProduct);


/**
 * @openapi
 * '/api/addData':
 *   post:
 *     tags:
 *       - Website Configuration
 *     summary: Add website configuration data
 *     description: Allows users to submit website configuration details including design, text size, font type, colors, and images.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               website_name:
 *                 type: string
 *                 example: "My Website"
 *               website_url:
 *                 type: string
 *                 example: "https://example.com"
 *               template_design_image:
 *                 type: string
 *                 format: binary
 *               text_size:
 *                 type: string
 *                 example: "16px"
 *               font_type:
 *                 type: string
 *                 example: "Arial"
 *               color:
 *                 type: string
 *                 example: "#ff5733"
 *               banner_img:
 *                 type: string
 *                 format: binary
 *               logo:
 *                 type: string
 *                 format: binary
 *               header_color:
 *                 type: string
 *                 example: "#ff5733"
 *               icon_color:
 *                 type: string
 *                 example: "#ff5733"
 *     responses:
 *       201:
 *         description: Website configuration added successfully.
 *       400:
 *         description: Bad request, missing required fields.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * '/api/getWebsiteConfig':
 *   get:
 *     tags:
 *       - Website Configuration
 *     summary: Get website configuration data
 *     description: Retrieves the current website configuration including design, text size, font type, colors, and images.
 *     responses:
 *       200:
 *         description: Website configuration data retrieved successfully.
 *       404:
 *         description: No website configuration found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * '/api/getProduct':
 *   get:
 *     tags:
 *       - Website Configuration
 *     summary: Get product data
 *     responses:
 *       200:
 *         description: data retrieved successfully.
 *       404:
 *         description: No data found.
 *       500:
 *         description: Internal server error.
 */

module.exports = router
