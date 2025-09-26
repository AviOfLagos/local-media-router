# 🚀 EazyAza Platform - AWS Deployment Guide

## 📋 Overview

This guide will help you deploy your multi-tenant EazyAza platform to AWS using modern, scalable architecture. We'll use AWS services that can handle your multi-tenant SaaS platform's growth from startup to enterprise scale.

## 🏗️ Architecture Overview

### Production Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         CloudFront CDN                      │
│                    (Global Distribution)                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                    Application Load Balancer               │
│                 (SSL Termination & Routing)                │
└─────────────────────┬───────────────────────────────────────┘
                      │
     ┌────────────────┼────────────────┐
     │                │                │
┌────▼────┐    ┌──────▼─────┐    ┌────▼────┐
│ ECS     │    │ ECS        │    │ ECS     │
│ Medusa  │    │ Next.js    │    │ Workers │
│ Backend │    │ Storefront │    │ (AI)    │
└─────────┘    └────────────┘    └─────────┘
     │                │                │
     └────────────────┼────────────────┘
                      │
     ┌────────────────┼────────────────┐
     │                │                │
┌────▼────┐    ┌──────▼─────┐    ┌────▼────┐
│ RDS     │    │ ElastiCache│    │ S3      │
│PostgreSQL│    │ Redis      │    │ Storage │
└─────────┘    └────────────┘    └─────────┘
```

## 🛠️ Prerequisites

### 1. AWS Account Setup
- AWS Account with billing configured
- AWS CLI installed and configured
- Docker installed locally
- Domain name for your platform

### 2. Required AWS Services
- **ECS (Elastic Container Service)** - Container orchestration
- **RDS (PostgreSQL)** - Database
- **ElastiCache (Redis)** - Caching
- **ALB (Application Load Balancer)** - Load balancing
- **CloudFront** - CDN
- **Route 53** - DNS management
- **ECR (Elastic Container Registry)** - Container storage
- **S3** - File storage
- **Systems Manager** - Configuration management

## 📦 Phase 1: Infrastructure Setup (30 minutes)

### Step 1: Create VPC and Networking
```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=eazyaza-vpc}]'

# Create public subnets (2 AZs for high availability)
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.2.0/24 --availability-zone us-east-1b

# Create private subnets for database
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.3.0/24 --availability-zone us-east-1a
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.4.0/24 --availability-zone us-east-1b

# Create Internet Gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --vpc-id vpc-xxxxx --internet-gateway-id igw-xxxxx
```

### Step 2: Create RDS PostgreSQL Database
```bash
# Create DB subnet group
aws rds create-db-subnet-group \
  --db-subnet-group-name eazyaza-db-subnet \
  --db-subnet-group-description "EazyAza DB Subnet Group" \
  --subnet-ids subnet-xxxxx subnet-yyyyy

# Create RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier eazyaza-prod-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.4 \
  --allocated-storage 20 \
  --storage-type gp2 \
  --db-name medusaeazyazaplatform \
  --master-username eazyazaadmin \
  --master-user-password "YourSecurePassword123!" \
  --db-subnet-group-name eazyaza-db-subnet \
  --vpc-security-group-ids sg-xxxxx \
  --backup-retention-period 7 \
  --multi-az \
  --storage-encrypted
```

### Step 3: Create ElastiCache Redis
```bash
# Create Redis subnet group
aws elasticache create-cache-subnet-group \
  --cache-subnet-group-name eazyaza-redis-subnet \
  --cache-subnet-group-description "EazyAza Redis Subnet Group" \
  --subnet-ids subnet-xxxxx subnet-yyyyy

# Create Redis cluster
aws elasticache create-cache-cluster \
  --cache-cluster-id eazyaza-redis \
  --engine redis \
  --cache-node-type cache.t3.micro \
  --num-cache-nodes 1 \
  --cache-subnet-group-name eazyaza-redis-subnet \
  --security-group-ids sg-xxxxx
```

## 🐳 Phase 2: Containerization (20 minutes)

### Step 1: Create Dockerfiles

#### Backend Dockerfile (`eazyaza-platform/Dockerfile`)
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]
```

