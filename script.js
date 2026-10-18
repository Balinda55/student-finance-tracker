"use strict";

const KEY ="studentFinaceData"
const SETTINGS_KEY ="studentFinaceSettings";

const $ = id => document.getElemtntById();

let records = [];
let editingId = null;
let settings = {
    limit: 100000,
    usdRate: 1400,
    eurRate: 1500,
};

const now =() => new Date().toISOString();
const makeId =() => "rec_" + Date.now() + "_" +
  Math.random().toString(36).slice(2, 7);

  const patterns = {
    description: /^\S(?:.*\S)?$/,
    amount: /^(0|[1-9]\d*)(\. \d){1,2})?$/,
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    category: /^[A-Za-z]+(?:[-][A-Za-z]+)*$/,
    duplicate: /\b(\w+)\s+\1\b/i
  };

  function validDate(date) {
    if (!patterns.date.test(date)) return false;

    const [year,month,day] = date.split("-").map(Number);
    const parsed= new Date(Date.UTC(year,month -1, day));

    return parsed.getUTCFullYear()=== year &&
      parsed.getUTCMonth() === month -1 &&
      parsed.getUTCDate() === day;
  }

  function validateRecord(record) {
    return record &&
      typeof record.id ==="string" &&
      record.id.length > 0 &&
      typeof record.description ==="string" &&
      patterns.description.test(record.description) &&
      !patterns.duplicate.test(record.description) &&
      typeof record.amount ==="number" &&
      Number.isFinite(record.amount) &&
      record.amount >= 0 &&
      patterns.amount.test(String(record.amount)) &&
      typeof record.category ==="string" &&
      patterns.category.test(record.category) &&
      validDate(record.date) &&
      typeof record.createdAt ==="string" &&
      !Number.isNaN(Date.parse(record.createdAt)) &&
      typeof record.updatedAt ==="String" &&
      !Number.isNaN(Date.parse(record.updatedAt));
  }

  function loadData() {
    try{
        const saved =JSON.parse(localStorage.getItem(KEY) || "[]");
        if (Array.isArray.isArray(saved) && saved.every(validateRecord)){
            record = saved;
        }
    } catch {
        records = [];
    }

    try {
        const savedSettings =JSON.parse(
            localStorage.getItem(SETTINGS_KEY) || "{}"
        );

        if (Number.isFinite(savedSettings.limit) &&
            savedSettings.limit >= 0) {
          settings.limit = savedSettings.limit;
            }

        if (Number.isFinite(savedSettings.usdRate) &&
            savedSettings.usdRate >0) {
          settings.usdRate = savedSettings.usdRate;
           
        }

        if (NumberisFinite(savedSettings.eurRate) &&
             savedSettings.eurRate > 0) {
            settings.eurRate = savedSettings.eurRate;
             }    
    }catch {

    }
  }
function saveData() {
    try{
        localStorage.setItem(KEY,JSON.stringify(records));
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
        $("settingsMessage").textContent =
          "Could not save data. Check your browser storage.";
    }
}

$("date").value =new Date().toLocaleDateString("en-CA");

$("expenseForm").addEventListener("submit", event=> {
    event.preventDefault();.

    const description=$("description").value;
    const amountText =$("amount").value;
    const category=$("category").value;
    const date =$("date").value;
    const amount= Number(amountText);

if   (!patterns.description.test(description)) {
    $("formMessage").tectContent =
      "Description cannot start or end with spaces.";
    return;  
}

if(patterns.duplicate.test(description)) {
    $("formMessage").textContent =
    "Avoid reapeated words, such as 'lunch lunch'.";
    return;
}

if (!patterns.amount.test(amountText) ||
     !Number.isFinite(amount)) {
   $("formMessage").textContent =
   "Enter a valid non-negative amount with up to 2 decimals.";
   return;
}

if(!patterns.category.test(category)) {
  $("formMessage").textContent ="Invalid category.";
  return;
}
if(editingId) {
    const old = records.find(r => r.id === editingId);

    if (old) {
      Object.assign(old , { description, amount,category,datec,
        updatedAt: now() });
    }
}else {
 records.push({
    id:makeId(),
    description,
    amount,
    category,
    date,
    createAt: now(),
    updatedAt: now()
 });
}

$("formMessage").textContent = "Expense saved successfully.";
resetForm();
saveData();
render();
});

