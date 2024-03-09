import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <div>
      <Header />
      <Container
        maxWidth={false}
        disableGutters={true} //уберет внутренние отступы по краям контейнера.
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Outlet />
        {/*  Outlet: Это компонент, используемый для отображения содержимого текущего маршрута.  */}
      </Container>
    </div>
  );
};
export default Layout;
