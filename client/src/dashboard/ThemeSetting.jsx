import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Container, TextField, Button, Box, MenuItem, Select, Paper, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const MobilePreview = ({ theme }) => {
    return (
        <Paper elevation={3} sx={{ width: 280, height: 'auto', borderRadius: 5, overflow: 'hidden', }}>
            {/* Header */}
            <Box sx={{ backgroundColor: theme.headerBg, padding: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconButton><MenuIcon sx={{ color: theme.iconColor }} /></IconButton>

                {theme.logo && <img src={theme.logo} alt="Logo" style={{ height: 30 }} />}

                <Typography variant="body1" sx={{ color: theme.textColor, fontWeight: "bold", fontFamily: theme.fontFamily, fontSize: theme.fontSize }}>
                    {theme.name ?? 'Website Name'}
                </Typography>
                
                <IconButton><SearchIcon sx={{ color: theme.iconColor }} /></IconButton>
            </Box>

            {/* Banner */}
            {theme.banner && <img src={theme.banner} alt="Banner" style={{ width: "100%", height: 120, objectFit: "cover" }} />}

            {/* Section Title */}
            <Typography variant="body2" align="center" sx={{ mt: 1, color: theme.textColor, fontFamily: theme.fontFamily, fontSize: theme.fontSize }}>
                Section Title
            </Typography>

            {/* Content Blocks */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, p: 1 }}>
                <Paper sx={{ height: 120, backgroundColor: "black" }}></Paper>
                <Paper sx={{ height: 120, backgroundColor: "gray" }}></Paper>
                <Paper sx={{ gridColumn: "span 2", height: 150, backgroundColor: "#ccc" }}></Paper>
            </Box>
        </Paper>
    );
};

const ThemeSettings = ({ theme, setTheme }) => {
    const handleChange = (e) => {
        setTheme({ ...theme, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTheme({ ...theme, [e.target.name]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    
    return (
        <Box display="flex" gap={10}>
            <Box flex={1}>
                <Typography variant="h5" sx={{ mb: 2 }}>Theme Settings</Typography>

                <TextField label="Header Background Color" name="headerBg" value={theme.headerBg} onChange={handleChange} fullWidth margin="normal" />
               
                <TextField label="Icon Color" name="iconColor" value={theme.iconColor} onChange={handleChange} fullWidth margin="normal" />
              
                <TextField label="Font Color" name="textColor" value={theme.textColor} onChange={handleChange} fullWidth margin="normal" />
                
                <TextField label="Font Size (px)" name="fontSize" type="number" value={theme.fontSize} onChange={handleChange} fullWidth margin="normal" />

                <Select name="fontFamily" label="Font Family" value={theme.fontFamily} onChange={handleChange} fullWidth >
                    <MenuItem value="" disabled>Font Family</MenuItem>
                    <MenuItem value="Axiforma-Regular">Axiforma-Regular</MenuItem>
                    <MenuItem value="Arial">Arial</MenuItem>
                    <MenuItem value="Roboto">Roboto</MenuItem>
                </Select>

                <Typography variant="body1" sx={{ mt: 2 }}>Upload Banner Image</Typography>
                <input type="file" accept="image/*" name="banner" onChange={handleFileChange} />

                <Typography variant="body1" sx={{ mt: 2 }}>Upload Logo</Typography>
                <input type="file" accept="image/*" name="logo" onChange={handleFileChange} />
                
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Save</Button>
            </Box>

            <MobilePreview theme={theme} />
        </Box>
    );
};

export default ThemeSettings;
