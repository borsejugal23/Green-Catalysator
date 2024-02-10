import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "../actionTypes";

export const fetchProductData = (query) => async (dispatch) => {
  dispatch({ type: FETCH_DATA_REQUEST });

  try {
    const apiUrl = `https://dummyjson.com/products/${
      query.category ? `category/${query.category}` : ""
    }`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      dispatch({ type: FETCH_DATA_FAILURE });
      console.error(`Failed to fetch data. Status: ${response.status}`);
      return;
    }

    const data = await response.json();

    console.log(data);

    dispatch({ type: FETCH_DATA_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILURE });
    console.error("Internal Server Error:", error);
  }
};
