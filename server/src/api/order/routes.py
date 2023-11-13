from flask import Blueprint, request, jsonify
# Import the Order class from the models module
from api.order.models import Order

order = Blueprint("order", __name__)

# Create an instance of the Order class
order_instance = Order()


@order.route("/", methods=["GET"])
def get_orders():
    return order_instance.get_orders()


@order.route("/", methods=["POST"])
def create_order():
    return order_instance.create_order()


@order.route("/<id>", methods=["GET"])
def get_order_by_id(id):
    return order_instance.get_order_by_id(id)


@order.route("/<id>", methods=["PATCH"])
def update_order(id):
    return order_instance.update_order(id)


@order.route("/<id>", methods=["DELETE"])
def delete_order(id):
    return order_instance.delete_order(id)
