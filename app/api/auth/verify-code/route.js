import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  const { email, code } = await request.json();
  
  await connectMongoDB();
  
  const user = await User.findOne({
    email,
    'verificationCode.code': code,
    'verificationCode.expiresAt': { $gt: new Date() }
  });

  if (!user) {
    return Response.json({ success: false }, { status: 400 });
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  await user.save();

  return Response.json({ success: true });
}
