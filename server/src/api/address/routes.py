from flask import Blueprint
from api.address.models import Address

address = Blueprint("address", __name__)


@address.route("/", methods=["GET"])
def get_addresses():
    return Address().get_addresses()


@address.route("/", methods=["POST"])
def create_address():
    return Address().create_address()


@address.route("/<id>", methods=["PATCH"])
def update_address(id):
    return Address().update_address(id)


@address.route("/<id>", methods=["DELETE"])
def delete_address(id):
    return Address().delete_address(id)


@address.route("/<id>", methods=["GET"])
def get_address_by_id(id):
    return Address().get_address_by_id(id)
