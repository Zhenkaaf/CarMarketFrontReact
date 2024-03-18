import { ImageSlider } from "../../components/slider/ImageSlider";

const CabinetPage = () => {
  const IMAGES = [
    {
      url: "https://cdn.riastatic.com/photosnew/auto/photo/samsung_sm6__457907116f.webp",
      alt: "Car One",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-6.jpg",
      alt: "Car Two",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-9.jpg",
      alt: "Car Three",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-11.jpg",
      alt: "Car Four",
    },
    {
      url: "https://i0.rst.ua/oldcars/skoda/octavia/14512686-13.jpg",
      alt: "Car Five",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        aspectRatio: "10 / 6",
        margin: "0 auto",
      }}
    >
      <ImageSlider images={IMAGES} />
    </div>
  );
};

export default CabinetPage;
