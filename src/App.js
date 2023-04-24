import { useState, useEffect } from 'react';
import Photo from './um.png'
import axios from 'axios'
import "./App.css";

function App() {
  const [dog, setDog] = useState("");
  const [color, setColor] = useState("");
  const [pattern, setPattern] = useState("");
  const [generated, setGenerated] = useState("")
  const [generatedCards, setGeneratedCards] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showError2, setShowError2] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [visibleButtons, setVisibleButtons] = useState([]);
  const [id, setID] = useState(1);



  const handleMouseEnter = (id) => {
    setVisibleButtons((prevState) => [...prevState, id]);
  };

  const handleMouseLeave = (id) => {
    setVisibleButtons((prevState) => prevState.filter((buttonId) => buttonId !== id));
  };


  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
        setCountdown(5);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showError]);

  useEffect(() => {
    let interval;
    if (showError) {
      interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showError]);

  useEffect(() => {
    let timer;
    if (showError2) {
      timer = setTimeout(() => {
        setShowError2(false);
        setCountdown(5);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showError2]);

  useEffect(() => {
    let interval;
    if (showError2) {
      interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showError2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    //const response = await axios.post("http://localhost:5000/generate", { dog, color, pattern });
    const newItem = { id: id, image: "https://www.basketballnetwork.net/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MTkyMDA0NjYyOTEwNTI2OTE5/michael-jordan.webp" };
    setGenerated(newItem);
    setID(id + 1);
  };

  const dogs = [
    { value: "", label: "Select a dog breed" },
    { value: "Golden Retriever", label: "Golden Retriever" },
    { value: "Labrador Retriever", label: "Labrador Retriever" },
    { value: "German Shepherd", label: "German Shepherd" },
    { value: "Bulldog", label: "Bulldog" },
    { value: "Beagle", label: "Beagle" },
    { value: "Poodle", label: "Poodle" },
    { value: "Chihuahua", label: "Chihuahua" },
    { value: "Boxer", label: "Boxer" }
  ];
  const colors = [
    { value: "", label: "Select color" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" }
  ];
  const patterns = [
    { value: "", label: "Select pattern" },
    { value: "stripes", label: "Stripes" },
    { value: "dots", label: "Dots" },
    { value: "plain", label: "Plain" },
    { value: "leather", label: "Leather" },
    { value: "metallica", label: "Metallic" }
  ];

  const saveGeneratedCard = () => {
    if (generatedCards.length > 0) {
      if (generatedCards[generatedCards.length - 1].id === generated.id) {
        setShowError2(true);
      }
      else {
        if (generatedCards.length >= 5) { setShowError(true) }
        else {
          setGeneratedCards(cards => [...cards, generated]);
        }
      }
    }
    else {
      if (generatedCards.length >= 5) { setShowError(true) }
      else {
        setGeneratedCards(cards => [...cards, generated]);
      }
    }

  };
  const deleteGeneratedCard = () => {
    setGenerated("");
  };

  const deleteCard = (x) => {
    const yeniObjeler = generatedCards.filter(obje => obje.id !== x);
    setGeneratedCards(yeniObjeler);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log(generatedCards)
  };

  return (
    <div className={isDarkMode ? "dark:bg-slate-700" : ""}>
      <div>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex justify-center mt-5">
            <img className="sidebarPhoto bg-orange-100 w-20" src={Photo} alt="" />
          </div>
          <h1 className="text-2xl font-bold my-4 text-blue-400  sm:text-4xl">Select Your Preferences </h1>
          <h3 className="text-xl font-bold mb-4 text-blue-400 sm:text-2xl" >Generate A Credit Card</h3>
          <div className=" justify-center items-center mb-4 ">
            <span className="mr-2">Dark mode:</span>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
              <span className="slider round">
                {isDarkMode ? "🌙" : "☀️"}
              </span>
            </label>
          </div>
          <form className="sm:w-1/2 mb-5 sm:flex items-center gap-x-10 " onSubmit={handleSubmit}>
            <div className="mb-4 flex-auto sm:w-1/3">
              <label className="block text-gray-700 font-bold mb-2 h-5 sm:ml-0 items-center" htmlFor="dog">
                <div className="text-center ">Dog Breed</div>
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline "
                  id="dog"
                  value={dog}
                  onChange={(e) => setDog(e.target.value)}
                  required
                >
                  {dogs.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex-auto sm:w-1/3">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="dog">
                <div className="text-center">Pattern</div>

              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="pattern"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  required
                >
                  {patterns.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex-auto sm:w-1/3">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="dog">
                <div className="text-center">Color</div>
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  {colors.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold  px-10 rounded focus:outline-none focus:shadow-outline  h-10 mt-5 disabled:pointer-events-none"
              type="submit"
            >
              Generate
            </button>

          </form>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img className="sm:w-1/5 " src={generated.image} alt="" />
          {generated ? (<div><div className="flex mt-5 gap-10">
            <button className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold h-10 w-24 rounded" onClick={() => saveGeneratedCard()}>
              Save
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold h-10 w-24 rounded " onClick={() => deleteGeneratedCard()}>
              Delete
            </button>
          </div></div>) : (<div></div>)}

        </div>
        <div>
          {showError && (
            <div className=" mx-auto w-72 bg-red-500 bg-opacity-50 text-white py-2 px-4 absolute inset-x-0 top-0 z-50">
              <p>You can save up to 5 cards.</p>
              <div className="h-2 relative max-w-xl rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-300 absolute"></div>
                <div className="h-full bg-white absolute" style={{ width: `${(countdown / 5) * 100}%` }}></div>
              </div>
              <button
                onClick={() => setShowError(false)}
                className="absolute top-0 right-0 py-2 px-4  text-gray-700 hover:text-gray-600"
              >
                <span className="sr-only">Kapat</span>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

        </div>
        <div>
          {showError2 && (
            <div className=" mx-auto w-72 bg-red-500 bg-opacity-50 text-white py-2 px-4 absolute inset-x-0 top-0 z-50">
              <p>You can't save the same image.</p>
              <div className="h-2 relative max-w-xl rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-300 absolute"></div>
                <div className="h-full bg-white absolute" style={{ width: `${(countdown / 5) * 100}%` }}></div>
              </div>
              <button
                onClick={() => setShowError2(false)}
                className="absolute top-0 right-0 py-2 px-4  text-gray-700 hover:text-gray-600"
              >
                <span className="sr-only">Kapat</span>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

        </div>

      </div>
      <div>
        {generatedCards.length > 0 && (
          <h1 className="flex justify-center mt-6 text-2xl font-bold ">Saved Designs</h1>

        )}
        <div className="sm:flex  gap-x-10 justify-center mt-4  sm:ml-0 ml-10 ">
          {generatedCards.map((element, index) => {
            return (
              <div className="sm:mt-0 mt-8 sm:ml-0 ml-10" key={element.id} onMouseEnter={() => handleMouseEnter(element.id)} onMouseLeave={() => handleMouseLeave(element.id)}  >
                <img className="w-64 hover:blur-xs" src={element.image} alt="" />
                {visibleButtons.includes(element.id) && (
                  <div >
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full absolute  transform translate-x-12 -translate-y-28">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full absolute  transform translate-x-40 -translate-y-28" onClick={() => deleteCard(element.id)}>
                      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

    </div>

  );
}

export default App;
