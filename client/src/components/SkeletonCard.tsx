const SkeletonCard = () => (
  <div className="flex-shrink-0 w-[160px] sm:w-[200px]">
    <div className="aspect-[2/3] rounded-lg bg-muted animate-shimmer bg-gradient-to-r from-muted via-accent to-muted bg-[length:200%_100%]" />
    <div className="mt-2 h-4 w-3/4 rounded bg-muted animate-shimmer bg-gradient-to-r from-muted via-accent to-muted bg-[length:200%_100%]" />
  </div>
);

export default SkeletonCard;
