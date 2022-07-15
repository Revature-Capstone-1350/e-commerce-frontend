import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
// import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DarkMode from "../darkmode/DarkMode";

//Container Styling Componenet
const Container = styled.div`
  height: 60px;
`;

//Wrapper Styling Component
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

//Left Styling Component
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

//Logo Styling Component
const Logo = styled.h1`
  font-weight: bold;
`;

//Right Styling Component
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

//MenuItem Styling Component
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {

  //Navigate variable to useNavigate function.
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Left>
          {/*Left Side of Navbar*/}
          <Logo onClick={() => { navigate('/') }}>Revature Swag Shop</Logo>
        </Left>
        <Right>
          {/*Right Side of Navbar*/}
          <DarkMode />
          <MenuItem onClick={() => { navigate('/register') }}>REGISTER</MenuItem>
          <MenuItem onClick={() => { navigate('/login') }}>SIGN IN</MenuItem>
          <MenuItem onClick={() => { navigate('/cart') }}>
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;