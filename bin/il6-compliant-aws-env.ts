#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { IL6CompliantStack } from '../lib/il6-compliant-aws-env-stack';

const app = new cdk.App();

new IL6CompliantStack(app, 'IL6CompliantStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
