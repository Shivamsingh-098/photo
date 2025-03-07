import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <Logo>Photofolio</Logo>
      <Menu>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/upload">Upload</StyledLink>
        <StyledLink to="/gallery">Gallery</StyledLink>
      </Menu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #222;
  color: white;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Menu = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  &:hover {
    color: #f39c12;
  }
`;
