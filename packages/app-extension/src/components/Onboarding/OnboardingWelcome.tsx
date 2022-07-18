import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  AddCircle,
  ArrowCircleDown,
  CallMade,
  Lock,
  Menu,
  Support,
  Twitter,
} from "@mui/icons-material";
import { useCustomTheme } from "@coral-xyz/themes";
import { ActionCard } from "../Layout/ActionCard";
import { BackpackHeader } from "../Locked";
import { NAV_BAR_HEIGHT } from "../Layout/Nav";
import { List, ListItem } from "../common/List";
import type { OnboardingFlows } from "./";
import { WithContaineredDrawer } from "../Layout/Drawer";

export function OnboardingWelcome({
  onSelect,
}: {
  onSelect: (flow: OnboardingFlows) => void;
}) {
  const theme = useCustomTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <div
      style={{
        background: theme.custom.colors.nav,
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
      ref={containerRef}
    >
      <Box>
        <OnboardingMenu
          containerRef={containerRef}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <BackpackHeader />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ActionCard
            icon={<AddCircle />}
            text="Create a new wallet"
            onClick={() => onSelect("create-wallet")}
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            icon={<ArrowCircleDown />}
            text="Import an existing wallet"
            onClick={() => onSelect("import-wallet")}
          />
        </Grid>
      </Grid>
    </div>
  );
}

function OnboardingMenu({
  containerRef,
  menuOpen,
  setMenuOpen,
}: {
  containerRef: MutableRefObject<any>;
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useCustomTheme();

  return (
    <Toolbar
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "10px",
        paddingBottom: "10px",
        height: NAV_BAR_HEIGHT,
      }}
    >
      <IconButton
        color="inherit"
        onClick={() => setMenuOpen(true)}
        sx={{ padding: 0 }}
      >
        <Menu sx={{ color: theme.custom.colors.hamburger }} />
      </IconButton>
      <WithContaineredDrawer
        containerRef={containerRef}
        openDrawer={menuOpen}
        setOpenDrawer={setMenuOpen}
        paperStyles={{
          padding: "40px 16px 40px 16px",
          borderRadius: "15px 15px 0 0",
        }}
      >
        <OnboardingMenuList />
      </WithContaineredDrawer>
    </Toolbar>
  );
}

function OnboardingMenuList() {
  const theme = useCustomTheme();

  const options = [
    {
      icon: <Support style={{ color: theme.custom.colors.secondary }} />,
      text: "Help & Support",
      onClick: () => console.log("help & support"), // TODO:
    },
    {
      icon: <Lock style={{ color: theme.custom.colors.secondary }} />,
      text: "Backpack.app",
      onClick: () => window.open("https://backpack.app", "_blank"),
    },
    {
      icon: <Twitter style={{ color: theme.custom.colors.secondary }} />,
      text: "Twitter",
      onClick: () => window.open("https://twitter.com/xNFT_Backpack", "_blank"),
    },
    {
      icon: <Twitter style={{ color: theme.custom.colors.secondary }} />, // TODO:
      text: "Discord",
      onClick: () => console.log("discord"), // TODO:
    },
  ];

  return (
    <Box sx={{ color: theme.custom.colors.fontColor }}>
      <List
        style={{
          background: theme.custom.colors.bg2,
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
        {options.map((o, idx) => (
          <ListItem
            onClick={o.onClick}
            key={o.text}
            style={{
              height: "44px",
              display: "flex",
            }}
            isLast={idx === options.length - 1}
            borderColor={theme.custom.colors.border1}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {o.icon}
            </div>
            <ListItemText
              sx={{
                marginLeft: "8px",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 500,
              }}
              primary={o.text}
            />
            <div>
              <CallMade
                style={{ flexGrow: 1, color: theme.custom.colors.secondary }}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
