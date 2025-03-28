from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {
    "alice": "password123",
    "bob": "secure456",
    "charlie": "qwerty789",
    "diana": "hunter2",
    "eve": "passpass",
    "frank": "letmein",
    "grace": "trustno1",
    "heidi": "admin123",
    "ivan": "welcome1",
    "judy": "password1"
}

@app.route('/validate_login', methods=['POST'])
def validate_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and users[username] == password:
        return jsonify({"success": True, "message": "Login successful!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials!"}), 401
    
@app.route('/predict_house_price', methods=['POST'])
def get_resource():
    return jsonify({"message": "Skeleton endpoint to be implemented"})

if __name__ == '__main__':
    app.run(debug=True)