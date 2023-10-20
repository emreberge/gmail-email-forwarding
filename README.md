# Apps Script Gmail email forwarder

## Introduction
Gmail filters allow you to configure a forwarding address, however the emails forwarded:

* Does NOT apper as coming from your own adress, and instead is from the original sender.
* Does NOT apper in your inbox.

This is a problem when forwarding emails to other automated systems (e.g. expense reporting), where the recipient needs to be a known and verified address.

## Solution
An app script can solve this problem.

The setup is simple:

* Use gmail filters to mark a message to be forwarded using labels
* An app script can then read messages in specified label, forwards them, and change the label to mark the task as complete.
* Setup the script to run every X minutes

## Setup Instructions

### 1. Creating a New Google Apps Script:
1. Navigate to [Google Apps Script](https://script.google.com/).
2. Click `+ New Project`.
3. This will open the Apps Script editor. Here, paste the code: [autoForwardMail.gs](autoForwardMail.gs).
4. Edit the parameters:
  * `forwardingAddress`
  * `fromAddress`
  * `todoLabelName`
  * `completedLabelName`
5. Save your script with the disk icon or via `File > Save`.

### 2. Testing the Script in Development Mode and Granting Permissions:
1. In the Apps Script editor, find the play icon (▶️) at the top. This will run the chosen function.
2. Make sure the `developerMode` variable in the script is `true`. This ensures the script only logs actions without performing them.
3. Click the play button. You'll receive a permissions request.
4. Select "Review Permissions", pick your Google account, and grant the required permissions.
5. After permissions, run the script once more. Check logged actions via `View > Logs`.

### 3. Setting Up a Time-Driven Trigger:
1. In the Apps Script environment, click the clock symbol on the left side.
2. Click "+ Add Trigger" at the bottom.
3. For the function dropdown, choose your function (like `autoForwardMail`).
4. In the event source dropdown, pick "Time-driven".
5. Set how often the script should run (e.g. every 10 min).
6. Click "Save".
7. If prompted for more permissions for auto-triggering, please provide them.

### 4. Setting Up a Gmail Filter:
1. Go to [Gmail Settings](https://mail.google.com/mail/u/0/#settings/filters).
2. Click "Filters and Blocked Addresses" > "Create a new filter".
3. Define your filter criteria (e.g., specific email addresses or subject lines).
4. After setting your conditions, click "Create filter".
5. On the next page, opt for "Apply the label" and make/select the label as set in the `todoLabelName` parameter in Step 1.
6. Confirm by clicking "Create filter".
