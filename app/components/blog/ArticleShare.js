import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiShare, 
  HiLink, 
  HiDocumentDuplicate,
  HiCheckCircle 
} from 'react-icons/hi';
import { 
  FaTelegram, 
  FaTwitter, 
  FaWhatsapp, 
  FaLinkedin 
} from 'react-icons/fa';

export default function ArticleShare({ article }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = [
    {
      name: 'Telegram',
      icon: FaTelegram,
      url: `https://t.me/share/url?url=${url}&text=${article.title}`,
      color: 'bg-[#0088cc]'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${url}&text=${article.title}`,
      color: 'bg-[#1DA1F2]'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${article.title} ${url}`,
      color: 'bg-[#25D366]'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${article.title}`,
      color: 'bg-[#0077B5]'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <HiShare className="text-xl text-amber-500" />
        <h3 className="font-bold text-gray-700">اشتراک‌گذاری مقاله</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
          >
            <link.icon />
            <span>{link.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={url}
          readOnly
          className="flex-grow bg-gray-50 rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={copyToClipboard}
          className="bg-amber-500 text-white rounded-lg p-2 hover:bg-amber-600 transition-colors"
        >
          {copied ? <HiCheckCircle className="text-xl" /> : <HiDocumentDuplicate className="text-xl" />}
        </button>
      </div>
    </motion.div>
  );
}
