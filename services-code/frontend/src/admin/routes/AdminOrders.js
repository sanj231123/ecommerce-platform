import {
  useEffect,
  useState
} from "react";

import API from "../../services/axios";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  // =====================================
  // FETCH ORDERS
  // =====================================

  const fetchOrders = async () => {

    try {

      setLoading(true);

      const res =
        await API.get(

          "/admin/orders"

        );

      setOrders(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Failed to load orders"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // =====================================
  // UPDATE STATUS
  // =====================================

  const updateStatus =
    async (
      orderId,
      status
    ) => {

      try {

        setUpdating(true);

        await API.put(

          `/admin/orders/${orderId}`,

          { status }

        );

        alert(
          "Order status updated"
        );

        fetchOrders();

      } catch (err) {

        console.log(err);

        alert(
          "Status update failed"
        );

      } finally {

        setUpdating(false);

      }

    };

  // =====================================
  // PAYMENT BADGE
  // =====================================

  const paymentBadge = (
    status
  ) => {

    if (
      status === "SUCCESS"
    ) {

      return (

        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">

          SUCCESS

        </span>

      );

    }

    if (
      status === "FAILED"
    ) {

      return (

        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">

          FAILED

        </span>

      );

    }

    return (

      <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">

        PENDING

      </span>

    );

  };

  // =====================================
  // ORDER BADGE
  // =====================================

  const orderBadge = (
    status
  ) => {

    let color =
      "bg-gray-500";

    if (
      status === "PLACED"
    ) {

      color =
        "bg-blue-500";

    }

    if (
      status ===
      "CONFIRMED"
    ) {

      color =
        "bg-indigo-500";

    }

    if (
      status ===
      "SHIPPED"
    ) {

      color =
        "bg-orange-500";

    }

    if (
      status ===
      "DELIVERED"
    ) {

      color =
        "bg-green-600";

    }

    if (
      status ===
      "CANCELLED"
    ) {

      color =
        "bg-red-600";

    }

    return (

      <span
        className={`${color} text-white px-2 py-1 rounded text-sm`}
      >

        {status}

      </span>

    );

  };

  // =====================================
  // UI
  // =====================================

  if (loading) {

    return (

      <div className="p-6 text-xl">

        Loading orders...

      </div>

    );

  }

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Admin Orders Dashboard

      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">
                Order ID
              </th>

              <th className="border p-3">
                Customer
              </th>

              <th className="border p-3">
                Mobile
              </th>

              <th className="border p-3">
                Amount
              </th>

              <th className="border p-3">
                Payment
              </th>

              <th className="border p-3">
                Order Status
              </th>

              <th className="border p-3">
                Address
              </th>

              <th className="border p-3">
                Actions
              </th>

              <th className="border p-3">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {

              orders.map((order) => (

                <tr key={order.id}>

                  <td className="border p-3">

                    #{order.id}

                  </td>

                  <td className="border p-3">

                    <div className="font-semibold">

                      {order.name}

                    </div>

                    <div className="text-sm text-gray-600">

                      {order.email}

                    </div>

                  </td>

                  <td className="border p-3">

                    {order.mobile}

                  </td>

                  <td className="border p-3 font-bold">

                    ₹{order.total_amount}

                  </td>

                  <td className="border p-3">

                    {paymentBadge(
                      order.payment_status
                    )}

                  </td>

                  <td className="border p-3">

                    {orderBadge(
                      order.status
                    )}

                  </td>

                  <td className="border p-3">

                    <div>

                      {order.shipping_address}

                    </div>

                  </td>

                  <td className="border p-3">

                    <div className="flex flex-col gap-2">

                      <button

                        disabled={updating}

                        onClick={() =>
                          updateStatus(
                            order.id,
                            "CONFIRMED"
                          )
                        }

                        className="bg-blue-500 text-white px-2 py-1 rounded"

                      >

                        Confirm

                      </button>

                      <button

                        disabled={updating}

                        onClick={() =>
                          updateStatus(
                            order.id,
                            "SHIPPED"
                          )
                        }

                        className="bg-orange-500 text-white px-2 py-1 rounded"

                      >

                        Ship

                      </button>

                      <button

                        disabled={updating}

                        onClick={() =>
                          updateStatus(
                            order.id,
                            "DELIVERED"
                          )
                        }

                        className="bg-green-600 text-white px-2 py-1 rounded"

                      >

                        Deliver

                      </button>

                      <button

                        disabled={updating}

                        onClick={() =>
                          updateStatus(
                            order.id,
                            "CANCELLED"
                          )
                        }

                        className="bg-red-600 text-white px-2 py-1 rounded"

                      >

                        Cancel

                      </button>

                    </div>

                  </td>

                  <td className="border p-3">

                    {

                      new Date(
                        order.created_at
                      ).toLocaleString()

                    }

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminOrders;
