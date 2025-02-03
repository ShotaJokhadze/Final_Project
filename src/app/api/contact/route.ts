import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: Request) {
  const { email, name, subject, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Contact Form Submission to TBC Project`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Contact Form Submission</h2>
        
        <div style="background: #fff; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 16px; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
          <p style="font-size: 16px; color: #555;"><strong>Subject:</strong> ${subject}</p>
          <p style="font-size: 16px; color: #555;"><strong>Message:</strong></p>
          <div style="padding: 10px; background: #f1f1f1; border-radius: 5px;">
            <p style="font-size: 16px; color: #333; margin: 0;">${message}</p>
          </div>
        </div>
  
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">
          <p>Sent from <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: #007bff; text-decoration: none;">Your Website</a></p>
        </footer>
      </div>
    `,
  };
  

  try {
    await transport.verify();
    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}