import { useNavigate } from "react-router-dom";

function Categories() {

  const navigate = useNavigate();

  const categories = [

    {
      name: "Fashion",
      icon: "👕"
    },

    {
      name: "Mobile",
      icon: "📱"
    },

    {
      name: "Beauty",
      icon: "💄"
    },

    {
      name: "Electronics",
      icon: "💻"
    },

    {
      name: "Home Appliances",
      icon: "🏠"
    },

    {
      name: "Toys",
      icon: "🧸"
    },

    {
      name: "Food",
      icon: "🍔"
    },

    {
      name: "Books",
      icon: "📚"
    },

    {
      name: "Furniture",
      icon: "🛋️"
    }

  ];

  return (

    <div
      style={{
        background: "white",
        padding: "18px 10px",
        marginBottom: "25px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >

        {

          categories.map((c, index) => (

            <div
              key={index}

              onClick={() =>
                navigate(`/category/${c.name}`)
              }

              style={{
                cursor: "pointer",
                textAlign: "center",
                width: "90px"
              }}
            >

              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "8px"
                }}
              >
                {c.icon}
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600"
                }}
              >
                {c.name}
              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Categories;
