import datetime
import json
from bson.json_util import dumps
from flask import jsonify, request
from libs.db import db
from flask_bcrypt import Bcrypt
from bson import ObjectId
bcrypt = Bcrypt()


def parse_json(data):
    return json.loads(dumps(data))


class Product:
    def create_item(self):
        body = request.get_json()
        res = db.product.insert_one({
            "createdAt": datetime.datetime.utcnow().isoformat(),
            **body})

        return jsonify({
            "message": "Item Created",
            "result": None
        }), 201

    def get_product_by_id(self, id):
        item = db.product.find_one({"_id": ObjectId(id)})

        if not item:
            return jsonify({
                "message": "No Product with this id",
            }), 404

        return jsonify({
            "message": "Menu",
            "result": parse_json(item)
        }), 200

    def update_product(self):
        body = request.get_json()
        item_id = body.get('_id', {}).get('$oid', None)

        if not item_id:
            return jsonify({
                "message": "No product ID provided in the request body",
            }), 400

        body.pop('_id', None)

        item = db.product.find_one({"_id": ObjectId(item_id)})

        if not item:
            return jsonify({
                "message": "No Product with this id",
            }), 404

        # Update the existing product with the new data
        updated_res = db.product.update_one(
            {"_id": ObjectId(item_id)}, {"$set": body})
        if updated_res.modified_count > 0:
            return jsonify({
                "message": "Product updated successfully",
                "result": {"id": str(item['_id'])}
            }), 200
        else:
            return jsonify({
                "message": "No changes made to the product",
                "result": {"id": str(item['_id'])}
            }), 200

    def delete_product_by_id(self, id):
        try:
            item = db.product.find_one_and_delete({"_id": ObjectId(id)})

            if item is None:
                return jsonify({
                    "message": "Product not found with the given ID",
                    "result": None
                }), 404

            return jsonify({
                "message": "Product deleted successfully",
                "result": {"id": str(item['_id'])}
            }), 200
        except Exception as e:
            return jsonify({
                "message": "An error occurred while deleting the product",
                "error": str(e)
            }), 500

    def get_items(self):
        limit = int(request.args.get('limit', 20))
        page = int(request.args.get('page', 1))
        skip = (page - 1) * limit
        category = request.args.get('category', 'all')

        filter = {
            # "createdAt": 1
        }

        if category != 'all':
            filter['category'] = category

        items = db.product.find(filter).skip(
            skip).limit(limit).sort("createdAt", -1)
        count = db.product.count_documents(filter)

        return jsonify({
            "message": "Menu",
            "count": count,
            "page": page,
            "skip": skip,
            "limit": limit,
            "latest": page * limit >= count,
            "result": parse_json(list(items))
        }), 200
