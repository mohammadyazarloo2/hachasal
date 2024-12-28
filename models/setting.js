import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  general: {
    siteName: String,
    siteUrl: String,
    logo: {
      light: String,
      dark: String
    },
    favicon: String,
    description: String,
    keywords: [String],
    defaultLanguage: {
      type: String,
      default: 'fa'
    }
  },
  contact: {
    email: String,
    phone: String,
    address: String,
    socials: {
      instagram: String,
      telegram: String,
      whatsapp: String,
      linkedin: String
    }
  },
  appearance: {
    theme: {
      type: String,
      default: 'light'
    },
    primaryColor: String,
    secondaryColor: String,
    fontFamily: String
  },
  seo: {
    googleAnalyticsId: String,
    googleTagManagerId: String,
    metaTitle: String,
    metaDescription: String,
    ogImage: String
  },
  features: {
    blog: {
      enabled: Boolean,
      commentsEnabled: Boolean,
      postsPerPage: Number
    },
    newsletter: {
      enabled: Boolean,
      provider: String
    }
  }
}, {
  timestamps: true
});

const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

export default Setting;
