# adbreak_dynamo

A JS web automation tool

This tool automates the click-ops for setting up monetization for a youtube account.

before:
 - user or agency logins into youtube account
 - For each video on the channel
    - click into video
    - enable monetization
    - if mid-roll ads
     - click add mid-roll button and adjust the placement of the add in the timeline
    - save 

after:
 - launch robot in VM that is already logged into the youtube account
 - configure the monetization settings that you want to apply to all videos via chrome extension UI
 - launch the robot
