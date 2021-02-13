---
title: "GitHub Actions Workflow Communicating Feedback to Slack"
author: "Geoffrey Hayward"
date: 2021-02-09T20:15:37Z
year: 2021
month: 2021/02
categories:
- Software and Web Development
tags:
- Stack
- DevOps
- GitHub Actions
- DevOps
draft: true
---

To do 

The mapping templates for application/x-www-form-urlencoded

```text
{
    "event_type": "slack-deploy-command", 
    "client_payload":
    {
        "data": {
        #foreach( $token in $input.body.split('&') )
            #set( $keyVal = $token.split('=') )
            #set( $keyValSize = $keyVal.size() )
            #if( $keyValSize >= 1 )
                #set( $key = $util.urlDecode($keyVal[0]) )
                #if( $keyValSize >= 2 )
                    #set( $val = $util.urlDecode($keyVal[1]) )
                #else
                    #set( $val = '' )
                #end
                "$key": "$val"#if($foreach.hasNext),#end
            #end
        #end
        }
    }
}
```

Post response

```json
{
  "response_type": "in_channel",
  "text": "Your deployment request has been dispatched to pipeline."
}
```