var tpoAppObject = null;
var appraisalCompany = "";
var loanObj = {};
window.addEventListener("load", function () {
elli.script.guest.create();
elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
this.tpoAppObject = tpoAppObject;
GetUserData();
// This call will only succeed on page load event if user already has opened a loan in TPOC.
// Use the onLoanOpened event (as shown below) to get/refresh loan data when user opens a loan.
  GetLoanData();
});
});

elli.script.subscribe('tpoApplication', 'loanOpen', onLoanOpened);
function onLoanOpened(proxy, loanData) {
$("div#processing").show();
GetLoanData();
$("div#loanAvailable").show();
$("div#loanNotAvailable").hide();
this.loanData = loanData;
console.log('loanOpen => loanData ===', loanData);
}

function GetLoanData() {

tpoAppObject.getLoanData().then(function (loanData) {
  console.log('Loan Data ===', loanData);
})
.catch(function (err) {
  console.log('Fetch Error :-S', err);
});
}
