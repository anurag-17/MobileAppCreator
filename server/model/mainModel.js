const mongoose = require("mongoose");

const WebsiteConfigSchema = new mongoose.Schema(
  {
    website_name: { type: String, required: true },
    website_url: { type: String, required: true },
    template_design_image: { type: String, required: true },
    text_size: { type: String, required: true },
    font_type: { type: String, required: true },
    color: { type: String, required: true },
    banner_img: { type: String, required: true },
    logo: { type: String, required: true },
    header_color: { type: String, required: true },
    icon_color: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteConfig", WebsiteConfigSchema);
