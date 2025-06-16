import joblib
import pandas as pd
import os, csv
import datetime
from flask import Flask, request, redirect, render_template, url_for, flash, jsonify
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
    current_user
)

from models import db

print('Loading Model...')
model = joblib.load('model/predictor.pkl')
transformer = joblib.load('model/transformer.pkl') 
print('Model Loaded!')

# Configure Flask App
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///' + os.path.join(app.root_path, 'data.db'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'fallback_secret_key')
app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
app.config['JWT_REFRESH_COOKIE_NAME'] = 'refresh_token'
app.config["JWT_TOKEN_LOCATION"] = ["cookies", "headers"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=15)
app.config["JWT_COOKIE_SECURE"] = True
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY', 'fallback_jwt_secret')
app.config["JWT_COOKIE_CSRF_PROTECT"] = False
app.config['JWT_HEADER_NAME'] = "Cookie"


# Initialize App 
db.init_app(app)
app.app_context().push()
CORS(app)
jwt = JWTManager(app)


@jwt.user_identity_loader
def user_identity_lookup(identity):
  return identity

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
  identity = jwt_data["sub"]
  return User.query.get(str(identity))

def login_user(username, password):
  user = User.query.filter_by(username=username).first()
  if user and user.check_password(password):
    token = create_access_token(identity=str(user.id))
    return token
  return None


def initialize_db():
  db.drop_all()
  db.create_all()
  #user = User(username='bob', password='bobpass')
  #db.session.add(user)
  #db.session.commit()

@app.route('/init', methods=['GET'])
def init():
    initialize_db()
    return redirect('/')

@app.route('/', methods=['GET'])
def home_page():
  return render_template('index.html')

@app.route('/calculator', methods=['GET'])
def calculator_page():
  return render_template('calculator.html')

@app.route('/about', methods=['GET'])
def about_page():
  return render_template('about.html')

@app.route('/contact', methods=['GET'])
def contact_page():
  return render_template('contact.html')

@app.route('/predict', methods=['POST'])
def calculate():
    try:
        data = request.form
        price = float(data['price'])

        input_data = {
           "category": [data['category']],
           "weight": [int(data['weight'])]
        }

        input_df = pd.DataFrame(input_data)
        transformed_df = transformer.transform(input_df)
        shipping = float(model.predict(transformed_df)[0])

        tt_cost = round(price * 6.8, 2)
        tax = round(tt_cost * 0.07, 2)
        service_charge = round((tt_cost + tax + shipping) * 0.15, 2)
        total_cost = round(tt_cost + tax + shipping + service_charge, 2)

        return jsonify({
            "item_cost": tt_cost,
            "tax": tax,
            "shipping": shipping,
            "service_charge": service_charge,
            "total_cost": total_cost
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    


if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8080)
