const arr = data;
const allTables = document.querySelectorAll("table");
const htmlEntities = function(str) { return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
const head = document.getElementById("outputHead");
let HTMLStr = `<tr><th>Index</th>`;
Object.keys(arr[0]).forEach((ky, index) => { HTMLStr += `<th>${ky}</th>`; });
HTMLStr += `</tr>`;
head.innerHTML += HTMLStr;
const body = document.getElementById("outputBody");
arr.forEach((vio, index) => { let HTMLStrBody = ``;
    HTMLStrBody += `<tr><td>${index}</td>`; for (const [key, value] of Object.entries(vio)) { HTMLStrBody += `<td>${key==='url' ? `<a target="_blank" href="${value}">`:``}${key==='extract' ? `<code>`:``}${htmlEntities(value).replace('http://humber.ca/makingaccessiblemedia', '')}${key==='url' ? `</a>`:``}${key==='extract' ? `</code>`:``}</td>`; } HTMLStrBody += `</tr>`;
    body.innerHTML += HTMLStrBody; });
for (let table of allTables) { const tBody = table.tBodies[0]; const rows = Array.from(tBody.rows); const headerCells = table.tHead.rows[0].cells; for (let th of headerCells) { const cellIndex = th.cellIndex;
        th.addEventListener("click", () => { rows.sort((tr1, tr2) => { const tr1Text = tr1.cells[cellIndex].textContent; const tr2Text = tr2.cells[cellIndex].textContent; return tr1Text.localeCompare(tr2Text); });
            tBody.append(...rows); }); } }