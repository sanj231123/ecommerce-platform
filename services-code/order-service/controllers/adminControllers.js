const db = require("../db");


// =====================================
// GET ALL ORDERS (ADMIN)
// =====================================

const getAllOrders = (
  req,
  res
) => {

  const sql = `

    SELECT

      orders.id,

      orders.user_id,

      orders.total_amount,

      orders.status,

      orders.payment_status,

      orders.shipping_address,

      orders.created_at,

      users.name,

      users.email,

      users.mobile,

      payments.payment_id,

      payments.status AS payment_status_db

    FROM orders

    LEFT JOIN users
      ON orders.user_id = users.id

    LEFT JOIN payments
      ON orders.id = payments.order_id

    ORDER BY orders.created_at DESC

  `;

  db.query(

    sql,

    (err, results) => {

      if (err) {

        console.log(err);

        return res
          .status(500)
          .json({

            success: false,

            message:
              "Database error"

          });

      }

      res.json(results);

    }

  );

};


// =====================================
// UPDATE ORDER STATUS
// =====================================

const updateOrderStatus = (
  req,
  res
) => {

  const orderId =
    req.params.id;

  const { status } =
    req.body;

  // VALID STATUS

  const validStatus = [

    "PLACED",

    "CONFIRMED",

    "SHIPPED",

    "DELIVERED",

    "CANCELLED"

  ];

  if (
    !validStatus.includes(
      status
    )
  ) {

    return res
      .status(400)
      .json({

        success: false,

        message:
          "Invalid status"

      });

  }

  const sql = `

    UPDATE orders

    SET status=?

    WHERE id=?

  `;

  db.query(

    sql,

    [status, orderId],

    (err, result) => {

      if (err) {

        console.log(err);

        return res
          .status(500)
          .json({

            success: false,

            message:
              "Status update failed"

          });

      }

      res.json({

        success: true,

        message:
          "Order status updated"

      });

    }

  );

};


module.exports = {

  getAllOrders,

  updateOrderStatus

};
