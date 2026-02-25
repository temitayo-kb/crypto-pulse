import React, { useState } from "react";
import "./CoinInfo.css";

function CoinInfo({ heading, desc }) {
  const shortDesc =
    desc.slice(0, 500) + "<span style='color:var(--grey)'> Read More...</span>";
  const longDesc = desc + "<span style='color:var(--grey)'> Read Less.</span>";

  const [flag, setFlag] = useState(false);
  return (
    <div className="coin-info">
      <h2 className="coin-info-heading">{heading}</h2>
      {desc.length > 500 ? (
        <p
          onClick={() => setFlag(!flag)}
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
        />
      ) : (
        <p dangerouslySetInnerHTML={{ __html: desc }} />
      )}
    </div>
  );
}

export default CoinInfo;
