provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  
  vpc_name        = "${var.project_name}-${var.environment}"
  vpc_cidr        = var.vpc_cidr
  azs             = var.availability_zones
  private_subnets = var.private_subnet_cidrs
  public_subnets  = var.public_subnet_cidrs
  
  enable_nat_gateway = true
  single_nat_gateway = var.environment == "staging" ? true : false
  
  tags = local.common_tags
}

module "eks" {
  source = "./modules/eks"
  
  cluster_name    = "${var.project_name}-${var.environment}"
  cluster_version = var.eks_cluster_version
  
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets
  
  node_groups = {
    application = {
      desired_capacity = var.environment == "production" ? 3 : 2
      max_capacity     = var.environment == "production" ? 6 : 3
      min_capacity     = var.environment == "production" ? 3 : 2
      instance_types   = var.environment == "production" ? ["t3.large"] : ["t3.medium"]
      disk_size        = 50
    }
  }
  
  tags = local.common_tags
}

module "documentdb" {
  source = "./modules/documentdb"
  
  cluster_name       = "${var.project_name}-${var.environment}"
  engine_version     = "4.0.0"
  master_username    = var.db_username
  master_password    = var.db_password
  instance_class     = var.environment == "production" ? "db.r5.large" : "db.t3.medium"
  instance_count     = var.environment == "production" ? 3 : 1
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnets
  
  tags = local.common_tags
}

module "istio" {
  source = "./modules/istio"
  
  eks_cluster_name = module.eks.cluster_name
  
  depends_on = [module.eks]
}

module "vault" {
  source = "./modules/vault"
  
  eks_cluster_name = module.eks.cluster_name
  vpc_id           = module.vpc.vpc_id
  subnet_ids       = module.vpc.private_subnets
  
  depends_on = [module.eks]
}

locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
