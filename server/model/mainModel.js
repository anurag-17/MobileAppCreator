const mongoose = require("mongoose");

const WebsiteConfigSchema = new mongoose.Schema(
  {
    website_name: { type: String},
    website_url: { type: String},
    template_design_image: { type: String},
    text_size: { type: String},
    font_type: { type: String},
    color: { type: String},
    banner_img: { type: String},
    logo: { type: String},
    header_color: { type: String},
    icon_color: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteConfig", WebsiteConfigSchema);
