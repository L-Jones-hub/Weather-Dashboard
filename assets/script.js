var dateDisplayEl = $(`#results`);

function displayDate() {
  var today = moment().format(`MMM DD, YYYY`);
  dateDisplayEl.text(today);
}

displayDate();
