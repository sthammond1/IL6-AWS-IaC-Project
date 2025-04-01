import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class IL6CompliantStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a cost-effective VPC with 2 subnets
    const vpc = new ec2.Vpc(this, 'SecureVpc', {
      maxAzs: 2, // Uses only 2 Availability Zones to reduce cost
      subnetConfiguration: [
        { name: 'public', subnetType: ec2.SubnetType.PUBLIC },
        { name: 'private', subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS }
      ],
    });

    // Create an ECS Cluster
    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });

    // Create an AWS Lambda function (Serverless, free tier eligible)
    const lambdaFunction = new lambda.Function(this, 'IL6Function', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
    });

    // Assign necessary permissions
    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['s3:ListBucket'],
        resources: ['*'],
      })
    );
  }
}
