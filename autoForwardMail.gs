function autoForwardMail() {
  // Define the developer flag
  var developerMode = false;  // Set this to false when you want the script to execute actions
  var archiveWhenDone = false; // Set this to true when you want the script to archive the thead after completing the actions, can be good to keep in the inbox, to visually inspect the action 

  // Replace these and enclose in ""
  var forwardingAddress = <forwarToThisAddress@example.com>
  var fromAddress = <myGmailAddress@example.com>
  var todoLabelName = <auto-forward/todo>
  var completedLabelName = <auto-forward/forward-complete> 
  
  // Define labels
  var todoLabel = GmailApp.getUserLabelByName(todoLabelName) ?? GmailApp.createLabel(todoLabelName);
  var forwardCompleteLabel = GmailApp.getUserLabelByName(completedLabelName) ?? GmailApp.createLabel(completedLabelName);

  if (developerMode) {
    // Log that the script was executed in developer mode
    Logger.log("-- Executing in Developer Mode. No real actions will be taken.");
  } else {
    Logger.log("-- Executing in Production Mode");
  }

  todoLabel.getThreads().forEach(function(thread) {
    Logger.log("\n" + "Thread: With first message subject '" + thread.getFirstMessageSubject() + "'");

    var messages = thread.getMessages();
    
    messages.forEach(function(message) {
      var sender = message.getFrom();
      var subject = message.getSubject();
      Logger.log("  Message: From " + sender + " with subject '" + subject + "'");


      if (!developerMode) {
        // Forward the email to both recipient and self
        message.forward(forwardingAddress, {
          from: fromAddress,
          subject: subject,
          body: message.getBody(),
        });
      }
      Logger.log("  Message: Forwarded to " + forwardingAddress);
      
      if (!developerMode) {
        // Mark the message as read
        message.markRead();
      }
      Logger.log("  Message: Marked as read");
    });

    // Relabel as complete
    if (!developerMode) thread.removeLabel(todoLabel);
    Logger.log("Thread: Removed label '" + todoLabel.getName() + "'");

    if (!developerMode) thread.addLabel(forwardCompleteLabel);
    Logger.log("Thread: Added label '" + forwardCompleteLabel.getName() + "'");

    if (archiveWhenDone) {
      if (!developerMode) thread.moveToArchive();
      Logger.log("Thread: Archived");
    }
  });
  
  if (developerMode) {
    // Log that the script was executed in developer mode
    Logger.log("-- Executed in Developer Mode. No real actions were taken.");
  } else {
    Logger.log("-- Executed in Production Mode. All actions were taken.");
  }
}
