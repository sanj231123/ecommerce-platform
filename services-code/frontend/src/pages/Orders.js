import API from "../services/axios";

import {
  useEffect,
  useState
} from "react";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ===========================
  // LOAD ORDERS
  // ===========================

  const loadOrders =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get(
            "/orders/user"
          );

        console.log(
          "Orders Response:",
          res.data
        );

        // HANDLE RESPONSE

        if (
          Array.isArray(
            res.data
          )
        ) {

          setOrders(
            res.data
          );

        } else if (
          res.data.orders
        ) {

          setOrders(
            res.data.orders
          );

        } else {

          setOrders([]);

        }

      } catch (err) {

        console.error(

          err.response?.data
          || err.message

        );

        alert(
          "Order load failed"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadOrders();

  }, []);

  // ===========================
  // STATUS COLOR
  // ===========================

  const getColor =
    (status) => {

      if (
        status === "PLACED"
      )
        return "orange";

      if (
        status === "SHIPPED"
      )
        return "blue";

      if (
        status === "DELIVERED"
      )
        return "green";

      if (
        status === "CANCELLED"
      )
        return "red";

      return "gray";

    };

  return (

    <div

      style={{

        padding: "20px",

        background:
          "#f1f3f6",

        minHeight:
          "100vh"

      }}

    >

      <h2>
        📦 Your Orders
      </h2>

      {/* LOADING */}

      {

        loading && (

          <h3>
            Loading orders...
          </h3>

        )

      }

      {/* EMPTY */}

      {

        !loading &&

        orders.length === 0 && (

          <h3>
            No orders found
          </h3>

        )

      }

      {/* ORDERS */}

      {

        orders.map((o) => (

          <div

            key={o.id}

            style={{

              background:
                "white",

              padding:
                "20px",

              marginBottom:
                "20px",

              borderRadius:
                "10px",

              boxShadow:
                "0 2px 5px rgba(0,0,0,0.1)"

            }}

          >

            {/* PRODUCT IMAGE */}

            {

              o.image && (

                <img

                  src={o.image}

                  alt=""

                  style={{

                    width:
                      "150px",

                    height:
                      "120px",

                    objectFit:
                      "cover",

                    borderRadius:
                      "10px"

                  }}

                />

              )

            }

            {/* PRODUCT NAME */}

            <h3>

              {
                o.name ||
                "Product"
              }

            </h3>

            {/* PRICE */}

            <h2

              style={{
                color: "green"
              }}

            >

              ₹{
                o.total_amount
              }

            </h2>

            {/* CATEGORY */}

            {

              o.category && (

                <p>

                  <b>
                    Category:
                  </b>

                  {" "}

                  {o.category}

                </p>

              )

            }

            {/* PAYMENT */}

            <p>

              <b>
                Payment:
              </b>

              {" "}

              {
                o.payment_status
              }

            </p>

            {/* DELIVERY STATUS */}

            <p>

              <b>
                Delivery Status:
              </b>

              <span

                style={{

                  background:
                    getColor(
                      o.status
                    ),

                  color:
                    "white",

                  padding:
                    "5px 10px",

                  borderRadius:
                    "20px",

                  marginLeft:
                    "10px"

                }}

              >

                {o.status}

              </span>

            </p>

            <hr />

            {/* SHIPPING */}

            <h4>
              Shipping Address
            </h4>

            <p>

              <b>
                Name:
              </b>

              {" "}

              {o.full_name}

            </p>

            <p>

              <b>
                Mobile:
              </b>

              {" "}

              {o.mobile}

            </p>

            <p>

              <b>
                Address:
              </b>

              {" "}

              {o.address}

            </p>

            <p>

              <b>
                City:
              </b>

              {" "}

              {o.city}

            </p>

            <p>

              <b>
                State:
              </b>

              {" "}

              {o.state}

            </p>

            <p>

              <b>
                Pincode:
              </b>

              {" "}

              {o.pincode}

            </p>

            <p>

              <b>
                Order Date:
              </b>

              {" "}

              {

                new Date(
                  o.created_at
                ).toLocaleString()

              }

            </p>

          </div>

        ))

      }

    </div>

  );

}

export default Orders;