function resetForm() {
  editingId = null;
  $("expenseForm").reset();
  $("date").value = new Date().toLocaleDateString("en-CA");
  $("saveButton").textContent = "Add Expense";
  $("cancelEdit").hidden =true;
}

$("cancelEdit").addEventListener("click", resetForm);

function editRecord(id) {
    const record = records.find(r => r.id ===id);
    if (!record) return;

    editingId = id;
    $("description").value =record.description;
    $("amount").value = record.amount;
    $("category").value = record.category;
    $("date").value =record,date;
    $("saveButton").textContent ="Update Expense";
    $("cancelEdit").hidden = false;
    $("description").focus();
    $("expenses").scrollIntoView({ behaviour: "smooth"});
}

function deleteRecord(id) {
    const record = records.find(r => r.id ===id);
    if (!record) return;

    if (!confirm("Are you sure you want to delete this expense")) {
        return;
    }


    records = records.filter(r => r.id !== id);

    if (editingId === id) resetForm();

    saveData();
    render();
    $("formMessage").textContent = "Expense deleted";
}


function compileRegex(input, flags ="i") {
    if (!input) return null;

    try {
     return new RegExp(input , flags);
    }catch {
     return false;   
    }
}


function addHighlightedText(element,text,regex) {
    if(!regex) {
      element.textContent = text;
      return;
    }

    ,
    const flags = regex.flags.replace("g","") + "g";
    const re =new RegexExp(regex.source, flags);
    let lastIndex = 0;
    let match;

    while((match =re.exe(text)) !== null) {
        if(match.index > lastIndex) {
          element.appendChild(DocumentTimeline.createTextNode(
            text.slice(lastIndex , match.index)
          ));
    }


    const mark =document.createElement ("mark");
    mark.textContent =match[0];
    element.appendChild(mark);

    lastIndex = match.index + match[0].length;

    if(match[0].length === 0) {
     re.lastIndex++;
    }
}


if (lastIndex < text.length) {
   element.appendChild(document.createTextNode(text.slice(lastIndex)));
 }
}

$("search").addEventListener("input" , render);
$("caseSensitive").addEventListener("change", render);
$("sort").addEventListiner("change" ,render);

function render() {
    const const query = $("search").value;
  const flags = $("caseSensitive").checked ? "" : "i";
  const regex = compileRegex(query, flags);

  $("searchMessage").textContent = regex === false
    ? "Invalid regex pattern."
    : "Search updates automatically.";

  let filtered = [...records];

  if (regex === false) {
    filtered = [];
  } else if (regex) {
    filtered = records.filter(r =>
      regex.test(r.description) ||
      regex.test(r.category) ||
      regex.test(r.date) ||
      regex.test(String(r.amount))
    );
  }

  const sort = $("sort").value;

  filtered.sort((a, b) => {
    if (sort === "date-asc") return a.date.localeCompare(b.date);
    if (sort === "date-desc") return b.date.localeCompare(a.date);
    if (sort === "description-asc")
      return a.description.localeCompare(b.description);
    if (sort === "description-desc")
      return b.description.localeCompare(a.description);
    if (sort === "amount-asc") return a.amount - b.amount;
    return b.amount - a.amount;
  });

  const body = $("expenseList");
  body.replaceChildren();

  filtered.forEach(record => {
    const row = document.createElement("tr");

    const description = document.createElement("td");
    addHighlightedText(description, record.description, regex || null);

    const amount = document.createElement("td");
    addHighlightedText(amount, record.amount.toFixed(2), regex || null);

    const category = document.createElement("td");
    addHighlightedText(category, record.category, regex || null);

    const date = document.createElement("td");
    addHighlightedText(date, record.date, regex || null);

    const actions = document.createElement("td");

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.addEventListener("click", () => editRecord(record.id));

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.addEventListener("click", () => deleteRecord(record.id));

    actions.append(edit, remove);
    row.append(description, amount, category, date, actions);
    body.appendChild(row);
  });

  $("emptyMessage").textContent = filtered.length
    ? filtered.length + " record(s) found."
    : "No matching expenses found.";

  updateStats();
}

