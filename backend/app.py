from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
import pickle
import pandas
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/logistic",methods=['GET', 'POST'])
@cross_origin()
def logistic_riskClassifier():
    prediction=0
    predictionAccuracy = 0
    if request.method == 'POST':
        postData = request.get_json()
        model = pickle.load(open('logisticRiskModel.pkl','rb'))
        user_input = postData.get('riskdetail')
        print("user_input ",user_input)
        data_series = pandas.Series(user_input)
        prediction = model.predict(data_series)
        print("prediction ",prediction)
        accuracy = model.predict_proba(data_series)
        print("accuracy ",accuracy)
        predictionAccuracy = max(accuracy[0]) * 100
    return {
        "prediction": prediction,
         "accuracy": predictionAccuracy
    }

@app.route("/naive",methods=['GET', 'POST'])
@cross_origin()
def kmean_riskClassifier():
    prediction=0
    predictionAccuracy = 0
    if request.method == 'POST':
        postData = request.get_json()
        model = pickle.load(open('naivebayesRiskModel.pkl','rb'))
        user_input = postData.get('riskdetail')
        print("user_input ",user_input)
        data_series = pandas.Series(user_input)
        prediction = model.predict(data_series)
        print("prediction ",prediction)
        accuracy = model.predict_proba(data_series)
        print("accuracy ",accuracy)
        predictionAccuracy = max(accuracy[0]) * 100
    return {
        "prediction": prediction,
         "accuracy": predictionAccuracy
    }

@app.route("/svm",methods=['GET', 'POST'])
@cross_origin()
def svm_riskClassifier():
    prediction=0
    predictionAccuracy = 0
    if request.method == 'POST':
        postData = request.get_json()
        model = pickle.load(open('dummySVM.pkl','rb'))
        user_input = postData.get('riskdetail')
        print("user_input ",user_input)
        data_series = pandas.Series(user_input)
        prediction = model.predict(data_series)
        print("prediction ",prediction)
        accuracy = model.predict_proba(data_series)
        print("accuracy ",accuracy)
        predictionAccuracy = max(accuracy[0]) * 100
    return {
        "prediction": prediction,
         "accuracy": predictionAccuracy
    }


if __name__ == '__main__':
    app.run(debug=True)
