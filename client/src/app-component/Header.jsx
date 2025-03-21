import { Box, IconButton, Tooltip, Typography, Divider } from "@mui/material";
import { RiMenu5Fill, RiSearchLine } from "react-icons/ri";
import { ArrowBackIos } from "@mui/icons-material";
import { MdKeyboardBackspace } from "react-icons/md";

const Header = ({ theme, navValue, onBack, selectedProduct }) => {
    // Determine the page title
    const pageTitle = selectedProduct
        ? "Product Details"
        : navValue === 0
        ? theme.appName ?? "Demo Store"
        : navValue === 1
        ? "Wishlist"
        : navValue === 2
        ? "Cart"
        : navValue === 3
        ? "Profile"
        : "Demo Store";

    return (
        <>
            <Box
                sx={{
                    backgroundColor: theme.headerBg,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Left Icon: Menu or Back Button */}
                <Tooltip title={navValue === 0 && !selectedProduct ? "Menu" : "Back"}>
                    <IconButton onClick={navValue === 0 && !selectedProduct ? null : onBack}>
                        {navValue === 0 && !selectedProduct ? (
                            <RiMenu5Fill color={theme.iconColor} />
                        ) : (
                            <ArrowBackIos sx={{ color: theme.iconColor }} />
                        )}
                    </IconButton>
                </Tooltip>

                {/* Page Title */}
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.textColor,
                        fontWeight: "bold",
                        fontFamily: theme.fontFamily,
                        fontSize: `${theme.fontSize}px`,
                        textTransform: "capitalize",
                    }}
                >
                    {pageTitle}
                </Typography>

                {/* Right Icon: Search (Only for Home Page) */}
                {navValue === 0 && !selectedProduct ? (
                    <Tooltip title="Search">
                        <IconButton>
                            <RiSearchLine color={theme.iconColor} />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Search">
                        <IconButton>
                            <RiSearchLine color={theme.iconColor} />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <Divider />
        </>
    );
};

export default Header;