#### Storefront Dockerfile (`eazyaza-platform-storefront/Dockerfile`)
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Step 2: Build and Push to ECR
```bash
# Create ECR repositories
aws ecr create-repository --repository-name eazyaza/backend
aws ecr create-repository --repository-name eazyaza/storefront

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Build and push backend
cd eazyaza-platform
docker build -t eazyaza/backend .
docker tag eazyaza/backend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/eazyaza/backend:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/eazyaza/backend:latest

# Build and push storefront
cd ../eazyaza-platform-storefront
docker build -t eazyaza/storefront .
docker tag eazyaza/storefront:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/eazyaza/storefront:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/eazyaza/storefront:latest
```

## 🎯 Phase 3: ECS Deployment (25 minutes)

### Step 1: Create ECS Cluster
```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name eazyaza-cluster --capacity-providers FARGATE --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1
```

### Step 2: Create Task Definitions

#### Backend Task Definition (`backend-task-def.json`)
```json
{
  "family": "eazyaza-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/eazyaza/backend:latest",
      "portMappings": [
        {
          "containerPort": 9000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "DATABASE_URL",
          "value": "postgresql://eazyazaadmin:YourSecurePassword123!@eazyaza-prod-db.xxxxx.us-east-1.rds.amazonaws.com:5432/medusaeazyazaplatform"
        },
        {
          "name": "REDIS_URL",
          "value": "redis://eazyaza-redis.xxxxx.cache.amazonaws.com:6379"
        },
        {
          "name": "JWT_SECRET",
          "value": "your-production-jwt-secret-here"
        },
        {
          "name": "COOKIE_SECRET",
          "value": "your-production-cookie-secret-here"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/eazyaza-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Storefront Task Definition (`storefront-task-def.json`)
```json
{
  "family": "eazyaza-storefront",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "storefront",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/eazyaza/storefront:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "MEDUSA_BACKEND_URL",
          "value": "https://api.yourdomain.com"
        },
        {
          "name": "ROOT_DOMAIN",
          "value": "yourdomain.com"
        },
        {
          "name": "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
          "value": "pk_your_publishable_key_here"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/eazyaza-storefront",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Step 3: Register Task Definitions and Create Services
```bash
# Register task definitions
aws ecs register-task-definition --cli-input-json file://backend-task-def.json
aws ecs register-task-definition --cli-input-json file://storefront-task-def.json

# Create backend service
aws ecs create-service \
  --cluster eazyaza-cluster \
  --service-name eazyaza-backend \
  --task-definition eazyaza-backend:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx,subnet-yyyyy],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/eazyaza-backend-tg/xxxxx,containerName=backend,containerPort=9000

# Create storefront service
aws ecs create-service \
  --cluster eazyaza-cluster \
  --service-name eazyaza-storefront \
  --task-definition eazyaza-storefront:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx,subnet-yyyyy],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/eazyaza-storefront-tg/xxxxx,containerName=storefront,containerPort=3000
```

## 🌐 Phase 4: Load Balancer & Domain Setup (15 minutes)

### Step 1: Create Application Load Balancer
```bash
# Create target groups
aws elbv2 create-target-group \
  --name eazyaza-backend-tg \
  --protocol HTTP \
  --port 9000 \
  --vpc-id vpc-xxxxx \
  --target-type ip \
  --health-check-path /health

aws elbv2 create-target-group \
  --name eazyaza-storefront-tg \
  --protocol HTTP \
  --port 3000 \
  --vpc-id vpc-xxxxx \
  --target-type ip \
  --health-check-path /

# Create load balancer
aws elbv2 create-load-balancer \
  --name eazyaza-alb \
  --subnets subnet-xxxxx subnet-yyyyy \
  --security-groups sg-xxxxx
```

### Step 2: Configure SSL Certificate
```bash
# Request SSL certificate
aws acm request-certificate \
  --domain-name yourdomain.com \
  --subject-alternative-names "*.yourdomain.com" \
  --validation-method DNS

# Create listeners with SSL
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/eazyaza-alb/xxxxx \
  --protocol HTTPS \
  --port 443 \
  --certificates CertificateArn=arn:aws:acm:us-east-1:123456789012:certificate/xxxxx \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/eazyaza-storefront-tg/xxxxx
```

## 🗄️ Phase 5: Database Migration & Data Setup (10 minutes)

### Step 1: Run Database Migrations
```bash
# Connect to your backend container to run migrations
aws ecs execute-command \
  --cluster eazyaza-cluster \
  --task arn:aws:ecs:us-east-1:123456789012:task/eazyaza-cluster/xxxxx \
  --container backend \
  --interactive \
  --command "/bin/sh"

# Inside the container:
npm run build
npx medusa exec ./src/scripts/create-demo-tenants.ts
```

### Step 2: Configure Environment Variables
```bash
# Create parameter store entries for sensitive data
aws ssm put-parameter \
  --name "/eazyaza/prod/database-url" \
  --value "postgresql://eazyazaadmin:YourSecurePassword123!@eazyaza-prod-db.xxxxx.us-east-1.rds.amazonaws.com:5432/medusaeazyazaplatform" \
  --type "SecureString"

aws ssm put-parameter \
  --name "/eazyaza/prod/jwt-secret" \
  --value "your-super-secure-jwt-secret" \
  --type "SecureString"
```

## 🚀 Phase 6: CloudFront & Domain Configuration (15 minutes)

### Step 1: Create CloudFront Distribution
```json
{
  "CallerReference": "eazyaza-2024-01-01",
  "Comment": "EazyAza Platform CDN",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 2,
    "Items": [
      {
        "Id": "eazyaza-storefront",
        "DomainName": "eazyaza-alb-xxxxx.us-east-1.elb.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 443,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only"
        }
      },
      {
        "Id": "eazyaza-backend",
        "DomainName": "eazyaza-alb-xxxxx.us-east-1.elb.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 443,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "eazyaza-storefront",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": true,
      "Cookies": {
        "Forward": "all"
      }
    }
  },
  "CacheBehaviors": {
    "Quantity": 1,
    "Items": [
      {
        "PathPattern": "/admin/*",
        "TargetOriginId": "eazyaza-backend",
        "ViewerProtocolPolicy": "redirect-to-https",
        "ForwardedValues": {
          "QueryString": true,
          "Cookies": {
            "Forward": "all"
          }
        }
      }
    ]
  },
  "Enabled": true,
  "Aliases": {
    "Quantity": 2,
    "Items": ["yourdomain.com", "*.yourdomain.com"]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/xxxxx",
    "SSLSupportMethod": "sni-only"
  }
}
```

### Step 2: Configure Route 53
```bash
# Create hosted zone
aws route53 create-hosted-zone --name yourdomain.com --caller-reference "eazyaza-$(date +%s)"

# Create A record for main domain
aws route53 change-resource-record-sets --hosted-zone-id ZXXXXX --change-batch '{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "yourdomain.com",
      "Type": "A",
      "AliasTarget": {
        "DNSName": "d123456789.cloudfront.net",
        "EvaluateTargetHealth": false,
        "HostedZoneId": "Z2FDTNDATAQYW2"
      }
    }
  }]
}'

# Create wildcard record for tenant subdomains
aws route53 change-resource-record-sets --hosted-zone-id ZXXXXX --change-batch '{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "*.yourdomain.com",
      "Type": "A",
      "AliasTarget": {
        "DNSName": "d123456789.cloudfront.net",
        "EvaluateTargetHealth": false,
        "HostedZoneId": "Z2FDTNDATAQYW2"
      }
    }
  }]
}'
```

## 🔐 Phase 7: Security & Monitoring (20 minutes)

### Step 1: Create IAM Roles and Policies
```bash
# Create ECS task execution role
aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name ecsTaskExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Create application role for accessing AWS services
aws iam create-role --role-name eazyazaApplicationRole --assume-role-policy-document file://app-trust-policy.json
```

### Step 2: Set up CloudWatch Monitoring
```bash
# Create log groups
aws logs create-log-group --log-group-name /ecs/eazyaza-backend
aws logs create-log-group --log-group-name /ecs/eazyaza-storefront

# Create CloudWatch alarms
aws cloudwatch put-metric-alarm \
  --alarm-name "EazyAza-HighCPU" \
  --alarm-description "High CPU utilization" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

### Step 3: Configure Auto Scaling
```bash
# Register scalable target for backend
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/eazyaza-cluster/eazyaza-backend \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 2 \
  --max-capacity 10

# Create scaling policy
aws application-autoscaling put-scaling-policy \
  --service-namespace ecs \
  --resource-id service/eazyaza-cluster/eazyaza-backend \
  --scalable-dimension ecs:service:DesiredCount \
  --policy-name eazyaza-backend-scaling-policy \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration file://scaling-policy.json
```

## ✅ Phase 8: Testing & Validation (15 minutes)

### Step 1: Health Checks
```bash
# Test backend health
curl https://api.yourdomain.com/health

# Test storefront
curl https://yourdomain.com

# Test tenant routing
curl https://acme-store.yourdomain.com
curl https://fashion-hub.yourdomain.com
```

### Step 2: Performance Testing
```bash
# Install artillery for load testing
npm install -g artillery

# Run load test
artillery quick --count 100 --num 10 https://yourdomain.com
```

## 💰 Cost Optimization

### Monthly Cost Estimate
- **ECS Fargate**: ~$50-100/month (depending on scale)
- **RDS PostgreSQL**: ~$25-50/month
- **ElastiCache Redis**: ~$15-30/month
- **Application Load Balancer**: ~$20/month
- **CloudFront**: ~$5-20/month
- **Route 53**: ~$1/month
- **Data Transfer**: ~$10-50/month

**Total Estimated Cost**: $126-271/month

### Cost Optimization Tips
1. Use Spot instances for non-critical workloads
2. Enable ECS cluster auto scaling
3. Set up CloudWatch billing alarms
4. Use Reserved Instances for predictable workloads
5. Optimize container resource allocation

## 🔄 CI/CD Pipeline (Optional - 30 minutes)

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push backend
        run: |
          cd eazyaza-platform
          docker build -t eazyaza/backend .
          docker tag eazyaza/backend:latest ${{ secrets.ECR_BACKEND_URI }}:latest
          docker push ${{ secrets.ECR_BACKEND_URI }}:latest

      - name: Build and push storefront
        run: |
          cd eazyaza-platform-storefront
          docker build -t eazyaza/storefront .
          docker tag eazyaza/storefront:latest ${{ secrets.ECR_STOREFRONT_URI }}:latest
          docker push ${{ secrets.ECR_STOREFRONT_URI }}:latest

      - name: Update ECS services
        run: |
          aws ecs update-service --cluster eazyaza-cluster --service eazyaza-backend --force-new-deployment
          aws ecs update-service --cluster eazyaza-cluster --service eazyaza-storefront --force-new-deployment
```

## 🚨 Troubleshooting

### Common Issues
1. **Container fails to start**: Check logs in CloudWatch
2. **Database connection errors**: Verify security groups and RDS settings
3. **Load balancer health checks fail**: Check container port mapping
4. **SSL certificate issues**: Ensure domain validation is complete

### Debugging Commands
```bash
# Check ECS service status
aws ecs describe-services --cluster eazyaza-cluster --services eazyaza-backend

# View container logs
aws logs tail /ecs/eazyaza-backend --follow

# Check load balancer health
aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/eazyaza-backend-tg/xxxxx
```

## 🎯 Post-Deployment Checklist

- [ ] All services are running and healthy
- [ ] SSL certificates are properly configured
- [ ] Domain DNS is pointing to CloudFront
- [ ] Multi-tenant routing is working for all demo tenants
- [ ] Database migrations have been applied
- [ ] Environment variables are properly set
- [ ] CloudWatch monitoring is active
- [ ] Auto scaling is configured
- [ ] Backup strategies are in place
- [ ] Security groups are properly configured

## 🔒 Security Best Practices

1. **Enable encryption at rest** for RDS and ElastiCache
2. **Use AWS Secrets Manager** for sensitive configuration
3. **Implement least privilege** IAM policies
4. **Enable AWS CloudTrail** for audit logging
5. **Set up VPC Flow Logs** for network monitoring
6. **Use AWS WAF** to protect against common attacks
7. **Implement proper CORS** settings
8. **Regular security updates** for container images

---

## 🎉 Congratulations!

You've successfully deployed your multi-tenant EazyAza platform to AWS! Your platform is now ready to:

- Handle unlimited tenants with custom subdomains
- Scale automatically based on demand
- Serve customers globally with low latency
- Maintain high availability across multiple regions

**Next Steps**: Monitor your deployment, add more features, and start onboarding your first customers!

**Support**: Keep this guide handy for future deployments and troubleshooting.