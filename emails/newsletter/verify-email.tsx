import SITE from "@/lib/config";
import { SITE_ADDR } from "@/lib/constants";
import { MASKED_DOMAIN_LOCALHOST } from "@/lib/views/constants";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NewsletterSubscriberVerifyEmailProps {
  verificationLink?: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const NewsletterSubscriberVerifyEmail = ({
  verificationLink,
}: NewsletterSubscriberVerifyEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Container
          style={{
            display: "flex",
          }}
        >
          <Img
            src={`${SITE_ADDR}/img/nick.jpg`}
            width="64"
            height="64"
            alt={SITE.name}
            style={logo}
          />
          {/* <Heading style={{}}>Hi fren :)</Heading> */}
        </Container>

        <Heading style={heading}>Confirm your email address</Heading>

        <Text style={paragraph}>
          Thanks for joining my newsletter! Please confirm your email address by
          clicking the button below.
        </Text>

        <Section style={buttonContainer}>
          <Button style={button} href={verificationLink} target="_blank">
            Verify Your Email
          </Button>
        </Section>
        <Text style={paragraph}>
          If you did not subscribe to this newsletter, then you can safely
          ignore this email.
        </Text>

        <Hr style={hr} />
        <Link href={SITE_ADDR} style={reportLink}>
          Nick Frostbutter
        </Link>
      </Container>
    </Body>
  </Html>
);

NewsletterSubscriberVerifyEmail.PreviewProps = {
  verificationLink: new URL(
    `/newsletter/verify/codehere`,
    `https://${MASKED_DOMAIN_LOCALHOST}`,
  ).toString(),
} as NewsletterSubscriberVerifyEmailProps;

export default NewsletterSubscriberVerifyEmail;

const logo: React.CSSProperties = {
  borderRadius: 9999,
  width: 64,
  height: 64,
};

const main: React.CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "20px 10px 20px",
  maxWidth: "560px",
};

const heading: React.CSSProperties = {
  fontSize: "28px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "450",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph: React.CSSProperties = {
  margin: "0 0 15px",
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer: React.CSSProperties = {
  padding: "27px 0 27px",
};

const button: React.CSSProperties = {
  backgroundColor: "#617bff",
  borderRadius: "4px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
  margin: "0rem 2rem",
};

const reportLink: React.CSSProperties = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr: React.CSSProperties = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

// const code: React.CSSProperties = {
//   fontFamily: "monospace",
//   fontWeight: "700",
//   padding: "1px 4px",
//   backgroundColor: "#dfe1e4",
//   letterSpacing: "-0.3px",
//   fontSize: "21px",
//   borderRadius: "4px",
//   color: "#3c4149",
// };
