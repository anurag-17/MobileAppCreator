import { useState } from "react";
import { Paper } from "@mui/material";
import { DeviceFrameset } from "react-device-frameset";
import ProfileScreen from "../app-component/ProfileScreen";
import ProductDetails from "../app-component/ProductDetails";
import HomeSection from "../app-component/HomeSection";
import Header from "../app-component/Header";
import Footer from "../app-component/Footer";
import { Wishlist } from "../app-component/Wishlist";
import HomePage from "../app-component/HomePage";
import "react-device-frameset/styles/marvel-devices.min.css";


const MobilePreview = ({ theme, data }) => {
    const [navValue, setNavValue] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    console.log(selectedProduct)
    const handleNavigate = (value, product = null) => {
        setNavValue(value);
        setSelectedProduct(product);
    };

    return (
        <DeviceFrameset device="iPhone X" width={375} height={750}>
            <Paper sx={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                pt: '15px',
                OverflowY:'auto'
            }}>
                <Header theme={theme}  navValue={navValue}/>
                {navValue === 3 ? (
                    <ProfileScreen onBack={() => handleNavigate(0)} />
                ) : navValue === 0 && selectedProduct ? (
                    <ProductDetails product={selectedProduct} onBack={() => handleNavigate(0)} />
                ) : navValue === 1 ? (
                    <Wishlist theme={theme} />
                ) : (
                    <HomeSection theme={theme} data={data} onNavigate={handleNavigate} />
                )}

                <Footer theme={theme} onNavigate={handleNavigate} />
            </Paper>
        </DeviceFrameset>
    );
};

export default MobilePreview;
