import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Courses', path: '/courses' },
  { name: 'Learning Path', path: '/learning-path' },
  { name: 'AI Chat', path: '/chat' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'background.default',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{
          maxWidth: '1400px !important',
          px: { xs: 2, sm: 4, md: 6 },
          '@media (min-width: 1200px)': {
            px: 8,
          },
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 4 }}>
            <SchoolIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to={isAuthenticated ? "/" : "/login"}
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'primary.main',
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              BrainX
            </Typography>
          </Box>

          {/* Mobile Menu */}
          {isAuthenticated && (
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: 'primary.main' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                    sx={{
                      bgcolor: location.pathname === page.path ? 'rgba(79, 195, 247, 0.08)' : 'transparent',
                      color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        color: 'primary.main',
                      },
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {/* Mobile Logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center' }}>
            <SchoolIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to={isAuthenticated ? "/" : "/login"}
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'primary.main',
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              BrainX
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: location.pathname === page.path ? 'rgba(79, 195, 247, 0.08)' : 'transparent',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Auth Buttons */}
          <Box sx={{ ml: 'auto' }}>
            {isAuthenticated ? (
              <>
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 0.5,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 40,
                      height: 40,
                      border: '2px solid',
                      borderColor: 'primary.light',
                    }}
                  >
                    <AccountCircleIcon />
                  </Avatar>
                </IconButton>
                <Menu
                  sx={{ 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      minWidth: 180,
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                        color: 'primary.main',
                      },
                    }}
                  >
                    <LogoutIcon sx={{ mr: 1, color: 'error.main' }} />
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="text"
                  sx={{ 
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 