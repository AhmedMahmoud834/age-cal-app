export type Result = {
  years: number | null;
  months: number | null;
  days: number | null;
};

const calcResult = (y: number, m: number, d: number): Result => {
  const today = new Date();
  const birthDate = new Date(y, m - 1, d);
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    ageDays += daysInPreviousMonth;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }
  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
};

export default calcResult;
