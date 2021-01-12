# The Viable Blog

Getting started guides.

## Guide for Infrastructure Developer
| All changes to production must be triggered via approved commits to source control. |
| :---- |

The project's infrastructure is scripted with Terraform. 

### Installing Terraform
First downloading Terraform from [terraform.io](https://www.terraform.io/downloads.html) and install it with the 
following command.

```shell
sudo install terraform /usr/local/bin/
```

### Environment Variables
One way of enabling infrastructure development on a development computer is to put environment variables  (untracked) in 
`infrastructure/environment.sh` with the following.

```shell
export AWS_ACCESS_KEY_ID="<REDACTED>"
export AWS_DEFAULT_REGION="<REDACTED>"
export AWS_SECRET_ACCESS_KEY="<REDACTED>"
export CLOUDFLARE_EMAIL="<REDACTED>"
export CLOUDFLARE_ACCOUNT_ID="<REDACTED>"
export CLOUDFLARE_API_TOKEN="<REDACTED>"
export UPTIMEROBOT_API_KEY="<REDACTED>"
export TF_VAR_cloudflare_zone_id="<REDACTED>"
export TF_VAR_google_site_verification_code="<REDACTED>"
```

Then to load the environment variables into a terminal session, simply run `. infrastructure/environment.sh`.