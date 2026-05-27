import API from "../services/axios";

import {

  useParams

} from "react-router-dom";

import {

  useEffect,
  useState

} from "react";

function CategoryProducts() {

  const { categoryName } =
    useParams();

  const [products, setProducts] =
    useState([]);

  // ======================================
  // LOAD CATEGORY PRODUCTS
  // ======================================

  const loadProducts = async () => {

    try {

      const res =
        await API.get("/products");

      // FILTER CATEGORY

      const filtered =
        res.data.filter(

          (p) =>

            p.category
              ?.toLowerCase()

              ===

            categoryName
              ?.toLowerCase()

        );

      setProducts(filtered);

    } catch (err) {

      console.log(

        err.response?.data ||

        err.message

      );

    }

  };

  useEffect(() => {

    loadProducts();

  }, [categoryName]);

  // ======================================
  // DEFAULT IMAGE
  // ======================================

  const defaultImage =
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";

  return (

    <div
      style={{
        padding: "30px",
        background: "#f3f4f6",
        minHeight: "100vh"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          marginBottom: "30px",
          fontSize: "48px"
        }}
      >
        {categoryName} Products
      </h1>

      {/* NO PRODUCTS */}

      {

        products.length === 0 && (

          <div
            style={{
              fontSize: "22px",
              color: "#6b7280"
            }}
          >
            No Products Found
          </div>

        )

      }

      {/* PRODUCTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >

        {

          products.map((p) => (

            <div
              key={p.id}
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.08)"
              }}
            >

              {/* IMAGE */}

              <img
                src={
                  p.image && p.image !== ""

                    ? p.image

                    : defaultImage
                }

                alt={p.name}

                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />

              {/* CONTENT */}

              <div
                style={{
                  padding: "15px"
                }}
              >

                <h3
                  style={{
                    marginBottom: "10px"
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    color: "#16a34a",
                    fontWeight: "bold",
                    fontSize: "26px",
                    marginBottom: "10px"
                  }}
                >
                  ₹{p.price}
                </p>

                <p
                  style={{
                    color: "#6b7280",
                    marginBottom: "15px"
                  }}
                >
                  Category: {p.category}
                </p>

                <button
                  style={{
                    width: "100%",
                    background:
                      "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Add To Cart
                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default CategoryProducts;
