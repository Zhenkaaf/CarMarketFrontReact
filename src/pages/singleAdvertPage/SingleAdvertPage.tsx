import { useParams } from "react-router-dom";
import { useGetCarQuery } from "../../redux/carsApi";
import { Box } from "@mui/material";
import Spinner from "../../components/Spinner";

const SingleAdvertPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const { data: singleCar, isLoading, isError } = useGetCarQuery(carId || "");

  if (isLoading) {
    return <Spinner open={isLoading} />;
  }

  if (isError) {
    return (
      <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Something went wrong, unable to fetch car data.
      </Box>
    );
  }

  return (
    <div>
      {singleCar && (
        <div>
          <p>SingleAdvertPage</p>
          <p>Ad ID: {singleCar.year}</p>
          <p>Ad ID: {carId}</p>
        </div>
      )}
    </div>
  );
};

export default SingleAdvertPage;
