import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

interface NavLinkProps {
    name: string;
    path: string;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '#services' },
    { name: 'About Us', path: '#about' },
    { name: 'Our Team', path: '#team' },
    { name: 'FAQs', path: '#faq' },
    { name: 'Contact Us', path: '#contact' },
];

// Styled components
const StyledLink = styled('a')<{ isHovered?: boolean }>(({ theme, isHovered }) => ({
    color: isHovered ? theme.palette.primary.main : theme.palette.text.primary,
    textDecoration: 'none',
    padding: theme.spacing(1, 2),
    transition: 'color 0.3s ease, transform 0.2s ease',
    '&:hover': {
        color: theme.palette.secondary.main,
        transform: 'scale(1.1)',
    },
}));

const LogoImage = styled('img')({
    maxHeight: '50px',
    marginRight: '8px',
});

const LogoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
}));

const CustomMenuIcon = styled('div')({
    width: '24px',
    height: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    '& div': {
        width: '100%',
        height: '3px',
        backgroundColor: 'blue',
        borderRadius: '2px',
    },
});

// Navigation link component
const NavLink: React.FC<NavLinkProps> = ({ name, path, isHovered, onMouseEnter, onMouseLeave }) => (
    <StyledLink href={path} isHovered={isHovered} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Button sx={{ color: 'inherit', display: { xs: 'none', md: 'block' } }}>{name}</Button>
    </StyledLink>
);

const Navbar: React.FC = () => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMouseEnter = (link: string) => setHoveredLink(link);
    const handleMouseLeave = () => setHoveredLink(null);
    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 2 }}>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <LogoImage src="assets/img/vetmashinani.png" alt="Vet Mashinani Logo" />
                    <LogoText variant="h6">
                        Vet&nbsp;<span style={{ color: 'green' }}>Mashinani</span>
                    </LogoText>

                    {/* Drawer Toggle Button for mobile view */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <CustomMenuIcon>
                            <div />
                            <div />
                            <div />
                        </CustomMenuIcon>
                    </IconButton>

                    {/* Navigation Links for larger screens */}
                    <Grid container spacing={2} justifyContent="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {links.map(({ name, path }) => (
                            <Grid item key={name}>
                                <NavLink
                                    name={name}
                                    path={path}
                                    isHovered={hoveredLink === name}
                                    onMouseEnter={() => handleMouseEnter(name)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile navigation */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    {links.map(({ name, path }) => (
                        <ListItem button key={name} onClick={toggleDrawer(false)}>
                            <ListItemText>
                                <StyledLink
                                    href={path}
                                    isHovered={hoveredLink === name}
                                    onMouseEnter={() => handleMouseEnter(name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {name}
                                </StyledLink>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
