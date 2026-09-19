import clsx from "clsx";


function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={clsx(
        `
        rounded-3xl

        border
        border-zinc-200

        bg-white

        p-6

        shadow-sm

        transition-all
        duration-300


        dark:border-zinc-800

        dark:bg-zinc-900

        dark:shadow-black/20
        `,
        className
      )}
    >

      {children}

    </div>
  );
}


export default Card;