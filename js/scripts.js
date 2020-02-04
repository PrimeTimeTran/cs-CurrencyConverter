function formatCurrency(type, value) {
  const formatter = new Intl.NumberFormat(type, {
    currency: type,
    style: "currency"
  });
  return formatter.format(value);
}

function updateResults(to, conversionRate) {
  const value = document.getElementById("inputValue").value;
  const convertedValue = conversionRate * value;
  const formattedCurrency = formatCurrency(to.toUpperCase(), convertedValue);
  document.getElementById("convertedValue").innerHTML = formattedCurrency;

  if (to === 'vnd') {
    changeCoin(convertedValue)
  }
}

function getConversion(from, to) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=9a02420c4a5e378f2215`
  );
  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const conversionRate = response[`${from}_${to}`];
      updateResults(to, conversionRate);
    } else {
      console.log("Failed request!")
      alert("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
}

const denominations = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000]

function changeCoin(money) {
  total = money 
  const bills = {}
  for(let i = 0; i <= denominations.length; i++) {
    if (denominations[i] > money) continue
    if (money >= denominations[i]) {
      const numberOfNotes = Math.floor(money / denominations[i])
      bills[denominations[i]] = numberOfNotes
      money -= denominations[i] * numberOfNotes
    }
  }
  let finalString = ''
  Object.keys(bills).map((key) => {
    finalString += `<li>${key} has ${bills[key]} notes</li>`
  })
  document.getElementById('total').innerHTML = total
  document.getElementById('denominations').innerHTML = finalString
  return bills
}