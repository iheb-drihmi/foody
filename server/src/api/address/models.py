import json
from bson.json_util import dumps
from flask import jsonify, request
from libs.db import db
from bson import ObjectId


class Address:

    def create_address(self):
        try:
            body = request.get_json()

            if "user_id" not in body or not body["user_id"]:
                return jsonify({
                    "message": "Please provide user ID",
                    "result": None
                }), 401

            new_address = db.address.insert_one(body)

            if new_address.inserted_id:
                return jsonify({
                    "message": "Address created successfully",
                    "result": None
                }), 201
            else:
                return jsonify({
                    "message": "Failed to create the address",
                    "result": None
                }), 500
        except Exception as e:
            return jsonify({
                "message": "An error occurred while creating the address",
                "error": str(e)
            }), 500

    def get_addresses(self):
        try:
            user_id = request.args.get('user_id')
            if not user_id:
                return jsonify({
                    "message": "Please provide a user ID",
                    "result": None
                }), 400

            addresses = list(db.address.find({"user_id": user_id}))

            if addresses:
                return jsonify({
                    "message": f"Addresses for user {user_id}",
                    "result": json.loads(dumps(addresses))
                }), 200
            else:
                return jsonify({
                    "message": f"No addresses found for user {user_id}",
                    "result": None
                }), 404
        except Exception as e:
            return jsonify({
                "message": "An error occurred while retrieving addresses",
                "error": str(e)
            }), 500

    def update_address(self, id):
        try:
            body = request.get_json()
            updated_address = db.address.update_one(
                {"_id": ObjectId(id)}, {"$set": body})

            if updated_address.modified_count > 0:
                return jsonify({
                    "message": "Address updated successfully",
                    "result": None
                }), 200
            else:
                return jsonify({
                    "message": "Address not found or no changes applied",
                    "result": None
                }), 404
        except Exception as e:
            return jsonify({
                "message": "An error occurred while updating the address",
                "error": str(e)
            }), 500

    def delete_address(self, id):
        try:
            deleted_address = db.address.delete_one({"_id": ObjectId(id)})

            if deleted_address.deleted_count > 0:
                return jsonify({
                    "message": "Address deleted successfully",
                    "result": None
                }), 200
            else:
                return jsonify({
                    "message": "Address not found",
                    "result": None
                }), 404
        except Exception as e:
            return jsonify({
                "message": "An error occurred while deleting the address",
                "error": str(e)
            }), 500

    def get_address_by_id(self, id):
        try:
            address_item = db.address.find_one({"_id": ObjectId(id)})

            if address_item:
                return jsonify({
                    "message": "Get address by ID",
                    "result": json.loads(dumps(address_item))
                }), 200
            else:
                return jsonify({
                    "message": "Address not found",
                    "result": None
                }), 404
        except Exception as e:
            return jsonify({
                "message": "An error occurred while retrieving the address",
                "error": str(e)
            }), 500

    def get_address_by_user_id(self):
        try:
            body = request.get_json()
            user_id = body.get("user_id", None)

            address_item = db.address.find_one({"user_id": user_id})

            if address_item:
                return jsonify({
                    "message": "Get address by user id",
                    "result": json.loads(dumps(address_item))
                }), 200
            else:
                return jsonify({
                    "message": "Address not found",
                    "result": None
                }), 404
        except Exception as e:
            return jsonify({
                "message": "An error occurred while retrieving the address",
                "error": str(e)
            }), 500
