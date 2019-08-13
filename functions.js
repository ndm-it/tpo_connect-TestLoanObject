window.addEventListener("load", function () {
  elli.script.guest.create();
  elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
    this.tpoAppObject = tpoAppObject;
    console.log('referenced tpoAppObject');
  });
});

elli.script.subscribe('tpoApplication', 'loanOpen', onLoanOpened);
async function onLoanOpened(proxy, loanData) {
  console.log('before getting loan object');
  const loanObj = elli.script.getObject('loan');
  console.log('before logging loanObj');
  console.log(loanObj);
}
