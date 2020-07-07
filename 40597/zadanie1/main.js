function podśwKol(x,tab=tabela) {
    for(let wiersz of tab.querySelector("tbody").children) {
        wiersz.children[x].classList.toggle("podświetl");
    }
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableBody");
  switching = true;

  while (switching) {

    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 2); i++) {

      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (Number(x.innerHTML) > Number(y.innerHTML)) {

        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      switchcount ++;
    }
  }
}
function rosnPo(klucz) {
  return function (L,P) {
      return L[klucz]-P[klucz];
  }
}



 class city {
   constructor(nazwa, wojewodztwo, populacja, powierzchnia){
     this.nazwa = nazwa;
     this.wojewodztwo = wojewodztwo;
     this.populacja = populacja;
     this.powierzchnia = powierzchnia;
   }
   gestosc() {
     return this.populacja/this.powierzchnia;
   }

   tableHandler() {
     let verse = "<tr>"
     for(let klucz in this){
       verse += "<td>"
       verse += this[klucz];
       verse += "</td>"
     }
     verse += "<td>";
     verse += this.gestosc().toFixed(2);
     verse += "</td>";
     verse += "</tr>";
		return verse;
   }
   static rosGest(L,P) {
    return L.gestosc()-P.gestosc();
 }
 static malGest(L,P) {
  return P.gestosc()-L.gestosc();
}
}

 var tabP = [
	new city("Gdańsk","pomorskie",470907,263.44),
	new city("Pruszcz Gdanski","pomorskie",26834,6.359),
	new city("Słupsk","pomorskie",90681,43.15),
	new city("Warszawa","mazowieckie",1708000, 199.7),
  new city("Wrocław","dolnośląskie",642869,292.82),
  new city("Rzeszow","podkarpackie",44209,48.88),
  new city("Legnica","dolnośląskie",99350,56.29),
  new city("Kraków","małopolskie",779115,326.86)
];

let LISTA = tabP
let listapow = tabP
let listges = tabP

function genTab(sposóbSort) {
  tabP.sort(sposóbSort);
  html = "";
  for(let wiersz of tabP) {
      html += wiersz.tableHandler();
  }
  tableBody.innerHTML = html;
}

function alfabetycznieNa(indeks) {
  return function (L,P) {
      return L[indeks].localeCompare(P[indeks]);
  }
}

function malPo(indeks) {
  return function (L,P) {
      return P[indeks]-L[indeks];
  }
}

function wojHandler(wojewodztwo) {
  return function (miasto) {
      return miasto["kontynent"].includes(wojewodztwo);
  }
}


function nazwaHandler() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("nazwa");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableBody");
  tr = table.getElementsByTagName("tr");
  LISTA = [ ]
  listapow = [ ]
  listges = [ ]
  for (i = 0; i < tr.length; i++) {

    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        LISTA.push(parseInt(tr[i].cells[2].innerHTML))
        listapow.push(parseFloat(tr[i].cells[3].innerHTML))
        listges.push(parseFloat(tr[i].cells[4].innerHTML))
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }

    }

  }

  res = 0
  console.log(LISTA)
  for(var i = 0; i< LISTA.length; i++){
   res+= LISTA[i]
  }
  for(var i = 0; i< LISTA.length; i++){
    res+= LISTA[i]
   }
  document.getElementById('test').innerHTML = (res/LISTA.length).toFixed(2)

  qe = 0
  for(var i = 0; i< listapow.length; i++){
    qe += listapow[i]
    console.log(listapow[i])
   }
   document.getElementById('poww').innerHTML = (qe/listapow.length).toFixed(2)

   ge = 0
  for(var i = 0; i< listges.length; i++){
    ge += listges[i]
    console.log(listges[i])
   }
   document.getElementById('gee').innerHTML = (ge/listges.length).toFixed(2)

}



function wojewHandler() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("wojew");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableBody");
  tr = table.getElementsByTagName("tr");
  LISTA = [ ]
  listapow = [ ]
  listges = [ ]
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        LISTA.push(parseInt(tr[i].cells[2].innerHTML))
        listapow.push(parseFloat(tr[i].cells[3].innerHTML))
        listges.push(parseFloat(tr[i].cells[4].innerHTML))
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }

  }
  res = 0
  console.log(LISTA)
  for(var i = 0; i< LISTA.length; i++){
   res+= LISTA[i]
  }
  for(var i = 0; i< LISTA.length; i++){
    res+= LISTA[i]
   }
  document.getElementById('test').innerHTML = (res/LISTA.length).toFixed(2)

  qe = 0
  for(var i = 0; i< listapow.length; i++){
    qe += listapow[i]
    console.log(listapow[i])
   }
   document.getElementById('poww').innerHTML = (qe/listapow.length).toFixed(2)

   ge = 0
  for(var i = 0; i< listges.length; i++){
    ge += listges[i]
    console.log(listges[i])
   }
   document.getElementById('gee').innerHTML = (ge/listges.length).toFixed(2)

}

function srednia(tablica) {
	return suma(tablica)/tablica.length;
}

function suma(tablica) {
	let S = 0;
	for(let el of tablica) {
		S += el;
	}
	return S;
}
function popHandler(tdid){
  let result = tabP.map(a => a.populacja);
  document.getElementById(tdid).innerHTML = srednia(result).toFixed(2)
}

function powHandler(tdid){
  let result = tabP.map(a => a.powierzchnia);
  document.getElementById(tdid).innerHTML = srednia(result).toFixed(2)
}

function gesHandler(tdid){
  let result = tabP.map(a => a.gestosc());
  document.getElementById(tdid).innerHTML = srednia(result).toFixed(2)
}


function selectHandler() {
  let selectValue = document.getElementById("selID");
  var filter, table, tr, td, i, txtValue;

  filter = selectValue.value.toUpperCase();
  table = document.getElementById("tableBody");
  tr = table.getElementsByTagName("tr");
  LISTA = [ ]
  listapow = [ ]
  listges = [ ]
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        LISTA.push(parseInt(tr[i].cells[2].innerHTML))
        listapow.push(parseFloat(tr[i].cells[3].innerHTML))
        listges.push(parseFloat(tr[i].cells[4].innerHTML))
        tr[i].style.display = "";

      } else {
        tr[i].style.display = "none";
      }
    }
  }
  res = 0.0
  console.log(LISTA)
  for(var i = 0; i< LISTA.length; i++){
   res+= LISTA[i]
  }
  document.getElementById('test').innerHTML = (res/LISTA.length).toFixed(2)

  qe = 0
  for(var i = 0; i< listapow.length; i++){
    qe += listapow[i]
    console.log(listapow[i])
   }
   document.getElementById('poww').innerHTML = (qe/listapow.length).toFixed(2)

   ge = 0
  for(var i = 0; i< listges.length; i++){
    ge += listges[i]
    console.log(listges[i])
   }
   document.getElementById('gee').innerHTML = (ge/listges.length).toFixed(2)


}
function filtrValues (tdid, list){
  let result = list.map(a => a.populacja);
  document.getElementById(tdid).innerHTML = srednia(result).toFixed(2)

}
function powfiltr (tdid){
  let result = listapow.map(a => a.powierzchnia);
  document.getElementById(tdid).innerHTML = srednia(result).toFixed(2)

}

function gesfiltr (tdid) {
  let result = listges.map(a => a.gestosc());
  document.getElementById(tdid).innerHTML = srednia(result).toFixed(2)
}
