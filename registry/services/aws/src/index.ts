import AWS from "aws-sdk";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ accessKeyId, secretAccessKey, region }: { accessKeyId: string, secretAccessKey: string, region: string }) {
  AWS.config.update({ accessKeyId, secretAccessKey, region });
  
  const s3 = new AWS.S3();
  const route53 = new AWS.Route53();
  const billing = new AWS.Pricing();

  return {
    s3: createResourceProxy("aws", s3, "s3"),
    route53: createResourceProxy("aws", route53, "route53"),
    billing: createResourceProxy("aws", billing, "billing")
  };
}
