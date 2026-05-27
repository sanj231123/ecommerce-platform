import API from "../services/axios";

import {
  useState,
  useEffect
} from "react";

import Categories from "../components/Categories";

import MobileBrands from "../components/MobileBrands";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // ======================================
  // LOAD PRODUCTS
  // ======================================

  const loadProducts = async () => {

    try {

      const res =
        await API.get("/products");

      setProducts(res.data || []);

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  // ======================================
  // ADD TO CART
  // ======================================

  const addToCart = async (
    productId
  ) => {

    try {

      await API.post(
        "/cart",
        {
          product_id: productId,
          quantity: 1
        }
      );

      alert(
        "Product Added To Cart"
      );

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

      alert(
        "Add To Cart Failed"
      );

    }

  };

  // ======================================
  // FILTER PRODUCTS
  // ======================================

  const filteredProducts =
    products.filter((p) =>

      p.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  // ======================================
  // DEFAULT IMAGE
  // ======================================

  const defaultImage =
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";

  return (

    <div
      style={{
        background: "#f1f3f6",
        minHeight: "100vh"
      }}
    >

      {/* HERO */}

      <div
        style={{
          width: "96%",
          margin: "20px auto",
          background:
            "linear-gradient(to right,#2563eb,#1d4ed8)",
          borderRadius: "15px",
          padding: "50px 30px",
          color: "white",
          textAlign: "center"
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "15px"
          }}
        >
          Welcome To Jainee Shop
        </h1>

        <p
          style={{
            fontSize: "20px"
          }}
        >
          Fashion, Mobiles,
          Electronics & More
        </p>

      </div>

      {/* CATEGORIES */}

      <Categories />

      {/* MOBILE BRANDS */}

      <MobileBrands />

      {/* SEARCH */}

      <div
        style={{
          width: "96%",
          margin: "25px auto"
        }}
      >

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border:
              "1px solid #d1d5db",
            fontSize: "16px",
            outline: "none"
          }}
        />

      </div>

      {/* PRODUCTS */}

      <div
        style={{
          width: "96%",
          margin: "auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          paddingBottom: "50px"
        }}
      >

        {

          filteredProducts.map((p) => (

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
                    fontSize: "22px",
                    marginBottom: "10px"
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    color: "#16a34a",
                    fontSize: "28px",
                    fontWeight: "bold",
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

                {/* BUTTON */}

                <button

                  onClick={() =>
                    addToCart(p.id)
                  }

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

export default Home;
