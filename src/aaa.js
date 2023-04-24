import { useState } from "react";

const images = [
  {
    id: 1,
    src: "https://via.placeholder.com/150",
    alt: "Placeholder 1"
  },
  {
    id: 2,
    src: "https://via.placeholder.com/150",
    alt: "Placeholder 2"
  },
  {
    id: 3,
    src: "https://via.placeholder.com/150",
    alt: "Placeholder 3"
  },
  {
    id: 4,
    src: "https://via.placeholder.com/150",
    alt: "Placeholder 4"
  },
  {
    id: 5,
    src: "https://via.placeholder.com/150",
    alt: "Placeholder 5"
  }
];

const ExampleComponent = () => {
  const [visibleButtons, setVisibleButtons] = useState([]);

  const handleMouseEnter = (id) => {
    setVisibleButtons((prevState) => [...prevState, id]);
  };

  const handleMouseLeave = (id) => {
    setVisibleButtons((prevState) => prevState.filter((buttonId) => buttonId !== id));
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {images.map((image) => (
        <div key={image.id} onMouseEnter={() => handleMouseEnter(image.id)} onMouseLeave={() => handleMouseLeave(image.id)}>
          <img src={image.src} alt={image.alt} />
          {visibleButtons.includes(image.id) && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Click me!
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExampleComponent;