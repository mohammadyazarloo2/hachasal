import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['login', 'logout'],
    required: true
  },
  deviceInfo: {
    browser: String,
    os: String,
    ip: String,
    device: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const AdminLog = mongoose.models.AdminLog || mongoose.model("AdminLog", adminLogSchema);
export default AdminLog;
