from flask import Blueprint
from api.checkout.models import Checkout

checkout = Blueprint("checkout", __name__)

# Create an instance of the Checkout class
checkout_instance = Checkout()


@checkout.route("/", methods=["POST"])
def create_checkout_session():
    return checkout_instance.create_checkout_session()
