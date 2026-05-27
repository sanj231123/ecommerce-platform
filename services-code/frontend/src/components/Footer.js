function Footer() {

  return (

    <div
      style={{
        background: "#111827",
        color: "white",
        padding: "50px",
        marginTop: "50px"
      }}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px"
        }}
      >

        <div>

          <h2>Jainee Ecommerce</h2>

          <p>
            Smart shopping platform for
            electronics, fashion and lifestyle.
          </p>

        </div>

        <div>

          <h3>Quick Links</h3>

          <p>Home</p>
          <p>Products</p>
          <p>Orders</p>
          <p>Profile</p>

        </div>

        <div>

          <h3>Customer Support</h3>

          <p>Email Support</p>
          <p>Help Center</p>
          <p>Privacy Policy</p>

        </div>

        <div>

          <h3>Follow Us</h3>

          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>

        </div>

      </div>

      <hr
        style={{
          margin: "30px 0",
          borderColor: "#444"
        }}
      />

      <p
        style={{
          textAlign: "center"
        }}
      >
        © 2026 Jainee Ecommerce. All Rights Reserved.
      </p>

    </div>

  );

}

export default Footer;
