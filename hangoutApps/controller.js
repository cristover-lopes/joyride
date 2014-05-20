/*
 * controller for hangout app
 */

function showParticipants() {
  var participants = gapi.hangout.getParticipants();

  var retVal = '<p>Participants: </p><ul>';

  for (var index in participants) {
    var participant = participants[index];

    if (!participant.person) {
      retVal += '<li>A participant not running this app</li>';
    }
    retVal += '<li>' + participant.person.displayName + '</li>';
  }

  retVal += '</ul>';

  var div = document.getElementById('participantsDiv');

  div.innerHTML = retVal;
}


function showStartData() {

  var startDataP = '<p>Data sent from app: ' + gapi.hangout.getStartData() +'</p>';
  var div = document.getElementById('startDataDiv');
  div.innerHTML = startDataP;
}



function init() {
  // When API is ready...                                                         
  gapi.hangout.onApiReady.add(
      function(eventObj) {
        if (eventObj.isApiReady) {
          
          //load participants into DOM
          showParticipants(); 
          showStartData();
                }
      });
}

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
