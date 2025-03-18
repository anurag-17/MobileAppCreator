const WebsiteConfig = require('../model/mainModel');


// exports.AddData = async (req, res, next) => {
//     try {
//         const { website_name, website_url, text_size, font_type, color,header_color ,icon_color} = req.body;
    
//         const bannerImgPath = req.files["banner_img"] ? req.files["banner_img"][0].path : null;
//         const logoPath = req.files["logo"] ? req.files["logo"][0].path : null;
//         const templatedesignPath = req.files["template_design_image"] ? req.files["template_design_image"][0].path : null;
    
//         if (!bannerImgPath || !logoPath || !templatedesignPath) {
//           return res.status(400).json({ status: false, message: "Both images are required" });
//         }
    
//         const newWebsite = new WebsiteConfig({
//           website_name,
//           website_url,
//           text_size,
//           font_type,
//           color,
//           banner_img: bannerImgPath,
//           logo: logoPath,
//           template_design_image: templatedesignPath,
//           header_color,
//           icon_color
//         });
    
//         await newWebsite.save();
//         res.status(201).json({ status: true, message: "Website data saved successfully", data: newWebsite });
//       } catch (error) {
//         res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
//       }
// };


exports.addData = async (req, res) => {
    try {
        const { website_name, website_url, text_size, font_type, color, header_color, icon_color } = req.body;
    
        // Extract file paths
        const bannerImgPath = req.files["banner_img"] ? req.files["banner_img"][0].path : null;
        const logoPath = req.files["logo"] ? req.files["logo"][0].path : null;
        const templatedesignPath = req.files["template_design_image"] ? req.files["template_design_image"][0].path : null;

        // Find existing website config (assuming there's only one configuration)
        let websiteConfig = await WebsiteConfig.findOne();

        if (websiteConfig) {
            // **Update Existing Record**
            websiteConfig.website_name = website_name || websiteConfig.website_name;
            websiteConfig.website_url = website_url || websiteConfig.website_url;
            websiteConfig.text_size = text_size || websiteConfig.text_size;
            websiteConfig.font_type = font_type || websiteConfig.font_type;
            websiteConfig.color = color || websiteConfig.color;
            websiteConfig.header_color = header_color || websiteConfig.header_color;
            websiteConfig.icon_color = icon_color || websiteConfig.icon_color;
            websiteConfig.banner_img = bannerImgPath || websiteConfig.banner_img;
            websiteConfig.logo = logoPath || websiteConfig.logo;
            websiteConfig.template_design_image = templatedesignPath || websiteConfig.template_design_image;

            await websiteConfig.save();
            return res.status(200).json({ status: true, message: "Website data updated successfully", data: websiteConfig });
        } else {
            // **Create New Record**
            if (!bannerImgPath || !logoPath || !templatedesignPath) {
                return res.status(400).json({ status: false, message: "All images are required for creation" });
            }

            websiteConfig = new WebsiteConfig({
                website_name,
                website_url,
                text_size,
                font_type,
                color,
                banner_img: bannerImgPath,
                logo: logoPath,
                template_design_image: templatedesignPath,
                header_color,
                icon_color
            });

            await websiteConfig.save();
            return res.status(201).json({ status: true, message: "Website data saved successfully", data: websiteConfig });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
};



// exports.getWebsiteConfig = async (req, res) => {
//     try {
//         const websiteConfig = await WebsiteConfig.findOne();

//         if (!websiteConfig) {
//             return res.status(404).json({ status: false, message: "No website configuration found" });
//         }

//         return res.status(200).json({ status: true, data: websiteConfig });
//     } catch (error) {
//         return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
//     }
// };

exports.getWebsiteConfig = async (req, res) => {
    try {
        const websiteConfig = await WebsiteConfig.findOne();

        if (!websiteConfig) {
            return res.status(404).json({ status: false, message: "No website configuration found" });
        }

        // Define your base URL (change accordingly)
        const baseUrl = "http://147.93.108.140:8800/"; // Replace with your actual domain or API URL

        // Modify the response to include full image URLs
        const updatedConfig = {
            ...websiteConfig._doc, // Spread existing properties
            template_design_image: `${baseUrl}${websiteConfig.template_design_image}`,
            banner_img: `${baseUrl}${websiteConfig.banner_img}`,
            logo: `${baseUrl}${websiteConfig.logo}`
        };

        return res.status(200).json({ status: true, data: updatedConfig });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
};
