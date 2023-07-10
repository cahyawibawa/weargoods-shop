import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";
import { BASE_URL } from "@/constants";
interface WeargoodsNewsletterEmailProps {
  firstName: string;
  fromEmail: string;
}

export const WeargoodsNewsletterEmail = ({
  firstName,
  fromEmail,
}: WeargoodsNewsletterEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Stay updated with the latest trends and offers from Weargoods!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${BASE_URL}/images/wlogo.png`}
          width="60"
          height="60"
          alt="Weargoods"
          style={logo}
        />
        <Text style={paragraph}>Hi {firstName},</Text>
        <Text style={paragraph}>
          Stay updated with the latest trends, news, and exclusive offers from
          Weargoods, your go-to destination for stylish clothing.
        </Text>
        <Text style={paragraph}>
          Discover a wide range of clothing options for all occasions, from
          casual wear to formal attire. Whether you&apos;re looking for trendy
          streetwear, comfortable loungewear, or elegant dresses, Weargoods has
          it all.
        </Text>
        <Section style={btnContainer}>
          <Button
            pX={12}
            pY={12}
            style={button}
            href="https://weargoods-shop.vercel.app/"
          >
            Shop Now
          </Button>
        </Section>
        <Text style={paragraph}>
          If you have any questions or need assistance, our dedicated customer
          support team is here to help.
          <Link
            href={`mailto:${fromEmail}`}
            className="text-blue-500 underline"
          >
            {fromEmail}
          </Link>
        </Text>
        <Text style={paragraph}>
          Stay stylish with Weargoods!
          <br />
          Best regards,
          <br />
          The Weargoods Team
        </Text>
        {/* <Hr style={hr} />
        <Text style={footer}>
          {" "}
          If you no longer want to receive these emails, you can{" "}
          <Link
            href={`${BASE_URL}/email-preferences?token=${token}`}
            className="text-blue-500 underline"
          >
            unsubscribe here
          </Link>
        </Text> */}
      </Container>
    </Body>
  </Html>
);

export default WeargoodsNewsletterEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
