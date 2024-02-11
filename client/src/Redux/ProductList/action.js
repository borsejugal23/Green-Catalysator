import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "../actionTypes";

export const fetchProductData = (query) => async (dispatch) => {
  dispatch({ type: FETCH_DATA_REQUEST });

  const userId= JSON.parse(localStorage.getItem("userId"))

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

    const products= data.products ;

    let likesData = await fetch(`${process.env.REACT_APP_API_URL}/likes/${userId}`, {
      mode :"cors" , method :"GET", headers :{"Content-Type" :"application/json"}
    })
    console.log("RESSSSSS :: ", likesData)
    likesData = await likesData.json() ;
    likesData= likesData.allLikes;
   
  
    
    const productWithLikes = products.map(product => {
      // Find the corresponding like object based on productId
      const likeData = likesData.find(like => like.productId === String(product.id)) || {
        totalLikes: 0,
        totalDislikes: 0,
        productId: String(product.id),
        liked: false
      };
    

      return { ...product, ...likeData };
    });

    console.log(productWithLikes)

  

    dispatch({ type: FETCH_DATA_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILURE });
    console.error("Internal Server Error:", error);
  }
};
