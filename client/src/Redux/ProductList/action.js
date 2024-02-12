import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "../actionTypes";

export const fetchProductData = (query) => async (dispatch) => {
  if(!query.refetch)
  dispatch({ type: FETCH_DATA_REQUEST });

  const userId = JSON.parse(localStorage.getItem("userId"));

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

    const products = data.products; // Products from open APIs

    let likesData = await fetch(
      `${process.env.REACT_APP_API_URL}/likes/${userId}`,
      {
        mode: "cors",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("RESSSSSS :: ", likesData)
    likesData = await likesData.json();

    const likedDataFromDB = likesData.allLikes;

    const productWithLikes = products.map((product) => {
      // Find the corresponding like object based on productId
      const productIsLiked = likedDataFromDB.find(
        (like) => like.productId === String(product.id)
      );

      return productIsLiked
        ? { ...product, ...productIsLiked }
        : {
            ...product,
            totalLikes: 0,
            totalDislikes: 0,
            productId: String(product.id),
            liked: false,
          };
    });

    console.log(productWithLikes);
    if(query.refetch){
      console.log("refectch")
    dispatch({type:"RE_FETCH_DATA_SUCCESS",payload:productWithLikes})}
    else{
      console.log("normal fetch")
    dispatch({ type: FETCH_DATA_SUCCESS, payload: productWithLikes });}
  } catch (error) {
    dispatch({ type: FETCH_DATA_FAILURE });
    console.error("Internal Server Error:", error);
  }
};


export const handleLike_Dislike = ({ productId, like, userId, categories }) => async (dispatch) => {
  console.log(categories)
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/likes/${productId}/${userId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: like }),
      }
    );

   dispatch(fetchProductData({category:categories,refetch:true}));

    if (!response.ok) {
      throw new Error('Failed to like/dislike');
    }

    const result = await response.json();
    // console.log("Result:", result);

    // You can dispatch any further actions here if needed

  } catch (err) {
    console.error("Error In Like/Dislike: ", err);

    // You can dispatch an error action if needed
  }
};
