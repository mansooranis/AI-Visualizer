from flask import Flask, request
import json
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

@app.route("/")
@cross_origin()
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/upload', methods=['GET', 'POST'])
@cross_origin()
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        data = f.readlines()
        print(data)
        #f.save('/var/www/uploads/uploaded_file.txt')
    return {"hi": "hi"}
