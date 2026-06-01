terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ── Amplify App ──────────────────────────────────────────────────────────────

resource "aws_amplify_app" "first_kick" {
  name         = var.app_name
  repository   = "https://github.com/${var.github_owner}/${var.github_repo}"
  access_token = var.github_token

  # Next.js SSR build settings
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  # Enable SSR (required for Next.js App Router with API routes)
  platform = "WEB_COMPUTE"

  # Environment variables injected into the build and runtime environment
  environment_variables = merge(
    {
      NEXT_PUBLIC_API_BASE_URL = "https://${var.github_branch}.${var.app_name}.amplifyapp.com"
      _LIVE_UPDATES           = "[{\"name\":\"Next.js version\",\"pkg\":\"next-version\",\"type\":\"internal\",\"version\":\"latest\"}]"
    },
    var.football_data_api_key != "" ? {
      FOOTBALL_DATA_API_KEY = var.football_data_api_key
    } : {}
  )

  # Auto-detect Next.js framework
  enable_auto_branch_creation = false
  enable_branch_auto_deletion = true
}

# ── Amplify Branch ───────────────────────────────────────────────────────────

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.first_kick.id
  branch_name = var.github_branch

  # Trigger a deployment automatically on every push to this branch
  enable_auto_build = true

  # SSR requires this framework setting
  framework = "Next.js - SSR"
  stage     = "PRODUCTION"
}

# ── Amplify Webhook (triggers initial deploy) ────────────────────────────────

resource "aws_amplify_webhook" "main" {
  app_id      = aws_amplify_app.first_kick.id
  branch_name = aws_amplify_branch.main.branch_name
  description = "Triggered by terraform apply to start initial build"
}
