import "./App.css";
import axios from "axios";
import { useState } from "react";
import dotenv from "dotenv";

/*
Software Project Risk Classifier Body
*/
function App() {
  //To toggle tab
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [inputRisk, setInputRisk] = useState("");
  const [riskClass, setRiskClass] = useState([]);

  /*
    POST Input and GET Calculated Logistic Regression
  */
  const submitlogisticRisk = () => {
    var inputRiskValue = document.getElementById("logisRiskInputMessage").value;
    if (isNaN(inputRiskValue)) {
      try {
        axios
          .post(process.env.REACT_APP_LOGISTIC, {
            riskdetail: inputRisk,
          })
          .then((res) => res.data)
          .then((riskdetail) => {
            setRiskClass(riskdetail);
            console.log("Risk Here", riskdetail);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Number Not Accepted! Please input software risk deatils as string"
      );
      return false;
    }
  };

  /*
    POST Input and GET Calculated Naive Bayes
  */
  const submitNaiveRisk = () => {
    var inputRiskValue = document.getElementById("naiveRiskInputMessage").value;
    if (isNaN(inputRiskValue)) {
      try {
        axios
          .post(process.env.REACT_APP_NAIVE, {
            riskdetail: inputRisk,
          })
          .then((res) => res.data)
          .then((riskdetail) => {
            setRiskClass(riskdetail);
            console.log("Risk Here", riskdetail);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Number Not Accepted! Please input software risk deatils as string"
      );
      return false;
    }
  };

  /*
  Submit SVM Regression
  */
  const submitSVMRisk = () => {
    var inputRiskValue = document.getElementById("svmRiskInputMessage").value;
    if (isNaN(inputRiskValue)) {
      try {
        axios
          .post(process.env.REACT_APP_SVM, {
            riskdetail: inputRisk,
          })
          .then((res) => res.data)
          .then((riskdetail) => {
            setRiskClass(riskdetail);
            console.log("Risk Here", riskdetail);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Number Not Accepted! Please input software risk deatils as string"
      );
      return false;
    }
  };

  /*
  Calculate Risk Tab :: To calculate total risk
  */
  const [riskCalculator, setRiskCalculator] = useState();
  function calculateTotal() {
    var software = parseInt(document.getElementById("software").value);
    var cost = parseInt(document.getElementById("cost").value);
    var schedule = parseInt(document.getElementById("schedule").value);
    var plan = parseInt(document.getElementById("planning").value);
    var human = parseInt(document.getElementById("human").value);
    var resource = parseInt(document.getElementById("resources").value);
    setRiskCalculator(
      5 * software + 5 * cost + schedule + plan + human + resource
    );
  }

  return (
    <div className="App">
      <div className="tabsBlock">
        {/* Logistic Toggle */}
        <div
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Classify Risk: Logistic
        </div>
        {/* Naive Bayes Toggle*/}
        <div
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Classify Risk: K-mean
        </div>
        {/* SVM Toggle */}
        <div
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Classify Risk: SVM
        </div>
        {/* Total Risk Toggle*/}
        <div
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Calculate Risk
        </div>
      </div>

      {/* Logistic Regression Tab */}
      <div className="tabContent">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <h3>Logistic Regression Risk Classifier</h3>
          <div className="inputRisk">
            <div>
              <label htmlFor="imageFile" id="riskDetailsLogistic">
                Enter a Risk Details:{" "}
              </label>
              <input
                type="text"
                name="riskDetails"
                id="logisRiskInputMessage"
                placeholder="Enter Software Risk Details"
                onChange={(e) => setInputRisk(e.target.value)}
              />
            </div>
            <button onClick={submitlogisticRisk}>Predict</button>
            <hr></hr>
            <h4>
              Predicted Risk:<span>{riskClass.prediction}</span>
            </h4>
            <h4>
              Accuracy:<span>{riskClass.accuracy}</span>
            </h4>
          </div>
        </div>
      </div>

      {/* Naive Bayes Regression Tab */}
      <div className="tabContent secondTab">
        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <h3>Naive Bayes Risk Classifier</h3>
          <div className="inputRisk">
            <div>
              <label htmlFor="imageFile" id="riskDetailsNaive">
                Enter a Risk Details:{" "}
              </label>
              <input
                type="text"
                name="riskDetails"
                id="naiveRiskInputMessage"
                placeholder="Enter Software Risk Details"
                onChange={(e) => setInputRisk(e.target.value)}
              />
            </div>
            <button onClick={submitNaiveRisk}>Predict</button>
            <hr></hr>
            <h4>
              Predicted Risk:<span>{riskClass.prediction}</span>
            </h4>
            <h4>
              Accuracy:<span>{riskClass.accuracy}</span>
            </h4>
          </div>
        </div>
      </div>

      {/* SVM Tab */}
      <div className="tabContent thirdTab">
        <div
          className={toggleState === 3 ? "content active-content" : "content"}
        >
          <h3>SVM Risk Classifier</h3>
          <div className="inputRisk">
            <div>
              <label htmlFor="imageFile" id="riskDetailsSVM">
                Enter a Risk Details:{" "}
              </label>
              <input
                type="text"
                name="riskDetails"
                id="svmRiskInputMessage"
                placeholder="Enter Software Risk Details"
                onChange={(e) => setInputRisk(e.target.value)}
              />
            </div>
            <button onClick={submitSVMRisk}>Predict</button>
            <hr></hr>
            <h4>
              Predicted Risk:<span>{riskClass.prediction}</span>
            </h4>
            <h4>
              Accuracy:<span>{riskClass.accuracy}</span>
            </h4>
          </div>
        </div>
      </div>

      {/* Risk Calculator Tab */}
      <div className="tabContent fourthTab">
        <div
          className={toggleState === 4 ? "content active-content" : "content"}
        >
          <h3>Risk Calculation</h3>
          <div className="selectRiskWeights">
            <div className="firstRiskFactor riskFactor">
              <label htmlFor="software">Software:</label>
              <select name="software" id="software">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="secondRiskFactor riskFactor">
              <label htmlFor="cost">Cost:</label>
              <select name="cost" id="cost">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="thirdRiskFactor riskFactor">
              <label htmlFor="schedule">Schedule:</label>
              <select name="schedule" id="schedule">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="fourthRiskFactor riskFactor">
              <label htmlFor="planning">Planning & Control:</label>
              <select name="planning" id="planning">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="fifthRiskFactor riskFactor">
              <label htmlFor="human">Human:</label>
              <select name="human" id="human">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="sixthRiskFactor riskFactor">
              <label htmlFor="resources">Resource:</label>
              <select name="resources" id="resources">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="calculateRisk">
              <button id="calculateTotalRisk" onClick={calculateTotal}>
                Calculate Total Risk
              </button>
              <div className="totalRisk">
                Total Risk:
                <label>{riskCalculator}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
