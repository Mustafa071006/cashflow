function ChartCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-zinc-200

        bg-white

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:shadow-md


        dark:border-zinc-800

        dark:bg-zinc-900

        dark:shadow-black/20
      "
    >

      <div
        className="
          mb-6
        "
      >

        <h2
          className="
            text-xl
            font-semibold

            text-zinc-900

            dark:text-zinc-100
          "
        >
          {title}
        </h2>



        {subtitle && (
          <p
            className="
              mt-1

              text-sm

              text-zinc-500

              dark:text-zinc-400
            "
          >
            {subtitle}
          </p>
        )}

      </div>



      <div
        className="
          h-80
        "
      >
        {children}
      </div>


    </div>
  );
}


export default ChartCard;