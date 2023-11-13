from flask import Blueprint
from api.auth.models import Auth  # Import User when needed, not at the top

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    return Auth().register()


@auth.route("/login", methods=["POST"])
def login():
    return Auth().login()


@auth.route("/logout", methods=["POST"])
def logout():
    return Auth().logout()


@auth.route("/session", methods=["GET"])
def get_session():
    return Auth().get_session()
