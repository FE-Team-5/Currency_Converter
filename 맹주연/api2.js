const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

// API에서 환율 정보 가져오기
//

const getCurrency = async () => {
  const url = `https://open.exchangerate-api.com/v6/latest`;
  const res = await fetch(url);
  const list = await res.json();
  return list.rates;
};

const loadOptions = async () => {
  const optionList = await getCurrency();

  for (let option in optionList) {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
  }
};
