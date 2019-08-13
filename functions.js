window.addEventListener("load", function () {
  elli.script.guest.create();
  elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
    this.tpoAppObject = tpoAppObject;
    console.log('referenced tpoAppObject');
    displayEntireLoan();
  });
});

elli.script.subscribe('tpoApplication', 'loanOpen', displayEntireLoan);

async function displayEntireLoan() {
 // Retrieve the loan object by awaiting the result of the getObject() call
 let loan = await elli.script.getObject("loan");

 // Retrieve the entire encompass loan using another await
 let completeLoanObjectFromHost = await loan.all();
 console.log('The entire loan object looks like: ' + completeLoanObjectFromHost);
}
// async function onLoanOpened(proxy, loanData) {
//   console.log('before getting loan object');
//   const loanObj = elli.script.getObject('loan');
//   console.log('before logging loanObj');
//   console.log(loanObj);
// }
