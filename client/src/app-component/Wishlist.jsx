import { useState } from "react";
import { Box, Typography, Tabs, Tab, IconButton, Grid2 } from "@mui/material";
import { RiMenu5Fill, RiNotification3Line } from "react-icons/ri";

export const Wishlist = ({ theme, }) => {
    const [tabValue, setTabValue] = useState(0);

    const wishlistData = [
        {
            title: "Going out outfits",
            itemCount: 36,
            images: [
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/s-l1600-1-1.jpg1_-1-1_5f332ff9-1fa9-4da4-99dd-e77becd5efbb.jpg?v=1729172855",
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/s-l1600.jpg11.jpg?v=1729172855",
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/s-l1600.jpg10_34ac6c86-d074-4e20-8702-dbd3d585a627.jpg?v=1729172855"
            ]
        },
        {
            title: "Office Fashion",
            itemCount: 20,
            images: [
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/IMG_0487-1.jpg?v=1729172923",
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/IMG_0488-1.jpg?v=1729172923",
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/IMG_0489-1.jpg?v=1729172923",
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/IMG_0492-1.jpg?v=1729172923",
                "https://cdn.shopify.com/s/files/1/0307/7341/1971/files/IMG_0427-1.jpg?v=1729172923"
            ]
        }
    ];

    return (
        <Box sx={{ width: "100%", maxWidth: 375, mx: "auto", bgcolor: "white", p: 2,overflowY:'auto',height:'100%'  }}>

            {/* Tabs */}
            <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{ mb: 2 }}
            >
                <Tab label="All items" sx={{ flex: 1, fontWeight: "bold" }} />
                <Tab label="Boards" sx={{ flex: 1, fontWeight: "bold" }} />
            </Tabs>

            {/* Wishlist Items */}
            {wishlistData?.map((item, index) => (
                <Box
                    key={index}
                    sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: "#f9f9f9", cursor: "pointer" }}
                >
                    <Grid2 container spacing={1}>
                        <Grid2 item size={{xs:6}}>
                            <img src={item.images[0]} alt={item.title} style={{ width: "100%", borderRadius: 8 }} />
                        </Grid2>
                        <Grid2 item size={{xs:6}}>
                            <img src={item.images[1]} alt={item.title} style={{ width: "100%", borderRadius: 8, marginBottom: 4 }} />
                            <img src={item.images[2]} alt={item.title} style={{ width: "100%", borderRadius: 8 }} />
                        </Grid2>
                    </Grid2>
                    <Typography sx={{ fontWeight: "bold", mt: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>{item.itemCount} items</Typography>
                </Box>
            ))}
        </Box>
    );
};
