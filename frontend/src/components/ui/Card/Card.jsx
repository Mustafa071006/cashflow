import clsx from "clsx";

function Card({ children, className = "" }) {
  return <div className={clsx(`rounded-card bg-carbon p-6`, className)}>{children}</div>;
}

export default Card;
