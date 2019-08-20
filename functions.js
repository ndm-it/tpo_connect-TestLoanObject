var tpoAppObject = null;

window.addEventListener("load", function () {
  elli.script.guest.create();
  elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
    this.tpoAppObject = tpoAppObject;
    console.log('referenced tpoAppObject');
    console.log(tpoAppObject.getUserData());
    //displayEntireLoan();
  });
});

elli.script.subscribe('tpoApplication', 'loanOpen', displayEntireLoan);
async function displayEntireLoan() {

//async function displayEntireLoan() {
 // Retrieve the loan object by awaiting the result of the getObject() call
 //let loan = await elli.script.getObject("loan");
 tpoAppObject.getUserData().then(function (userData) {
   console.log('User Data ===', userData);
 })
   .catch(function (err) {
     console.log('Fetch Error :-S', err);
   });

   try {
     let loanAuth = elli.script.getObject("auth");
     //let loanObjectt = tpoAppObject.getObject("loan");
     console.log(loanAuth);
   }
   catch(err) {
     console.log("Could not retrieve auth object" + err);
   }
 // Retrieve the entire encompass loan using another await
 //let completeLoanObjectFromHost = await loan.all();
 //console.log('The entire loan object looks like: ' + completeLoanObjectFromHost);
}
// async function onLoanOpened(proxy, loanData) {
//   console.log('before getting loan object');
//   const loanObj = elli.script.getObject('loan');
//   console.log('before logging loanObj');
//   console.log(loanObj);
// }
