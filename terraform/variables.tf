variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "github_token" {
  description = "GitHub personal access token with repo scope — never commit this"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub username or organisation that owns the repository"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name (without owner prefix)"
  type        = string
}

variable "github_branch" {
  description = "Branch to deploy from"
  type        = string
  default     = "main"
}

variable "app_name" {
  description = "Name for the Amplify app in the AWS console"
  type        = string
  default     = "first-kick"
}

variable "football_data_api_key" {
  description = "Optional free API key from football-data.org for live fixture data"
  type        = string
  sensitive   = true
  default     = ""
}
