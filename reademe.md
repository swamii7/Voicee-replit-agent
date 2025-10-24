# Terraform AWS S3 Bucket Module

A simple Terraform module to create an AWS S3 bucket.

## Usage

```hcl
module "s3_bucket" {
  source  = "github.com/yourusername/terraform-aws-s3-bucket"
  bucket_name = "my-example-bucket"
  region      = "ap-south-1"
  environment = "prod"
}
