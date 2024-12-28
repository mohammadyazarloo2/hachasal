'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HiStar } from 'react-icons/hi';
import Image from 'next/image';

export default function Comments({ productId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    const res = await fetch(`/api/products/${productId}/comments`);
    const data = await res.json();
    setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${productId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, text })
      });

      if (res.ok) {
        setText('');
        setRating(5);
        await fetchComments();
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">نظرات کاربران</h2>

      {session && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className={`text-2xl ${
                  i < rating ? 'text-amber-400' : 'text-gray-300'
                }`}
              >
                <HiStar />
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="w-full p-3 border rounded-lg mb-4"
            rows={4}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 disabled:opacity-50"
          >
            ثبت نظر
          </button>
        </form>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={comment.userId.image || '/default-avatar.png'}
                alt={comment.userId.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">{comment.userId.name}</div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className={i < comment.rating ? 'fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
