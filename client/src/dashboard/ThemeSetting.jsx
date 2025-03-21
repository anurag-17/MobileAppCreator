import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Box, MenuItem, Select, Divider, Card, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import MobilePreview from './MobilePreview';
import { HexColorPicker } from "react-colorful";

const ThemeSettings = ({ data, theme, setTheme }) => {
    const [colorPicker, setColorPicker] = useState({ field: null, color: "" });
    const [bannerFile, setBannerFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);

    useEffect(() => {
        const storedValues = {
            appName: localStorage.getItem("appName") || "Website Name",
            weburl: localStorage.getItem("weburl") || "",
            selectedTheme: localStorage.getItem("selectedTheme") || "",
        };
        setTheme((prevTheme) => ({ ...prevTheme, ...storedValues }));
    }, [setTheme]);

    const handleChange = (e) => {
        setTheme({ ...theme, [e.target.name]: e.target.value });
    };

    const saveColor = () => {
        setTheme((prevTheme) => ({
            ...prevTheme,
            [colorPicker.field]: colorPicker.color,
        }));
        setColorPicker({ field: "", color: "" }); // Close picker after saving
    };

    const handleFileChange = (e) => {
        if (e.target.name === "banner") {
            setBannerFile(e.target.files[0]);
            setBannerUrl(URL.createObjectURL(e.target.files[0]));
        } else if (e.target.name === "logo") {
            setLogoFile(e.target.files[0]);
            setLogoUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("color", theme.textColor);
        formData.append("font_type", theme.fontFamily);
        if (logoFile) formData.append("logo", logoFile);
        formData.append("website_url", theme.weburl);
        formData.append("website_name", theme.appName);
        if (bannerFile) formData.append("banner_img", bannerFile);
        formData.append("header_color", theme.headerBg);
        formData.append("text_size", `${theme.fontSize}px`);
        formData.append("icon_color", theme.iconColor);
        formData.append("template_design_image", theme.selectedTheme || "");

        try {
            await axios.post("http://147.93.108.140:8800/api/addData", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Theme saved successfully!");
            localStorage.clear();
            setTheme({
                appName: "",
                weburl: "",
                selectedTheme: "",
                headerBg: "",
                iconColor: "",
                textColor: "",
                fontSize: "",
                fontFamily: "",
                banner: null,
                logo: null
            });
            setBannerFile(null);
            setLogoFile(null);
            setBannerUrl(null)
            setLogoUrl(null)
            localStorage.removeItem("appName");
            localStorage.removeItem("weburl");
            localStorage.removeItem("selectedTheme");
        } catch (error) {
            console.error("Error saving theme:", error);
            alert("Failed to save theme.");
        }
    };
    const colorFields = [
        { name: "headerBg", label: "Header Background Color" },
        { name: "iconColor", label: "Icon Color" },
        { name: "textColor", label: "Font Color" }
    ];
    if (!data || data.length === 0) {
        return <Typography>No products found</Typography>;
    }
    return (
        <Box display="flex" gap={5} sx={{ height: "100vh", overflow: "hidden", px: 3 }}>
            <Box sx={{ flex: 1, p: 3, overflowY: "auto", maxHeight: "100vh" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Theme Settings</Typography>

                <Box>
                    {colorFields.map(({ name, label }) => (
                        <Box key={name} sx={{ mb: 2 }}>
                            <TextField
                                id="outlined-basic"
                                label={label}
                                name={name}
                                value={theme[name]}
                                onClick={() => setColorPicker({ field: name, color: theme[name] })}
                                margin="normal"
                                sx={{ width: '400px', cursor: "pointer" }}
                                readOnly
                                variant="outlined"
                            />

                            {colorPicker.field === name && (
                                <Box sx={{ mt: 1, p: 2, border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff", width: '230px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                    <HexColorPicker
                                        color={colorPicker.color}
                                        onChange={(newColor) => setColorPicker({ ...colorPicker, color: newColor })}
                                    />

                                    <Button variant="text" color="secondary" onClick={saveColor} sx={{ mt: 1 }}>
                                        Save Color
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ my: 2 }} />


                <Box sx={{ maxWidth: '400px' }}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select">Font-size</InputLabel>
                        <Select
                            labelId="demo-simple-select"
                            id="demo-simple-select"
                            label="Age"
                            value={theme.fontSize}
                            onChange={handleChange}
                            fullWidth
                            name="fontSize"
                            sx={{ width: '400px' }}
                        >
                            {[12, 13, 14, 15, 16, 17, 18].map((size) => (
                                <MenuItem key={size} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ my: 4 }} />

                <Box sx={{ maxWidth: '400px' }}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Font-family</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            name="fontFamily"
                            fullWidth
                            value={theme.fontFamily}
                            onChange={handleChange}
                            sx={{ width: '400px' }}
                        >
                            <MenuItem value="" disabled>Font Family</MenuItem>
                            <MenuItem value="Axiforma-Regular">Axiforma-Regular</MenuItem>
                            <MenuItem value="Arial">Arial</MenuItem>
                            <MenuItem value="Roboto">Roboto</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Typography variant="body1" sx={{ mt: 2 }} >
                    Upload Banner Image
                </Typography>
                <input type="file" accept="image/*" name="banner" onChange={handleFileChange} />

                <Typography variant="body1" sx={{ mt: 2 }}>Upload Logo</Typography>
                <input type="file" accept="image/*" name="logo" onChange={handleFileChange} />

                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
                    Save
                </Button>
            </Box>
            <MobilePreview theme={theme} banner={bannerUrl} logo={logoUrl} data={data} />

        </Box>
    );
};

export default ThemeSettings;
