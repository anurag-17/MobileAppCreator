import { useState } from "react";
import { Paper, Box, IconButton, Tooltip, Avatar, Typography, Divider, Card, Drawer, BottomNavigation, BottomNavigationAction, Grid2 } from "@mui/material";
import { RiMenu5Fill, RiSearchLine, RiCloseFill } from "react-icons/ri";
import { HomeOutlined, SearchOutlined, ShoppingCartOutlined, AccountCircleOutlined, Home } from "@mui/icons-material";

const MobilePreview = ({ theme, banner, logo, data }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navValue, setNavValue] = useState(0);

    return (
        <Paper sx={{
            width: 375,
            borderRadius: 5,
            overflow: "hidden",
            boxShadow: 3,
            maxHeight: 700,
            position: "sticky",
            top: 20,
            right: 0,
            height: "100%",
            ml: 5,
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Header */}
            <Box sx={{ backgroundColor: theme.headerBg, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Tooltip title="Menu">
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <RiMenu5Fill color={theme.iconColor} />
                    </IconButton>
                </Tooltip>

                <Box textAlign="center">
                    {logo && <Avatar src={logo} alt="Logo" sx={{ width: 30, height: 30, mx: "auto" }} />}
                    <Typography variant="body1" sx={{ color: theme.textColor, fontWeight: "bold", fontFamily: theme.fontFamily, fontSize: `${theme.fontSize}px`, textTransform: "capitalize" }}>
                        {theme.appName ?? "Demo store"}
                    </Typography>
                </Box>

                <Tooltip title="Search">
                    <IconButton>
                        <RiSearchLine color={theme.iconColor} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Divider />

            {/* Content */}
            <Box sx={{ overflowY: "auto", p: 2 }}>
                <Grid2 container spacing={2}>
                    {data?.map((product) => (
                        <Grid2 item size={{ xs: 6 }} key={product._id}>
                            <Box sx={{ borderRadius: 1, cursor: "pointer" }}>
                                <img src={product?.variants?.[0]?.images?.[0]} alt={product?.title} style={{ width: "100%", height: "auto", borderRadius: 4 }} />
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>

            {/* Bottom Navigation */}
            <BottomNavigation
                showLabels
                value={navValue}
                onChange={(event, newValue) => setNavValue(newValue)}
                sx={{ borderTop: 1, borderColor: "divider", px: 1, backgroundColor: theme.headerBg, py: 1 }}
            >
                <BottomNavigationAction icon={<Home sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction icon={<SearchOutlined sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction icon={<ShoppingCartOutlined sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction icon={<AccountCircleOutlined sx={{ color: theme.iconColor }} />} />
            </BottomNavigation>


            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: 250, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Menu</Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <RiCloseFill />
                        </IconButton>
                    </Box>
                    <Divider />
                    {["Menu Item 1", "Menu Item 2", "Menu Item 3"].map((item, index) => (
                        <Typography key={index} sx={{ mt: 2 }}>{item}</Typography>
                    ))}
                </Box>
            </Drawer>
        </Paper>
    );
};

export default MobilePreview;
