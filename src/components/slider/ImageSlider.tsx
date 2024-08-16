import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import s from "./imageSlider.module.css";

/* type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
  }[];
}; */
type ImageSliderProps = {
  images: { url: string; id: string }[] | null;
};

export function ImageSlider({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    if (images) {
      setImageIndex((index) => {
        if (index === images.length - 1) return 0;
        return index + 1;
      });
    }
  }

  function showPrevImage() {
    if (images) {
      setImageIndex((index) => {
        if (index === 0) return images.length - 1;
        return index - 1;
      });
    }
  }

  return (
    <section
      aria-label="Image Slider"
      className={s.sectionContainer}
    >
      <a
        href="#after-image-slider-controls"
        className={s.skipLink}
      >
        Skip Image Slider Controls
      </a>
      <div
        style={{
          width: "100%",
          /*   height: "615px", */
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images?.map((imageInfo, index) => (
          <img
            key={imageInfo.id}
            src={imageInfo.url}
            aria-hidden={imageIndex !== index}
            className={s.imgSliderImg}
            style={{
              /*   objectFit: "contain", */
              translate: `${-100 * imageIndex}%`,
            }}
          />
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className={s.imgSliderBtn}
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className={s.imgSliderBtn}
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images?.map((_, index) => (
          <button
            key={index}
            className={s.imgSliderDotBtn}
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  );
}
