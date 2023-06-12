const braintree =require("braintree");
const Order = require('../../models/OrderModel')
const Product = require('../../models/ProductModel')
const SENDGRID_KEY= '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'
const EMAIL_FROM= 'rashedul.rajon@gmail.com'
const CLIENT_URL = 'http://localhost:3000'
const BRAINTREE_MERCHANT_ID = 'vj522fwd6f6rmsfr'
const BRAINTREE_PUBLIC_KEY= '8ncwvtcbnrmz8pmj'
const BRAINTREE_PRIVATE_KEY= '68d1af4a327b008de76ea6bb0a66124a'

const sgMail =require("@sendgrid/mail");

sgMail.setApiKey(SENDGRID_KEY);

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: BRAINTREE_MERCHANT_ID,
    publicKey: BRAINTREE_PUBLIC_KEY,
    privateKey: BRAINTREE_PRIVATE_KEY,
});

exports.getToken = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.processPayment = async (req, res) => {
    try {
        // console.log(req.body);
        const { nonce, cart } = req.body;

        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        // console.log("total => ", total);

        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    // res.send(result);
                    // create order
                    new Order({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    // decrement quantity
                    decrementQuantity(cart);
                    const bulkOps = cart.map((item) => {
                      return {
                        updateOne: {
                          filter: { _id: item._id },
                          update: { $inc: { quantity: -0, sold: +1 } },
                        },
                      };
                    });

                    Product.bulkWrite(bulkOps, {});

                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
};

const decrementQuantity = async (cart) => {
    try {
        // build mongodb query
        const bulkOps = cart.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item._id },
                    update: { $inc: { quantity: -0, sold: +1 } },
                },
            };
        });

        const updated = await Product.bulkWrite(bulkOps, {});
        console.log("blk updated", updated);
    } catch (err) {
        console.log(err);
    }
};

exports.orderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate("buyer", "email name");
        // send email

        // prepare email
        const emailData = {
            from: EMAIL_FROM,
            to: order.buyer.email,
            subject: "Order status",
            html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
        };

        try {
            await sgMail.send(emailData);
        } catch (err) {
            console.log(err);
        }

        res.json(order);
    } catch (err) {
        console.log(err);
    }
};