import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiVolumeUp, HiX } from 'react-icons/hi';
import VideoPlayer from './VideoPlayer';

export default function ArticleMedia({ article }) {
  const [activeImage, setActiveImage] = useState(null);
  
  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      {article.images?.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {article.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-24 cursor-pointer"
              onClick={() => setActiveImage(image)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Player */}
      {article.media?.video && (
    <div className="mb-6">
      <VideoPlayer video={article.media?.video} />
    </div>
  )}

      {/* Podcast Player */}
      {article.media?.podcast && (
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <HiVolumeUp className="text-2xl text-amber-500" />
            <div>
              <h4 className="font-medium">{article.media.podcast.title}</h4>
              <p className="text-sm text-gray-600">{article.media.podcast.duration}</p>
            </div>
            <audio controls className="flex-grow">
              <source src={article.media.podcast.url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setActiveImage(null)}
            >
              <HiX />
            </button>
            <div className="relative w-full max-w-4xl aspect-video">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
