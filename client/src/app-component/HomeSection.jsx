import { Avatar, Box, Grid2, Typography } from "@mui/material";

const HomeSection = ({ data, onNavigate }) => {

    const ProductGrid = ({ data, onProductSelect }) => {
        return (
            <Box sx={{ backgroundColor: "#fff", height: "100vh", display: "flex", flexDirection: "column" }}>
                <Grid2 container spacing={2}>
                    {data?.map((product) => (
                        <Grid2 item size={{ xs: 6 }} key={product?._id}>
                            <Box
                                sx={{
                                    borderRadius: 1,
                                    cursor: "pointer",
                                    transition: "transform 0.6s",
                                    "&:hover": { transform: "scale(1.05)" }
                                }}
                                onClick={() => onProductSelect(product)}
                            >
                                <img
                                    src={product?.variants?.[0]?.images?.[0]}
                                    alt={product?.title}
                                    style={{ width: "100%", height: "auto", borderRadius: 4 }}
                                />
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        );
    };

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

    return (
        <>
         {/* <Box sx={{ display: "flex", justifyContent: "center", gap: 2, p: 2 ,   OverflowY:'auto',  height: "100%",}}>
                {categories.map((cat) => (
                    <Box key={cat.label} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar src={cat.icon} sx={{ width: 40, height: 40, backgroundColor: "#f5f5f5" }} />
                        <Typography variant="caption" sx={{ mt: 1 }}>{cat.label}</Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{
                width: "90%",
                mx: "auto",
                borderRadius: 2,
                overflow: "hidden",
            }}>
                <img src="/images/banner.jpg" alt="Autumn Collection" style={{ width: "100%", borderRadius: 10 }} />
            </Box> */}


            <ProductGrid data={data} onProductSelect={(product) => onNavigate(0, product)} />
        </>
    );
};

export default HomeSection;
