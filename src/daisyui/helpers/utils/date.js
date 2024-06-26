import dayjs from "dayjs";

const defaultProps = { onlyDate: true };

const formatted = (date, props = defaultProps) => {
  let format = "";
  if (props.format) {
    format = props.format;
  } else {
    if (props.onlyDate) format += "DD MMM YYYY";
  }

  return dayjs(date).format(format);
};

const minusMinutes = (minutes = 1, date = new Date()) => {
  return addMinutes(-minutes, date);
};

const addMinutes = (minutes = 1, date = new Date()) => {
  const d = date;
  d.setMinutes(date.getMinutes() + minutes);
  return d;
};
const minusDays = (days = 1, date = new Date()) => {
  return addDays(-days, date);
};

const addDays = (days = 1, date = new Date()) => {
  const d = date;
  d.setDate(date.getDate() + days);
  return d;
};
const minusMonths = (month = 1, date = new Date()) => {
  return addMonths(-month, date);
};

const addMonths = (month = 1, date = new Date()) => {
  const d = date;
  d.setMonth(date.getMonth() + month);
  return d;
};

const minusYears = (year = 1, date = new Date()) => {
  return addYears(-year, date);
};

const addYears = (year = 1, date = new Date()) => {
  const d = date;
  d.setFullYear(date.getFullYear() + year);
  return d;
};

const DateUtil = {
  formatted,
  minusDays,
  addDays,
  addMonths,
  minusMonths,
  minusYears,
  addYears,
  addMinutes,
  minusMinutes,
};
export default DateUtil;
