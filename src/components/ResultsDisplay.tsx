interface ResultDisplayProp {
  years: number | null;
  months: number | null;
  days: number | null;
}

const ResultDisplay = ({ years, months, days }: ResultDisplayProp) => {
  return (
    <div className="flex flex-col gap-2 text-6xl poppins-extrabold-italic leading-[1.1] tracking-tight">
      <p className="">
        <span className="text-[hsl(259,100%,65%)]">{years ? years : "--"}</span>{" "}
        Years
      </p>
      <p className="">
        <span className="text-[hsl(259,100%,65%)]">
          {months ? months : "--"}
        </span>{" "}
        Months
      </p>
      <p className="">
        <span className="text-[hsl(259,100%,65%)]">{days ? days : "--"}</span>{" "}
        Days
      </p>
    </div>
  );
};

export default ResultDisplay;
