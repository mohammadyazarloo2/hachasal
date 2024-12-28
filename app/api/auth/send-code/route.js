import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/User';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(request) {
    try {
      const data = await request.json();
      const email = data.email || data.value;
      
      if (!email) {
        return Response.json({ success: false, error: 'Email is required' }, { status: 400 });
      }
  
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      await connectMongoDB();
      
      await User.findOneAndUpdate(
        { email },
        { 
          verificationCode: {
            code: verificationCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
          }
        },
        { upsert: true }
      );
  
      const mailResult = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Verification Code</h1>
            <p>Your verification code is:</p>
            <h2 style="color: #1f2937; font-size: 32px; letter-spacing: 4px;">${verificationCode}</h2>
            <p style="color: #6b7280;">This code will expire in 10 minutes.</p>
          </div>
        `
      });
  
      return Response.json({ success: true });
      
    } catch (error) {
      console.error('Error:', error);
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  