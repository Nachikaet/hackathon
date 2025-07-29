from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///localeco.db'
db = SQLAlchemy(app)
CORS(app)  # Enable CORS for frontend requests

class Business(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price_level = db.Column(db.Integer)
    rating = db.Column(db.Float)
    city = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    description = db.Column(db.Text)

@app.route('/businesses', methods=['GET'])
def get_businesses():
    # get all possible filters from query parameters
    category = request.args.get('category')
    price = request.args.get('price_level', type=int)
    rating = request.args.get('rating', type=float)
    city = request.args.get('city')
    name = request.args.get('name')
    address = request.args.get('address')
    description = request.args.get('description')
    latitude = request.args.get('latitude', type=float)
    longitude = request.args.get('longitude', type=float)
    
    query = Business.query
    
    if category:
        query = query.filter_by(category=category)
    if price:
        query = query.filter(Business.price_level <= price)
    if rating:
        query = query.filter(Business.rating >= rating)
    if city:
        query = query.filter_by(city=city)
    if name:
        query = query.filter(Business.name.ilike(f'%{name}%'))
    if address:
        query = query.filter(Business.address.ilike(f'%{address}%'))
    if description:
        query = query.filter(Business.description.ilike(f'%{description}%'))
    if latitude:
        query = query.filter(Business.latitude == latitude)
    if longitude:
        query = query.filter(Business.longitude == longitude)

    businesses = query.all()
    
    results = [{
        "id": b.id,
        "name": b.name,
        "category": b.category,
        "price_level": b.price_level,
        "rating": b.rating,
        "city": b.city,
        "address": b.address,
        "latitude": b.latitude,
        "longitude": b.longitude,
        "description": b.description
    } for b in businesses]
    
    return jsonify(results)


@app.route('/businesses', methods=['POST'])
def add_business():
    data = request.json
    new_business = Business(
        name=data['name'],
        category=data['category'],
        price_level=data.get('price_level'),
        rating=data.get('rating', 0),
        city=data['city'],
        address=data.get('address'),
        latitude=data.get('latitude'),
        longitude=data.get('longitude'),
        description=data.get('description')
    )
    db.session.add(new_business)
    db.session.commit()
    return jsonify({"message": "Business added", "id": new_business.id}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
