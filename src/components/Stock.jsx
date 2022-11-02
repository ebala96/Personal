import { useState, useEffect } from "react";

const Stock = () => {
  const [queryVal, setQueryVal] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const [isDataFetched, setDataFetched] = useState(false);
  const [displayData, setDisplayData] = useState({
    highValue: "",
    lowValue: ""
  });

  const urlDetails = {
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${queryVal}&apikey=H9IKZIMWIK3GSVRF`,
    high: "2. high",
    low: "3. low",
    dataKey: "Time Series (Daily)"
  };

  const onInputForQuery = (event) => {
    var regexPattern = /^[a-zA-Z_]+$/g;
    console.log(event.target.value);
    if (regexPattern.test(event.target.value)) {
      console.log("accepeted value");
      setButtonDisabled(false);
      console.log(isButtonDisabled);
      setQueryVal(event.target.value);
    } else {
      setButtonDisabled(true);
      console.log("not accpeted");
    }
  };

  const onGetData = () => {
    console.log(new Date().toISOString().slice(0, 10));
    const { url, high, low, dataKey } = urlDetails;
    console.log(url);

    fetch(url)
      .then((data) => data.json())
      .then((stockData) => {
        console.log(stockData);
        setDataFetched(true);
        var data = stockData[dataKey];
        var dailyDates = Object.keys(data);

        var today = dailyDates[0];
        console.log(stockData[dataKey][today][high]);

        setDisplayData({
          highValue: stockData[dataKey][today][high],
          lowValue: stockData[dataKey][today][low]
        });
      })
      .catch((error) => {
        setDataFetched(false);
        console.error(error);
      });
  };

  return (
    <div>
      <label htmlFor="apiInput"> Query Key</label>
      <input type="text" id="apiInput" onChange={onInputForQuery} />
      <div style={{ padding: 10 }}>
        <button type="button" onClick={onGetData} disabled={isButtonDisabled}>
          Get Data
        </button>
      </div>
      {isDataFetched ? (
        <p>
          HIGH Value: {displayData.highValue}
          <br />
          LOW Value: {displayData.lowValue}
        </p>
      ) : (
        <p>NO DATA FOUND</p>
      )}
    </div>
  );
};

export default Stock;
