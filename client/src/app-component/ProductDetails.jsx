import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

const ProductDetails = ({ product, onBack }) => {
    return (
        <Box sx={{ p: '24px',overflowY:'auto',height:'100%' }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={onBack}>
                    <ArrowBackIos />
                </IconButton>
                <Typography variant="h6" sx={{fontWeight:'600'}} >Product Details</Typography>
            </Box>

            {/* Product Details */}
            <Typography variant="h6">{product?.title}</Typography>
            <img src={product?.variants?.[0]?.images?.[0]} alt={product?.title} style={{ width: "100%", borderRadius: 4, marginTop: 10 }} />
            <Typography sx={{ mt: 2 }}>Price: $ {product?.price ?? "N/A"}</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "gray" ,fontSize:"14px"}}>
                {product?.description ?? "No description available."}
            </Typography>
        </Box>
    );
};

export default ProductDetails;
