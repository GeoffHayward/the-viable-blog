---
title: "Slack Slash Command Integrity"
author: "Geoffrey Hayward"
date: 2021-02-09T20:15:37Z
year: 2021
month: 2021/02
categories:
- Software and Web Development
tags:
- example tag
draft: true
---
Following on from ... where we triggered a GitHub Actions workflow from a Slack Slash Command via AWS' API Gateway. In 
this post we will check the integrity of the call to verify it was sent from slack.

As we used the AWS API Gateway the most obvious place to put the check is an AWS API Gateway Authroior. However, this 
does not work. Consider the bellow as phodo code.

```javascript
/**
 * Phudo code.
 * 
 * This cannot be done!
 */
const crypto = require('crypto');

const SIGNING_SECRET = '***** DUMMY VALUE *****';

exports.handler = async (event, context) => {
    if (authenticate(timestamp, signature)) {
        return generateAuthResponse("user", "Allow", methodArn)
    }
    return generateAuthResponse("user", "Deny", methodArn)
};

function authenticate(timestamp, signature) {
    const base = `v0:${timestamp}:_NEEDED_BODY_IS_NOT_AVALABLE_`
    const hash = crypto.createHmac('sha256', `${SIGNING_SECRET}`).update(base).digest("hex")
    if(signature !== `v0=${hash}`) {
    return ;
}

function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicyDocument(effect, methodArn)
    return {
        principalId,
        policyDocument
    }
}

function generatePolicyDocument(effect, methodArn) {
    if (!effect || !methodArn) return null
    return {
        "Version": "2012-10-17",
        Statement: [{
            "Action": "execute-api:Invoke",
            "Effect": effect,
            "Resource": methodArn
        }]
    }
}
```

This means the check has to be done within the GitHub action.

1. Update the Mapping Template

```text
to be added
```

2. Add the following job
```yaml
  integrity:
    name: Integrity Check
    runs-on: ubuntu-latest
    timeout-minutes: 1

    steps:

      #
      # Validate that the origin is from Slack
      # See: https://api.slack.com/authentication/verifying-requests-from-slack
      #
      - name: Validate Origin
        uses: actions/github-script@v3
        env:
          AGENT: ${{ github.event.client_payload.integrity.agent }}
          BODY: ${{ github.event.client_payload.integrity.body }}
          TIMESTAMP: ${{ github.event.client_payload.integrity.timestamp }}
          SIGNATURE: ${{ github.event.client_payload.integrity.signature }}
          SIGNING_SECRET: ${{ secrets.SLACK_SIGNING_SECRET }}
        with:
          script: |
            if(!`${process.env.AGENT}`.startsWith("Slackbot")){
                core.setFailed("User agent mismatch.")
            } else {
                const base = `v0:${process.env.TIMESTAMP}:${process.env.BODY}`
                const hash = require('crypto').createHmac('sha256', `${process.env.SIGNING_SECRET}`).update(base).digest("hex")
                if(`${process.env.SIGNATURE}` !== `v0=${hash}`) {
                  core.setFailed("The origin integrity check failed.")
                }
            }
```