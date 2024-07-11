
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC } from "react";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import Image from "next/image";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface NavItemProps {
  open: Boolean;
  onClick: () => void;
  label: string | undefined;
  icon: string | any;
}

const NavItem: FC<NavItemProps> = ({ open, onClick, label, icon }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }} onClick={onClick}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <img
            src={icon}
            alt="icon"
            style={{ color: "black", width: "30px", height: "40px" }}
          />
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
