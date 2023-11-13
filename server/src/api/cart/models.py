import json
from bson.json_util import dumps
from flask import jsonify, request
from libs.db import db
from flask_bcrypt import Bcrypt
from bson import ObjectId
bcrypt = Bcrypt()


def parse_json(data):
    return json.loads(dumps(data))


class Cart:
    def add_to_cart(self):
        try:
            body = request.get_json()
            user_id = body.get("user_id")
            product_id = body.get("product_id")
            qty = body.get("qty", 1)
            
            if not user_id or not product_id:
                return jsonify({
                    "message": "Please login",
                    "result": None
                }), 400

            existing_item = db.cart.find_one(
                {"user_id": user_id, "product_id": product_id})

            if existing_item:
                new_qty = existing_item["qty"] + qty
                db.cart.update_one({"_id": existing_item["_id"]}, {
                                   "$set": {"qty": new_qty}})
                return jsonify({
                    "message": "Product quantity updated in the cart",
                    "result": None
                }), 200
            else:
                res = db.cart.insert_one({**body, "user_id" : user_id,  "qty": qty})

                if res.inserted_id:
                    return jsonify({
                        "message": "Product added to the cart",
                        "result": None
                    }), 201
                else:
                    return jsonify({
                        "message": "Failed to add the product to the cart",
                        "result": None
                    }), 500
        except Exception as e:
            return jsonify({
                "message": "Something went wrong. Please try again later.",
                "result": None
            }), 500

    def update_quantity(self):
        try:
            body = request.get_json()
            user_id = body.get("user_id")
            product_id = body.get("product_id")
            qty = body.get("qty", None)

            if user_id is None or product_id is None:
                return jsonify({
                    "success": False,
                    "message": "user_id and product_id are required fields.",
                }), 400  

            existing_item = db.cart.find_one(
                {"user_id": user_id, "product_id": product_id})

            if existing_item:
                new_qty = existing_item["qty"] + qty
                res = db.cart.update_one({"_id": existing_item["_id"]}, {
                                   "$set": {"qty": new_qty}})
                
                print(res)
                return jsonify({
                    "message": "Product quantity updated in the cart",
                    "result": {
                               "qty" : new_qty, "user_id": user_id, "product_id": product_id}
                }), 200
            else:
                res = db.cart.insert_one({**body, "user_id" : user_id,  "qty": qty})

                if res.inserted_id:
                    return jsonify({
                        "message": "Product added to the cart",
                        "result": None
                    }), 201
                else:
                    return jsonify({
                        "message": "Failed to add the product to the cart",
                        "result": None
                    }), 500
        except Exception as e:
            return jsonify({
                "message": "Something went wrong. Please try again later.",
                "result": None
            }), 500
            
    def get_cart_items(self, id):
        try:
            if not id:
                return jsonify({
                    "success": False,
                    "message": "Please login!",
                }), 401

            extract_all_cart_items = db.cart.find({"user_id": id})

            if extract_all_cart_items:
                return jsonify({
                    "message": "Get cart items",
                    "result": parse_json(extract_all_cart_items)
                }), 200
            else:
                return jsonify({
                    "success": False,
                    "message": "No Cart items found!",
                }), 204

        except Exception as e:
            print(e)
            return jsonify({
                "success": False,
                "message": "Something went wrong! Please try again",
            }), 500

    def remove_item(self, id):
            try:
                if not id:
                    return jsonify({
                        "success": False,
                        "message": "ID is required",
                    }), 400

                deleted_item = db.cart.delete_one({"_id": ObjectId(id)})

                if deleted_item.deleted_count > 0:
                    return jsonify({
                        "message": "Cart item removed successfully",
                        "result": None
                    }), 200
                else:
                    return jsonify({
                        "success": False,
                        "message": "Cart item not found",
                    }), 404
            except Exception as e:
                print(e)
                return jsonify({
                    "success": False,
                    "message": "Something went wrong! Please try again",
                }), 500
