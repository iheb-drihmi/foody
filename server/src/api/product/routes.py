from flask import Blueprint
from api.product.models import Product

product = Blueprint("product", __name__)


@product.route("/", methods=["GET"])
def get_items():
    return Product().get_items()


@product.route("/", methods=["POST"])
def create_item():
    return Product().create_item()

@product.route("/", methods=["PATCH"])
def update_product():
    return Product().update_product()


@product.route("/<id>", methods=["GET"])
def get_product_by_id(id):
    return Product().get_product_by_id(id)


@product.route("/<id>", methods=["DELETE"])
def delete_product_by_id(id):
    return Product().delete_product_by_id(id)
