import { useState } from "react";
import { Paper, Box, IconButton, Tooltip, Avatar, Typography, Divider, Card, Drawer, BottomNavigation, BottomNavigationAction } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Hoodie from "../assets/hoddie2.png";
import Hoodie1 from "../assets/hoddie4.jpg";

const MobilePreview = ({ theme, banner, logo }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navValue, setNavValue] = useState(0);

    return (
        <Paper sx={{
            width: 280,
            borderRadius: 5,
            overflow: "hidden",
            boxShadow: 3,
            maxHeight: "530px",
            position: "sticky",
            top: 20,
            right: 0,
            height: "100%",
            ml: 5,
            display: "flex",
            flexDirection: "column",
        }}>
                <Box sx={{ backgroundColor: theme.headerBg, px: 1, display: "flex", alignItems: "center", justifyContent: "space-between", py: 1 }}>
                    <Tooltip title="Menu">
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <MenuIcon sx={{ color: theme.iconColor }} />
                        </IconButton>
                    </Tooltip>

                    <Box textAlign="center">
                        {logo && <Avatar src={logo} alt="Logo" sx={{ width: 30, height: 30, mx: "auto" }} />}
                        <Typography variant="body1"
                            sx={{ color: theme.textColor, fontWeight: "bold", fontFamily: theme.fontFamily, fontSize: `${theme.fontSize}px`, textTransform: "capitalize" }}>
                            {theme.appName ?? "Website Name"}
                        </Typography>
                    </Box>

                    <Tooltip title="Search">
                        <IconButton>
                            <SearchIcon sx={{ color: theme.iconColor }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider />
            <Box sx={{overflowY:'auto'}} >

                {/* Header Section */}



                {/* Section Title */}
                {/* <Typography variant="body2" align="center"
                    sx={{ mt: 1, color: theme.textColor, fontFamily: theme.fontFamily, fontSize: theme.fontSize, backgroundColor: theme.headerBg, py: 1 }}>
                    Section Title
                </Typography> */}

                {/* Content Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, p: 1, flexGrow: 1 }}>
                    <Card sx={{ height: 170 }} >
                        <img src={Hoodie} alt="" style={{ width: '100%', height: 'auto' }} />
                    </Card>
                    <Card sx={{ height: 170 }} >
                        <img src={Hoodie1} alt="" style={{ width: '100%', height: 'auto' }} />
                    </Card>
                    {/* <Card sx={{ gridColumn: "span 2", height: 150, backgroundColor: theme.headerBg, opacity: "0.4" }} /> */}
                </Box>
                {/* Banner */}
                <Box sx={{minHeight:'210px'}}>
                {banner && <img src={banner} alt="Banner" style={{ width: "100%", height: "auto", objectFit: "cover" }} />}
                </Box>

            </Box>
            {/* Bottom Navigation */}
            <BottomNavigation
                showLabels
                value={navValue}
                onChange={(event, newValue) => setNavValue(newValue)}
                sx={{  borderTop: "1px solid #ddd", px: 1, backgroundColor: theme.headerBg,  py: 1 }}
            >
                <BottomNavigationAction icon={<HomeIcon sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction icon={<SearchIcon sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction icon={<ShoppingCartIcon sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction icon={<AccountCircleIcon sx={{ color: theme.iconColor }} />} />
            </BottomNavigation>

            {/* Right-Side Drawer for Mobile Menu */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: "250px", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Menu</Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Typography sx={{ mt: 2 }}>Menu Item 1</Typography>
                    <Typography sx={{ mt: 2 }}>Menu Item 2</Typography>
                    <Typography sx={{ mt: 2 }}>Menu Item 3</Typography>
                </Box>
            </Drawer>
        </Paper>
    );
};

export default MobilePreview;
