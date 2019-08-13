    var tpoAppObject = null;
    var appraisalCompany = "";
// Instantiate objects on window load (one-time event handling).
window.addEventListener("load", function () {
  elli.script.guest.create();
  elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
    this.tpoAppObject = tpoAppObject;
    GetUserData();
    // This call will only succeed on page load event if user already has opened a loan in TPOC.
    // Use the onLoanOpened event (as shown below) to get/refresh loan data when user opens a loan.
      GetLoanData();
      //myFunction();
  });
});
// Subscribe to loanOpen event to refresh context when loan context changes (context event handling).
elli.script.subscribe('tpoApplication', 'loanOpen', onLoanOpened);
function onLoanOpened(proxy, loanData) {
  GetLoanData();
  $("div#loanAvailable").show();
  $("div#loanNotAvailable").hide();
  $("div#processing").show();
  this.loanData = loanData;
  console.log('loanOpen => loanData ===', loanData);
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
      $('#userNotAvailable').show();
      $('#userAvailable').hide();
    } else {
      $('#userNotAvailable').hide();
      $('#userAvailable').show();
        // Get a few fields for illustrative purposes.
        $('#userName').html(userProfileData.FirstName + ' ' + userProfileData.LastName);
      $('#userEmail').html(userProfileData.Email);
      $('#userOrgId').html(userProfileData.ExternalOrgID);
      $('#userId').html(userProfileData.ExternalUserID);
    }
  })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
    }


    function myFunction(appraisalName) {
        if (appraisalName) {
            if (appraisalName.includes('Act Appraisal')) {
                window.open('https://www.actappraisal.com/#act-login', '_blank');
            }
            else if (appraisalName.includes('AMC Appraisal Management Company, LLC')) {
                window.open('https://amc.myvalutrac.com/auth/login.aspx', '_blank');
            }
            else if (appraisalName.includes('Appraisal Links')) {
                window.open('https://appraisallinks.appraisalscope.com', '_blank');
            }
            else if (appraisalName.includes('Appraisal Valet, Inc.')) {
                window.open('http://www.appraisalvalet.net', '_blank');
            }
            else if (appraisalName.includes('AppraiserVendor.com, LLC')) {
                window.open('https://www.appraiservendor.com/', '_blank');
            }
            else if (appraisalName.includes('Axis Appraisal Management Solutions')) {
                window.open('https://www.axis-amc.com', '_blank');
            }
            else if (appraisalName.includes('Caliber AMC')) {
                window.open('http://caliberamc.com', '_blank');
            }
            else if (appraisalName.includes('Class Appraisal')) {
                window.open('https://www.classvaluation.com', '_blank');
            }
            else if (appraisalName.includes('Class Valuation')) {
                window.open('https://www.classvaluation.com', '_blank');
            }
            else if (appraisalName.includes('Clear Capital Valuations')) {
                window.open('https://www.clearcapital.com', '_blank');
            }
            else if (appraisalName.includes('Effort Appraisal Group')) {
                window.open('http://www.effortappraisalmanagement.com/', '_blank');
            }
            else if (appraisalName.includes('Equity Solutions USA, Inc')) {
                window.open('https://esusa.appraisalscope.com/', '_blank');
            }
            else if (appraisalName.includes('First Choice Appraisal Management Inc')) {
                window.open('http://www.firstchoiceamc.com', '_blank');
            }
            else if (appraisalName.includes('Golden State AMC')) {
                window.open('https://goldstate.appraisalscope.com', '_blank');
            }
            else if (appraisalName.includes('Got Appraisals')) {
                window.open('https://www.gotappraisals.com', '_blank');
            }
            else if (appraisalName.includes('HVCC Appraisal Ordering')) {
                window.open('http://www.hvccappraisalordering.com', '_blank');
            }
            else if (appraisalName.includes('Land Gorilla')) {
                window.open('http://landgorilla.com', '_blank');
            }
            else if (appraisalName.includes('LCI Appraisal Management')) {
                window.open('http://www.lci-network.com', '_blank');
            }
            else if (appraisalName.includes('Lender\'s Valuation Services')) {
                window.open('http://www.lvs-amc.com', '_blank');
            }
            else if (appraisalName.includes('Nationwide Property & Appraisal Services')) {
                window.open('https://onestopappraisals.appraisalscope.com', '_blank');
            }
            else if (appraisalName.includes('Priority Appraisal USA')) {
                window.open('', '_blank');
            }
            else if (appraisalName.includes('Settlement One Valuation (Port Retention Only)')) {
                window.open('', '_blank');
            }
            else if (appraisalName.includes('So Cal Direct')) {
                window.open('https://socaldirect.myvalutrac.com', '_blank');
            }
        }
        else {
            console.log('No appraisal company assigned');
        }
    }

function GetLoanData() {
  // Get loan summary and console log only.
  tpoAppObject.getLoanSummary().then(function (loanSummary) {
    console.log('Loan Summary ===', loanSummary);
  })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  // Get full loan object, console log and populate some basic on screen information.
  tpoAppObject.getLoanData().then(function (loanData) {
      console.log('Loan Data ===', loanData);
      appraisalCompany = loanData.UnderwriterSummary.OriginalAppraiser;
    if (typeof loanData.LoanNumber === 'undefined') {
      $('#loanNotAvailable').show();
      $('#loanAvailable').hide();
    } else {
      $('#loanNotAvailable').hide();
      $('#loanAvailable').show();
      // Get a few property address level fields for illustrative purposes.
        $('#loanNumber').html(loanData.LoanNumber);
        $('#loanGUID').html(loanData.EncompassId);
        console.log(loanData.UnderwriterSummary);
      $('#propertyStreet').html(loanData.Property.StreetAddress);
      $('#propertyCity').html(loanData.Property.City);
      $('#propertyState').html(loanData.Property.State);
      $('#propertyZip').html(loanData.Property.PostalCode);
      $('#appriaser').html(loanData.UnderwriterSummary.OriginalAppraiser);
      $('#processing').hide();
        $('#results').show();
        myFunction(appraisalCompany);

    }
  })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

function buttonFunction()
{
  myFunction(appraisalCompany);
}
