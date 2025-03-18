import React, { useState } from "react";
import { Typography, TextField, Box, Grid2, Paper } from "@mui/material";
import IMG1 from '../assets/image2.webp'
import IMG2 from '../assets/image6.webp'
import IMG3 from '../assets/image8.webp'
import IMG4 from '../assets/image10.webp'
import IMG5 from '../assets/image12.webp'
import IMG6 from '../assets/image5.webp'

const themes = [
    { id: 1, img: IMG4 },
    { id: 2, img: IMG2 },
    { id: 3, img: IMG3 },
    { id: 4, img: IMG1 },
    { id: 5, img: IMG5 },
    { id: 6, img: IMG6 },
];

const Dashboard = () => {
    const [selectedTheme, setSelectedTheme] = useState(null);

    return (
        <Box>
            <Typography variant="h5">Welcome to the Dashboard</Typography>

            <TextField
                fullWidth
                label="Application Name"
                variant="outlined"
                margin="normal"
            />

            <TextField
                fullWidth
                label="Website URL"
                variant="outlined"
                margin="normal"
            />

            <Typography variant="h6" sx={{ mt: 2 }}>Select Website Design</Typography>
            <Grid2 container spacing={2} sx={{ mt: 1 }}>
                {themes.map((theme) => (
                    <Grid2 item size={{md:4}} key={theme.id}>
                        <Paper
                            sx={{
                                p: 1,
                                cursor: "pointer",
                                border: selectedTheme === theme.id ? "2px solid blue" : "none"
                            }}
                            onClick={() => setSelectedTheme(theme.id)}
                        >
                            <img
                                src={theme.img}
                                alt={`Theme ${theme.id}`}
                                style={{ width: "100%", height:'auto', borderRadius: 4 }}
                            />
                        </Paper>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default Dashboard;
