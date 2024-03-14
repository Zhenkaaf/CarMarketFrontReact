import { useParams } from "react-router-dom";
import { useGetCarQuery } from "../../redux/carsApi";

const SingleAdvertPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const { data: singleCar, isLoading, isError } = useGetCarQuery(carId!);

  console.log(singleCar);
  console.log(isLoading);
  console.log(isError);
  return (
    <div>
      SingleAdvertPage
      {/*       <p>Ad ID: {singleCar.year}</p> */}
      <p>Ad ID: {carId}</p>
    </div>
  );
};

export default SingleAdvertPage;
