function MobileBrands() {

  const brands = [

    "iPhone",
    "Samsung",
    "Xiaomi",
    "Vivo",
    "Oppo",
    "Realme",
    "OnePlus",
    "POCO"

  ];

  return (

    <div
      style={{
        background: "white",
        padding: "25px",
        margin: "25px auto",
        width: "95%",
        borderRadius: "12px"
      }}
    >

      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        Popular Mobile Brands
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto"
        }}
      >

        {

          brands.map((b, index) => (

            <div
              key={index}
              style={{
                minWidth: "120px",
                textAlign: "center"
              }}
            >

              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "12px",
                  background: "#f3f4f6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "40px",
                  margin: "auto"
                }}
              >
                📱
              </div>

              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold"
                }}
              >
                {b}
              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default MobileBrands;
