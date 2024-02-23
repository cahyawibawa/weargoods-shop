import { Resend } from "resend";
import { subscribeToNewsletterSchema } from "lib/validations/email";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import WeargoodsNewsletterEmail from "components/emails/weargoods-newsletter-email";
import { getCurrentUser } from "lib/swell/account";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const user = await getCurrentUser();
  const input = subscribeToNewsletterSchema.parse(await req.json());
  const subject = input.subject ?? "Welcome to our newsletter";

  try {
    const data = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_ADDRESS}`,
      to: input.email,
      subject,
      react: WeargoodsNewsletterEmail({
        firstName: user?.firstName || "there",
        fromEmail: `${process.env.EMAIL_FROM_ADDRESS}`,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
