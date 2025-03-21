import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { HomeOutlined, SearchOutlined, ShoppingCartOutlined, AccountCircleOutlined } from "@mui/icons-material";
import { GrFavorite, GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { RiHome6Line } from "react-icons/ri";

const Footer = ({ theme, onNavigate }) => {
    const [navValue, setNavValue] = useState(0);

    return (
        <>
            <BottomNavigation
                showLabels
                value={navValue}
                onChange={(e, newValue) => {
                    setNavValue(newValue);
                    onNavigate(newValue);
                }}
                sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    backgroundColor: theme.headerBg,
                    py: 1,
                }}
            >
                <BottomNavigationAction label="" icon={
                    <RiHome6Line style={{ color: theme.iconColor, height: '20px', width: '20px' }} />}
                />
                <BottomNavigationAction label="" icon={
                    <GrFavorite style={{ color: theme.iconColo, height: '20px', width: '20px' }} />}
                />
                <BottomNavigationAction label="" icon={
                    <GrCart style={{ color: theme.iconColo, height: '20px', width: '20px' }} />}
                />
                <BottomNavigationAction label="" icon={
                    <CgProfile style={{ color: theme.iconColo, height: '20px', width: '20px' }} />}
                />
            </BottomNavigation>
        </>
    );
};

export default Footer;
