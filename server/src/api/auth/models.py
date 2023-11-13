from flask import jsonify, request, session, make_response
import jwt
from libs.db import db
from flask_bcrypt import Bcrypt
from bson import ObjectId

bcrypt = Bcrypt()


class Auth:
    def __init__(self):
        self.secret_key = "secret_key"

    def encode_jwt(self, payload):
        token = jwt.encode(payload, self.secret_key, algorithm="HS256")
        return token

    def set_session(self, user_id):
        session["user_id"] = str(user_id)

    def get_session(self):
        user_id = session.get('user_id')

        if not user_id:
            return jsonify({"message": "Session not found."}), 401

        user = db.user.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"message": "Unauthorized"}), 401

        user_info = {
            "id": str(user['_id']),  # Convert ObjectId to a string
            "email": user["email"],
            "name": user["name"],
            "role": user.get('role', 'USER'),
        }

        # Serialize the user_info dictionary to JSON using json.dumps
        return json.dumps({
            "message": "Session result.",
            "result": {
                "user": user_info,
                "token": self.encode_jwt(user_info),  # Create a JWT token
            }
        }), 200, {'Content-Type': 'application/json'}

    def register(self):
        body = request.get_json()
        email = body.get('email')
        name = body.get('name')
        password = body.get('password')

        existing_user = db.user.find_one({"email": email})

        if existing_user:
            return jsonify({"message": "User with this email already exists!"}), 400

        hashed_password = bcrypt.generate_password_hash(
            password).decode('utf-8')

        user_data = {
            "email": email,
            "name": name,
            "password": hashed_password,
            "role": "USER",
        }

        user_insert_result = db.user.insert_one(user_data)
        user_id = str(user_insert_result.inserted_id)
        del user_data["password"]
        del user_data["_id"]
        user_data["id"] = user_id

        token = self.encode_jwt({"user_id": user_id})
        self.set_session(user_id)

        return jsonify({"message": "User registered successfully.", "result": {
            "user": user_data, "token": token,
        }}), 201

    def login(self):
        body = request.get_json()
        email = body.get('email')
        password = body.get('password')

        if not email or not password:
            return jsonify({"message": "Email and Password required"}), 400

        existing_user = db.user.find_one({"email": email})

        if not existing_user:
            return jsonify({"message": "No user with this email registered."}), 400

        if not bcrypt.check_password_hash(existing_user['password'], password):
            return jsonify({"message": "Invalid password."}), 401

        self.set_session(existing_user["_id"])

        user_info = {
            "id": str(existing_user['_id']),
            "name": existing_user["name"],
            "email": email,
            "role": existing_user["role"],
        }

        token = self.encode_jwt(user_info)

        response_data = {
            "message": "User logged in successfully.",
            "result": {
                "user": user_info,
                "token": token,
            }
        }

        return jsonify(response_data), 200

    def logout(self):
        session.pop("user_id", None)
        return jsonify({"message": "User logged out."}), 200
