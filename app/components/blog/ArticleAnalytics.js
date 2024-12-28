import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChartBar, HiClock, HiEye, HiHeart } from 'react-icons/hi';

export default function ArticleAnalytics({ articleId }) {
  useEffect(() => {
    trackArticleView();
  }, [articleId]);

  const trackArticleView = async () => {
    try {
      await fetch(`/api/articles/${articleId}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'view',
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Error tracking article view:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
    >
      <AnalyticCard
        icon={HiEye}
        title="بازدیدها"
        value="1,234"
        change="+12%"
        isPositive={true}
      />
      <AnalyticCard
        icon={HiHeart}
        title="لایک‌ها"
        value="856"
        change="+5%"
        isPositive={true}
      />
      <AnalyticCard
        icon={HiClock}
        title="زمان مطالعه"
        value="4:30"
        unit="دقیقه"
      />
      <AnalyticCard
        icon={HiChartBar}
        title="نرخ تعامل"
        value="68%"
        change="-2%"
        isPositive={false}
      />
    </motion.div>
  );
}

function AnalyticCard({ icon: Icon, title, value, unit, change, isPositive }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <Icon className="text-2xl text-amber-500" />
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-700">
          {value}
          {unit && <span className="text-sm text-gray-500 mr-1">{unit}</span>}
        </div>
        {change && (
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
