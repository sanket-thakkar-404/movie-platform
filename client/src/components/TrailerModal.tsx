import { motion } from "framer-motion";
import { X } from "lucide-react";

interface TrailerModalProps {
  videoKey: string;
  onClose: () => void;
}

const TrailerModal = ({ videoKey, onClose }: TrailerModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-4xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-foreground/70 hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default TrailerModal;
