import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Container } from "@mui/material";
import { Box } from "@mui/system";
import ThemeSettings from "./ThemeSetting";
import Dashboard from './Index';

const AppDashboard = () => {

    const [selectedTab, setSelectedTab] = useState("dashboard");
    const [theme, setTheme] = useState({
        headerBg: "#ffffff",
        font: "Arial",
        id: "",
        iconColor: "#000000",
        textColor: "#333333",
        fontSize: 16,
        fontFamily: "Arial",
    });

    return (
        <>
            <Drawer variant="permanent" sx={{ width: 200, flexShrink: 1 }}>
                <List>
                    <ListItem button
                        onClick={() => setSelectedTab("dashboard")}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ListItemText primary="Dashboard"
                        />
                    </ListItem>
                    <ListItem button
                        onClick={() => setSelectedTab("theme")}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ListItemText primary="Theme"
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Box sx={{ display: "flex", ml: '112px' }}>
                <Box sx={{ flexGrow: 1, px: 3 }}>
                    <Container>
                        {selectedTab === "dashboard" && <Dashboard setTheme={setTheme} setSelectedTab={setSelectedTab} />}
                        {selectedTab === "theme" && <ThemeSettings theme={theme} setTheme={setTheme} />}
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default AppDashboard;
