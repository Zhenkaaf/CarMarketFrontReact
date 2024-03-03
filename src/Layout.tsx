import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "gray",
        padding: "0px!important",
      }}
    >
      <Header />

      <div>
        <Outlet />
      </div>
    </Container>
  );
};
export default Layout;
