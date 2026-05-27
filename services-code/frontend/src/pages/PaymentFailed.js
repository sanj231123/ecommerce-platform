import { useNavigate } from "react-router-dom";

function PaymentFailed() {

  const navigate = useNavigate();

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
          maxWidth: "500px",
          margin: "auto"
        }}
      >

        <h1 style={{ color: "red" }}>
          ❌ Payment Failed
        </h1>

        <h3>
          Your transaction could not be completed
        </h3>

        <p>
          Please retry payment again
        </p>

        <button
          onClick={() => navigate("/checkout")}
          style={{
            background: "orange",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Retry Payment
        </button>

      </div>

    </div>

  );

}

export default PaymentFailed;
