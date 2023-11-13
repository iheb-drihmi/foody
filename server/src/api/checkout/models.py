import stripe
from flask import request, jsonify

stripe.api_key = "sk_test_51O1DHsIEWSsSQMqfMYi77i2kGP5tCVsyOZGQBW0MdSbGtK7TToClbRtnWOs1E4PuWWV65Ht6TgMeOjPZlbtA1aRd00Fi3bXXl3"


class Checkout:
    def create_checkout_session(self):
        try:
            checkout = request.get_json()

            data = checkout.get("data")
            other_data = checkout.get("other_data")

            data.append(
                {
                    "price_data": {
                        "currency": "tnd",
                        "product_data": {
                            "name": "Shipping",
                        },
                        "unit_amount": 7000,
                    },
                    "quantity": 1,
                }
            )

            session = stripe.checkout.Session.create(
                # payment_method_types=["card"],
                # automatic_tax={'enabled': True},
                customer_email=other_data["email"],
                allow_promotion_codes=True,
                line_items=data,
                mode="payment",
                success_url="http://localhost:3000/checkout?status=success",
                cancel_url="http://localhost:3000/checkout?status=cancel"
            )

            return jsonify({
                "success": True,
                "id": session.id
            })

        except Exception as e:
            print(e)
            return jsonify({
                "success": False,
                "message": "Something went wrong. Please try again later."
            }), 500
