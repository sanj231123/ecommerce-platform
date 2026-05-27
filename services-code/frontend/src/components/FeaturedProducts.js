import { useNavigate } from "react-router-dom";

function FeaturedProducts() {

  const navigate = useNavigate();

  const products = [

    // =========================
    // APPLE
    // =========================

    {
      id: 1,
      name: "iPhone 15 Pro Max",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      price: "₹1,49,999"
    },

    {
      id: 2,
      name: "Apple iPad Pro",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      price: "₹89,999"
    },

    {
      id: 3,
      name: "AirPods Pro",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
      price: "₹24,999"
    },

    // =========================
    // SAMSUNG
    // =========================

    {
      id: 4,
      name: "Samsung Galaxy S24",
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505",
      price: "₹89,999"
    },

    {
      id: 5,
      name: "Samsung Smart TV",
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      price: "₹65,000"
    },

    // =========================
    // XIAOMI / REALME / OPPO
    // =========================

    {
      id: 6,
      name: "Xiaomi Redmi Note",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      price: "₹19,999"
    },

    {
      id: 7,
      name: "Realme GT",
      image:
        "https://images.unsplash.com/photo-1512499617640-c2f999098c01",
      price: "₹29,999"
    },

    {
      id: 8,
      name: "Oppo Reno",
      image:
        "https://images.unsplash.com/photo-1585060544812-6b45742d762f",
      price: "₹32,999"
    },

    {
      id: 9,
      name: "Vivo V30",
      image:
        "https://images.unsplash.com/photo-1567581935884-3349723552ca",
      price: "₹27,999"
    },

    {
      id: 10,
      name: "OnePlus 12",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
      price: "₹59,999"
    },

    // =========================
    // LAPTOPS
    // =========================

    {
      id: 11,
      name: "MacBook Pro M3",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
      price: "₹1,99,999"
    },

    {
      id: 12,
      name: "Gaming Laptop",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      price: "₹95,000"
    },

    {
      id: 13,
      name: "Dell Monitor",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
      price: "₹22,999"
    },

    // =========================
    // AUDIO / GAMING
    // =========================

    {
      id: 14,
      name: "Sony Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      price: "₹7,999"
    },

    {
      id: 15,
      name: "Bluetooth Speaker",
      image:
        "https://images.unsplash.com/photo-1545454675-3531b543be5d",
      price: "₹4,999"
    },

    {
      id: 16,
      name: "Gaming Keyboard",
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      price: "₹3,999"
    },

    {
      id: 17,
      name: "Gaming Mouse",
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db",
      price: "₹2,499"
    },

    {
      id: 18,
      name: "PlayStation 5",
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
      price: "₹54,999"
    },

    {
      id: 19,
      name: "Xbox Series X",
      image:
        "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
      price: "₹52,999"
    },

    // =========================
    // HOME APPLIANCES
    // =========================

    {
      id: 20,
      name: "LG Refrigerator",
      image:
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30",
      price: "₹42,000"
    },

    {
      id: 21,
      name: "Samsung Washing Machine",
      image:
        "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
      price: "₹29,999"
    },

    {
      id: 22,
      name: "Daikin Air Conditioner",
      image:
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b",
      price: "₹49,999"
    },

    // =========================
    // FASHION
    // =========================

    {
      id: 23,
      name: "Men Fashion Hoodie",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      price: "₹1,999"
    },

    {
      id: 24,
      name: "Women Fashion Dress",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      price: "₹2,499"
    },

    {
      id: 25,
      name: "Nike Running Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      price: "₹5,999"
    },

    {
      id: 26,
      name: "Luxury Handbag",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      price: "₹6,999"
    },

    // =========================
    // KIDS
    // =========================

    {
      id: 27,
      name: "Kids Toy Car",
      image:
        "https://images.unsplash.com/photo-1558877385-81a1c7e67d72",
      price: "₹1,499"
    },

    {
      id: 28,
      name: "Kids Fashion Wear",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
      price: "₹1,999"
    }

  ];

  return (

    <div
      style={{
        width: "90%",
        margin: "50px auto"
      }}
    >

      <h2
        style={{
          marginBottom: "25px",
          fontSize: "34px"
        }}
      >
        🔥 Trending Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px"
        }}
      >

        {

          products.map((p) => (

            <div
              key={p.id}
              onClick={() =>
                navigate(`/product/${p.id}`)
              }
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "0.3s"
              }}
            >

              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover"
                }}
              />

              <div
                style={{
                  padding: "18px"
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
                    fontSize: "24px",
                    marginBottom: "15px"
                  }}
                >
                  {p.price}
                </p>

                <button
                  style={{
                    width: "100%",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Buy Now
                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default FeaturedProducts;
