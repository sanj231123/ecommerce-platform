import { useNavigate } from "react-router-dom";

function PaymentSuccess() {

  const navigate = useNavigate();

  const total =
    localStorage.getItem("cartTotal");

  const address = JSON.parse(

    localStorage.getItem(
      "shippingAddress"
    )

  );

  return (

    <div
      style={{
        padding: "40px",
        textAlign: "center",
        minHeight: "100vh",
        background: "#f1f3f6"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "auto"
        }}
      >

        <h1 style={{ color: "green" }}>
          ✅ Payment Successful
        </h1>

        <h2>
          Order Placed Successfully
        </h2>

        <h3>
          Amount Paid: ₹{total}
        </h3>

        <hr />

        {address && (

          <div
            style={{
              textAlign: "left"
            }}
          >

            <p>
              <b>Name:</b> {address.fullName}
            </p>

            <p>
              <b>Mobile:</b> {address.mobile}
            </p>

            <p>
              <b>Address:</b> {address.address}
            </p>

            <p>
              <b>City:</b> {address.city}
            </p>

            <p>
              <b>State:</b> {address.state}
            </p>

            <p>
              <b>Pincode:</b> {address.pincode}
            </p>

          </div>

        )}

        <button
          onClick={() => navigate("/orders")}
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          View Orders
        </button>

      </div>

    </div>

  );

}

export default PaymentSuccess;
