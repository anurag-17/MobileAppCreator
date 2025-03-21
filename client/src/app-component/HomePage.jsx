import { useState } from "react";
import { Box, IconButton, Typography, Avatar, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { RiMenu5Fill, RiSearchLine, RiHeartLine } from "react-icons/ri";
import { HomeOutlined, SearchOutlined, ShoppingCartOutlined, AccountCircleOutlined } from "@mui/icons-material";

const categories = [
    { label: "Women", icon: "/images/women-icon.png" },
    { label: "Men", icon: "/images/men-icon.png" },
    { label: "Accessories", icon: "/images/accessories-icon.png" },
    { label: "Beauty", icon: "/images/beauty-icon.png" },
];

const products = [
    { id: 1, name: "K Sweater", price: "$45.00", image: "/images/product1.jpg" },
    { id: 2, name: "Long Sleeve Dress", price: "$80.00", image: "/images/product2.jpg" },
    { id: 3, name: "Sportwear Set", price: "$60.00", image: "/images/product3.jpg" },
];

const HomePage = ({ theme }) => {
    const [navValue, setNavValue] = useState(0);

    return (
        <Box sx={{ backgroundColor: "#fff", height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                backgroundColor: theme.headerBg,
            }}>
                <IconButton>
                    <RiMenu5Fill color={theme.iconColor} />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: theme.fontSize }}>
                    Gemstore
                </Typography>
                <IconButton>
                    <RiHeartLine color={theme.iconColor} />
                </IconButton>
            </Box>

            {/* Categories */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, p: 2 }}>
                {categories.map((cat) => (
                    <Box key={cat.label} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar src={cat.icon} sx={{ width: 40, height: 40, backgroundColor: "#f5f5f5" }} />
                        <Typography variant="caption" sx={{ mt: 1 }}>{cat.label}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Banner */}
            <Box sx={{
                width: "90%",
                mx: "auto",
                borderRadius: 2,
                overflow: "hidden",
            }}>
                <img src="/images/banner.jpg" alt="Autumn Collection" style={{ width: "100%", borderRadius: 10 }} />
            </Box>

            {/* Featured Products */}
            <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Feature Products</Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>Show all</Typography>
                </Box>
                <Box sx={{ display: "flex", overflowX: "auto", gap: 2 }}>
                    {products.map((product) => (
                        <Box key={product.id} sx={{ minWidth: 120, cursor: "pointer" }}>
                            <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: 8 }} />
                            <Typography variant="body2" sx={{ mt: 1 }}>{product.name}</Typography>
                            <Typography variant="caption" sx={{ fontWeight: "bold" }}>{product.price}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Bottom Navigation */}
            <BottomNavigation
                showLabels
                value={navValue}
                onChange={(e, newValue) => setNavValue(newValue)}
                sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    backgroundColor: theme.headerBg,
                    py: 1,
                }}
            >
                <BottomNavigationAction label="" icon={<HomeOutlined sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction label="" icon={<SearchOutlined sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction label="" icon={<ShoppingCartOutlined sx={{ color: theme.iconColor }} />} />
                <BottomNavigationAction label="" icon={<AccountCircleOutlined sx={{ color: theme.iconColor }} />} />
            </BottomNavigation>
        </Box>
    );
};

export default HomePage;
