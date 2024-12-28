import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiReply, HiThumbUp, HiFlag } from 'react-icons/hi';
import Image from 'next/image';

export default function ArticleComments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/articles/comments/${articleId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/articles/comments/${articleId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          parentId: replyTo?.id
        })
      });

      if (response.ok) {
        setNewComment('');
        setReplyTo(null);
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <HiChat className="text-xl text-amber-500" />
        <h3 className="font-bold text-gray-700">نظرات ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          {replyTo && (
            <div className="absolute -top-8 right-0 text-sm text-gray-500 flex items-center gap-1">
              <HiReply />
              <span>در پاسخ به {replyTo.author}</span>
              <button 
                type="button"
                onClick={() => setReplyTo(null)}
                className="text-red-500 hover:text-red-600"
              >
                ×
              </button>
            </div>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="w-full rounded-lg text-gray-700 border-gray-200 resize-none h-32"
            required
          />
        </div>
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'در حال ارسال...' : 'ارسال نظر'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onReply={setReplyTo}
          />
        ))}
      </div>
    </motion.div>
  );
}

function CommentItem({ comment, onReply }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${comment.parentId ? 'mr-8 border-r pr-4' : ''}`}
    >
      <div className="flex items-start gap-3">
        <Image
          src={comment.author.avatar || '/default-avatar.png'}
          alt={comment.author.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-sm text-gray-500 mr-2">
                {new Date(comment.createdAt).toLocaleDateString('fa-IR')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-amber-500">
                <HiThumbUp />
              </button>
              <button 
                onClick={() => onReply(comment)}
                className="text-gray-500 hover:text-amber-500"
              >
                <HiReply />
              </button>
              <button className="text-gray-500 hover:text-red-500">
                <HiFlag />
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
        </div>
      </div>
    </motion.div>
  );
}
