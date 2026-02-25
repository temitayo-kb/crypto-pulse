import "./GridSkeleton.css";

function GridSkeleton() {
  return (
    <div className="grid-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-logo skeleton-shimmer"></div>
        <div className="skeleton-identity">
          <div className="skeleton-symbol skeleton-shimmer"></div>
          <div className="skeleton-name skeleton-shimmer"></div>
        </div>
      </div>
      <div className="skeleton-change">
        <div className="skeleton-price-change skeleton-shimmer"></div>
        <div className="skeleton-icon skeleton-shimmer"></div>
      </div>
      <div className="skeleton-details">
        <div className="skeleton-price skeleton-shimmer"></div>
        <div className="skeleton-stat skeleton-shimmer"></div>
        <div className="skeleton-stat skeleton-shimmer"></div>
      </div>
    </div>
  );
}

export default GridSkeleton;
