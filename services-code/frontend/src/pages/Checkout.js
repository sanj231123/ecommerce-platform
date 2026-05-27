import API from "../services/axios";

import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function Checkout() {

  const navigate =
    useNavigate();

  const total =
    localStorage.getItem(
      "cartTotal"
    ) || 0;

  // ===================================
  // STATES + CITIES
  // ===================================

  const states = {

    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore"
    ],

    "Arunachal Pradesh": [
      "Itanagar",
      "Tawang",
      "Ziro"
    ],

    Assam: [
      "Guwahati",
      "Dibrugarh",
      "Silchar"
    ],

    Bihar: [
      "Patna",
      "Gaya",
      "Muzaffarpur"
    ],

    Chhattisgarh: [
      "Raipur",
      "Bilaspur",
      "Durg"
    ],

    Goa: [
      "Panaji",
      "Margao",
      "Vasco da Gama"
    ],

    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar"
    ],

    Haryana: [
      "Gurugram",
      "Faridabad",
      "Panipat"
    ],

    "Himachal Pradesh": [
      "Shimla",
      "Manali",
      "Dharamshala"
    ],

    Jharkhand: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad"
    ],

    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Hubli",
      "Mangalore"
    ],

    Kerala: [
      "Kochi",
      "Thiruvananthapuram",
      "Kozhikode"
    ],

    "Madhya Pradesh": [
      "Indore",
      "Bhopal",
      "Gwalior"
    ],

    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik"
    ],

    Manipur: [
      "Imphal",
      "Thoubal"
    ],

    Meghalaya: [
      "Shillong",
      "Tura"
    ],

    Mizoram: [
      "Aizawl",
      "Lunglei"
    ],

    Nagaland: [
      "Kohima",
      "Dimapur"
    ],

    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela"
    ],

    Punjab: [
      "Ludhiana",
      "Amritsar",
      "Jalandhar"
    ],

    Rajasthan: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Kota"
    ],

    Sikkim: [
      "Gangtok",
      "Namchi"
    ],

    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem"
    ],

    Telangana: [
      "Hyderabad",
      "Warangal",
      "Karimnagar"
    ],

    Tripura: [
      "Agartala",
      "Udaipur"
    ],

    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Noida",
      "Varanasi"
    ],

    Uttarakhand: [
      "Dehradun",
      "Haridwar",
      "Nainital"
    ],

    "West Bengal": [
      "Kolkata",
      "Howrah",
      "Durgapur"
    ]

  };

  // ===================================
  // FORM STATE
  // ===================================

  const [form, setForm] =
    useState({

      fullName: "",

      mobile: "",

      address: "",

      city: "",

      state: "",

      pincode: ""

    });

  // ===================================
  // HANDLE CHANGE
  // ===================================

  const handleChange = (
    e
  ) => {

    const { name, value } =
      e.target;

    // RESET CITY
    // WHEN STATE CHANGES

    if (name === "state") {

      setForm({

        ...form,

        state: value,

        city: ""

      });

      return;

    }

    setForm({

      ...form,

      [name]: value

    });

  };

  // ===================================
  // HANDLE PAYMENT
  // ===================================

  const handlePayment =
    async () => {

      try {

        // ============================
        // VALIDATION
        // ============================

        if (

          !form.fullName ||

          !form.mobile ||

          !form.address ||

          !form.city ||

          !form.state ||

          !form.pincode

        ) {

          alert(
            "Please fill all fields"
          );

          return;

        }

        // ============================
        // GET CART
        // ============================

        const cart =
          JSON.parse(

            localStorage.getItem(
              "cart"
            )

          ) || [];

        const productId =
          cart[0]
            ?.product_id || 1;

        // ============================
        // CREATE ORDER
        // ============================

        const orderRes =
          await API.post(

            "/orders/place",

            {

              productId,

              totalAmount:
                total,

              fullName:
                form.fullName,

              mobile:
                form.mobile,

              address:
                form.address,

              city:
                form.city,

              state:
                form.state,

              pincode:
                form.pincode

            }

          );

        const orderId =
          orderRes.data.orderId;

        // ============================
        // CREATE PAYMENT
        // ============================

        const paymentRes =
          await API.post(

            "/payment/create",

            {

              orderId,

              amount: total

            }

          );

        const order =
          paymentRes.data
            .razorpayOrder;

        // ============================
        // RAZORPAY
        // ============================

        const options = {

          key:
            "rzp_test_SqlQYRIElPuZio",

          amount:
            order.amount,

          currency:
            "INR",

          name:
            "Jainee Online Shop",

          description:
            "Order Payment",

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {

              try {

                await API.post(

                  "/payment/verify",

                  {

                    razorpay_order_id:
                      response
                        .razorpay_order_id,

                    razorpay_payment_id:
                      response
                        .razorpay_payment_id,

                    razorpay_signature:
                      response
                        .razorpay_signature,

                    orderId,

                    amount:
                      total

                  }

                );

                // SAVE ADDRESS

                localStorage.setItem(

                  "shippingAddress",

                  JSON.stringify(form)

                );

                // CLEAR CART

                localStorage.removeItem(
                  "cart"
                );

                localStorage.removeItem(
                  "cartTotal"
                );

                alert(
                  "Payment Successful"
                );

                navigate(
                  "/payment-success"
                );

              } catch (err) {

                console.log(err);

                alert(
                  "Payment Verification Failed"
                );

                navigate(
                  "/payment-failed"
                );

              }

            },

          prefill: {

            name:
              form.fullName,

            contact:
              form.mobile

          },

          theme: {

            color:
              "#2874f0"

          }

        };

        const rzp =
          new window.Razorpay(
            options
          );

        rzp.open();

      } catch (error) {

        console.log(
          "Checkout Error:",
          error.response?.data
          || error.message
        );

        alert(
          "Checkout Failed"
        );

        navigate(
          "/payment-failed"
        );

      }

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

      <div

        style={{

          background:
            "white",

          padding: "25px",

          borderRadius:
            "10px",

          maxWidth:
            "600px",

          margin:
            "auto"

        }}

      >

        <h1>
          💳 Checkout
        </h1>

        <hr />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px"
          }}
        />

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          style={inputStyle}
        >

          <option value="">
            Select State
          </option>

          {

            Object.keys(states)
              .map((state) => (

                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>

              ))

          }

        </select>

        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          style={inputStyle}
        >

          <option value="">
            Select City
          </option>

          {

            form.state &&

            states[
              form.state
            ]?.map((city) => (

              <option
                key={city}
                value={city}
              >
                {city}
              </option>

            ))

          }

        </select>

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          style={inputStyle}
        />

        <hr />

        <h2>
          Total Amount:
        </h2>

        <h1
          style={{
            color: "green"
          }}
        >
          ₹{total}
        </h1>

        <button

          onClick={handlePayment}

          style={{

            background:
              "green",

            color:
              "white",

            border:
              "none",

            padding:
              "14px",

            borderRadius:
              "6px",

            cursor:
              "pointer",

            width:
              "100%",

            fontSize:
              "16px"

          }}

        >

          Pay Now

        </button>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "12px",

  marginBottom: "15px",

  borderRadius: "5px",

  border: "1px solid #ccc",

  fontSize: "14px"

};

export default Checkout;
