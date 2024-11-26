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
          "@media (min-width: 768px) and (max-width: 1180px)": {
            padding: "0px 20px",
          },
        }}
      >
        <Outlet />
        {/*  Outlet: Это компонент, используемый для отображения содержимого текущего маршрута.  */}
      </Container>
    </div>
  );
};
export default Layout;
