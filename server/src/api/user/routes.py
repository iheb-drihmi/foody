from flask import Blueprint, jsonify, session
from api.user.models import User  # Import User when needed, not at the top

user = Blueprint("user", __name__)


@user.route("/", methods=["GET"])
def get_users():
    return


@user.route("/me", methods=["GET"])
def get_current_user():
    return User().me()
