import { useEffect, useState } from "react";
import "./../styles/stats.css";

function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += Math.ceil(target / 50);

      if (start >= target) {
        start = target;

        clearInterval(interval);
      }

      setCount(start);
    }, 40);

    return () => clearInterval(interval);
  }, [target]);

  return <>{count}</>;
}

function Stats() {
  return (
    <div className="statsContainer">
      <div className="statCard">
        <h1>
          <Counter target={2500} />+
        </h1>

        <p>Generated Documents</p>
      </div>

      <div className="statCard">
        <h1>
          <Counter target={100} />+
        </h1>

        <p>Templates</p>
      </div>

      <div className="statCard">
        <h1>
          <Counter target={500} />+
        </h1>

        <p>Downloads</p>
      </div>
    </div>
  );
}

export default Stats;
