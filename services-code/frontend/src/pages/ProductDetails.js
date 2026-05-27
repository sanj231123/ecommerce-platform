import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <img
        src="https://via.placeholder.com/400"
        alt="product"
        style={{
          width: "400px",
          borderRadius: "10px"
        }}
      />

      <h1
        style={{
          marginTop: "20px"
        }}
      >
        Product {id}
      </h1>

      <h2
        style={{
          color: "green"
        }}
      >
        ₹99,999
      </h2>

      <p>
        Premium ecommerce product details page.
      </p>

      <button
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "14px 25px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Add To Cart
      </button>

    </div>

  );

}

export default ProductDetails;
