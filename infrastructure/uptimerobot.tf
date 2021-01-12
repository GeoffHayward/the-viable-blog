data "uptimerobot_alert_contact" "email_alerts" {
  friendly_name = "Viable Blog Email Alerts"
}

data "uptimerobot_alert_contact" "sms_alerts" {
  friendly_name = "Viable Blog SMS Alerts"
}

resource "uptimerobot_monitor" "main" {
  friendly_name = "The Viable Blog"
  type          = "keyword"
  keyword_type  = "not exists"
  keyword_value = "Welcome to the Viable Blog"
  url           = "https://viable.blog"
  interval      = 300

  alert_contact {
    id = data.uptimerobot_alert_contact.email_alerts.id
  }

  alert_contact {
    id = data.uptimerobot_alert_contact.sms_alerts.id
  }
}