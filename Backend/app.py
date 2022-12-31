from flask import Flask, request
import pandas as pd
import numpy as np
import json
from flask_cors import CORS, cross_origin
from sklearn import linear_model


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
        #print(request.files["traindata"])
        content = json.loads(request.files["traindata"].read().split()[0].decode("utf-8"))
        f = request.files['file']
        df = pd.read_csv(f)
        cdf = df[content["xarray"]+[content["y"]]]
        msk = np.random.rand(len(df)) < content["trainamt"] * 0.01
        
        train = cdf[msk]
        test = cdf[~msk]

        regr = linear_model.LinearRegression()
        train_x = train[content["xarray"]]
        train_y = train[[content["y"]]]
        regr.fit(train_x,train_y)

        x = test[content["xarray"]]
        y = test[[content["y"]]]

        y_pred = regr.predict(test[content["xarray"]])
        SSE = np.mean((y_pred - y)**2)
        
    return {"coef": regr.coef_.tolist(), "intercept": regr.intercept_.tolist(),"variance": regr.score(x,y), "SSE": SSE.tolist()}