import { useAppSelector } from "../../redux/redux-hooks";

const CabinetPage = () => {
  const user = useAppSelector((state) => state.userRed.user);
  console.log(user);

  return <div style={{ marginTop: "50px" }}>Cabinet page</div>;
};

export default CabinetPage;
