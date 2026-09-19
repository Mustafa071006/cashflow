function SummaryCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
        dark:border-gray-800
        dark:bg-gray-900
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            {title}
          </p>


          <h3
            className="
              mt-2
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {value}
          </h3>

        </div>



        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${color}
          `}
        >

          {Icon && (
            <Icon size={24} />
          )}

        </div>


      </div>

    </div>
  );
}


export default SummaryCard;