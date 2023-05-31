import axios from "axios";
const API_URL = `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736`;

// Fetches data from the API based on the specified category, page, and count.

export const getData = async (req, res) => {
  try {
    const { category, page, count } = req.query;
    const startIdx = (page - 1) * count;
    const endIdx = page * count;
    // Send a GET request to the API to fetch data according to the selected category
    const response = await axios.get(`${API_URL}&q=${category}`);
    const data = response.data.hits;
    // Extract the data according to the requested page and count
    const resultData = data.slice(startIdx, endIdx);
    // Send the data as the response
    res.status(200).json(resultData);
  } catch (err) {
    // If an error, send an error response with the message
    res.status(500).json({ message: err.message });
  }
};

//Sorting function on the images by ID
export const getDataById = async (req, res) => {
  try {
    // Extract the "data" property from the request body
    const { data } = req.body;
    // Sort the data array by their ID in ascending order
    const sorteddata = data.sort((a, b) => a.id - b.id);
    // Send the sorted data as a JSON response
    res.json(sorteddata);
  } catch (error) {
    // If an error occurs , send an error response with the error message
    res.status(500).json({ error: "Failed to fetch and sort images" });
  }
}