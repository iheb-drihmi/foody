from flask import Flask, jsonify, request, session
from libs.db import db
from flask_bcrypt import Bcrypt
from bson import ObjectId
bcrypt = Bcrypt()


class User:
    def get_users(self):
        return

    def me(self):
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"message": "Unauthorize"}), 401

        user = db.user.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"message": "User not found"}), 401

        return jsonify({
            "message": "User logged in successfully.",
            "result": {
                "id": str(user['_id']),
                "email": user["email"],
                "role": user.get('role', 'user'),
            }
        }), 200
