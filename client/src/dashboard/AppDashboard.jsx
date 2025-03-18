import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Container, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import ThemeSettings from "./ThemeSetting";
import Dashboard from './Index';

const AppDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("dashboard");
    const [theme, setTheme] = useState({ headerBg: "#ffffff", textColor: "#000000", font: "Arial" });

    return (
        <>
            <Drawer variant="permanent" sx={{ width: 100, flexShrink: 1 }}>
                <List>
                    <ListItem button onClick={() => setSelectedTab("dashboard")}> <ListItemText primary="Dashboard" /> </ListItem>
                    <ListItem button onClick={() => setSelectedTab("theme")}> <ListItemText primary="Theme" /> </ListItem>
                </List>
            </Drawer>
            <Box sx={{ display: "flex", ml: '112px'}}>
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Container>
                        {selectedTab === "dashboard" && <Dashboard />}
                        {selectedTab === "theme" && <ThemeSettings theme={theme} setTheme={setTheme} />}
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default AppDashboard;
