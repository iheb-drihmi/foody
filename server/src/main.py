import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from api.auth.routes import auth
from api.user.routes import user
from api.product.routes import product
from api.address.routes import address
from api.cart.routes import cart
from api.order.routes import order
from api.checkout.routes import checkout

# LHMD cbon 5an habto taw andek f github

app = Flask(__name__)


# middlewares
Bcrypt(app)
CORS(app, supports_credentials=True)

# routes
api_v = "/api/v1/"
app.register_blueprint(auth, url_prefix="/api/v1/auth")
app.register_blueprint(user, url_prefix="/api/v1/users")
app.register_blueprint(address, url_prefix="/api/v1/address")
app.register_blueprint(order, url_prefix="/api/v1/orders")
app.register_blueprint(product, url_prefix="/api/v1/products")
app.register_blueprint(checkout, url_prefix="/api/v1/checkout")
app.register_blueprint(cart, url_prefix="/api/v1/cart")


# config
app.config["SECRET_KEY"] = os.getenv("JWT_SECRET")
app.config['SESSION_PERMANENT'] = False

if __name__ == "__main__":
    app.run(debug=True)
