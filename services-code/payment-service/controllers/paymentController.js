const db = require("../db");

const razorpay = require("../config/razorpay");

const crypto = require("crypto");


// =====================================
// CREATE PAYMENT ORDER
// =====================================

const createPayment = async (req, res) => {

  try {

    console.log("=================================");
    console.log("PAYMENT REQUEST RECEIVED");
    console.log("BODY:", req.body);
    console.log("=================================");

    const { orderId, amount } = req.body;

    if (!orderId) {

      return res.status(400).json({
        success: false,
        message: "orderId is required"
      });

    }

    if (!amount || Number(amount) <= 0) {

      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });

    }

    console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);

    const options = {

      amount: Number(amount) * 100,

      currency: "INR",

      receipt: `receipt_${orderId}`

    };

    console.log("ORDER OPTIONS:", options);

    console.log("KEY:", process.env.RAZORPAY_KEY_ID);
    console.log("SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);
    console.log("RAZORPAY INSTANCE:");
    console.log(razorpay);
    console.log("ORDERS OBJECT:");
    console.log(razorpay.orders);

    const order =
      await razorpay.orders.create(options);

    console.log("ORDER CREATED SUCCESSFULLY");
    console.log(order);

    return res.status(200).json({

      success: true,

      razorpayOrder: order

    });

  } catch (err) {

    console.log("=================================");
    console.log("RAZORPAY ERROR");
    console.log("=================================");

    console.log("MESSAGE:", err?.message);
    console.log("STATUS:", err?.statusCode);
    console.log("STACK:", err?.stack);
    console.log("ERROR:", err);

    return res.status(500).json({

      success: false,

      message:
        err?.message ||
        "Razorpay order failed"

    });

  }

};

// =====================================
// VERIFY PAYMENT
// =====================================

const verifyPayment = async (
  req,
  res
) => {

  try {

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      orderId,

      amount,

    } = req.body;

    // =================================
    // GENERATE SIGNATURE
    // =================================

    const generatedSignature =
      crypto
        .createHmac(

          "sha256",

          process.env
            .RAZORPAY_KEY_SECRET

        )

        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )

        .digest("hex");

    // =================================
    // VERIFY SIGNATURE
    // =================================

    if (
      generatedSignature !==
      razorpay_signature
    ) {

      // PAYMENT FAILED

      const failedSql = `

        UPDATE orders

        SET
          payment_status='FAILED',
          status='FAILED'

        WHERE id=?

      `;

      db.query(
        failedSql,
        [orderId]
      );

      return res
        .status(400)
        .json({

          success: false,

          message:
            "Payment verification failed",

        });

    }

    // =================================
    // CHECK DUPLICATE PAYMENT
    // =================================

    const checkSql = `

      SELECT id

      FROM payments

      WHERE razorpay_payment_id=?

    `;

    db.query(

      checkSql,

      [razorpay_payment_id],

      (checkErr, checkResult) => {

        if (checkErr) {

          console.error(checkErr);

          return res
            .status(500)
            .json({

              success: false,

              message:
                "Database error",

            });

        }

        // DUPLICATE PAYMENT

        if (
          checkResult.length > 0
        ) {

          return res.json({

            success: true,

            message:
              "Payment already verified",

          });

        }

        // =================================
        // USER ID
        // =================================

        const userId =
          req.user?.id || 1;

        // =================================
        // SAVE PAYMENT
        // =================================

        const insertSql = `

          INSERT INTO payments
          (
            order_id,
            user_id,
            amount,
            payment_id,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status
          )

          VALUES (?, ?, ?, ?, ?, ?, ?, ?)

        `;

        db.query(

          insertSql,

          [

            orderId,

            userId,

            amount,

            razorpay_payment_id,

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature,

            "SUCCESS",

          ],

          (insertErr, result) => {

            if (insertErr) {

              console.error(
                insertErr
              );

              return res
                .status(500)
                .json({

                  success: false,

                  message:
                    "Payment save failed",

                });

            }

            // =================================
            // UPDATE ORDER STATUS
            // =================================

            const updateOrderSql = `

              UPDATE orders

              SET
                payment_status='SUCCESS',
                status='PLACED'

              WHERE id=?

            `;

            db.query(

              updateOrderSql,

              [orderId],

              (updateErr) => {

                if (updateErr) {

                  console.error(
                    updateErr
                  );

                  return res
                    .status(500)
                    .json({

                      success: false,

                      message:
                        "Order update failed",

                    });

                }

                res.json({

                  success: true,

                  message:
                    "Payment verified successfully",

                });

              }

            );

          }

        );

      }

    );

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,

      message:
        "Verification failed",

    });

  }

};


// =====================================
// GET PAYMENT STATUS
// =====================================

const getPaymentStatus = (
  req,
  res
) => {

  const paymentId =
    req.params.id;

  const sql = `

    SELECT *

    FROM payments

    WHERE payment_id = ?

  `;

  db.query(

    sql,

    [paymentId],

    (err, result) => {

      if (err) {

        return res
          .status(500)
          .json({

            success: false,

            message:
              "Error",

          });

      }

      res.json(result);

    }

  );

};


module.exports = {

  createPayment,

  verifyPayment,

  getPaymentStatus,

};