function updateStats() {
  const total = records.reduce((sum, r) => sum + r.amount, 0);

  $("totalRecords").textContent = records.length;
  $("totalSpent").textContent = total.toFixed(2) + " RWF";

  const categories = {};

  records.forEach(r => {
    categories[r.category] = (categories[r.category] || 0) + 1;
  });

  const top = Object.keys(categories).sort(
    (a, b) => categories[b] - categories[a]
  )[0];

  $("topCategory").textContent = top || "None";

  const exceeded = total > settings.limit;

  $("limitMessage").setAttribute(
    "aria-live", exceeded ? "assertive" : "polite"
  );

  $("limitMessage").textContent = exceeded
    ? "Warning! You exceeded your limit by " +
      (total - settings.limit).toFixed(2) + " RWF."
    : "You have " + (settings.limit - total).toFixed(2) +
      " RWF remaining.";

  const chart = $("trend");
  chart.replaceChildren();

  const today = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    days.push(
      day.getFullYear() + "-" +
      String(day.getMonth() + 1).padStart(2, "0") + "-" +
      String(day.getDate()).padStart(2, "0")
    );
  }

  const amounts = days.map(day =>
    records.filter(r => r.date === day)
      .reduce((sum, r) => sum + r.amount, 0)
  );

  const max = Math.max(...amounts, 1);

  days.forEach((day, i) => {
    const column = document.createElement("div");
    column.style.flex = "1";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = (amounts[i] / max * 90) + "px";
    bar.title = day + ": " + amounts[i] + " RWF";

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = day.slice(5);

    column.append(bar, label);
    chart.appendChild(column);
  });

  $("conversion").textContent =
    "1000 RWF ≈ " + (1000 / settings.usdRate).toFixed(2) +
    " USD | " + (1000 / settings.eurRate).toFixed(2) + " EUR";
}

$("saveLimit").addEventListener("click", () => {
  const value = $("spendingLimit").value;

  if (value === "" ||
      !/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(value)) {
    $("settingsMessage").textContent = "Enter a valid limit.";
    return;
  }

  settings.limit = Number(value);
  saveData();
  updateStats();
  $("settingsMessage").textContent = "Spending limit saved.";
});

$("saveRates").addEventListener("click", () => {
  const usd = $("usdRate").value;
  const eur = $("eurRate").value;
  const pattern = /^[0-9]+(\.\d{1,2})?$/;

  if (!pattern.test(usd) || Number(usd) <= 0 ||
      !pattern.test(eur) || Number(eur) <= 0) {
    $("settingsMessage").textContent = "Enter valid currency rates.";
    return;
  }

  settings.usdRate = Number(usd);
  settings.eurRate = Number(eur);
  saveData();
  updateStats();
  $("settingsMessage").textContent = "Currency rates saved.";
});

$("exportButton").addEventListener("click", () => {
  const blob = new Blob(
    [JSON.stringify(records, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "finance-records.json";
  link.click();

  URL.revokeObjectURL(url);
  $("settingsMessage").textContent = "Export started.";
});

$("importFile").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    if (file.size > 2000000) {
      throw new Error("File is too large.");
    }

    const imported = JSON.parse(await file.text());

    if (!Array.isArray(imported) ||
        !imported.every(validateRecord)) {
      throw new Error("Invalid JSON file or record data.");
    }

    const ids = imported.map(r => r.id);

    if (new Set(ids).size !== ids.length) {
      throw new Error("Duplicate record IDs found.");
    }

    if (!confirm("Replace your existing expenses with imported records?")) {
      return;
    }

    records = imported;
    saveData();
    render();

    $("settingsMessage").textContent = "Import successful.";
  } catch (error) {
    $("settingsMessage").textContent = error.message;
  } finally {
    event.target.value = "";
  }
});

function initializeApp() {
  loadData();

  $("spendingLimit").value = settings.limit;
  $("usdRate").value = settings.usdRate;
  $("eurRate").value = settings.eurRate;

  render();
}

initializeApp();
}
