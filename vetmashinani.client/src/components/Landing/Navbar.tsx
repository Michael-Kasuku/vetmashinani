import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Box,
    Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface NavLinkProps {
    name: string;
    path: string;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const links = [
    { name: 'Home', path: '#hero' },
    { name: 'About Us', path: '#about' },
    { name: 'Services', path: '#services' },
    { name: 'Our Team', path: '#team' },
    { name: 'FAQs', path: '#faq' },
    { name: 'Contact', path: '#contact' },
];

const StyledLink = styled('a')<{ isHovered?: boolean }>(({ isHovered }) => ({
    color: isHovered ? 'green' : 'blue', // Blue by default, green on hover
    textDecoration: 'none',
    padding: '8px 16px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'color 0.3s ease, transform 0.2s ease',
    '&:hover': {
        color: 'green', // Green on hover
        transform: 'scale(1.1)',
    },
}));

const LogoImage = styled('img')({
    maxHeight: '50px',
    marginRight: '8px',
});

const LogoText = styled(Typography)({
    color: 'green',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
});

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
class NavLink extends React.Component<NavLinkProps> {
    render() {
        const { name, path, isHovered, onMouseEnter, onMouseLeave } = this.props;
        return (
            <StyledLink href={path} isHovered={isHovered} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Button sx={{ color: 'inherit', display: { xs: 'none', md: 'block' } }}>{name}</Button>
            </StyledLink>
        );
    }
}

interface NavbarState {
    hoveredLink: string | null;
    drawerOpen: boolean;
}

class Navbar extends React.Component<{}, NavbarState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            hoveredLink: null,
            drawerOpen: false,
        };
    }

    handleMouseEnter = (link: string) => {
        this.setState({ hoveredLink: link });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredLink: null });
    };

    toggleDrawer = (open: boolean) => () => {
        this.setState({ drawerOpen: open });
    };

    render() {
        const { hoveredLink, drawerOpen } = this.state;

        return (
            <>
                <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <LogoImage src="assets/img/vetmashinani.png" alt="Vet Mashinani Logo" />
                        <LogoText variant="h6">
                            Vet&nbsp;<span style={{ color: 'green' }}>Mashinani</span>
                        </LogoText>

                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={this.toggleDrawer(true)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <CustomMenuIcon>
                                <div />
                                <div />
                                <div />
                            </CustomMenuIcon>
                        </IconButton>

                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {links.map(({ name, path }) => (
                                <Box key={name}>
                                    <NavLink
                                        name={name}
                                        path={path}
                                        isHovered={hoveredLink === name}
                                        onMouseEnter={() => this.handleMouseEnter(name)}
                                        onMouseLeave={this.handleMouseLeave}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Drawer anchor="right" open={drawerOpen} onClose={this.toggleDrawer(false)}>
                    <Box sx={{ width: 250, padding: '16px' }}>
                        {links.map(({ name, path }) => (
                            <div key={name} onClick={this.toggleDrawer(false)} style={{ padding: '8px 0' }}>
                                <StyledLink
                                    href={path}
                                    isHovered={hoveredLink === name}
                                    onMouseEnter={() => this.handleMouseEnter(name)}
                                    onMouseLeave={this.handleMouseLeave}
                                >
                                    {name}
                                </StyledLink>
                            </div>
                        ))}
                    </Box>
                </Drawer>
            </>
        );
    }
}

export default Navbar;
