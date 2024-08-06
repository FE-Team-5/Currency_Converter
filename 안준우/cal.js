const $selectOne = document.querySelector("#currency-one");
const $selectTwo = document.querySelector("#currency-two");
const $inputOne = document.querySelector("#amount-one");
const $inputTwo = document.querySelector("#amount-two");
const $switchBtn = document.querySelector("#swap");

async function getCurreny() {
  const url = "https://open.exchangerate-api.com/v6/latest";
  const data = await fetch(url);
  return data.json();
}

async function init() {
  $selectOne.innerHTML = "";
  $selectTwo.innerHTML = "";
  const result = await getCurreny();
  const reates = result.rates;
  for (const rate in reates) {
    const $option = document.createElement("option");
    $option.value = rate;
    $option.innerText = rate;
    $option.dataset.rate = reates[rate];
    const $option2 = $option.cloneNode(true);
    $selectOne.appendChild($option);
    $selectTwo.appendChild($option2);
  }
  //default value
  $selectTwo.value = "KRW";
  updateCurrency();
}

function updateCurrency() {
  const $optionOne = $selectOne.options[$selectOne.selectedIndex];
  const $optionTwo = $selectTwo.options[$selectTwo.selectedIndex];
  $inputTwo.value = (
    ($inputOne.value / $optionOne.dataset.rate) *
    $optionTwo.dataset.rate
  ).toFixed(2);
  const $rateText = document.querySelector("#rateText");
  $rateText.innerHTML = `${$optionOne.dataset.rate} ${$selectOne.value} = ${$optionTwo.dataset.rate} ${$selectTwo.value}`;
}
function onSwitchClick() {
  const temp = $selectTwo.value;
  $selectTwo.value = $selectOne.value;
  $selectOne.value = temp;
  $inputOne.value = $inputTwo.value;
  updateCurrency();
}
function initEvnet() {
  $inputOne.addEventListener("input", updateCurrency);
  $selectOne.addEventListener("change", updateCurrency);
  $selectTwo.addEventListener("change", updateCurrency);
  $switchBtn.addEventListener("click", onSwitchClick);
}

init();
initEvnet();
