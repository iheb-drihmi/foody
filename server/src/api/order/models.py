import json
from bson.json_util import dumps
from flask import jsonify, request
from libs.db import db
from bson import ObjectId
import datetime


def parse_json(data):
    return json.loads(dumps(data))


class Order:
    def create_order(self):
        try:
            body = request.get_json()
            user = body.get('user_id')

            if not user:
                return jsonify({
                    "success": False,
                    "message": "User information is required to create an order."
                }), 400

            new_order = {
                "createdAt": datetime.datetime.utcnow().isoformat(),
                **body
            }

            order = db.order.insert_one(new_order)

            if order:
                # Assuming you want to clear the user's cart after creating an order
                db.cart.delete_many({"user_id": user})

                return jsonify({
                    "success": True,
                    "message": "Order created successfully.",
                }), 201
            else:
                return jsonify({
                    "success": False,
                    "message": "Failed to create the order. Please try again.",
                }), 500

        except Exception as e:
            return jsonify({
                "success": False,
                "message": "Something went wrong. Please try again later.",
            }), 500

    def get_order_by_id(self, id):
        order = db.order.find_one({"_id": ObjectId(id)})

        if not order:
            return jsonify({
                "message": "No Order with this id",
            }), 404

        return jsonify({
            "message": "Order",
            "result": parse_json(order)
        }), 200

    def update_order(self, id):
        body = request.get_json()
        order_id = body.get('_id', {}).get('$oid', None) or id

        if not order_id:
            return jsonify({
                "message": "No order ID provided in the request body",
            }), 400

        body.pop('_id', None)

        order = db.order.find_one({"_id": ObjectId(order_id)})

        if not order:
            return jsonify({
                "message": "No Order with this id",
            }), 404

        # Update the existing order with the new data
        updated_res = db.order.update_one(
            {"_id": ObjectId(order_id)}, {"$set": body})
        if updated_res.modified_count > 0:
            return jsonify({
                "message": "Order updated successfully",
                "result": {"id": str(order['_id'])}
            }), 200
        else:
            return jsonify({
                "message": "No changes made to the order",
                "result": {"id": str(order['_id'])}
            }), 200

    def delete_order_by_id(self, id):
        try:
            order = db.order.find_one_and_delete({"_id": ObjectId(id)})

            if order is None:
                return jsonify({
                    "message": "Order not found with the given ID",
                    "result": None
                }), 404

            return jsonify({
                "message": "Order deleted successfully",
                "result": {"id": str(order['_id'])}
            }), 200
        except Exception as e:
            return jsonify({
                "message": "An error occurred while deleting the order",
                "error": str(e)
            }), 500

    def get_orders(self):
        limit = int(request.args.get('limit', 20))
        page = int(request.args.get('page', 1))
        skip = (page - 1) * limit

        filter = {}

        if request.args.get("user_id"):
            filter = {"user_id": request.args.get("user_id")}

        orders = db.order.find(filter).skip(
            skip).limit(limit).sort("createdAt", -1)
        count = db.order.count_documents(filter)

        return jsonify({
            "message": "Orders",
            "count": count,
            "page": page,
            "skip": skip,
            "limit": limit,
            "latest": page * limit >= count,
            "result": parse_json(list(orders))
        }), 200
