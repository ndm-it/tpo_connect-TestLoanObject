var tpoAppObject = null;
var appraisalCompany = "";
var loanObj = {};
window.addEventListener("load", function () {
elli.script.guest.create();
elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
this.tpoAppObject = tpoAppObject;
//GetUserData();
// This call will only succeed on page load event if user already has opened a loan in TPOC.
// Use the onLoanOpened event (as shown below) to get/refresh loan data when user opens a loan.
  GetLoanData();
  GetUserData();
  GetUserProfileData();
  GetExternalOrgDetails();
});
});

//elli.script.subscribe('tpoApplication', 'loanOpen', onLoanOpened);
//function onLoanOpened(proxy, loanData) {
//GetLoanData();
//this.loanData = loanData;
//console.log('loanOpen => loanData ===', loanData);
//}

function GetUserData() {
  tpoAppObject.getUserData().then(function(userSummary) { 
  console.log('User data ===', userSummary); 
});
}

function GetUserProfileData() {
 tpoAppObject.getUserProfileData().then(function(userProfile) {
  console.log('User profile data ===', userProfile); 
}); 
}

function GetExternalOrgDetails(){
 tpoAppObject.getExternalOrgDetails().then(function(externalOrgData) {
      console.log('External Org data ===', externalOrgData);
}); 
}


function GetLoanData() {

tpoAppObject.getLoanData().then(function (loanData) {
  console.log('Loan Data ===', loanData);
  console.log('Inside get loan data function');
})
.catch(function (err) {
  console.log('Fetch Error :-S', err);
});
}
