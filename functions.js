window.addEventListener("load", function () {
  elli.script.guest.create();
  elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
    this.tpoAppObject = tpoAppObject;
  });
});

elli.script.subscribe('tpoApplication', 'loanOpen', onLoanOpened);
async function onLoanOpened(proxy, loanData) {
  const loanObj = elli.script.getObject('loan');
  console.log(loanObj);
}
