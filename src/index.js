var size = 5;
var ruudut = [];
var score;
var EMPTY = "&nbsp;";
var vuoro = "X";
var liikkeet;

function drawboard() {
  var poyta = document.createElement("table");
  poyta.setAttribute("border", 1);
  poyta.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < size; i++) {
    var rivi = document.createElement("tr");
    poyta.appendChild(rivi);
    for (var j = 0; j < size; j++) {
      var ruutu = document.createElement("td");
      ruutu.setAttribute("height", 100);
      ruutu.setAttribute("width", 100);
      ruutu.setAttribute("align", "center");
      ruutu.setAttribute("valign", "center");
      ruutu.classList.add("col" + j, "row" + i);
      if (i === j) {
        ruutu.classList.add("diagonal0");
      }
      if (j === size - i - 1) {
        ruutu.classList.add("diagonal1");
      }
      ruutu.identifier = identifier;
      ruutu.addEventListener("click", set);
      rivi.appendChild(ruutu);
      ruudut.push(ruutu);
      identifier += identifier;
    }
  }
  document.getElementById("board").appendChild(poyta);
  aloitaUusiPeli();
}

function aloitaUusiPeli() {
  score = {
    X: 0,
    O: 0
  };
  liikkeet = 0;
  vuoro = "X";
  ruudut.forEach(function(square) {
    square.innerHTML = EMPTY;
  });
}

function voitto(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#board " + testClass, vuoro);
    console.log(items.length);
    if (items.length === size) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = vuoro;
  liikkeet += 1;
  score[vuoro] += this.identifier;
  if (voitto(this)) {
    alert("Player " + vuoro + " won!");
    aloitaUusiPeli();
  } else if (liikkeet === size * size) {
    alert("Tasapeli!");
    aloitaUusiPeli();
  } else {
    vuoro = vuoro === "X" ? "O" : "X";
    document.getElementById("vuoro").textContent = "Pelaaja " + vuoro;
  }
}

drawboard();

/*

Lähde: Vasanth Krishnamoorthy
https://codepen.io/vasanthkay/pen/KVzYzG

*/
