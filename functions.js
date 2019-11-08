        var tpoAppObject = null;
        var appraisalCompany = "";
        var loanObj = {};
    // Instantiate objects on window load (one-time event handling).
    window.addEventListener("load", function () {
      elli.script.guest.create();
      elli.script.getObject("tpoApplication").then(function (tpoAppObject) {
        this.tpoAppObject = tpoAppObject;
        $("div#processing").show();
        GetUserData();
        $("div#processing").hide();

		    // This call will only succeed on page load event if user already has opened a loan in TPOC.
		    // Use the onLoanOpened event (as shown below) to get/refresh loan data when user opens a loan.
          GetLoanData();
          //GetAuthData();
      });
    });
    // Subscribe to loanOpen event to refresh context when loan context changes (context event handling).
     elli.script.subscribe('tpoApplication', 'loanOpen', onLoanOpened);
     function onLoanOpened(proxy, loanData) {
       $("div#processing").show();
       GetLoanData();
       $("div#loanAvailable").show();
       $("div#loanNotAvailable").hide();
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

    function GetLoanData() {
      // Get loan summary and console log only.
      // tpoAppObject.getLoanSummary().then(function (loanSummary) {
      //   console.log('Loan Summary ===', loanSummary);
      // })
      //   .catch(function (err) {
      //     console.log('Fetch Error :-S', err);
      //   });
      // Get full loan object, console log and populate some basic on screen information.
      tpoAppObject.getLoanData().then(function (loanData) {
          console.log('Loan Data ===', loanData);
          appraisalCompany = loanData.UnderwriterSummary.OriginalAppraiser;
	      var fundingFeeList = loanData.FundingFeeList;
	      console.log(fundingFeeList);
	      //Finding 801a or field 1621
	      if(fundingFeeList.includes("801a."))
	      {
		      var begIndex = fundingFeeList.indexOf("801a.");
		      var lastIndex = fundingFeeList.length-1;
		      var shortenedList = fundingFeeList.substring(begIndex,lastIndex);
		      var endIndex = 0;
		      if(shortenedList.indexOf("\n") == -1){
			      console.log("No return character");
		      }
		      else {
			      endIndex = shortenedList.indexOf("\n");
			      var substring = shortenedList.substring(begIndex,endIndex);
			      console.log(substring);
		      }
	      }
	      
	      if(fundingFeeList.includes("1102h."))
	      {
		      var begIndex = fundingFeeList.indexOf("1102h.");
		      var lastIndex = fundingFeeList.length-1;
		      var otherShortenedList = fundingFeeList.substring(begIndex,lastIndex);
		      var endIndex = 0;
		      if(otherShortenedList.indexOf("\n") == -1){
			      console.log("No return character");
		      }
		      else {
			      endIndex = otherShortenedList.indexOf("\n");
			      var substring = otherShortenedList.substring(begIndex,endIndex);
			      console.log(substring);
		      }
	      }
	      
		  
        if (typeof loanData.LoanNumber === 'undefined') {
          $('#loanNotAvailable').show();
          $('#loanAvailable').hide();
        } else {
          $('#loanNotAvailable').hide();
          $('#loanAvailable').show();
          // Get a few property address level fields for illustrative purposes.
            $('#loanNumber').html(loanData.LoanNumber);
            $('#loanGUID').html(loanData.EncompassId);
            //console.log('UnderWriterSummary ===',loanData.UnderwriterSummary);
          $('#propertyStreet').html(loanData.Property.StreetAddress);
          $('#propertyCity').html(loanData.Property.City);
          $('#propertyState').html(loanData.Property.State);
          $('#propertyZip').html(loanData.Property.PostalCode);
          $('#appriaser').html(loanData.UnderwriterSummary.OriginalAppraiser);
          $('#processing').hide();
            $('#results').show();
        }
      })
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
    }

    function GetAuthData() {
      let authData = elli.script.getObject("auth");
      console.log(authData);
    }
