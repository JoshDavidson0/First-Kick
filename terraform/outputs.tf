output "amplify_app_id" {
  description = "The Amplify app ID"
  value       = aws_amplify_app.first_kick.id
}

output "amplify_default_domain" {
  description = "The default Amplify domain for the deployed app"
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.first_kick.default_domain}"
}

output "amplify_console_url" {
  description = "Direct link to this app in the AWS Amplify console"
  value       = "https://us-east-1.console.aws.amazon.com/amplify/home#/${aws_amplify_app.first_kick.id}"
}

output "webhook_url" {
  description = "Webhook URL — call this to manually trigger a deployment"
  value       = aws_amplify_webhook.main.url
  sensitive   = true
}
