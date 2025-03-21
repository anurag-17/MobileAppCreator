import { ArrowBackIos } from "@mui/icons-material";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { RiMenu5Fill, RiSearchLine, RiUser3Line, RiLogoutBoxRLine, RiHeartLine, RiStarLine, RiMapPinLine, RiWallet3Line, RiGiftLine } from "react-icons/ri";
import Avtar from "../assets/avatar.svg";

const ProfileScreen = ({ onBack }) => {
    const profileOptions = useMemo(() => [
        { label: "Address", icon: <RiMapPinLine /> },
        { label: "Payment method", icon: <RiWallet3Line /> },
        { label: "Voucher", icon: <RiGiftLine /> },
        { label: "My Wishlist", icon: <RiHeartLine /> },
        { label: "Rate this app", icon: <RiStarLine /> },
        { label: "Log out", icon: <RiLogoutBoxRLine />, color: "red" },
    ], []);

    return (
        <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
            {/* <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={onBack}>
                    <ArrowBackIos />
                </IconButton>
                <Typography variant="h6">Profile</Typography>
            </Box> */}

            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap:'15px' }}>
                <Avatar src={Avtar} sx={{ width: 80, height: 80, mb: 1 }} />
               
            <Box >
                <Typography variant="h6">Sunie Pham</Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>suniexu@gmail.com</Typography>
            </Box>
            </Box>

            <Box sx={{ p: 2,}}>
                {profileOptions.map((item, index) => (
                    <Box key={index} sx={{
                        display: "flex",
                        alignItems: "center",
                        py: 1.5,
                        cursor: "pointer",
                        "&:hover": { color: "blue" }
                    }}>
                        <IconButton sx={{ mr: 2 }}>{item.icon}</IconButton>
                        <Typography sx={{ flex: 1, color: item.color ?? "black" }}>
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
export default ProfileScreen;