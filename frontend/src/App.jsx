import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "./store/slices/dataSlice";
import ModalType from "./components/ModalType";
import SelectedItem from "./components/SelectedItem";

function App() {
  const dispatch = useDispatch();
  const [isItemSelected, setisItemSelected] = useState(false);
  const [isModalTypeOpen, setIsModalTypeOpen] = useState(false);

  //  get the Data  from the store
  const data = useSelector((state) => state.data.data);
  //  get the Page  from the store
  const page = useSelector((state) => state.data.page);
  //  get the Selested item  from the store
  const selectedItem = useSelector((state) => state.data.ItemSelected);
  //  get the SelectedType  from the store
  const selectedType = useSelector((state) => state.data.selectedType);
  //Handle the Errors and Notify the user
  const [iswarningOn, setIswarningOn] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  // Activated on the first rendering of the application and whenever there is a change in the page or selectedType
  useEffect(() => {
    // Fetches data from the server based on the selectedType and page number
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedType]);

  async function fetchData() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api?category=${selectedType}'&page=${page}&count=${9}`
      );
      let dataToDisplay = res.data;
      // If data is available, update the state and dispatch it to the store
      if (dataToDisplay.length > 0) {
        dispatch(dataActions.setData(dataToDisplay));
      } else {
        // If no more data is available, display a warning message and adjust the page number
        setWarningMessage("No more pages");
        setIswarningOn(true);
        setTimeout(() => {
          setIswarningOn(false);
          setWarningMessage("");
        }, 3000);
        let lastPageOfData = page - 1;
        dispatch(dataActions.setPage(lastPageOfData));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // Handles the selection of an item and updates the state in the store
  const itemSelected = async (item) => {
    await dispatch(dataActions.setSelectedItem(item));
    setisItemSelected(true);
  };
  // Closes the modal and resets the selected item in the store
  const closeModal = () => {
    setisItemSelected(false);
    dispatch(dataActions.setSelectedItem({}));
  };
  // Moves to the next or previous page based on the provided increment
  const movePage = (i) => {
    let nextPage = page + i;
    // If there are more pages, update the page number in the  store
    // Otherwise, display a warning message
    nextPage > 0
      ? dispatch(dataActions.setPage(nextPage))
      : setWarningMessage("There are no fewer pages");
    setIswarningOn(true);
    setTimeout(() => {
      setIswarningOn(false);
      setWarningMessage("");
    }, 3000);
  };
  // Changes the selected type in the store
  const changeType = (type) => {
    dispatch(dataActions.selectedType(type));
  };

  const handleSortById = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/sortDataaById",
        { data: data }
      );
      const sortedData = response.data;
      dispatch(dataActions.setData(sortedData));
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };
  return (
    <section className="App">
      <h1>Home Assignment</h1>
      <div className="buttons-section">
        <button onClick={() => movePage(-1)}>prev</button>
        <button onClick={() => setIsModalTypeOpen(true)}>selecte Type</button>
        <button className="app_button" onClick={handleSortById}>
          SortById
        </button>
        <button onClick={() => movePage(1)}>next</button>
      </div>
      {iswarningOn && <div className="warning-message">{warningMessage}</div>}
      {data.length ? (
        <div className="grid">
          {data.map((item) => {
            return (
              <div
                className="grid-item"
                key={item.id}
                onClick={() => itemSelected(item)}
              >
                <img src={item.largeImageURL} alt="img" />
              </div>
            );
          })}
        </div>
      ) : (
        <span className="loader"></span>
      )}
      {isItemSelected && (
        <SelectedItem
          selectedItem={selectedItem}
          closeModal={() => closeModal()}
        />
      )}
      {isModalTypeOpen && (
        <ModalType
          IsModalTypeOpen={() => setIsModalTypeOpen(false)}
          changeType={(type) => changeType(type)}
        />
      )}
    </section>
  );
}

export default App;
