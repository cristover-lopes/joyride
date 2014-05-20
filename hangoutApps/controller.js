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


//print the message
function onMessageReceived(event){
  
  console.log(event.senderId + 'sent: ' + event.message);
  var list = document.getElementById('msgList');
  var listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode(list));
  list.appendChild(listItem);
}


// send intial help message
function sendHelpMsg(){
  
  var startData = gapi.hangout.getStartData();
  var userName = startData.PUSDERID;
  var studyName = startData.NAME;
  
  var msg = "My name is " + userName + ' and I need help with Study: ' + studyName '.';
  
   gapi.hangout.data.sendMessage(msg);
}

function init() {
  // When API is ready...                                                         
  gapi.hangout.onApiReady.add(
      function(eventObj) {
        if (eventObj.isApiReady) {
          
          gapi.hangout.data.onMessageReceived.add(onMessageReceived);
          //load participants into DOM
          showParticipants(); 
          sendHelpMsg();
                }
      });
}

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
