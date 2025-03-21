import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, Container } from "@mui/material";
import { Box } from "@mui/system";
import ThemeSettings from "./ThemeSetting";
import Dashboard from './Index';
import axios from "axios";

const AppDashboard = () => {

    // console.log(process.env.API_URL);
    const API_URL = process.env.API_URL;

    const [selectedTab, setSelectedTab] = useState("theme");
    const [data, setData] = useState(null);
    const [theme, setTheme] = useState({
        headerBg: "#ffffff",
        font: "Arial",
        id: "",
        iconColor: "#000000",
        textColor: "#333333",
        fontSize: 16,
        fontFamily: "Arial",
    });

    const getProducts = async () => {

        const res = await axios.get(`${API_URL}api/getProduct`);
        console.log(res?.data?.data);
        setData(res?.data?.data);
    }
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            <Drawer variant="permanent" sx={{ width: 200, flexShrink: 1 }}>
                {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
                <List sx={{ px: 4 }}>
                    <ListItem button
                        onClick={() => setSelectedTab("dashboard")}
                        sx={{ cursor: 'pointer', py: 2 }}
                    >
                        <ListItemText primary="Dashboard"
                        />
                    </ListItem>
                    <ListItem button
                        onClick={() => setSelectedTab("theme")}
                        sx={{ cursor: 'pointer', py: 2 }}
                    >
                        <ListItemText primary="Theme"
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Box sx={{ display: "flex", ml: '150px' }}>
                <Box sx={{ flexGrow: 1, px: 3, py: 2 }}>
                    <Container>
                        {selectedTab === "dashboard" && <Dashboard  setTheme={setTheme} setSelectedTab={setSelectedTab} />}
                        {selectedTab === "theme" && <ThemeSettings data={data} theme={theme} setTheme={setTheme} />}
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default AppDashboard;
