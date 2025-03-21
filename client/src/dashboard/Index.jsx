import React, { useState, useEffect } from "react";
import { Typography, TextField, Box, Paper, Button, Grid2, Card, CardContent } from "@mui/material";
import IMG1 from "../assets/image2.webp";
import IMG2 from "../assets/image6.webp";
import IMG3 from "../assets/image8.webp";
import IMG4 from "../assets/image10.webp";
import IMG5 from "../assets/image12.webp";
import IMG6 from "../assets/image5.webp";

const themes = [
    { id: 1, img: IMG4 },
    { id: 2, img: IMG2 },
    { id: 3, img: IMG3 },
    { id: 4, img: IMG1 },
    { id: 5, img: IMG5 },
    { id: 6, img: IMG6 },
];

const Dashboard = ({ setTheme, setSelectedTab }) => {
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("selectedTheme") || null);
    const [appName, setAppName] = useState(localStorage.getItem("appName") || "");
    const [weburl, setWeburl] = useState(localStorage.getItem("weburl") || "");

    const handleSave = () => {
        localStorage.setItem("selectedTheme", selectedTheme);
        localStorage.setItem("appName", appName);
        localStorage.setItem("weburl", weburl);
        alert("Details saved successfully!");
        setSelectedTab("theme")
    };

    return (
        <>

            <Box sx={{ py: 4 }}>
                <Typography variant="h5" sx={{ mb: 4 }}>Welcome to the Dashboard</Typography>

                <TextField
                    fullWidth
                    label="Application Name"
                    variant="outlined"
                    margin="normal"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    sx={{ maxWidth: '400px' }}
                />
                <br />
                <TextField
                    fullWidth
                    label="Website URL"
                    variant="outlined"
                    margin="normal"
                    value={weburl}
                    onChange={(e) => setWeburl(e.target.value)}
                    sx={{ maxWidth: '400px' }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>Select Website Design</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                    {themes.map((theme) => (
                        <Paper
                            key={theme.id}
                            sx={{
                                p: 1,
                                cursor: "pointer",
                                border: selectedTheme == theme.id ? "2px solid blue" : "none",
                            }}
                            onClick={() => {
                                setSelectedTheme(theme.id);
                                setTheme(theme.id);
                            }}
                        >
                            <img
                                src={theme.img}
                                alt={`Theme ${theme.id}`}
                                style={{ width: "100px", height: "100px", borderRadius: 4 }}
                            />
                        </Paper>
                    ))}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Box>
        </>
    );
};

export default Dashboard;