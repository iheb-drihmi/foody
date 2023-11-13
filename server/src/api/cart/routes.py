from flask import Blueprint, jsonify, session
# Import User when needed, not at the top
from api.cart.models import Cart

cart = Blueprint("cart", __name__)


@cart.route("/", methods=["GET"])
def get_items():
    return Cart().get_items()


@cart.route("/", methods=["POST"])
def add_to_cart():
    return Cart().add_to_cart()


@cart.route("/update_quantity", methods=["POST"])
def update_quantity():
    return Cart().update_quantity()


@cart.route("/<id>", methods=["DELETE"])
def delete_cart_by_id(id):
    return Cart().remove_item(id)


@cart.route("/<id>", methods=["GET"])
def get_cart_items(id):
    return Cart().get_cart_items(id)
