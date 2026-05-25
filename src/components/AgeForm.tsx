import { useState } from "react";
import { getDaysInMonth } from "../utils/dateUtil";
import arrowIcon from "../assets/icon-arrow.svg";
import type { Result } from "../utils/calcResult";
import calcResult from "../utils/calcResult";

interface AgeFormProp {
  setResult: React.Dispatch<React.SetStateAction<Result>>;
}

const AgeForm = ({ setResult }: AgeFormProp) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({
    future: false,
    oldYear: false,
  });
  const [complete, setComplete] = useState(false);

  // check if date is correct
  const checkValidity = (d: string, m: string, y: string) => {
    const numY = Number(y);

    const oldYear = y !== "" && numY < 1900;
    let future = false;

    if (y) {
      const entered = new Date(numY, Number(m) - 1, Number(d));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      future = entered > today;
    }

    const isComplete = !!d && !!m && !!y && !oldYear && !future;

    setErrors({ future, oldYear });
    setComplete(isComplete);
  };

  // handle submit on form
  const handleSubmit = () => {
    if (!complete) return;
    setResult(calcResult(Number(year), Number(month), Number(day)));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const y = year ? Number(year) : null;
    const m = month ? Number(month) : null;
    const maxD = getDaysInMonth(y, m);
    let newDay = "";

    if (val === "" || (Number(val) >= 1 && Number(val) <= maxD)) {
      newDay = val;
    } else if (Number(val) < 1) {
      newDay = "1";
    } else if (Number(val) > maxD) {
      newDay = maxD.toString();
    }
    setDay(newDay);
    setErrors((prev) => ({ ...prev, day: val !== "" && Number(val) < 1 }));
    checkValidity(newDay, month, year);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let newMonth = "";
    if (val === "" || (Number(val) >= 1 && Number(val) <= 12)) {
      newMonth = val;
    } else if (Number(val) > 12) {
      newMonth = "12";
    } else if (Number(val) < 1) {
      newMonth = "1";
    }
    setMonth(newMonth);

    if (day && newMonth) {
      const y = year ? Number(year) : null;
      const maxD = getDaysInMonth(y, Number(newMonth));
      if (Number(day) > maxD) {
        setDay(maxD.toString());
      }
    }
    setErrors((prev) => ({
      ...prev,
      month: Number(newMonth) < 1 || Number(newMonth) > 12,
    }));
    checkValidity(day, newMonth, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    if (val === "" || Number(val) > 0) {
      setYear(val);
    } else if (Number(val) < 0) {
      setYear("1");
    }

    if (day && month && Number(val) >= minYear && val.length === 4) {
      const maxD = getDaysInMonth(Number(val), Number(month));
      if (Number(day) > maxD) {
        setDay(maxD.toString());
      }
    }
    setErrors((prev) => ({
      ...prev,
      year: Number(val) < minYear || Number(val) > currentYear,
    }));
    checkValidity(day, month, val);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className=""
    >
      <div className="grid grid-cols-3 gap-4 md:w-[70%]">
        <div className="flex flex-col gap-2 text-[hsl(0,0%,8%)]">
          <label
            htmlFor="day"
            className="uppercase text-[hsl(0,1%,44%)] text-sm poppins-bold tracking-[0.15em] md:tracking-wide md:text-base"
          >
            Day
          </label>
          <input
            type="number"
            id="day"
            placeholder="DD"
            className={`text-xl poppins-bold py-3 px-4 rounded-lg border-[hsl(0,0%,86%)] border-2 md:w-40 md:h-20 md:pl-6 md:py-4 md:text-3xl`}
            value={day}
            onChange={handleDayChange}
          />
        </div>
        <div className="flex flex-col gap-2 text-[hsl(0,0%,8%)]">
          <label
            htmlFor="month"
            className="uppercase text-[hsl(0,1%,44%)] text-sm poppins-bold tracking-[0.15em] md:tracking-wide md:text-base"
          >
            Month
          </label>
          <input
            type="number"
            id="month"
            placeholder="MM"
            className={`text-xl poppins-bold py-3 px-4 rounded-lg border-[hsl(0,0%,86%)] border-2 md:w-40 md:h-20 md:pl-6 md:py-4 md:text-3xl`}
            value={month}
            onChange={handleMonthChange}
          />
        </div>
        <div className="flex flex-col gap-2 text-[hsl(0,0%,8%)]">
          <label
            htmlFor="year"
            className="uppercase text-[hsl(0,1%,44%)] text-sm poppins-bold tracking-[0.15em] md:tracking-wide md:text-base"
          >
            year
          </label>
          <input
            type="number"
            id="year"
            placeholder="YYYY"
            className={`text-xl poppins-bold py-3 px-4 rounded-lg border-[hsl(0,0%,86%)] border-2 md:w-40 md:h-20 md:pl-6 md:py-4 md:text-3xl ${errors.future || errors.oldYear ? "border-red-500 outline-none" : ""}`}
            value={year}
            onChange={handleYearChange}
          />
        </div>
      </div>
      <div className="h-8 p-1 my-4">
        {errors.oldYear ? (
          <p className="text-red-500">
            Year Must Be Between 1900 and {new Date().getFullYear()}
          </p>
        ) : null}
        {errors.future ? (
          <p className="text-red-500">Can't be date in the future</p>
        ) : null}
      </div>
      <div className="relative w-full flex justify-center">
        <div className="w-[90%] h-px bg-[hsl(0,0%,86%)] 2xl:my-12"></div>

        <button
          className="w-16 h-16 rounded-full bg-[hsl(259,100%,65%)] hover:bg-black transition-all duration-300 flex justify-center p-4 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 disabled:bg-gray-500 md:left-full md:-translate-x-full md:w-20 md:h-20 2xl:w-24 2xl:h-24 cursor-pointer"
          disabled={!complete}
        >
          <img src={arrowIcon} alt="Button" />
        </button>
      </div>
    </form>
  );
};

export default AgeForm;
