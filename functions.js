
    var tpoAppObject = null;
    var appraisalCompany = "";
// Instantiate objects on window load (one-time event handling).
window.addEventListener("load", function () {
  elli.script.guest.create();
  elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
    this.tpoAppObject = tpoAppObject;
    GetUserData();
  });
});
// Subscribe to loanOpen event to refresh context when loan context changes (context event handling).
elli.script.subscribe('tpoApplication', 'loanOpen', onLoanOpened);
function onLoanOpened(proxy, loanData) {
}
// Sample methods for getting various data objects, just console logging for illustrative purposes.
function GetUserData() {
  // Get basic user info and console log only.
  tpoAppObject.getUserData().then(function (userData) {
    console.log('User Data ===', userData);
  })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  // Get full user profile, console log and populate some basic on screen information.
  tpoAppObject.getUserProfileData().then(function (userProfileData) {
    console.log('User Profile Data ===', userProfileData);
    console.log('FirstName ===', userProfileData.FirstName);
    if (typeof userProfileData.FirstName === 'undefined') {

    } else {
    }
  })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
    }
