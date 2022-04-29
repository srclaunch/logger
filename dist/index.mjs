// these aren't really private, but nor are they really useful to document

/**
 * @private
 */
class LuxonError extends Error {}

/**
 * @private
 */
class InvalidDateTimeError extends LuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason.toMessage()}`);
  }
}

/**
 * @private
 */
class InvalidIntervalError extends LuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason.toMessage()}`);
  }
}

/**
 * @private
 */
class InvalidDurationError extends LuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason.toMessage()}`);
  }
}

/**
 * @private
 */
class ConflictingSpecificationError extends LuxonError {}

/**
 * @private
 */
class InvalidUnitError extends LuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
  }
}

/**
 * @private
 */
class InvalidArgumentError extends LuxonError {}

/**
 * @private
 */
class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
  }
}

/**
 * @private
 */

const n = "numeric",
  s = "short",
  l = "long";

const DATE_SHORT = {
  year: n,
  month: n,
  day: n,
};

const DATE_MED = {
  year: n,
  month: s,
  day: n,
};

const DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
};

const DATE_FULL = {
  year: n,
  month: l,
  day: n,
};

const DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
};

const TIME_SIMPLE = {
  hour: n,
  minute: n,
};

const TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
};

const TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s,
};

const TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l,
};

const TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23",
};

const TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
};

const TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s,
};

const TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l,
};

const DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
};

const DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n,
};

const DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
};

const DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n,
};

const DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n,
};

const DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s,
};

const DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s,
};

const DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l,
};

const DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l,
};

/*
  This is just a junk drawer, containing anything used across multiple classes.
  Because Luxon is small(ish), this should stay small and we won't worry about splitting
  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
*/

/**
 * @private
 */

// TYPES

function isUndefined(o) {
  return typeof o === "undefined";
}

function isNumber(o) {
  return typeof o === "number";
}

function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}

function isString(o) {
  return typeof o === "string";
}

function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}

// CAPABILITIES

function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
}

// OBJECTS AND ARRAYS

function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}

function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return undefined;
  }
  return arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}

function pick(obj, keys) {
  return keys.reduce((a, k) => {
    a[k] = obj[k];
    return a;
  }, {});
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// NUMBERS AND STRINGS

function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}

// x % n but takes the sign of n instead of x
function floorMod(x, n) {
  return x - n * Math.floor(x / n);
}

function padStart(input, n = 2) {
  const isNeg = input < 0;
  let padded;
  if (isNeg) {
    padded = "-" + ("" + -input).padStart(n, "0");
  } else {
    padded = ("" + input).padStart(n, "0");
  }
  return padded;
}

function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return undefined;
  } else {
    return parseInt(string, 10);
  }
}

function parseFloating(string) {
  if (isUndefined(string) || string === null || string === "") {
    return undefined;
  } else {
    return parseFloat(string);
  }
}

function parseMillis(fraction) {
  // Return undefined (instead of 0) in these cases, where fraction is not set
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return undefined;
  } else {
    const f = parseFloat("0." + fraction) * 1000;
    return Math.floor(f);
  }
}

function roundTo(number, digits, towardZero = false) {
  const factor = 10 ** digits,
    rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
}

// DATE BASICS

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1,
    modYear = year + (month - modMonth) / 12;

  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}

// covert a calendar object to a local timestamp (epoch, but with the offset baked in)
function objToLocalTS(obj) {
  let d = Date.UTC(
    obj.year,
    obj.month - 1,
    obj.day,
    obj.hour,
    obj.minute,
    obj.second,
    obj.millisecond
  );

  // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }
  return +d;
}

function weeksInWeekYear(weekYear) {
  const p1 =
      (weekYear +
        Math.floor(weekYear / 4) -
        Math.floor(weekYear / 100) +
        Math.floor(weekYear / 400)) %
      7,
    last = weekYear - 1,
    p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}

function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > 60 ? 1900 + year : 2000 + year;
}

// PARSING

function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
  const date = new Date(ts),
    intlOpts = {
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }

  const modified = { timeZoneName: offsetFormat, ...intlOpts };

  const parsed = new Intl.DateTimeFormat(locale, modified)
    .formatToParts(date)
    .find((m) => m.type.toLowerCase() === "timezonename");
  return parsed ? parsed.value : null;
}

// signedOffset('-5', '30') -> -330
function signedOffset(offHourStr, offMinuteStr) {
  let offHour = parseInt(offHourStr, 10);

  // don't || this because we want to preserve -0
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }

  const offMin = parseInt(offMinuteStr, 10) || 0,
    offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}

// COERCION

function asNumber(value) {
  const numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
    throw new InvalidArgumentError(`Invalid unit value ${value}`);
  return numericValue;
}

function normalizeObject(obj, normalizer) {
  const normalized = {};
  for (const u in obj) {
    if (hasOwnProperty(obj, u)) {
      const v = obj[u];
      if (v === undefined || v === null) continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }
  return normalized;
}

function formatOffset(offset, format) {
  const hours = Math.trunc(Math.abs(offset / 60)),
    minutes = Math.trunc(Math.abs(offset % 60)),
    sign = offset >= 0 ? "+" : "-";

  switch (format) {
    case "short":
      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
    case "narrow":
      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
    case "techie":
      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
    default:
      throw new RangeError(`Value format ${format} is out of range for property format`);
  }
}

function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}

const ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z0-9_+-]{1,256}(\/[A-Za-z0-9_+-]{1,256})?)?/;

/**
 * @private
 */

const monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function months(length) {
  switch (length) {
    case "narrow":
      return [...monthsNarrow];
    case "short":
      return [...monthsShort];
    case "long":
      return [...monthsLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}

const weekdaysLong = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];

function weekdays(length) {
  switch (length) {
    case "narrow":
      return [...weekdaysNarrow];
    case "short":
      return [...weekdaysShort];
    case "long":
      return [...weekdaysLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}

const meridiems = ["AM", "PM"];

const erasLong = ["Before Christ", "Anno Domini"];

const erasShort = ["BC", "AD"];

const erasNarrow = ["B", "A"];

function eras(length) {
  switch (length) {
    case "narrow":
      return [...erasNarrow];
    case "short":
      return [...erasShort];
    case "long":
      return [...erasLong];
    default:
      return null;
  }
}

function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}

function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}

function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}

function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}

function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
  const units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."],
  };

  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

  if (numeric === "auto" && lastable) {
    const isDay = unit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
      case -1:
        return isDay ? "yesterday" : `last ${units[unit][0]}`;
      case 0:
        return isDay ? "today" : `this ${units[unit][0]}`;
    }
  }

  const isInPast = Object.is(count, -0) || count < 0,
    fmtValue = Math.abs(count),
    singular = fmtValue === 1,
    lilUnits = units[unit],
    fmtUnit = narrow
      ? singular
        ? lilUnits[1]
        : lilUnits[2] || lilUnits[1]
      : singular
      ? units[unit][0]
      : unit;
  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}

function stringifyTokens(splits, tokenToString) {
  let s = "";
  for (const token of splits) {
    if (token.literal) {
      s += token.val;
    } else {
      s += tokenToString(token.val);
    }
  }
  return s;
}

const macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS,
};

/**
 * @private
 */

class Formatter {
  static create(locale, opts = {}) {
    return new Formatter(locale, opts);
  }

  static parseFormat(fmt) {
    let current = null,
      currentFull = "",
      bracketed = false;
    const splits = [];
    for (let i = 0; i < fmt.length; i++) {
      const c = fmt.charAt(i);
      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({ literal: bracketed, val: currentFull });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: false, val: currentFull });
        }
        currentFull = c;
        current = c;
      }
    }

    if (currentFull.length > 0) {
      splits.push({ literal: bracketed, val: currentFull });
    }

    return splits;
  }

  static macroTokenToFormatOpts(token) {
    return macroTokenToFormatOpts[token];
  }

  constructor(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }

  formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    const df = this.systemLoc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.format();
  }

  formatDateTime(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.format();
  }

  formatDateTimeParts(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.formatToParts();
  }

  resolvedOptions(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.resolvedOptions();
  }

  num(n, p = 0) {
    // we get some perf out of doing this here, annoyingly
    if (this.opts.forceSimple) {
      return padStart(n, p);
    }

    const opts = { ...this.opts };

    if (p > 0) {
      opts.padTo = p;
    }

    return this.loc.numberFormatter(opts).format(n);
  }

  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this.loc.listingMode() === "en",
      useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory",
      string = (opts, extract) => this.loc.extract(dt, opts, extract),
      formatOffset = (opts) => {
        if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
          return "Z";
        }

        return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
      },
      meridiem = () =>
        knownEnglish
          ? meridiemForDateTime(dt)
          : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"),
      month = (length, standalone) =>
        knownEnglish
          ? monthForDateTime(dt, length)
          : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"),
      weekday = (length, standalone) =>
        knownEnglish
          ? weekdayForDateTime(dt, length)
          : string(
              standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
              "weekday"
            ),
      maybeMacro = (token) => {
        const formatOpts = Formatter.macroTokenToFormatOpts(token);
        if (formatOpts) {
          return this.formatWithSystemDefault(dt, formatOpts);
        } else {
          return token;
        }
      },
      era = (length) =>
        knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"),
      tokenToString = (token) => {
        // Where possible: http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles
        switch (token) {
          // ms
          case "S":
            return this.num(dt.millisecond);
          case "u":
          // falls through
          case "SSS":
            return this.num(dt.millisecond, 3);
          // seconds
          case "s":
            return this.num(dt.second);
          case "ss":
            return this.num(dt.second, 2);
          // fractional seconds
          case "uu":
            return this.num(Math.floor(dt.millisecond / 10), 2);
          case "uuu":
            return this.num(Math.floor(dt.millisecond / 100));
          // minutes
          case "m":
            return this.num(dt.minute);
          case "mm":
            return this.num(dt.minute, 2);
          // hours
          case "h":
            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
          case "hh":
            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
          case "H":
            return this.num(dt.hour);
          case "HH":
            return this.num(dt.hour, 2);
          // offset
          case "Z":
            // like +6
            return formatOffset({ format: "narrow", allowZ: this.opts.allowZ });
          case "ZZ":
            // like +06:00
            return formatOffset({ format: "short", allowZ: this.opts.allowZ });
          case "ZZZ":
            // like +0600
            return formatOffset({ format: "techie", allowZ: this.opts.allowZ });
          case "ZZZZ":
            // like EST
            return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
          case "ZZZZZ":
            // like Eastern Standard Time
            return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
          // zone
          case "z":
            // like America/New_York
            return dt.zoneName;
          // meridiems
          case "a":
            return meridiem();
          // dates
          case "d":
            return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
          case "dd":
            return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
          // weekdays - standalone
          case "c":
            // like 1
            return this.num(dt.weekday);
          case "ccc":
            // like 'Tues'
            return weekday("short", true);
          case "cccc":
            // like 'Tuesday'
            return weekday("long", true);
          case "ccccc":
            // like 'T'
            return weekday("narrow", true);
          // weekdays - format
          case "E":
            // like 1
            return this.num(dt.weekday);
          case "EEE":
            // like 'Tues'
            return weekday("short", false);
          case "EEEE":
            // like 'Tuesday'
            return weekday("long", false);
          case "EEEEE":
            // like 'T'
            return weekday("narrow", false);
          // months - standalone
          case "L":
            // like 1
            return useDateTimeFormatter
              ? string({ month: "numeric", day: "numeric" }, "month")
              : this.num(dt.month);
          case "LL":
            // like 01, doesn't seem to work
            return useDateTimeFormatter
              ? string({ month: "2-digit", day: "numeric" }, "month")
              : this.num(dt.month, 2);
          case "LLL":
            // like Jan
            return month("short", true);
          case "LLLL":
            // like January
            return month("long", true);
          case "LLLLL":
            // like J
            return month("narrow", true);
          // months - format
          case "M":
            // like 1
            return useDateTimeFormatter
              ? string({ month: "numeric" }, "month")
              : this.num(dt.month);
          case "MM":
            // like 01
            return useDateTimeFormatter
              ? string({ month: "2-digit" }, "month")
              : this.num(dt.month, 2);
          case "MMM":
            // like Jan
            return month("short", false);
          case "MMMM":
            // like January
            return month("long", false);
          case "MMMMM":
            // like J
            return month("narrow", false);
          // years
          case "y":
            // like 2014
            return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
          case "yy":
            // like 14
            return useDateTimeFormatter
              ? string({ year: "2-digit" }, "year")
              : this.num(dt.year.toString().slice(-2), 2);
          case "yyyy":
            // like 0012
            return useDateTimeFormatter
              ? string({ year: "numeric" }, "year")
              : this.num(dt.year, 4);
          case "yyyyyy":
            // like 000012
            return useDateTimeFormatter
              ? string({ year: "numeric" }, "year")
              : this.num(dt.year, 6);
          // eras
          case "G":
            // like AD
            return era("short");
          case "GG":
            // like Anno Domini
            return era("long");
          case "GGGGG":
            return era("narrow");
          case "kk":
            return this.num(dt.weekYear.toString().slice(-2), 2);
          case "kkkk":
            return this.num(dt.weekYear, 4);
          case "W":
            return this.num(dt.weekNumber);
          case "WW":
            return this.num(dt.weekNumber, 2);
          case "o":
            return this.num(dt.ordinal);
          case "ooo":
            return this.num(dt.ordinal, 3);
          case "q":
            // like 1
            return this.num(dt.quarter);
          case "qq":
            // like 01
            return this.num(dt.quarter, 2);
          case "X":
            return this.num(Math.floor(dt.ts / 1000));
          case "x":
            return this.num(dt.ts);
          default:
            return maybeMacro(token);
        }
      };

    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  }

  formatDurationFromString(dur, fmt) {
    const tokenToField = (token) => {
        switch (token[0]) {
          case "S":
            return "millisecond";
          case "s":
            return "second";
          case "m":
            return "minute";
          case "h":
            return "hour";
          case "d":
            return "day";
          case "w":
            return "week";
          case "M":
            return "month";
          case "y":
            return "year";
          default:
            return null;
        }
      },
      tokenToString = (lildur) => (token) => {
        const mapped = tokenToField(token);
        if (mapped) {
          return this.num(lildur.get(mapped), token.length);
        } else {
          return token;
        }
      },
      tokens = Formatter.parseFormat(fmt),
      realTokens = tokens.reduce(
        (found, { literal, val }) => (literal ? found : found.concat(val)),
        []
      ),
      collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t));
    return stringifyTokens(tokens, tokenToString(collapsed));
  }
}

class Invalid {
  constructor(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }

  toMessage() {
    if (this.explanation) {
      return `${this.reason}: ${this.explanation}`;
    } else {
      return this.reason;
    }
  }
}

/**
 * @interface
 */
class Zone {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new ZoneIsAbstractError();
  }

  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new ZoneIsAbstractError();
  }

  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new ZoneIsAbstractError();
  }

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }

  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }

  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    throw new ZoneIsAbstractError();
  }

  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    throw new ZoneIsAbstractError();
  }

  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new ZoneIsAbstractError();
  }
}

let singleton$1 = null;

/**
 * Represents the local zone for this JavaScript environment.
 * @implements {Zone}
 */
class SystemZone extends Zone {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    if (singleton$1 === null) {
      singleton$1 = new SystemZone();
    }
    return singleton$1;
  }

  /** @override **/
  get type() {
    return "system";
  }

  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /** @override **/
  get isUniversal() {
    return false;
  }

  /** @override **/
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale);
  }

  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }

  /** @override **/
  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }

  /** @override **/
  equals(otherZone) {
    return otherZone.type === "system";
  }

  /** @override **/
  get isValid() {
    return true;
  }
}

let dtfCache = {};
function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short",
    });
  }
  return dtfCache[zone];
}

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6,
};

function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, ""),
    parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted),
    [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
}

function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date);
  const filled = [];
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i];
    const pos = typeToPos[type];

    if (type === "era") {
      filled[pos] = value;
    } else if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}

let ianaZoneCache = {};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */
class IANAZone extends Zone {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone(name);
    }
    return ianaZoneCache[name];
  }

  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }

  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
   * @return {boolean}
   */
  static isValidSpecifier(s) {
    return this.isValidZone(s);
  }

  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(zone) {
    if (!zone) {
      return false;
    }
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
      return true;
    } catch (e) {
      return false;
    }
  }

  constructor(name) {
    super();
    /** @private **/
    this.zoneName = name;
    /** @private **/
    this.valid = IANAZone.isValidZone(name);
  }

  /** @override **/
  get type() {
    return "iana";
  }

  /** @override **/
  get name() {
    return this.zoneName;
  }

  /** @override **/
  get isUniversal() {
    return false;
  }

  /** @override **/
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale, this.name);
  }

  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }

  /** @override **/
  offset(ts) {
    const date = new Date(ts);

    if (isNaN(date)) return NaN;

    const dtf = makeDTF(this.name);
    let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts
      ? partsOffset(dtf, date)
      : hackyOffset(dtf, date);

    if (adOrBc === "BC") {
      year = -Math.abs(year) + 1;
    }

    // because we're using hour12 and https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
    const adjustedHour = hour === 24 ? 0 : hour;

    const asUTC = objToLocalTS({
      year,
      month,
      day,
      hour: adjustedHour,
      minute,
      second,
      millisecond: 0,
    });

    let asTS = +date;
    const over = asTS % 1000;
    asTS -= over >= 0 ? over : 1000 + over;
    return (asUTC - asTS) / (60 * 1000);
  }

  /** @override **/
  equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }

  /** @override **/
  get isValid() {
    return this.valid;
  }
}

let singleton = null;

/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */
class FixedOffsetZone extends Zone {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    if (singleton === null) {
      singleton = new FixedOffsetZone(0);
    }
    return singleton;
  }

  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(offset) {
    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
  }

  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(s) {
    if (s) {
      const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }
    return null;
  }

  constructor(offset) {
    super();
    /** @private **/
    this.fixed = offset;
  }

  /** @override **/
  get type() {
    return "fixed";
  }

  /** @override **/
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
  }

  /** @override **/
  offsetName() {
    return this.name;
  }

  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.fixed, format);
  }

  /** @override **/
  get isUniversal() {
    return true;
  }

  /** @override **/
  offset() {
    return this.fixed;
  }

  /** @override **/
  equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }

  /** @override **/
  get isValid() {
    return true;
  }
}

/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */
class InvalidZone extends Zone {
  constructor(zoneName) {
    super();
    /**  @private */
    this.zoneName = zoneName;
  }

  /** @override **/
  get type() {
    return "invalid";
  }

  /** @override **/
  get name() {
    return this.zoneName;
  }

  /** @override **/
  get isUniversal() {
    return false;
  }

  /** @override **/
  offsetName() {
    return null;
  }

  /** @override **/
  formatOffset() {
    return "";
  }

  /** @override **/
  offset() {
    return NaN;
  }

  /** @override **/
  equals() {
    return false;
  }

  /** @override **/
  get isValid() {
    return false;
  }
}

/**
 * @private
 */

function normalizeZone(input, defaultZone) {
  if (isUndefined(input) || input === null) {
    return defaultZone;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "local" || lowered === "system") return defaultZone;
    else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
    else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    // This is dumb, but the instanceof check above doesn't seem to really work
    // so we're duck checking it
    return input;
  } else {
    return new InvalidZone(input);
  }
}

let now = () => Date.now(),
  defaultZone = "system",
  defaultLocale = null,
  defaultNumberingSystem = null,
  defaultOutputCalendar = null,
  throwOnInvalid;

/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */
class Settings {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return now;
  }

  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(n) {
    now = n;
  }

  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(zone) {
    defaultZone = zone;
  }

  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return normalizeZone(defaultZone, SystemZone.instance);
  }

  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return defaultLocale;
  }

  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }

  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }

  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }

  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }

  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }

  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return throwOnInvalid;
  }

  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    throwOnInvalid = t;
  }

  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
  }
}

// todo - remap caching

let intlLFCache = {};
function getCachedLF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlLFCache[key];
  if (!dtf) {
    dtf = new Intl.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }
  return dtf;
}

let intlDTCache = {};
function getCachedDTF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlDTCache[key];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }
  return dtf;
}

let intlNumCache = {};
function getCachedINF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let inf = intlNumCache[key];
  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }
  return inf;
}

let intlRelCache = {};
function getCachedRTF(locString, opts = {}) {
  const { base, ...cacheKeyOpts } = opts; // exclude `base` from the options
  const key = JSON.stringify([locString, cacheKeyOpts]);
  let inf = intlRelCache[key];
  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }
  return inf;
}

let sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}

function parseLocaleString(localeStr) {
  // I really want to avoid writing a BCP 47 parser
  // see, e.g. https://github.com/wooorm/bcp-47
  // Instead, we'll do this:

  // a) if the string has no -u extensions, just leave it alone
  // b) if it does, use Intl to resolve everything
  // c) if Intl fails, try again without the -u

  const uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    let options;
    const smaller = localeStr.substring(0, uIndex);
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
    } catch (e) {
      options = getCachedDTF(smaller).resolvedOptions();
    }

    const { numberingSystem, calendar } = options;
    // return the smaller one so that we can append the calendar and numbering overrides to it
    return [smaller, numberingSystem, calendar];
  }
}

function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    localeStr += "-u";

    if (outputCalendar) {
      localeStr += `-ca-${outputCalendar}`;
    }

    if (numberingSystem) {
      localeStr += `-nu-${numberingSystem}`;
    }
    return localeStr;
  } else {
    return localeStr;
  }
}

function mapMonths(f) {
  const ms = [];
  for (let i = 1; i <= 12; i++) {
    const dt = DateTime.utc(2016, i, 1);
    ms.push(f(dt));
  }
  return ms;
}

function mapWeekdays(f) {
  const ms = [];
  for (let i = 1; i <= 7; i++) {
    const dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }
  return ms;
}

function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  const mode = loc.listingMode(defaultOK);

  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}

function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return (
      loc.numberingSystem === "latn" ||
      !loc.locale ||
      loc.locale.startsWith("en") ||
      new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn"
    );
  }
}

/**
 * @private
 */

class PolyNumberFormatter {
  constructor(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;

    const { padTo, floor, ...otherOpts } = opts;

    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      const intlOpts = { useGrouping: false, ...opts };
      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }

  format(i) {
    if (this.inf) {
      const fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      // to match the browser's numberformatter defaults
      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
      return padStart(fixed, this.padTo);
    }
  }
}

/**
 * @private
 */

class PolyDateFormatter {
  constructor(dt, intl, opts) {
    this.opts = opts;

    let z;
    if (dt.zone.isUniversal) {
      // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
      // That is why fixed-offset TZ is set to that unless it is:
      // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
      // 2. Unsupported by the browser:
      //    - some do not support Etc/
      //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
      const gmtOffset = -1 * (dt.offset / 60);
      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z = offsetZ;
        this.dt = dt;
      } else {
        // Not all fixed-offset zones like Etc/+4:30 are present in tzdata.
        // So we have to make do. Two cases:
        // 1. The format options tell us to show the zone. We can't do that, so the best
        // we can do is format the date in UTC.
        // 2. The format options don't tell us to show the zone. Then we can adjust them
        // the time and tell the formatter to show it to us in UTC, so that the time is right
        // and the bad zone doesn't show up.
        z = "UTC";
        if (opts.timeZoneName) {
          this.dt = dt;
        } else {
          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
        }
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }

    const intlOpts = { ...this.opts };
    if (z) {
      intlOpts.timeZone = z;
    }
    this.dtf = getCachedDTF(intl, intlOpts);
  }

  format() {
    return this.dtf.format(this.dt.toJSDate());
  }

  formatToParts() {
    return this.dtf.formatToParts(this.dt.toJSDate());
  }

  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}

/**
 * @private
 */
class PolyRelFormatter {
  constructor(intl, isEnglish, opts) {
    this.opts = { style: "long", ...opts };
    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }

  format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  }

  formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  }
}

/**
 * @private
 */

class Locale {
  static fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  }

  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
    const specifiedLocale = locale || Settings.defaultLocale;
    // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  }

  static resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  }

  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
    return Locale.create(locale, numberingSystem, outputCalendar);
  }

  constructor(locale, numbering, outputCalendar, specifiedLocale) {
    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);

    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);

    this.weekdaysCache = { format: {}, standalone: {} };
    this.monthsCache = { format: {}, standalone: {} };
    this.meridiemCache = null;
    this.eraCache = {};

    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }

  get fastNumbers() {
    if (this.fastNumbersCached == null) {
      this.fastNumbersCached = supportsFastNumbers(this);
    }

    return this.fastNumbersCached;
  }

  listingMode() {
    const isActuallyEn = this.isEnglish();
    const hasNoWeirdness =
      (this.numberingSystem === null || this.numberingSystem === "latn") &&
      (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  }

  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(
        alts.locale || this.specifiedLocale,
        alts.numberingSystem || this.numberingSystem,
        alts.outputCalendar || this.outputCalendar,
        alts.defaultToEN || false
      );
    }
  }

  redefaultToEN(alts = {}) {
    return this.clone({ ...alts, defaultToEN: true });
  }

  redefaultToSystem(alts = {}) {
    return this.clone({ ...alts, defaultToEN: false });
  }

  months(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, months, () => {
      const intl = format ? { month: length, day: "numeric" } : { month: length },
        formatStr = format ? "format" : "standalone";
      if (!this.monthsCache[formatStr][length]) {
        this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
      }
      return this.monthsCache[formatStr][length];
    });
  }

  weekdays(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, weekdays, () => {
      const intl = format
          ? { weekday: length, year: "numeric", month: "long", day: "numeric" }
          : { weekday: length },
        formatStr = format ? "format" : "standalone";
      if (!this.weekdaysCache[formatStr][length]) {
        this.weekdaysCache[formatStr][length] = mapWeekdays((dt) =>
          this.extract(dt, intl, "weekday")
        );
      }
      return this.weekdaysCache[formatStr][length];
    });
  }

  meridiems(defaultOK = true) {
    return listStuff(
      this,
      undefined,
      defaultOK,
      () => meridiems,
      () => {
        // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
        // for AM and PM. This is probably wrong, but it's makes parsing way easier.
        if (!this.meridiemCache) {
          const intl = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
            (dt) => this.extract(dt, intl, "dayperiod")
          );
        }

        return this.meridiemCache;
      }
    );
  }

  eras(length, defaultOK = true) {
    return listStuff(this, length, defaultOK, eras, () => {
      const intl = { era: length };

      // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
      // to definitely enumerate them.
      if (!this.eraCache[length]) {
        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) =>
          this.extract(dt, intl, "era")
        );
      }

      return this.eraCache[length];
    });
  }

  extract(dt, intlOpts, field) {
    const df = this.dtFormatter(dt, intlOpts),
      results = df.formatToParts(),
      matching = results.find((m) => m.type.toLowerCase() === field);
    return matching ? matching.value : null;
  }

  numberFormatter(opts = {}) {
    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
    // (in contrast, the rest of the condition is used heavily)
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  }

  dtFormatter(dt, intlOpts = {}) {
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  }

  relFormatter(opts = {}) {
    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  }

  listFormatter(opts = {}) {
    return getCachedLF(this.intl, opts);
  }

  isEnglish() {
    return (
      this.locale === "en" ||
      this.locale.toLowerCase() === "en-us" ||
      new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")
    );
  }

  equals(other) {
    return (
      this.locale === other.locale &&
      this.numberingSystem === other.numberingSystem &&
      this.outputCalendar === other.outputCalendar
    );
  }
}

/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */

function combineRegexes(...regexes) {
  const full = regexes.reduce((f, r) => f + r.source, "");
  return RegExp(`^${full}$`);
}

function combineExtractors(...extractors) {
  return (m) =>
    extractors
      .reduce(
        ([mergedVals, mergedZone, cursor], ex) => {
          const [val, zone, next] = ex(m, cursor);
          return [{ ...mergedVals, ...val }, mergedZone || zone, next];
        },
        [{}, null, 1]
      )
      .slice(0, 2);
}

function parse(s, ...patterns) {
  if (s == null) {
    return [null, null];
  }

  for (const [regex, extractor] of patterns) {
    const m = regex.exec(s);
    if (m) {
      return extractor(m);
    }
  }
  return [null, null];
}

function simpleParse(...keys) {
  return (match, cursor) => {
    const ret = {};
    let i;

    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}

// ISO and SQL parsing
const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
  isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
  isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${offsetRegex.source}?`),
  isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`),
  isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
  isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
  isoOrdinalRegex = /(\d{4})-?(\d{3})/,
  extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"),
  extractISOOrdinalData = simpleParse("year", "ordinal"),
  sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/, // dumbed-down version of the ISO one
  sqlTimeRegex = RegExp(
    `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
  ),
  sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);

function int(match, pos, fallback) {
  const m = match[pos];
  return isUndefined(m) ? fallback : parseInteger(m);
}

function extractISOYmd(match, cursor) {
  const item = {
    year: int(match, cursor),
    month: int(match, cursor + 1, 1),
    day: int(match, cursor + 2, 1),
  };

  return [item, null, cursor + 3];
}

function extractISOTime(match, cursor) {
  const item = {
    hours: int(match, cursor, 0),
    minutes: int(match, cursor + 1, 0),
    seconds: int(match, cursor + 2, 0),
    milliseconds: parseMillis(match[cursor + 3]),
  };

  return [item, null, cursor + 4];
}

function extractISOOffset(match, cursor) {
  const local = !match[cursor] && !match[cursor + 1],
    fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
    zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}

function extractIANAZone(match, cursor) {
  const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
  return [{}, zone, cursor + 1];
}

// ISO time parsing

const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);

// ISO duration parsing

const isoDuration =
  /^-?P(?:(?:(-?\d{1,9}(?:\.\d{1,9})?)Y)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,9}(?:\.\d{1,9})?)W)?(?:(-?\d{1,9}(?:\.\d{1,9})?)D)?(?:T(?:(-?\d{1,9}(?:\.\d{1,9})?)H)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;

function extractISODuration(match) {
  const [s, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] =
    match;

  const hasNegativePrefix = s[0] === "-";
  const negativeSeconds = secondStr && secondStr[0] === "-";

  const maybeNegate = (num, force = false) =>
    num !== undefined && (force || (num && hasNegativePrefix)) ? -num : num;

  return [
    {
      years: maybeNegate(parseFloating(yearStr)),
      months: maybeNegate(parseFloating(monthStr)),
      weeks: maybeNegate(parseFloating(weekStr)),
      days: maybeNegate(parseFloating(dayStr)),
      hours: maybeNegate(parseFloating(hourStr)),
      minutes: maybeNegate(parseFloating(minuteStr)),
      seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
      milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds),
    },
  ];
}

// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that
const obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60,
};

function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr),
  };

  if (secondStr) result.second = parseInteger(secondStr);
  if (weekdayStr) {
    result.weekday =
      weekdayStr.length > 3
        ? weekdaysLong.indexOf(weekdayStr) + 1
        : weekdaysShort.indexOf(weekdayStr) + 1;
  }

  return result;
}

// RFC 2822/5322
const rfc2822 =
  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function extractRFC2822(match) {
  const [
      ,
      weekdayStr,
      dayStr,
      monthStr,
      yearStr,
      hourStr,
      minuteStr,
      secondStr,
      obsOffset,
      milOffset,
      offHourStr,
      offMinuteStr,
    ] = match,
    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);

  let offset;
  if (obsOffset) {
    offset = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset = 0;
  } else {
    offset = signedOffset(offHourStr, offMinuteStr);
  }

  return [result, new FixedOffsetZone(offset)];
}

function preprocessRFC2822(s) {
  // Remove comments and folding whitespace and replace multiple-spaces with a single space
  return s
    .replace(/\([^)]*\)|[\n\t]/g, " ")
    .replace(/(\s\s+)/g, " ")
    .trim();
}

// http date

const rfc1123 =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
  rfc850 =
    /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
  ascii =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function extractRFC1123Or850(match) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

function extractASCII(match) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);

const extractISOYmdTimeAndOffset = combineExtractors(
  extractISOYmd,
  extractISOTime,
  extractISOOffset
);
const extractISOWeekTimeAndOffset = combineExtractors(
  extractISOWeekData,
  extractISOTime,
  extractISOOffset
);
const extractISOOrdinalDateAndTime = combineExtractors(
  extractISOOrdinalData,
  extractISOTime,
  extractISOOffset
);
const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);

/**
 * @private
 */

function parseISODate(s) {
  return parse(
    s,
    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime],
    [isoTimeCombinedRegex, extractISOTimeAndOffset]
  );
}

function parseRFC2822Date(s) {
  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}

function parseHTTPDate(s) {
  return parse(
    s,
    [rfc1123, extractRFC1123Or850],
    [rfc850, extractRFC1123Or850],
    [ascii, extractASCII]
  );
}

function parseISODuration(s) {
  return parse(s, [isoDuration, extractISODuration]);
}

const extractISOTimeOnly = combineExtractors(extractISOTime);

function parseISOTimeOnly(s) {
  return parse(s, [isoTimeOnly, extractISOTimeOnly]);
}

const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);

const extractISOYmdTimeOffsetAndIANAZone = combineExtractors(
  extractISOYmd,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOTimeOffsetAndIANAZone = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);

function parseSQL(s) {
  return parse(
    s,
    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone],
    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
  );
}

const INVALID$2 = "Invalid Duration";

// unit conversion constants
const lowOrderMatrix = {
    weeks: {
      days: 7,
      hours: 7 * 24,
      minutes: 7 * 24 * 60,
      seconds: 7 * 24 * 60 * 60,
      milliseconds: 7 * 24 * 60 * 60 * 1000,
    },
    days: {
      hours: 24,
      minutes: 24 * 60,
      seconds: 24 * 60 * 60,
      milliseconds: 24 * 60 * 60 * 1000,
    },
    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
    minutes: { seconds: 60, milliseconds: 60 * 1000 },
    seconds: { milliseconds: 1000 },
  },
  casualMatrix = {
    years: {
      quarters: 4,
      months: 12,
      weeks: 52,
      days: 365,
      hours: 365 * 24,
      minutes: 365 * 24 * 60,
      seconds: 365 * 24 * 60 * 60,
      milliseconds: 365 * 24 * 60 * 60 * 1000,
    },
    quarters: {
      months: 3,
      weeks: 13,
      days: 91,
      hours: 91 * 24,
      minutes: 91 * 24 * 60,
      seconds: 91 * 24 * 60 * 60,
      milliseconds: 91 * 24 * 60 * 60 * 1000,
    },
    months: {
      weeks: 4,
      days: 30,
      hours: 30 * 24,
      minutes: 30 * 24 * 60,
      seconds: 30 * 24 * 60 * 60,
      milliseconds: 30 * 24 * 60 * 60 * 1000,
    },

    ...lowOrderMatrix,
  },
  daysInYearAccurate = 146097.0 / 400,
  daysInMonthAccurate = 146097.0 / 4800,
  accurateMatrix = {
    years: {
      quarters: 4,
      months: 12,
      weeks: daysInYearAccurate / 7,
      days: daysInYearAccurate,
      hours: daysInYearAccurate * 24,
      minutes: daysInYearAccurate * 24 * 60,
      seconds: daysInYearAccurate * 24 * 60 * 60,
      milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000,
    },
    quarters: {
      months: 3,
      weeks: daysInYearAccurate / 28,
      days: daysInYearAccurate / 4,
      hours: (daysInYearAccurate * 24) / 4,
      minutes: (daysInYearAccurate * 24 * 60) / 4,
      seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
      milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4,
    },
    months: {
      weeks: daysInMonthAccurate / 7,
      days: daysInMonthAccurate,
      hours: daysInMonthAccurate * 24,
      minutes: daysInMonthAccurate * 24 * 60,
      seconds: daysInMonthAccurate * 24 * 60 * 60,
      milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000,
    },
    ...lowOrderMatrix,
  };

// units ordered by size
const orderedUnits$1 = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
];

const reverseUnits = orderedUnits$1.slice(0).reverse();

// clone really means "create another instance just like this one, but with these changes"
function clone$1(dur, alts, clear = false) {
  // deep merge for vals
  const conf = {
    values: clear ? alts.values : { ...dur.values, ...(alts.values || {}) },
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
  };
  return new Duration(conf);
}

function antiTrunc(n) {
  return n < 0 ? Math.floor(n) : Math.ceil(n);
}

// NB: mutates parameters
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  const conv = matrix[toUnit][fromUnit],
    raw = fromMap[fromUnit] / conv,
    sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]),
    // ok, so this is wild, but see the matrix in the tests
    added =
      !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
}

// NB: mutates parameters
function normalizeValues(matrix, vals) {
  reverseUnits.reduce((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}

/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime#plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration#fromMillis}, {@link Duration#fromObject}, or {@link Duration#fromISO}.
 * * **Unit values** See the {@link Duration#years}, {@link Duration.months}, {@link Duration#weeks}, {@link Duration#days}, {@link Duration#hours}, {@link Duration#minutes}, {@link Duration#seconds}, {@link Duration#milliseconds} accessors.
 * * **Configuration** See  {@link Duration#locale} and {@link Duration#numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration#plus}, {@link Duration#minus}, {@link Duration#normalize}, {@link Duration#set}, {@link Duration#reconfigure}, {@link Duration#shiftTo}, and {@link Duration#negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration#as}, {@link Duration#toISO}, {@link Duration#toFormat}, and {@link Duration#toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */
class Duration {
  /**
   * @private
   */
  constructor(config) {
    const accurate = config.conversionAccuracy === "longterm" || false;
    /**
     * @access private
     */
    this.values = config.values;
    /**
     * @access private
     */
    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */
    this.conversionAccuracy = accurate ? "longterm" : "casual";
    /**
     * @access private
     */
    this.invalid = config.invalid || null;
    /**
     * @access private
     */
    this.matrix = accurate ? accurateMatrix : casualMatrix;
    /**
     * @access private
     */
    this.isLuxonDuration = true;
  }

  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(count, opts) {
    return Duration.fromObject({ milliseconds: count }, opts);
  }

  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromObject(obj, opts = {}) {
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError(
        `Duration.fromObject: argument expected to be an object, got ${
          obj === null ? "null" : typeof obj
        }`
      );
    }

    return new Duration({
      values: normalizeObject(obj, Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy,
    });
  }

  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return Duration.fromMillis(durationLike);
    } else if (Duration.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return Duration.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError(
        `Unknown duration argument ${durationLike} of type ${typeof durationLike}`
      );
    }
  }

  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(text, opts) {
    const [parsed] = parseISODuration(text);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }

  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(text, opts) {
    const [parsed] = parseISOTimeOnly(text);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }

  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }

    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new Duration({ invalid });
    }
  }

  /**
   * @private
   */
  static normalizeUnit(unit) {
    const normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds",
    }[unit ? unit.toLowerCase() : unit];

    if (!normalized) throw new InvalidUnitError(unit);

    return normalized;
  }

  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(o) {
    return (o && o.isLuxonDuration) || false;
  }

  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }

  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }

  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
    const fmtOpts = {
      ...opts,
      floor: opts.round !== false && opts.floor !== false,
    };
    return this.isValid
      ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
      : INVALID$2;
  }

  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior use the `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   * @param opts - On option object to override the formatting. Accepts the same keys as the options parameter of the native `Int.NumberFormat` constructor, as well as `listStyle`.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(opts = {}) {
    const l = orderedUnits$1
      .map((unit) => {
        const val = this.values[unit];
        if (isUndefined(val)) {
          return null;
        }
        return this.loc
          .numberFormatter({ style: "unit", unitDisplay: "long", ...opts, unit: unit.slice(0, -1) })
          .format(val);
      })
      .filter((n) => n);

    return this.loc
      .listFormatter({ type: "conjunction", style: opts.listStyle || "narrow", ...opts })
      .format(l);
  }

  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    if (!this.isValid) return {};
    return { ...this.values };
  }

  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    // we could use the formatter, but this is an easier way to get the minimum string
    if (!this.isValid) return null;

    let s = "P";
    if (this.years !== 0) s += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0) s += this.weeks + "W";
    if (this.days !== 0) s += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
      s += "T";
    if (this.hours !== 0) s += this.hours + "H";
    if (this.minutes !== 0) s += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0)
      // this will handle "floating point madness" by removing extra decimal places
      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
    if (s === "P") s += "T0S";
    return s;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(opts = {}) {
    if (!this.isValid) return null;

    const millis = this.toMillis();
    if (millis < 0 || millis >= 86400000) return null;

    opts = {
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended",
      ...opts,
    };

    const value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");

    let fmt = opts.format === "basic" ? "hhmm" : "hh:mm";

    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
      fmt += opts.format === "basic" ? "ss" : ":ss";
      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
        fmt += ".SSS";
      }
    }

    let str = value.toFormat(fmt);

    if (opts.includePrefix) {
      str = "T" + str;
    }

    return str;
  }

  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }

  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }

  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.as("milliseconds");
  }

  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }

  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(duration) {
    if (!this.isValid) return this;

    const dur = Duration.fromDurationLike(duration),
      result = {};

    for (const k of orderedUnits$1) {
      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }

    return clone$1(this, { values: result }, true);
  }

  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(duration) {
    if (!this.isValid) return this;

    const dur = Duration.fromDurationLike(duration);
    return this.plus(dur.negate());
  }

  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(fn) {
    if (!this.isValid) return this;
    const result = {};
    for (const k of Object.keys(this.values)) {
      result[k] = asNumber(fn(this.values[k], k));
    }
    return clone$1(this, { values: result }, true);
  }

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }

  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(values) {
    if (!this.isValid) return this;

    const mixed = { ...this.values, ...normalizeObject(values, Duration.normalizeUnit) };
    return clone$1(this, { values: mixed });
  }

  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem }),
      opts = { loc };

    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }

    return clone$1(this, opts);
  }

  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }

  /**
   * Reduce this Duration to its canonical representation in its current units.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone$1(this, { values: vals }, true);
  }

  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...units) {
    if (!this.isValid) return this;

    if (units.length === 0) {
      return this;
    }

    units = units.map((u) => Duration.normalizeUnit(u));

    const built = {},
      accumulated = {},
      vals = this.toObject();
    let lastUnit;

    for (const k of orderedUnits$1) {
      if (units.indexOf(k) >= 0) {
        lastUnit = k;

        let own = 0;

        // anything we haven't boiled down yet should get boiled to this unit
        for (const ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        }

        // plus anything that's already in this unit
        if (isNumber(vals[k])) {
          own += vals[k];
        }

        const i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = (own * 1000 - i * 1000) / 1000;

        // plus anything further down the chain that should be rolled up in to this
        for (const down in vals) {
          if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        }
        // otherwise, keep it in the wings to boil it later
      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    }

    // anything leftover becomes the decimal for the last unit
    // lastUnit must be defined since units is not empty
    for (const key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] +=
          key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }

    return clone$1(this, { values: built }, true).normalize();
  }

  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const negated = {};
    for (const k of Object.keys(this.values)) {
      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
    }
    return clone$1(this, { values: negated }, true);
  }

  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }

  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }

  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }

  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }

  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }

  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }

  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }

  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }

  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }

  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }

  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }

  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }

  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    if (!this.loc.equals(other.loc)) {
      return false;
    }

    function eq(v1, v2) {
      // Consider 0 and undefined as equal
      if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
      return v1 === v2;
    }

    for (const u of orderedUnits$1) {
      if (!eq(this.values[u], other.values[u])) {
        return false;
      }
    }
    return true;
  }
}

const INVALID$1 = "Invalid Interval";

// checks if the start is equal to or before the end
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid(
      "end before start",
      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
    );
  } else {
    return null;
  }
}

/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link Interval#fromDateTimes}, {@link Interval#after}, {@link Interval#before}, or {@link Interval#fromISO}.
 * * **Accessors** Use {@link Interval#start} and {@link Interval#end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link Interval#count}, {@link Interval#length}, {@link Interval#hasSame}, {@link Interval#contains}, {@link Interval#isAfter}, or {@link Interval#isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link Interval#set}, {@link Interval#splitAt}, {@link Interval#splitBy}, {@link Interval#divideEqually}, {@link Interval#merge}, {@link Interval#xor}, {@link Interval#union}, {@link Interval#intersection}, or {@link Interval#difference}.
 * * **Comparison** To compare this Interval to another one, use {@link Interval#equals}, {@link Interval#overlaps}, {@link Interval#abutsStart}, {@link Interval#abutsEnd}, {@link Interval#engulfs}
 * * **Output** To convert the Interval into other representations, see {@link Interval#toString}, {@link Interval#toISO}, {@link Interval#toISODate}, {@link Interval#toISOTime}, {@link Interval#toFormat}, and {@link Interval#toDuration}.
 */
class Interval {
  /**
   * @private
   */
  constructor(config) {
    /**
     * @access private
     */
    this.s = config.start;
    /**
     * @access private
     */
    this.e = config.end;
    /**
     * @access private
     */
    this.invalid = config.invalid || null;
    /**
     * @access private
     */
    this.isLuxonInterval = true;
  }

  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }

    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new Interval({ invalid });
    }
  }

  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(start, end) {
    const builtStart = friendlyDateTime(start),
      builtEnd = friendlyDateTime(end);

    const validateError = validateStartEnd(builtStart, builtEnd);

    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd,
      });
    } else {
      return validateError;
    }
  }

  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(start, duration) {
    const dur = Duration.fromDurationLike(duration),
      dt = friendlyDateTime(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }

  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(end, duration) {
    const dur = Duration.fromDurationLike(duration),
      dt = friendlyDateTime(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }

  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(text, opts) {
    const [s, e] = (text || "").split("/", 2);
    if (s && e) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s, opts);
        startIsValid = start.isValid;
      } catch (e) {
        startIsValid = false;
      }

      let end, endIsValid;
      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e) {
        endIsValid = false;
      }

      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }

      if (startIsValid) {
        const dur = Duration.fromISO(e, opts);
        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        const dur = Duration.fromISO(s, opts);
        if (dur.isValid) {
          return Interval.before(end, dur);
        }
      }
    }
    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
  }

  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(o) {
    return (o && o.isLuxonInterval) || false;
  }

  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }

  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }

  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }

  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }

  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }

  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(unit = "milliseconds") {
    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
  }

  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @return {number}
   */
  count(unit = "milliseconds") {
    if (!this.isValid) return NaN;
    const start = this.start.startOf(unit),
      end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  }

  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }

  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }

  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }

  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }

  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }

  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start, end } = {}) {
    if (!this.isValid) return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }

  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...dateTimes) {
    if (!this.isValid) return [];
    const sorted = dateTimes
        .map(friendlyDateTime)
        .filter((d) => this.contains(d))
        .sort(),
      results = [];
    let { s } = this,
      i = 0;

    while (s < this.e) {
      const added = sorted[i] || this.e,
        next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      i += 1;
    }

    return results;
  }

  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(duration) {
    const dur = Duration.fromDurationLike(duration);

    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }

    let { s } = this,
      idx = 1,
      next;

    const results = [];
    while (s < this.e) {
      const added = this.start.plus(dur.mapUnits((x) => x * idx));
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      idx += 1;
    }

    return results;
  }

  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }

  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }

  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }

  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }

  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }

  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    return this.s.equals(other.s) && this.e.equals(other.e);
  }

  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(other) {
    if (!this.isValid) return this;
    const s = this.s > other.s ? this.s : other.s,
      e = this.e < other.e ? this.e : other.e;

    if (s >= e) {
      return null;
    } else {
      return Interval.fromDateTimes(s, e);
    }
  }

  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(other) {
    if (!this.isValid) return this;
    const s = this.s < other.s ? this.s : other.s,
      e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s, e);
  }

  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(intervals) {
    const [found, final] = intervals
      .sort((a, b) => a.s - b.s)
      .reduce(
        ([sofar, current], item) => {
          if (!current) {
            return [sofar, item];
          } else if (current.overlaps(item) || current.abutsStart(item)) {
            return [sofar, current.union(item)];
          } else {
            return [sofar.concat([current]), item];
          }
        },
        [[], null]
      );
    if (final) {
      found.push(final);
    }
    return found;
  }

  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(intervals) {
    let start = null,
      currentCount = 0;
    const results = [],
      ends = intervals.map((i) => [
        { time: i.s, type: "s" },
        { time: i.e, type: "e" },
      ]),
      flattened = Array.prototype.concat(...ends),
      arr = flattened.sort((a, b) => a.time - b.time);

    for (const i of arr) {
      currentCount += i.type === "s" ? 1 : -1;

      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }

        start = null;
      }
    }

    return Interval.merge(results);
  }

  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...intervals) {
    return Interval.xor([this].concat(intervals))
      .map((i) => this.intersection(i))
      .filter((i) => i && !i.isEmpty());
  }

  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    if (!this.isValid) return INVALID$1;
    return `[${this.s.toISO()} – ${this.e.toISO()})`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(opts) {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toISODate()}/${this.e.toISODate()}`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(opts) {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
  }

  /**
   * Returns a string representation of this Interval formatted according to the specified format string.
   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime#toFormat} for details.
   * @param {Object} opts - options
   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
   * @return {string}
   */
  toFormat(dateFormat, { separator = " – " } = {}) {
    if (!this.isValid) return INVALID$1;
    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
  }

  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  }

  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  }
}

/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */
class Info {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(zone = Settings.defaultZone) {
    const proto = DateTime.now().setZone(zone).set({ month: 12 });

    return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
  }

  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  }

  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(input) {
    return normalizeZone(input, Settings.defaultZone);
  }

  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(
    length = "long",
    { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}
  ) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }

  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(
    length = "long",
    { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}
  ) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }

  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }

  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(
    length = "long",
    { locale = null, numberingSystem = null, locObj = null } = {}
  ) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }

  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale = null } = {}) {
    return Locale.create(locale).meridiems();
  }

  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(length = "short", { locale = null } = {}) {
    return Locale.create(locale, null, "gregory").eras(length);
  }

  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { relative: false }
   * @return {Object}
   */
  static features() {
    return { relative: hasRelative() };
  }
}

function dayDiff(earlier, later) {
  const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(),
    ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(Duration.fromMillis(ms).as("days"));
}

function highOrderDiffs(cursor, later, units) {
  const differs = [
    ["years", (a, b) => b.year - a.year],
    ["quarters", (a, b) => b.quarter - a.quarter],
    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
    [
      "weeks",
      (a, b) => {
        const days = dayDiff(a, b);
        return (days - (days % 7)) / 7;
      },
    ],
    ["days", dayDiff],
  ];

  const results = {};
  let lowestOrder, highWater;

  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;

      let delta = differ(cursor, later);
      highWater = cursor.plus({ [unit]: delta });

      if (highWater > later) {
        cursor = cursor.plus({ [unit]: delta - 1 });
        delta -= 1;
      } else {
        cursor = highWater;
      }

      results[unit] = delta;
    }
  }

  return [cursor, results, highWater, lowestOrder];
}

function diff (earlier, later, units, opts) {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);

  const remainingMillis = later - cursor;

  const lowerOrderUnits = units.filter(
    (u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
  );

  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }

    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }

  const duration = Duration.fromObject(results, opts);

  if (lowerOrderUnits.length > 0) {
    return Duration.fromMillis(remainingMillis, opts)
      .shiftTo(...lowerOrderUnits)
      .plus(duration);
  } else {
    return duration;
  }
}

const numberingSystems = {
  arab: "[\u0660-\u0669]",
  arabext: "[\u06F0-\u06F9]",
  bali: "[\u1B50-\u1B59]",
  beng: "[\u09E6-\u09EF]",
  deva: "[\u0966-\u096F]",
  fullwide: "[\uFF10-\uFF19]",
  gujr: "[\u0AE6-\u0AEF]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[\u17E0-\u17E9]",
  knda: "[\u0CE6-\u0CEF]",
  laoo: "[\u0ED0-\u0ED9]",
  limb: "[\u1946-\u194F]",
  mlym: "[\u0D66-\u0D6F]",
  mong: "[\u1810-\u1819]",
  mymr: "[\u1040-\u1049]",
  orya: "[\u0B66-\u0B6F]",
  tamldec: "[\u0BE6-\u0BEF]",
  telu: "[\u0C66-\u0C6F]",
  thai: "[\u0E50-\u0E59]",
  tibt: "[\u0F20-\u0F29]",
  latn: "\\d",
};

const numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881],
};

const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");

function parseDigits(str) {
  let value = parseInt(str, 10);
  if (isNaN(value)) {
    value = "";
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);

      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (const key in numberingSystemsUTF16) {
          const [min, max] = numberingSystemsUTF16[key];
          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }
    return parseInt(value, 10);
  } else {
    return value;
  }
}

function digitRegex({ numberingSystem }, append = "") {
  return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
}

const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

function intUnit(regex, post = (i) => i) {
  return { regex, deser: ([s]) => post(parseDigits(s)) };
}

const NBSP = String.fromCharCode(160);
const spaceOrNBSP = `( |${NBSP})`;
const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");

function fixListRegex(s) {
  // make dots optional and also make them literal
  // make space and non breakable space characters interchangeable
  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}

function stripInsensitivities(s) {
  return s
    .replace(/\./g, "") // ignore dots that were made optional
    .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
    .toLowerCase();
}

function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: ([s]) =>
        strings.findIndex((i) => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex,
    };
  }
}

function offset(regex, groups) {
  return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
}

function simple(regex) {
  return { regex, deser: ([s]) => s };
}

function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

function unitForToken(token, loc) {
  const one = digitRegex(loc),
    two = digitRegex(loc, "{2}"),
    three = digitRegex(loc, "{3}"),
    four = digitRegex(loc, "{4}"),
    six = digitRegex(loc, "{6}"),
    oneOrTwo = digitRegex(loc, "{1,2}"),
    oneToThree = digitRegex(loc, "{1,3}"),
    oneToSix = digitRegex(loc, "{1,6}"),
    oneToNine = digitRegex(loc, "{1,9}"),
    twoToFour = digitRegex(loc, "{2,4}"),
    fourToSix = digitRegex(loc, "{4,6}"),
    literal = (t) => ({ regex: RegExp(escapeToken(t.val)), deser: ([s]) => s, literal: true }),
    unitate = (t) => {
      if (token.literal) {
        return literal(t);
      }
      switch (t.val) {
        // era
        case "G":
          return oneOf(loc.eras("short", false), 0);
        case "GG":
          return oneOf(loc.eras("long", false), 0);
        // years
        case "y":
          return intUnit(oneToSix);
        case "yy":
          return intUnit(twoToFour, untruncateYear);
        case "yyyy":
          return intUnit(four);
        case "yyyyy":
          return intUnit(fourToSix);
        case "yyyyyy":
          return intUnit(six);
        // months
        case "M":
          return intUnit(oneOrTwo);
        case "MM":
          return intUnit(two);
        case "MMM":
          return oneOf(loc.months("short", true, false), 1);
        case "MMMM":
          return oneOf(loc.months("long", true, false), 1);
        case "L":
          return intUnit(oneOrTwo);
        case "LL":
          return intUnit(two);
        case "LLL":
          return oneOf(loc.months("short", false, false), 1);
        case "LLLL":
          return oneOf(loc.months("long", false, false), 1);
        // dates
        case "d":
          return intUnit(oneOrTwo);
        case "dd":
          return intUnit(two);
        // ordinals
        case "o":
          return intUnit(oneToThree);
        case "ooo":
          return intUnit(three);
        // time
        case "HH":
          return intUnit(two);
        case "H":
          return intUnit(oneOrTwo);
        case "hh":
          return intUnit(two);
        case "h":
          return intUnit(oneOrTwo);
        case "mm":
          return intUnit(two);
        case "m":
          return intUnit(oneOrTwo);
        case "q":
          return intUnit(oneOrTwo);
        case "qq":
          return intUnit(two);
        case "s":
          return intUnit(oneOrTwo);
        case "ss":
          return intUnit(two);
        case "S":
          return intUnit(oneToThree);
        case "SSS":
          return intUnit(three);
        case "u":
          return simple(oneToNine);
        case "uu":
          return simple(oneOrTwo);
        case "uuu":
          return intUnit(one);
        // meridiem
        case "a":
          return oneOf(loc.meridiems(), 0);
        // weekYear (k)
        case "kkkk":
          return intUnit(four);
        case "kk":
          return intUnit(twoToFour, untruncateYear);
        // weekNumber (W)
        case "W":
          return intUnit(oneOrTwo);
        case "WW":
          return intUnit(two);
        // weekdays
        case "E":
        case "c":
          return intUnit(one);
        case "EEE":
          return oneOf(loc.weekdays("short", false, false), 1);
        case "EEEE":
          return oneOf(loc.weekdays("long", false, false), 1);
        case "ccc":
          return oneOf(loc.weekdays("short", true, false), 1);
        case "cccc":
          return oneOf(loc.weekdays("long", true, false), 1);
        // offset/zone
        case "Z":
        case "ZZ":
          return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
        case "ZZZ":
          return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
        // because we don't have any way to figure out what they are
        case "z":
          return simple(/[a-z_+-/]{1,256}?/i);
        default:
          return literal(t);
      }
    };

  const unit = unitate(token) || {
    invalidReason: MISSING_FTP,
  };

  unit.token = token;

  return unit;
}

const partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy",
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM",
  },
  day: {
    numeric: "d",
    "2-digit": "dd",
  },
  weekday: {
    short: "EEE",
    long: "EEEE",
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh",
  },
  minute: {
    numeric: "m",
    "2-digit": "mm",
  },
  second: {
    numeric: "s",
    "2-digit": "ss",
  },
};

function tokenForPart(part, locale, formatOpts) {
  const { type, value } = part;

  if (type === "literal") {
    return {
      literal: true,
      val: value,
    };
  }

  const style = formatOpts[type];

  let val = partTypeStyleToTokenVal[type];
  if (typeof val === "object") {
    val = val[style];
  }

  if (val) {
    return {
      literal: false,
      val,
    };
  }

  return undefined;
}

function buildRegex(units) {
  const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
  return [`^${re}$`, units];
}

function match(input, regex, handlers) {
  const matches = input.match(regex);

  if (matches) {
    const all = {};
    let matchIndex = 1;
    for (const i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        const h = handlers[i],
          groups = h.groups ? h.groups + 1 : 1;
        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}

function dateTimeFromMatches(matches) {
  const toField = (token) => {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };

  let zone = null;
  let specificOffset;
  if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }

  if (!isUndefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(matches.Z);
    }
    specificOffset = matches.Z;
  }

  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }

  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }

  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }

  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }

  const vals = Object.keys(matches).reduce((r, k) => {
    const f = toField(k);
    if (f) {
      r[f] = matches[k];
    }

    return r;
  }, {});

  return [vals, zone, specificOffset];
}

let dummyDateTimeCache = null;

function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }

  return dummyDateTimeCache;
}

function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }

  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);

  if (!formatOpts) {
    return token;
  }

  const formatter = Formatter.create(locale, formatOpts);
  const parts = formatter.formatDateTimeParts(getDummyDateTime());

  const tokens = parts.map((p) => tokenForPart(p, locale, formatOpts));

  if (tokens.includes(undefined)) {
    return token;
  }

  return tokens;
}

function expandMacroTokens(tokens, locale) {
  return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
}

/**
 * @private
 */

function explainFromTokens(locale, input, format) {
  const tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
    units = tokens.map((t) => unitForToken(t, locale)),
    disqualifyingUnit = units.find((t) => t.invalidReason);

  if (disqualifyingUnit) {
    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
  } else {
    const [regexString, handlers] = buildRegex(units),
      regex = RegExp(regexString, "i"),
      [rawMatches, matches] = match(input, regex, handlers),
      [result, zone, specificOffset] = matches
        ? dateTimeFromMatches(matches)
        : [null, null, undefined];
    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
      throw new ConflictingSpecificationError(
        "Can't include meridiem when specifying 24-hour format"
      );
    }
    return { input, tokens, regex, rawMatches, matches, result, zone, specificOffset };
  }
}

function parseFromTokens(locale, input, format) {
  const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
  return [result, zone, specificOffset, invalidReason];
}

const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function unitOutOfRange(unit, value) {
  return new Invalid(
    "unit out of range",
    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
  );
}

function dayOfWeek(year, month, day) {
  const d = new Date(Date.UTC(year, month - 1, day));

  if (year < 100 && year >= 0) {
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }

  const js = d.getUTCDay();

  return js === 0 ? 7 : js;
}

function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}

function uncomputeOrdinal(year, ordinal) {
  const table = isLeapYear(year) ? leapLadder : nonLeapLadder,
    month0 = table.findIndex((i) => i < ordinal),
    day = ordinal - table[month0];
  return { month: month0 + 1, day };
}

/**
 * @private
 */

function gregorianToWeek(gregObj) {
  const { year, month, day } = gregObj,
    ordinal = computeOrdinal(year, month, day),
    weekday = dayOfWeek(year, month, day);

  let weekNumber = Math.floor((ordinal - weekday + 10) / 7),
    weekYear;

  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear);
  } else if (weekNumber > weeksInWeekYear(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }

  return { weekYear, weekNumber, weekday, ...timeObject(gregObj) };
}

function weekToGregorian(weekData) {
  const { weekYear, weekNumber, weekday } = weekData,
    weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
    yearInDays = daysInYear(weekYear);

  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
    year;

  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }

  const { month, day } = uncomputeOrdinal(year, ordinal);
  return { year, month, day, ...timeObject(weekData) };
}

function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData;
  const ordinal = computeOrdinal(year, month, day);
  return { year, ordinal, ...timeObject(gregData) };
}

function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData;
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return { year, month, day, ...timeObject(ordinalData) };
}

function hasInvalidWeekData(obj) {
  const validYear = isInteger(obj.weekYear),
    validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)),
    validWeekday = integerBetween(obj.weekday, 1, 7);

  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else return false;
}

function hasInvalidOrdinalData(obj) {
  const validYear = isInteger(obj.year),
    validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else return false;
}

function hasInvalidGregorianData(obj) {
  const validYear = isInteger(obj.year),
    validMonth = integerBetween(obj.month, 1, 12),
    validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else return false;
}

function hasInvalidTimeData(obj) {
  const { hour, minute, second, millisecond } = obj;
  const validHour =
      integerBetween(hour, 0, 23) ||
      (hour === 24 && minute === 0 && second === 0 && millisecond === 0),
    validMinute = integerBetween(minute, 0, 59),
    validSecond = integerBetween(second, 0, 59),
    validMillisecond = integerBetween(millisecond, 0, 999);

  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else return false;
}

const INVALID = "Invalid DateTime";
const MAX_DATE = 8.64e15;

function unsupportedZone(zone) {
  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
}

// we cache week data on the DT object and this intermediates the cache
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }
  return dt.weekData;
}

// clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties
function clone(inst, alts) {
  const current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid,
  };
  return new DateTime({ ...current, ...alts, old: current });
}

// find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
function fixOffset(localTS, o, tz) {
  // Our UTC time is just a guess because our offset is just a guess
  let utcGuess = localTS - o * 60 * 1000;

  // Test whether the zone matches the offset for this ts
  const o2 = tz.offset(utcGuess);

  // If so, offset didn't change and we're done
  if (o === o2) {
    return [utcGuess, o];
  }

  // If not, change the ts by the difference in the offset
  utcGuess -= (o2 - o) * 60 * 1000;

  // If that gives us the local time we want, we're done
  const o3 = tz.offset(utcGuess);
  if (o2 === o3) {
    return [utcGuess, o2];
  }

  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
}

// convert an epoch timestamp into a calendar object with the given offset
function tsToObj(ts, offset) {
  ts += offset * 60 * 1000;

  const d = new Date(ts);

  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds(),
  };
}

// convert a calendar object to a epoch timestamp
function objToTS(obj, offset, zone) {
  return fixOffset(objToLocalTS(obj), offset, zone);
}

// create a new DT instance by adding a duration, adjusting for DSTs
function adjustTime(inst, dur) {
  const oPre = inst.o,
    year = inst.c.year + Math.trunc(dur.years),
    month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
    c = {
      ...inst.c,
      year,
      month,
      day:
        Math.min(inst.c.day, daysInMonth(year, month)) +
        Math.trunc(dur.days) +
        Math.trunc(dur.weeks) * 7,
    },
    millisToAdd = Duration.fromObject({
      years: dur.years - Math.trunc(dur.years),
      quarters: dur.quarters - Math.trunc(dur.quarters),
      months: dur.months - Math.trunc(dur.months),
      weeks: dur.weeks - Math.trunc(dur.weeks),
      days: dur.days - Math.trunc(dur.days),
      hours: dur.hours,
      minutes: dur.minutes,
      seconds: dur.seconds,
      milliseconds: dur.milliseconds,
    }).as("milliseconds"),
    localTS = objToLocalTS(c);

  let [ts, o] = fixOffset(localTS, oPre, inst.zone);

  if (millisToAdd !== 0) {
    ts += millisToAdd;
    // that could have changed the offset by going over a DST, but we want to keep the ts the same
    o = inst.zone.offset(ts);
  }

  return { ts, o };
}

// helper useful in turning the results of parsing into real dates
// by handling the zone options
function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0) {
    const interpretationZone = parsedZone || zone,
      inst = DateTime.fromObject(parsed, {
        ...opts,
        zone: interpretationZone,
        specificOffset,
      });
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(
      new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`)
    );
  }
}

// if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details
function toTechFormat(dt, format, allowZ = true) {
  return dt.isValid
    ? Formatter.create(Locale.create("en-US"), {
        allowZ,
        forceSimple: true,
      }).formatDateTimeFromString(dt, format)
    : null;
}

function toISODate(o, extended) {
  const longFormat = o.c.year > 9999 || o.c.year < 0;
  let c = "";
  if (longFormat && o.c.year >= 0) c += "+";
  c += padStart(o.c.year, longFormat ? 6 : 4);

  if (extended) {
    c += "-";
    c += padStart(o.c.month);
    c += "-";
    c += padStart(o.c.day);
  } else {
    c += padStart(o.c.month);
    c += padStart(o.c.day);
  }
  return c;
}

function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset) {
  let c = padStart(o.c.hour);
  if (extended) {
    c += ":";
    c += padStart(o.c.minute);
    if (o.c.second !== 0 || !suppressSeconds) {
      c += ":";
    }
  } else {
    c += padStart(o.c.minute);
  }

  if (o.c.second !== 0 || !suppressSeconds) {
    c += padStart(o.c.second);

    if (o.c.millisecond !== 0 || !suppressMilliseconds) {
      c += ".";
      c += padStart(o.c.millisecond, 3);
    }
  }

  if (includeOffset) {
    if (o.isOffsetFixed && o.offset === 0) {
      c += "Z";
    } else if (o.o < 0) {
      c += "-";
      c += padStart(Math.trunc(-o.o / 60));
      c += ":";
      c += padStart(Math.trunc(-o.o % 60));
    } else {
      c += "+";
      c += padStart(Math.trunc(o.o / 60));
      c += ":";
      c += padStart(Math.trunc(o.o % 60));
    }
  }
  return c;
}

// defaults for unspecified units in the supported calendars
const defaultUnitValues = {
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  defaultWeekUnitValues = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  defaultOrdinalUnitValues = {
    ordinal: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  };

// Units in the supported calendars, sorted by bigness
const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  orderedWeekUnits = [
    "weekYear",
    "weekNumber",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond",
  ],
  orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

// standardize case and plurality in units
function normalizeUnit(unit) {
  const normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal",
  }[unit.toLowerCase()];

  if (!normalized) throw new InvalidUnitError(unit);

  return normalized;
}

// this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
function quickDT(obj, opts) {
  const zone = normalizeZone(opts.zone, Settings.defaultZone),
    loc = Locale.fromObject(opts),
    tsNow = Settings.now();

  let ts, o;

  // assume we have the higher-order units
  if (!isUndefined(obj.year)) {
    for (const u of orderedUnits) {
      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }

    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) {
      return DateTime.invalid(invalid);
    }

    const offsetProvis = zone.offset(tsNow);
    [ts, o] = objToTS(obj, offsetProvis, zone);
  } else {
    ts = tsNow;
  }

  return new DateTime({ ts, zone, loc, o });
}

function diffRelative(start, end, opts) {
  const round = isUndefined(opts.round) ? true : opts.round,
    format = (c, unit) => {
      c = roundTo(c, round || opts.calendary ? 0 : 2, true);
      const formatter = end.loc.clone(opts).relFormatter(opts);
      return formatter.format(c, unit);
    },
    differ = (unit) => {
      if (opts.calendary) {
        if (!end.hasSame(start, unit)) {
          return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
        } else return 0;
      } else {
        return end.diff(start, unit).get(unit);
      }
    };

  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }

  for (const unit of opts.units) {
    const count = differ(unit);
    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }
  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}

function lastOpts(argList) {
  let opts = {},
    args;
  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }
  return [opts, args];
}

/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link DateTime#local}, {@link DateTime#utc}, and (most flexibly) {@link DateTime#fromObject}. To create one from a standard string format, use {@link DateTime#fromISO}, {@link DateTime#fromHTTP}, and {@link DateTime#fromRFC2822}. To create one from a custom string format, use {@link DateTime#fromFormat}. To create one from a native JS date, use {@link DateTime#fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link DateTime#toObject}), use the {@link DateTime#year}, {@link DateTime#month},
 * {@link DateTime#day}, {@link DateTime#hour}, {@link DateTime#minute}, {@link DateTime#second}, {@link DateTime#millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link DateTime#weekYear}, {@link DateTime#weekNumber}, and {@link DateTime#weekday} accessors.
 * * **Configuration** See the {@link DateTime#locale} and {@link DateTime#numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link DateTime#set}, {@link DateTime#reconfigure}, {@link DateTime#setZone}, {@link DateTime#setLocale}, {@link DateTime.plus}, {@link DateTime#minus}, {@link DateTime#endOf}, {@link DateTime#startOf}, {@link DateTime#toUTC}, and {@link DateTime#toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link DateTime#toRelative}, {@link DateTime#toRelativeCalendar}, {@link DateTime#toJSON}, {@link DateTime#toISO}, {@link DateTime#toHTTP}, {@link DateTime#toObject}, {@link DateTime#toRFC2822}, {@link DateTime#toString}, {@link DateTime#toLocaleString}, {@link DateTime#toFormat}, {@link DateTime#toMillis} and {@link DateTime#toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */
class DateTime {
  /**
   * @access private
   */
  constructor(config) {
    const zone = config.zone || Settings.defaultZone;

    let invalid =
      config.invalid ||
      (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) ||
      (!zone.isValid ? unsupportedZone(zone) : null);
    /**
     * @access private
     */
    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;

    let c = null,
      o = null;
    if (!invalid) {
      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

      if (unchanged) {
        [c, o] = [config.old.c, config.old.o];
      } else {
        const ot = zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? null : c;
        o = invalid ? null : ot;
      }
    }

    /**
     * @access private
     */
    this._zone = zone;
    /**
     * @access private
     */
    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */
    this.invalid = invalid;
    /**
     * @access private
     */
    this.weekData = null;
    /**
     * @access private
     */
    this.c = c;
    /**
     * @access private
     */
    this.o = o;
    /**
     * @access private
     */
    this.isLuxonDateTime = true;
  }

  // CONSTRUCT

  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new DateTime({});
  }

  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [opts, args] = lastOpts(arguments),
      [year, month, day, hour, minute, second, millisecond] = args;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }

  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [opts, args] = lastOpts(arguments),
      [year, month, day, hour, minute, second, millisecond] = args;

    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }

  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(date, options = {}) {
    const ts = isDate(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }

    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    return new DateTime({
      ts: ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options),
    });
  }

  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(milliseconds, options = {}) {
    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError(
        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
      );
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options),
      });
    }
  }

  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(seconds, options = {}) {
    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1000,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options),
      });
    }
  }

  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  static fromObject(obj, opts = {}) {
    obj = obj || {};
    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    const tsNow = Settings.now(),
      offsetProvis = !isUndefined(opts.specificOffset)
        ? opts.specificOffset
        : zoneToUse.offset(tsNow),
      normalized = normalizeObject(obj, normalizeUnit),
      containsOrdinal = !isUndefined(normalized.ordinal),
      containsGregorYear = !isUndefined(normalized.year),
      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
      containsGregor = containsGregorYear || containsGregorMD,
      definiteWeekDef = normalized.weekYear || normalized.weekNumber,
      loc = Locale.fromObject(opts);

    // cases:
    // just a weekday -> this week's instance of that weekday, no worries
    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
    // (gregorian month or day) + ordinal -> error
    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor);

    // configure ourselves to deal with gregorian dates or week stuff
    let units,
      defaultValues,
      objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    }

    // set default values for missing stuff
    let foundFirst = false;
    for (const u of units) {
      const v = normalized[u];
      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    }

    // make sure the values we have are in range
    const higherOrderInvalid = useWeekData
        ? hasInvalidWeekData(normalized)
        : containsOrdinal
        ? hasInvalidOrdinalData(normalized)
        : hasInvalidGregorianData(normalized),
      invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

    if (invalid) {
      return DateTime.invalid(invalid);
    }

    // compute the actual time
    const gregorian = useWeekData
        ? weekToGregorian(normalized)
        : containsOrdinal
        ? ordinalToGregorian(normalized)
        : normalized,
      [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
      inst = new DateTime({
        ts: tsFinal,
        zone: zoneToUse,
        o: offsetFinal,
        loc,
      });

    // gregorian data + weekday serves only to validate
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid(
        "mismatched weekday",
        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
      );
    }

    return inst;
  }

  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(text, opts = {}) {
    const [vals, parsedZone] = parseISODate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }

  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(text, opts = {}) {
    const [vals, parsedZone] = parseRFC2822Date(text);
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }

  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(text, opts = {}) {
    const [vals, parsedZone] = parseHTTPDate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }

  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(text, fmt, opts = {}) {
    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }

    const { locale = null, numberingSystem = null } = opts,
      localeToUse = Locale.fromOpts({
        locale,
        numberingSystem,
        defaultToEN: true,
      }),
      [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
    }
  }

  /**
   * @deprecated use fromFormat instead
   */
  static fromString(text, fmt, opts = {}) {
    return DateTime.fromFormat(text, fmt, opts);
  }

  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(text, opts = {}) {
    const [vals, parsedZone] = parseSQL(text);
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }

  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }

    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new DateTime({ invalid });
    }
  }

  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(o) {
    return (o && o.isLuxonDateTime) || false;
  }

  // INFO

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(unit) {
    return this[unit];
  }

  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }

  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }

  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }

  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }

  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }

  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }

  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }

  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }

  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }

  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }

  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }

  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }

  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }

  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }

  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }

  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }

  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
  }

  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
  }

  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
  }

  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
  }

  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
  }

  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
  }

  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }

  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }

  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }

  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale,
      });
    } else {
      return null;
    }
  }

  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale,
      });
    } else {
      return null;
    }
  }

  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }

  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return (
        this.offset > this.set({ month: 1 }).offset || this.offset > this.set({ month: 5 }).offset
      );
    }
  }

  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return isLeapYear(this.year);
  }

  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return daysInMonth(this.year, this.month);
  }

  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? daysInYear(this.year) : NaN;
  }

  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
  }

  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(opts = {}) {
    const { locale, numberingSystem, calendar } = Formatter.create(
      this.loc.clone(opts),
      opts
    ).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }

  // TRANSFORM

  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(offset = 0, opts = {}) {
    return this.setZone(FixedOffsetZone.instance(offset), opts);
  }

  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(Settings.defaultZone);
  }

  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = normalizeZone(zone, Settings.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      let newTS = this.ts;
      if (keepLocalTime || keepCalendarTime) {
        const offsetGuess = zone.offset(this.ts);
        const asObj = this.toObject();
        [newTS] = objToTS(asObj, offsetGuess, zone);
      }
      return clone(this, { ts: newTS, zone });
    }
  }

  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
    return clone(this, { loc });
  }

  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(locale) {
    return this.reconfigure({ locale });
  }

  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(values) {
    if (!this.isValid) return this;

    const normalized = normalizeObject(values, normalizeUnit),
      settingWeekStuff =
        !isUndefined(normalized.weekYear) ||
        !isUndefined(normalized.weekNumber) ||
        !isUndefined(normalized.weekday),
      containsOrdinal = !isUndefined(normalized.ordinal),
      containsGregorYear = !isUndefined(normalized.year),
      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
      containsGregor = containsGregorYear || containsGregorMD,
      definiteWeekDef = normalized.weekYear || normalized.weekNumber;

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    let mixed;
    if (settingWeekStuff) {
      mixed = weekToGregorian({ ...gregorianToWeek(this.c), ...normalized });
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian({ ...gregorianToOrdinal(this.c), ...normalized });
    } else {
      mixed = { ...this.toObject(), ...normalized };

      // if we didn't set the day but we ended up on an overflow date,
      // use the last day of the right month
      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }

    const [ts, o] = objToTS(mixed, this.o, this.zone);
    return clone(this, { ts, o });
  }

  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration);
    return clone(this, adjustTime(this, dur));
  }

  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration).negate();
    return clone(this, adjustTime(this, dur));
  }

  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(unit) {
    if (!this.isValid) return this;
    const o = {},
      normalizedUnit = Duration.normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      // falls through
      case "quarters":
      case "months":
        o.day = 1;
      // falls through
      case "weeks":
      case "days":
        o.hour = 0;
      // falls through
      case "hours":
        o.minute = 0;
      // falls through
      case "minutes":
        o.second = 0;
      // falls through
      case "seconds":
        o.millisecond = 0;
        break;
      // no default, invalid units throw in normalizeUnit()
    }

    if (normalizedUnit === "weeks") {
      o.weekday = 1;
    }

    if (normalizedUnit === "quarters") {
      const q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }

    return this.set(o);
  }

  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(unit) {
    return this.isValid
      ? this.plus({ [unit]: 1 })
          .startOf(unit)
          .minus(1)
      : this;
  }

  // OUTPUT

  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid
      ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
      : INVALID;
  }

  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid
      ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this)
      : INVALID;
  }

  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(opts = {}) {
    return this.isValid
      ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this)
      : [];
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO({
    format = "extended",
    suppressSeconds = false,
    suppressMilliseconds = false,
    includeOffset = true,
  } = {}) {
    if (!this.isValid) {
      return null;
    }

    const ext = format === "extended";

    let c = toISODate(this, ext);
    c += "T";
    c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset);
    return c;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({ format = "extended" } = {}) {
    if (!this.isValid) {
      return null;
    }

    return toISODate(this, format === "extended");
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds = false,
    suppressSeconds = false,
    includeOffset = true,
    includePrefix = false,
    format = "extended",
  } = {}) {
    if (!this.isValid) {
      return null;
    }

    let c = includePrefix ? "T" : "";
    return (
      c +
      toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset)
    );
  }

  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, true);
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
    let fmt = "HH:mm:ss.SSS";

    if (includeZone || includeOffset) {
      if (includeOffsetSpace) {
        fmt += " ";
      }
      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }

    return toTechFormat(this, fmt, true);
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }

    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }

  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : INVALID;
  }

  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }

  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }

  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1000 : NaN;
  }

  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1000) : NaN;
  }

  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }

  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }

  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid) return {};

    const base = { ...this.c };

    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }

  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }

  // COMPARE

  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(otherDateTime, unit = "milliseconds", opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }

    const durOpts = { locale: this.locale, numberingSystem: this.numberingSystem, ...opts };

    const units = maybeArray(unit).map(Duration.normalizeUnit),
      otherIsLater = otherDateTime.valueOf() > this.valueOf(),
      earlier = otherIsLater ? this : otherDateTime,
      later = otherIsLater ? otherDateTime : this,
      diffed = diff(earlier, later, units, durOpts);

    return otherIsLater ? diffed.negate() : diffed;
  }

  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(unit = "milliseconds", opts = {}) {
    return this.diff(DateTime.now(), unit, opts);
  }

  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }

  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(otherDateTime, unit) {
    if (!this.isValid) return false;

    const inputMs = otherDateTime.valueOf();
    const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
    return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
  }

  /**
   * Equality check
   * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(other) {
    return (
      this.isValid &&
      other.isValid &&
      this.valueOf() === other.valueOf() &&
      this.zone.equals(other.zone) &&
      this.loc.equals(other.loc)
    );
  }

  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(options = {}) {
    if (!this.isValid) return null;
    const base = options.base || DateTime.fromObject({}, { zone: this.zone }),
      padding = options.padding ? (this < base ? -options.padding : options.padding) : 0;
    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
    let unit = options.unit;
    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = undefined;
    }
    return diffRelative(base, this.plus(padding), {
      ...options,
      numeric: "always",
      units,
      unit,
    });
  }

  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(options = {}) {
    if (!this.isValid) return null;

    return diffRelative(options.base || DateTime.fromObject({}, { zone: this.zone }), this, {
      ...options,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true,
    });
  }

  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
  }

  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
  }

  // MISC

  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(text, fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options,
      localeToUse = Locale.fromOpts({
        locale,
        numberingSystem,
        defaultToEN: true,
      });
    return explainFromTokens(localeToUse, text, fmt);
  }

  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(text, fmt, options = {}) {
    return DateTime.fromFormatExplain(text, fmt, options);
  }

  // FORMAT PRESETS

  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return DATE_SHORT;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return DATE_MED;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return DATE_MED_WITH_WEEKDAY;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return DATE_FULL;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return DATE_HUGE;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return TIME_SIMPLE;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return TIME_WITH_SECONDS;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return TIME_WITH_SHORT_OFFSET;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return TIME_WITH_LONG_OFFSET;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return TIME_24_SIMPLE;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return TIME_24_WITH_SECONDS;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return TIME_24_WITH_SHORT_OFFSET;
  }

  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return TIME_24_WITH_LONG_OFFSET;
  }

  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return DATETIME_SHORT;
  }

  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return DATETIME_SHORT_WITH_SECONDS;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return DATETIME_MED;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return DATETIME_MED_WITH_SECONDS;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return DATETIME_MED_WITH_WEEKDAY;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return DATETIME_FULL;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return DATETIME_FULL_WITH_SECONDS;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return DATETIME_HUGE;
  }

  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return DATETIME_HUGE_WITH_SECONDS;
  }
}

/**
 * @private
 */
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError(
      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
    );
  }
}

const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
function expressLoggerMiddleware(logger, req, res, next) {
  if (logger) {
    const start = process.hrtime();
    const now = DateTime.now();
    const requestId = req.headers["X-Request-Id"]?.toString();
    res.on("finish", function() {
      logger.http({
        request: {
          details: {
            date: now.toISO(),
            id: requestId,
            size: Number.parseInt(req.headers["content-length"]?.toString() ?? "0")
          },
          host: req.hostname,
          method: req.method,
          resource: req.url
        },
        response: {
          details: {
            date: now.toISO(),
            duration: getActualRequestDurationInMilliseconds(start),
            request: {
              id: requestId
            }
          },
          status: {
            code: res.statusCode
          }
        }
      });
    });
  }
  next();
}

var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["Analytics"] = "analytics";
  LogLevel2["Critical"] = "critical";
  LogLevel2["Debug"] = "debug";
  LogLevel2["Exception"] = "exception";
  LogLevel2["Http"] = "http";
  LogLevel2["Info"] = "info";
  LogLevel2["Warning"] = "warning";
  return LogLevel2;
})(LogLevel || {});

var CountryCode = /* @__PURE__ */ ((CountryCode2) => {
  CountryCode2["Afghanistan"] = "AF";
  CountryCode2["Albania"] = "AL";
  CountryCode2["Algeria"] = "DZ";
  CountryCode2["AmericanSamoa"] = "AS";
  CountryCode2["Andorra"] = "AD";
  CountryCode2["Angola"] = "AO";
  CountryCode2["Anguilla"] = "AI";
  CountryCode2["Antarctica"] = "AQ";
  CountryCode2["AntiguaAndBarbuda"] = "AG";
  CountryCode2["Argentina"] = "AR";
  CountryCode2["Armenia"] = "AM";
  CountryCode2["Aruba"] = "AW";
  CountryCode2["Australia"] = "AU";
  CountryCode2["Austria"] = "AT";
  CountryCode2["Azerbaijan"] = "AZ";
  CountryCode2["Bahamas"] = "BS";
  CountryCode2["Bahrain"] = "BH";
  CountryCode2["Bangladesh"] = "BD";
  CountryCode2["Barbados"] = "BB";
  CountryCode2["Belarus"] = "BY";
  CountryCode2["Belgium"] = "BE";
  CountryCode2["Belize"] = "BZ";
  CountryCode2["Benin"] = "BJ";
  CountryCode2["Bermuda"] = "BM";
  CountryCode2["Bhutan"] = "BT";
  CountryCode2["Bolivia"] = "BO";
  CountryCode2["BosniaAndHerzegovina"] = "BA";
  CountryCode2["Botswana"] = "BW";
  CountryCode2["BouvetIsland"] = "BV";
  CountryCode2["Brazil"] = "BR";
  CountryCode2["BritishIndianOceanTerritory"] = "IO";
  CountryCode2["Brunei"] = "BN";
  CountryCode2["Bulgaria"] = "BG";
  CountryCode2["BurkinaFaso"] = "BF";
  CountryCode2["Burundi"] = "BI";
  CountryCode2["Cambodia"] = "KH";
  CountryCode2["Cameroon"] = "CM";
  CountryCode2["Canada"] = "CA";
  CountryCode2["CapeVerde"] = "CV";
  CountryCode2["CaymanIslands"] = "KY";
  CountryCode2["CentralAfricanRepublic"] = "CF";
  CountryCode2["Chad"] = "TD";
  CountryCode2["Chile"] = "CL";
  CountryCode2["China"] = "CN";
  CountryCode2["ChristmasIsland"] = "CX";
  CountryCode2["CocosKeelingIslands"] = "CC";
  CountryCode2["Colombia"] = "CO";
  CountryCode2["Comoros"] = "KM";
  CountryCode2["Congo"] = "CG";
  CountryCode2["CongoTheDemocraticRepublicOfThe"] = "CD";
  CountryCode2["CookIslands"] = "CK";
  CountryCode2["CostaRica"] = "CR";
  CountryCode2["CoteDIvoire"] = "CI";
  CountryCode2["Croatia"] = "HR";
  CountryCode2["Cuba"] = "CU";
  CountryCode2["Cyprus"] = "CY";
  CountryCode2["CzechRepublic"] = "CZ";
  CountryCode2["Denmark"] = "DK";
  CountryCode2["Djibouti"] = "DJ";
  CountryCode2["Dominica"] = "DM";
  CountryCode2["DominicanRepublic"] = "DO";
  CountryCode2["Ecuador"] = "EC";
  CountryCode2["Egypt"] = "EG";
  CountryCode2["ElSalvador"] = "SV";
  CountryCode2["EquatorialGuinea"] = "GQ";
  CountryCode2["Eritrea"] = "ER";
  CountryCode2["Estonia"] = "EE";
  CountryCode2["Ethiopia"] = "ET";
  CountryCode2["FalklandIslands"] = "FK";
  CountryCode2["FaroeIslands"] = "FO";
  CountryCode2["Fiji"] = "FJ";
  CountryCode2["Finland"] = "FI";
  CountryCode2["France"] = "FR";
  CountryCode2["FrenchGuiana"] = "GF";
  CountryCode2["FrenchPolynesia"] = "PF";
  CountryCode2["FrenchSouthernTerritories"] = "TF";
  CountryCode2["Gabon"] = "GA";
  CountryCode2["Gambia"] = "GM";
  CountryCode2["Georgia"] = "GE";
  CountryCode2["Germany"] = "DE";
  CountryCode2["Ghana"] = "GH";
  CountryCode2["Gibraltar"] = "GI";
  CountryCode2["Greece"] = "GR";
  CountryCode2["Greenland"] = "GL";
  CountryCode2["Grenada"] = "GD";
  CountryCode2["Guadeloupe"] = "GP";
  CountryCode2["Guam"] = "GU";
  CountryCode2["Guatemala"] = "GT";
  CountryCode2["Guernsey"] = "GG";
  CountryCode2["Guinea"] = "GN";
  CountryCode2["GuineaBissau"] = "GW";
  CountryCode2["Guyana"] = "GY";
  CountryCode2["Haiti"] = "HT";
  CountryCode2["HeardIslandMcdonaldIslands"] = "HM";
  CountryCode2["HolySeeVaticanCityState"] = "VA";
  CountryCode2["Honduras"] = "HN";
  CountryCode2["HongKong"] = "HK";
  CountryCode2["Hungary"] = "HU";
  CountryCode2["Iceland"] = "IS";
  CountryCode2["India"] = "IN";
  CountryCode2["Indonesia"] = "ID";
  CountryCode2["Iran"] = "IR";
  CountryCode2["Iraq"] = "IQ";
  CountryCode2["Ireland"] = "IE";
  CountryCode2["IsleOfMan"] = "IM";
  CountryCode2["Israel"] = "IL";
  CountryCode2["Italy"] = "IT";
  CountryCode2["Jamaica"] = "JM";
  CountryCode2["Japan"] = "JP";
  CountryCode2["Jersey"] = "JE";
  CountryCode2["Jordan"] = "JO";
  CountryCode2["Kazakhstan"] = "KZ";
  CountryCode2["Kenya"] = "KE";
  CountryCode2["Kiribati"] = "KI";
  CountryCode2["Kuwait"] = "KW";
  CountryCode2["Kyrgyzstan"] = "KG";
  CountryCode2["Laos"] = "LA";
  CountryCode2["Latvia"] = "LV";
  CountryCode2["Lebanon"] = "LB";
  CountryCode2["Lesotho"] = "LS";
  CountryCode2["Liberia"] = "LR";
  CountryCode2["Libya"] = "LY";
  CountryCode2["Liechtenstein"] = "LI";
  CountryCode2["Lithuania"] = "LT";
  CountryCode2["Luxembourg"] = "LU";
  CountryCode2["Macau"] = "MO";
  CountryCode2["Madagascar"] = "MG";
  CountryCode2["Malawi"] = "MW";
  CountryCode2["Malaysia"] = "MY";
  CountryCode2["Maldives"] = "MV";
  CountryCode2["Mali"] = "ML";
  CountryCode2["Malta"] = "MT";
  CountryCode2["MarshallIslands"] = "MH";
  CountryCode2["Martinique"] = "MQ";
  CountryCode2["Mauritania"] = "MR";
  CountryCode2["Mauritius"] = "MU";
  CountryCode2["Mayotte"] = "YT";
  CountryCode2["Mexico"] = "MX";
  CountryCode2["MicronesiaFederatedStatesOf"] = "FM";
  CountryCode2["Moldova"] = "MD";
  CountryCode2["Monaco"] = "MC";
  CountryCode2["Mongolia"] = "MN";
  CountryCode2["Montenegro"] = "ME";
  CountryCode2["Montserrat"] = "MS";
  CountryCode2["Morocco"] = "MA";
  CountryCode2["Mozambique"] = "MZ";
  CountryCode2["Myanmar"] = "MM";
  CountryCode2["Namibia"] = "NA";
  CountryCode2["Nauru"] = "NR";
  CountryCode2["Nepal"] = "NP";
  CountryCode2["Netherlands"] = "NL";
  CountryCode2["NetherlandsAntilles"] = "AN";
  CountryCode2["NewCaledonia"] = "NC";
  CountryCode2["NewZealand"] = "NZ";
  CountryCode2["NorthKorea"] = "KP";
  CountryCode2["Nicaragua"] = "NI";
  CountryCode2["Niger"] = "NE";
  CountryCode2["Nigeria"] = "NG";
  CountryCode2["Niue"] = "NU";
  CountryCode2["NorfolkIsland"] = "NF";
  CountryCode2["NorthMacedonia"] = "MK";
  CountryCode2["NorthernMarianaIslands"] = "MP";
  CountryCode2["Norway"] = "NO";
  CountryCode2["Oman"] = "OM";
  CountryCode2["Pakistan"] = "PK";
  CountryCode2["Palau"] = "PW";
  CountryCode2["PalestinianTerritoryOccupied"] = "PS";
  CountryCode2["Panama"] = "PA";
  CountryCode2["PapuaNewGuinea"] = "PG";
  CountryCode2["Paraguay"] = "PY";
  CountryCode2["Peru"] = "PE";
  CountryCode2["Philippines"] = "PH";
  CountryCode2["Pitcairn"] = "PN";
  CountryCode2["Poland"] = "PL";
  CountryCode2["Portugal"] = "PT";
  CountryCode2["PuertoRico"] = "PR";
  CountryCode2["Qatar"] = "QA";
  CountryCode2["Reunion"] = "RE";
  CountryCode2["Romania"] = "RO";
  CountryCode2["RussianFederation"] = "RU";
  CountryCode2["Rwanda"] = "RW";
  CountryCode2["SaintBarthelemy"] = "BL";
  CountryCode2["SaintHelena"] = "SH";
  CountryCode2["SaintKittsAndNevis"] = "KN";
  CountryCode2["SaintLucia"] = "LC";
  CountryCode2["SaintMartin"] = "MF";
  CountryCode2["SaintPierreAndMiquelon"] = "PM";
  CountryCode2["SaintVincentAndTheGrenadines"] = "VC";
  CountryCode2["Samoa"] = "WS";
  CountryCode2["SanMarino"] = "SM";
  CountryCode2["SaoTomeAndPrincipe"] = "ST";
  CountryCode2["SaudiArabia"] = "SA";
  CountryCode2["Senegal"] = "SN";
  CountryCode2["Serbia"] = "RS";
  CountryCode2["SerbiaAndMontenegro"] = "CS";
  CountryCode2["Seychelles"] = "SC";
  CountryCode2["SierraLeone"] = "SL";
  CountryCode2["Singapore"] = "SG";
  CountryCode2["Slovakia"] = "SK";
  CountryCode2["Slovenia"] = "SI";
  CountryCode2["SolomonIslands"] = "SB";
  CountryCode2["Somalia"] = "SO";
  CountryCode2["SouthAfrica"] = "ZA";
  CountryCode2["SouthGeorgiaAndTheSouthSandwichIslands"] = "GS";
  CountryCode2["SouthKorea"] = "KR";
  CountryCode2["Spain"] = "ES";
  CountryCode2["SriLanka"] = "LK";
  CountryCode2["Sudan"] = "SD";
  CountryCode2["Suriname"] = "SR";
  CountryCode2["SvalbardAndJanMayen"] = "SJ";
  CountryCode2["Swaziland"] = "SZ";
  CountryCode2["Sweden"] = "SE";
  CountryCode2["Switzerland"] = "CH";
  CountryCode2["Syria"] = "SY";
  CountryCode2["Taiwan"] = "TW";
  CountryCode2["Tajikistan"] = "TJ";
  CountryCode2["Tanzania"] = "TZ";
  CountryCode2["Thailand"] = "TH";
  CountryCode2["TimorLeste"] = "TL";
  CountryCode2["Togo"] = "TG";
  CountryCode2["Tokelau"] = "TK";
  CountryCode2["Tonga"] = "TO";
  CountryCode2["TrinidadAndTobago"] = "TT";
  CountryCode2["Tunisia"] = "TN";
  CountryCode2["Turkey"] = "TR";
  CountryCode2["Turkmenistan"] = "TM";
  CountryCode2["TurksAndCaicosIslands"] = "TC";
  CountryCode2["Tuvalu"] = "TV";
  CountryCode2["Uganda"] = "UG";
  CountryCode2["Ukraine"] = "UA";
  CountryCode2["UnitedArabEmirates"] = "AE";
  CountryCode2["UnitedKingdom"] = "GB";
  CountryCode2["UnitedStates"] = "US";
  CountryCode2["UnitedStatesMinorOutlyingIslands"] = "UM";
  CountryCode2["Uruguay"] = "UY";
  CountryCode2["Uzbekistan"] = "UZ";
  CountryCode2["Vanuatu"] = "VU";
  CountryCode2["Venezuela"] = "VE";
  CountryCode2["Vietnam"] = "VN";
  CountryCode2["VirginIslandsBritish"] = "VG";
  CountryCode2["VirginIslandsUS"] = "VI";
  CountryCode2["WallisAndFutuna"] = "WF";
  CountryCode2["WesternSahara"] = "EH";
  CountryCode2["Yemen"] = "YE";
  CountryCode2["Zambia"] = "ZM";
  CountryCode2["Zimbabwe"] = "ZW";
  return CountryCode2;
})(CountryCode || {});

var CurrencyCode = /* @__PURE__ */ ((CurrencyCode2) => {
  CurrencyCode2["AfghanistanAfghani"] = "AFN";
  CurrencyCode2["AlbaniaLek"] = "ALL";
  CurrencyCode2["ArmeniaDram"] = "AMD";
  CurrencyCode2["AlgeriaDinar"] = "DZD";
  CurrencyCode2["AmericanSamoaTala"] = "WST";
  CurrencyCode2["AngolaKwanza"] = "AOA";
  CurrencyCode2["ArgentinaPeso"] = "ARS";
  CurrencyCode2["AustraliaDollar"] = "AUD";
  CurrencyCode2["ArubaFlorin"] = "AWG";
  CurrencyCode2["AzerbaijanNewManat"] = "AZN";
  CurrencyCode2["BosniaAndHerzegovinaConvertibleMark"] = "BAM";
  CurrencyCode2["BahrainDinar"] = "BHD";
  CurrencyCode2["BarbadosDollar"] = "BBD";
  CurrencyCode2["BangladeshTaka"] = "BDT";
  CurrencyCode2["BelgiumFranc"] = "BGN";
  CurrencyCode2["BermudaDollar"] = "BMD";
  CurrencyCode2["BruneiDollar"] = "BND";
  CurrencyCode2["BoliviaBoliviano"] = "BOB";
  CurrencyCode2["BrazilReal"] = "BRL";
  CurrencyCode2["BahamasDollar"] = "BSD";
  CurrencyCode2["BhutanNgultrum"] = "BTN";
  CurrencyCode2["BotswanaPula"] = "BWP";
  CurrencyCode2["BelarusRuble"] = "BYN";
  CurrencyCode2["BelizeDollar"] = "BZD";
  CurrencyCode2["BulgariaLev"] = "BGN";
  CurrencyCode2["BurundiFranc"] = "BIF";
  CurrencyCode2["BritishPound"] = "GBP";
  CurrencyCode2["CanadaDollar"] = "CAD";
  CurrencyCode2["CambodiaRiel"] = "KHR";
  CurrencyCode2["ComorosFranc"] = "KMF";
  CurrencyCode2["CaymanIslandsDollar"] = "KYD";
  CurrencyCode2["ChilePeso"] = "CLP";
  CurrencyCode2["ChinaYuan"] = "CNY";
  CurrencyCode2["ColombiaPeso"] = "COP";
  CurrencyCode2["CostaRicaColon"] = "CRC";
  CurrencyCode2["CroatiaKuna"] = "HRK";
  CurrencyCode2["CubaConvertiblePeso"] = "CUC";
  CurrencyCode2["CubaPeso"] = "CUP";
  CurrencyCode2["CapeVerdeEscudo"] = "CVE";
  CurrencyCode2["CyprusPound"] = "CYP";
  CurrencyCode2["CzechRepublicKoruna"] = "CZK";
  CurrencyCode2["DjiboutiFranc"] = "DJF";
  CurrencyCode2["DenmarkKrone"] = "DKK";
  CurrencyCode2["DominicaDollar"] = "XCD";
  CurrencyCode2["DominicanRepublicPeso"] = "DOP";
  CurrencyCode2["EastCaribbeanDollar"] = "XCD";
  CurrencyCode2["EgyptPound"] = "EGP";
  CurrencyCode2["ElSalvadorColon"] = "SVC";
  CurrencyCode2["EquatorialGuineaEkwele"] = "GQE";
  CurrencyCode2["EritreaNakfa"] = "ERN";
  CurrencyCode2["EstoniaKroon"] = "EEK";
  CurrencyCode2["EthiopiaBirr"] = "ETB";
  CurrencyCode2["Euro"] = "EUR";
  CurrencyCode2["FijiDollar"] = "FJD";
  CurrencyCode2["FalklandIslandsPound"] = "FKP";
  CurrencyCode2["GambiaDalasi"] = "GMD";
  CurrencyCode2["GabonFranc"] = "GMD";
  CurrencyCode2["GeorgiaLari"] = "GEL";
  CurrencyCode2["GhanaCedi"] = "GHS";
  CurrencyCode2["GibraltarPound"] = "GIP";
  CurrencyCode2["GuatemalaQuetzal"] = "GTQ";
  CurrencyCode2["GuernseyPound"] = "GGP";
  CurrencyCode2["GuineaBissauPeso"] = "GWP";
  CurrencyCode2["GuyanaDollar"] = "GYD";
  CurrencyCode2["HongKongDollar"] = "HKD";
  CurrencyCode2["HondurasLempira"] = "HNL";
  CurrencyCode2["HaitiGourde"] = "HTG";
  CurrencyCode2["HungaryForint"] = "HUF";
  CurrencyCode2["IndonesiaRupiah"] = "IDR";
  CurrencyCode2["IsleOfManPound"] = "IMP";
  CurrencyCode2["IsraelNewShekel"] = "ILS";
  CurrencyCode2["IndiaRupee"] = "INR";
  CurrencyCode2["IraqDinar"] = "IQD";
  CurrencyCode2["IranRial"] = "IRR";
  CurrencyCode2["IcelandKrona"] = "ISK";
  CurrencyCode2["JamaicaDollar"] = "JMD";
  CurrencyCode2["JapanYen"] = "JPY";
  CurrencyCode2["JerseyPound"] = "JEP";
  CurrencyCode2["JordanDinar"] = "JOD";
  CurrencyCode2["KazakhstanTenge"] = "KZT";
  CurrencyCode2["KenyaShilling"] = "KES";
  CurrencyCode2["KyrgyzstanSom"] = "KGS";
  CurrencyCode2["NorthKoreaWon"] = "KPW";
  CurrencyCode2["SouthKoreaWon"] = "KRW";
  CurrencyCode2["KuwaitDinar"] = "KWD";
  CurrencyCode2["LaosKip"] = "LAK";
  CurrencyCode2["LebanonPound"] = "LBP";
  CurrencyCode2["LiberiaDollar"] = "LRD";
  CurrencyCode2["LesothoLoti"] = "LSL";
  CurrencyCode2["LibyanDinar"] = "LYD";
  CurrencyCode2["LithuaniaLitas"] = "LTL";
  CurrencyCode2["LatviaLats"] = "LVL";
  CurrencyCode2["LibyaDinar"] = "LYD";
  CurrencyCode2["MacauPataca"] = "MOP";
  CurrencyCode2["MaldivesRufiyaa"] = "MVR";
  CurrencyCode2["MalawiKwacha"] = "MWK";
  CurrencyCode2["MaltaLira"] = "MTL";
  CurrencyCode2["MauritiusRupee"] = "MUR";
  CurrencyCode2["MongoliaTughrik"] = "MNT";
  CurrencyCode2["MoroccoDirham"] = "MAD";
  CurrencyCode2["MoldovaLeu"] = "MDL";
  CurrencyCode2["MozambiqueMetical"] = "MZN";
  CurrencyCode2["MadagascarAriary"] = "MGA";
  CurrencyCode2["MacedoniaDenar"] = "MKD";
  CurrencyCode2["MexicoPeso"] = "MXN";
  CurrencyCode2["MalaysiaRinggit"] = "MYR";
  CurrencyCode2["MyanmarKyat"] = "MMK";
  CurrencyCode2["MicronesiaFederatedStatesDollar"] = "USD";
  CurrencyCode2["NicaraguaCordoba"] = "NIO";
  CurrencyCode2["NamibiaDollar"] = "NAD";
  CurrencyCode2["NetherlandsAntillesGuilder"] = "ANG";
  CurrencyCode2["NewCaledoniaFranc"] = "XPF";
  CurrencyCode2["NigeriaNaira"] = "NGN";
  CurrencyCode2["NicaraguaCordobaOro"] = "NIO";
  CurrencyCode2["NigerCFAFranc"] = "XOF";
  CurrencyCode2["NorwayKrone"] = "NOK";
  CurrencyCode2["NepalRupee"] = "NPR";
  CurrencyCode2["NewZealandDollar"] = "NZD";
  CurrencyCode2["OmanRial"] = "OMR";
  CurrencyCode2["PanamaBalboa"] = "PAB";
  CurrencyCode2["PeruNuevoSol"] = "PEN";
  CurrencyCode2["PapuaNewGuineaKina"] = "PGK";
  CurrencyCode2["PhilippinesPeso"] = "PHP";
  CurrencyCode2["PakistanRupee"] = "PKR";
  CurrencyCode2["PeruNuevo"] = "PEN";
  CurrencyCode2["PolandZloty"] = "PLN";
  CurrencyCode2["ParaguayGuarani"] = "PYG";
  CurrencyCode2["QatarRial"] = "QAR";
  CurrencyCode2["RomaniaNewLeu"] = "RON";
  CurrencyCode2["SerbiaDinar"] = "RSD";
  CurrencyCode2["SriLankaRupee"] = "LKR";
  CurrencyCode2["RussiaRuble"] = "RUB";
  CurrencyCode2["RwandaFranc"] = "RWF";
  CurrencyCode2["SaudiArabiaRiyal"] = "SAR";
  CurrencyCode2["SlovakiaKoruna"] = "SKK";
  CurrencyCode2["SloveniaTolar"] = "SIT";
  CurrencyCode2["SolomonIslandsDollar"] = "SBD";
  CurrencyCode2["SeychellesRupee"] = "SCR";
  CurrencyCode2["SudanPound"] = "SDG";
  CurrencyCode2["SwedenKrona"] = "SEK";
  CurrencyCode2["SingaporeDollar"] = "SGD";
  CurrencyCode2["SaintHelenaPound"] = "SHP";
  CurrencyCode2["SierraLeoneLeone"] = "SLL";
  CurrencyCode2["SomaliaShilling"] = "SOS";
  CurrencyCode2["SurinameDollar"] = "SRD";
  CurrencyCode2["SintMaartenPound"] = "SXD";
  CurrencyCode2["SyriaPound"] = "SYP";
  CurrencyCode2["SwazilandLilangeni"] = "SZL";
  CurrencyCode2["SwitzerlandFranc"] = "CHF";
  CurrencyCode2["ThailandBaht"] = "THB";
  CurrencyCode2["TajikistanSomoni"] = "TJS";
  CurrencyCode2["TurkmenistanManat"] = "TMT";
  CurrencyCode2["TunisiaDinar"] = "TND";
  CurrencyCode2["TongaPaanga"] = "TOP";
  CurrencyCode2["TurkeyLira"] = "TRY";
  CurrencyCode2["TrinidadAndTobagoDollar"] = "TTD";
  CurrencyCode2["TaiwanNewDollar"] = "TWD";
  CurrencyCode2["TanzaniaShilling"] = "TZS";
  CurrencyCode2["UnitedArabEmiratesDirham"] = "AED";
  CurrencyCode2["UkraineHryvnia"] = "UAH";
  CurrencyCode2["UgandaShilling"] = "UGX";
  CurrencyCode2["UnitedKingdomPound"] = "GBP";
  CurrencyCode2["UnitedStatesDollar"] = "USD";
  CurrencyCode2["UruguayPeso"] = "UYU";
  CurrencyCode2["UzbekistanSom"] = "UZS";
  CurrencyCode2["VenezuelaBolivar"] = "VEF";
  CurrencyCode2["VietnamDong"] = "VND";
  CurrencyCode2["VanuatuVatu"] = "VUV";
  CurrencyCode2["SamoaTala"] = "WST";
  CurrencyCode2["YemenRial"] = "YER";
  CurrencyCode2["SouthAfricaRand"] = "ZAR";
  CurrencyCode2["ZambiaKwacha"] = "ZMW";
  CurrencyCode2["ZimbabweDollar"] = "ZWL";
  return CurrencyCode2;
})(CurrencyCode || {});
({
  AfghanistanAfghani: {
    code: "AFN" /* AfghanistanAfghani */,
    countries: [CountryCode.Afghanistan],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Afghan Afghani",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u060B",
    symbol_native: "\u060B",
    symbol_placement: "before",
    thousands_separator: ","
  },
  AlbaniaLek: {
    code: "ALL" /* AlbaniaLek */,
    countries: [CountryCode.Albania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Albanian Lek",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Lek",
    symbol_native: "Lek",
    symbol_placement: "before",
    thousands_separator: "."
  },
  AlgeriaDinar: {
    code: "DZD" /* AlgeriaDinar */,
    countries: [CountryCode.Algeria],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Algerian Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u062F.\u062C",
    symbol_native: "\u062F.\u062C",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ArgentinaPeso: {
    code: "ARS" /* ArgentinaPeso */,
    countries: [CountryCode.Argentina],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Argentine Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ArmeniaDram: {
    code: "AMD" /* ArmeniaDram */,
    countries: [CountryCode.Armenia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Armenian Dram",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0564\u0580.",
    symbol_native: "\u0564\u0580.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ArubaFlorin: {
    code: "AWG" /* ArubaFlorin */,
    countries: [CountryCode.Aruba],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Aruban Florin",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0192",
    symbol_native: "\u0192",
    symbol_placement: "before",
    thousands_separator: ","
  },
  AustraliaDollar: {
    code: "AUD" /* AustraliaDollar */,
    countries: [CountryCode.Australia],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Australian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  AzerbaijanManat: {
    code: "AZN" /* AzerbaijanNewManat */,
    countries: [CountryCode.Azerbaijan],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Azerbaijani Manat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u043C\u0430\u043D",
    symbol_native: "\u043C\u0430\u043D",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BahrainDinar: {
    code: "BHD" /* BahrainDinar */,
    countries: [CountryCode.Bahrain],
    decimal_digits: 3,
    decimal_separator: ".",
    name: "Bahraini Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: ".\u062F.\u0628",
    symbol_native: ".\u062F.\u0628",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BangladeshTaka: {
    code: "BDT" /* BangladeshTaka */,
    countries: [CountryCode.Bangladesh],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bangladeshi Taka",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u09F3",
    symbol_native: "\u09F3",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BarbadosDollar: {
    code: "BBD" /* BarbadosDollar */,
    countries: [CountryCode.Barbados],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Barbadian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BelarusRuble: {
    code: "BYN" /* BelarusRuble */,
    countries: [CountryCode.Belarus],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Belarusian Ruble",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Br",
    symbol_native: "Br",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BelizeDollar: {
    code: "BZD" /* BelizeDollar */,
    countries: [CountryCode.Belize],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Belize Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "BZ$",
    symbol_native: "BZ$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BermudaDollar: {
    code: "BMD" /* BermudaDollar */,
    countries: [CountryCode.Bermuda],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bermudian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BoliviaBoliviano: {
    code: "BOB" /* BoliviaBoliviano */,
    countries: [CountryCode.Bolivia],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bolivian Boliviano",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$b",
    symbol_native: "$b",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BosniaAndHerzegovinaConvertibleMarka: {
    code: "BAM" /* BosniaAndHerzegovinaConvertibleMark */,
    countries: [CountryCode.BosniaAndHerzegovina],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Bosnia and Herzegovina Convertible Marka",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KM",
    symbol_native: "KM",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BotswanaPula: {
    code: "BWP" /* BotswanaPula */,
    countries: [CountryCode.Botswana],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Botswana Pula",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "P",
    symbol_native: "P",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BrazilReal: {
    code: "BRL" /* BrazilReal */,
    countries: [CountryCode.Brazil],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Brazilian Real",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "R$",
    symbol_native: "R$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BruneiDollar: {
    code: "BND" /* BruneiDollar */,
    countries: [CountryCode.Brunei],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Brunei Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BulgariaLev: {
    code: "BGN" /* BulgariaLev */,
    countries: [CountryCode.Bulgaria],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bulgarian Lev",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u043B\u0432",
    symbol_native: "\u043B\u0432",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BurundiFranc: {
    code: "BIF" /* BurundiFranc */,
    countries: [CountryCode.Burundi],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Burundian Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "FBu",
    symbol_native: "FBu",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CambodiaRiel: {
    code: "KHR" /* CambodiaRiel */,
    countries: [CountryCode.Cambodia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cambodian Riel",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u17DB",
    symbol_native: "\u17DB",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CanadaDollar: {
    code: "CAD" /* CanadaDollar */,
    countries: [CountryCode.Canada],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Canadian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CapeVerdeEscudo: {
    code: "CVE" /* CapeVerdeEscudo */,
    countries: [CountryCode.CapeVerde],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Cape Verde Escudo",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Esc",
    symbol_native: "Esc",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CaymanIslandsDollar: {
    code: "KYD" /* CaymanIslandsDollar */,
    countries: [CountryCode.CaymanIslands],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Cayman Islands Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ChilePeso: {
    code: "CLP" /* ChilePeso */,
    countries: [CountryCode.Chile],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Chilean Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ChinaYuanRenminbi: {
    code: "CNY" /* ChinaYuan */,
    countries: [CountryCode.China],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Chinese Yuan",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA5",
    symbol_native: "\xA5",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ColombiaPeso: {
    code: "COP" /* ColombiaPeso */,
    countries: [CountryCode.Colombia],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Colombian Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ComorosFranc: {
    code: "KMF" /* ComorosFranc */,
    countries: [CountryCode.Comoros],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Comoros Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "CF",
    symbol_native: "CF",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CostaRicaColon: {
    code: "CRC" /* CostaRicaColon */,
    countries: [CountryCode.CostaRica],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Costa Rican Colon",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A1",
    symbol_native: "\u20A1",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CroatiaKuna: {
    code: "HRK" /* CroatiaKuna */,
    countries: [CountryCode.Croatia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Croatian Kuna",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kn",
    symbol_native: "kn",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CubaConvertiblePeso: {
    code: "CUC" /* CubaConvertiblePeso */,
    countries: [CountryCode.Cuba],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cuba Convertible Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CubaPeso: {
    code: "CUP" /* CubaPeso */,
    countries: [CountryCode.Cuba],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cuba Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CyprusPound: {
    code: "CYP" /* CyprusPound */,
    countries: [CountryCode.Cyprus],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cyprus Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CzechRepublicKoruna: {
    code: "CZK" /* CzechRepublicKoruna */,
    countries: [CountryCode.CzechRepublic],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Czech Republic Koruna",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "K\u010D",
    symbol_native: "K\u010D",
    symbol_placement: "before",
    thousands_separator: "."
  },
  DenmarkKrone: {
    code: "DKK" /* DenmarkKrone */,
    countries: [CountryCode.Denmark],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Denmark Krone",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  DjiboutiFranc: {
    code: "DJF" /* DjiboutiFranc */,
    countries: [CountryCode.Djibouti],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Djibouti Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Fdj",
    symbol_native: "Fdj",
    symbol_placement: "before",
    thousands_separator: ","
  },
  DominicanRepublicPeso: {
    code: "DOP" /* DominicanRepublicPeso */,
    countries: [CountryCode.DominicanRepublic],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Dominican Republic Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "RD$",
    symbol_native: "RD$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EastCaribbeanDollar: {
    code: "XCD" /* EastCaribbeanDollar */,
    countries: [
      CountryCode.AntiguaAndBarbuda,
      CountryCode.Dominica,
      CountryCode.Grenada,
      CountryCode.SaintKittsAndNevis,
      CountryCode.SaintLucia,
      CountryCode.SaintVincentAndTheGrenadines
    ],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "East Caribbean Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  EgyptPound: {
    code: "EGP" /* EgyptPound */,
    countries: [CountryCode.Egypt],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Egypt Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ElSalvadorColon: {
    code: "SVC" /* ElSalvadorColon */,
    countries: [CountryCode.ElSalvador],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "El Salvador Colon",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A1",
    symbol_native: "\u20A1",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EquatorialGuineaEkwele: {
    code: "GQE" /* EquatorialGuineaEkwele */,
    countries: [CountryCode.EquatorialGuinea],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Equatorial Guinea Ekwele",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "GQE",
    symbol_native: "GQE",
    symbol_placement: "before",
    thousands_separator: ","
  },
  EritreaNakfa: {
    code: "ERN" /* EritreaNakfa */,
    countries: [CountryCode.Eritrea],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Eritrea Nakfa",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Nfk",
    symbol_native: "Nfk",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EstoniaKroon: {
    code: "EEK" /* EstoniaKroon */,
    countries: [CountryCode.Estonia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Estonia Kroon",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EthiopiaBirr: {
    code: "ETB" /* EthiopiaBirr */,
    countries: [CountryCode.Ethiopia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Ethiopia Birr",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Br",
    symbol_native: "Br",
    symbol_placement: "before",
    thousands_separator: "."
  },
  Euro: {
    code: "EUR" /* Euro */,
    countries: [
      CountryCode.Andorra,
      CountryCode.Austria,
      CountryCode.Belgium,
      CountryCode.Cyprus,
      CountryCode.Estonia,
      CountryCode.Finland,
      CountryCode.France,
      CountryCode.Germany,
      CountryCode.Greece,
      CountryCode.Ireland,
      CountryCode.Italy,
      CountryCode.Latvia,
      CountryCode.Lithuania,
      CountryCode.Luxembourg,
      CountryCode.Malta,
      CountryCode.Monaco,
      CountryCode.Netherlands,
      CountryCode.Portugal,
      CountryCode.Spain,
      CountryCode.Sweden,
      CountryCode.UnitedKingdom
    ],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Euro",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AC",
    symbol_native: "\u20AC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  FalklandIslandsPound: {
    code: "FKP" /* FalklandIslandsPound */,
    countries: [CountryCode.FalklandIslands],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Equatorial Guinea Ekwele",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  FijiDollar: {
    code: "FJD" /* FijiDollar */,
    countries: [CountryCode.Fiji],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Fiji Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GambiaDalasi: {
    code: "GMD" /* GambiaDalasi */,
    countries: [CountryCode.Gambia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Gambia Dalasi",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "D",
    symbol_native: "D",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GeorgiaLari: {
    code: "GEL" /* GeorgiaLari */,
    countries: [CountryCode.Georgia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Georgia Lari",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20BE",
    symbol_native: "\u20BE",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GhanaCedi: {
    code: "GHS" /* GhanaCedi */,
    countries: [CountryCode.Ghana],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Ghana Cedi",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B5",
    symbol_native: "\u20B5",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GibraltarPound: {
    code: "GIP" /* GibraltarPound */,
    countries: [CountryCode.Gibraltar],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Gibraltar Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuatemalaQuetzal: {
    code: "GTQ" /* GuatemalaQuetzal */,
    countries: [CountryCode.Guatemala],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guatemala Quetzal",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Q",
    symbol_native: "Q",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuernseyPound: {
    code: "GGP" /* GuernseyPound */,
    countries: [CountryCode.Guernsey],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guernsey Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuineaBissauPeso: {
    code: "GWP" /* GuineaBissauPeso */,
    countries: [CountryCode.GuineaBissau],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guinea-Bissau Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B5",
    symbol_native: "\u20B5",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuyanaDollar: {
    code: "GYD" /* GuyanaDollar */,
    countries: [CountryCode.Guyana],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guyana Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HaitiGourde: {
    code: "HTG" /* HaitiGourde */,
    countries: [CountryCode.Haiti],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Haiti Gourde",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "G",
    symbol_native: "G",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HondurasLempira: {
    code: "HNL" /* HondurasLempira */,
    countries: [CountryCode.Honduras],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Honduras Lempira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "L",
    symbol_native: "L",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HongKongDollar: {
    code: "HKD" /* HongKongDollar */,
    countries: [CountryCode.HongKong],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Hong Kong Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HungaryForint: {
    code: "HUF" /* HungaryForint */,
    countries: [CountryCode.Hungary],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Hungary Forint",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Ft",
    symbol_native: "Ft",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IcelandKrona: {
    code: "ISK" /* IcelandKrona */,
    countries: [CountryCode.Iceland],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Iceland Krona",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IndianRupee: {
    code: "INR" /* IndiaRupee */,
    countries: [CountryCode.India, CountryCode.Bhutan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Indian Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B9",
    symbol_native: "\u20B9",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IndonesiaRupiah: {
    code: "IDR" /* IndonesiaRupiah */,
    countries: [CountryCode.Indonesia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Indonesia Rupiah",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Rp",
    symbol_native: "Rp",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IranRial: {
    code: "IRR" /* IranRial */,
    countries: [CountryCode.Iran],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Iran Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IsleOfManPound: {
    code: "IMP" /* IsleOfManPound */,
    countries: [CountryCode.IsleOfMan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Isle of Man Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IsraeliShekel: {
    code: "ILS" /* IsraelNewShekel */,
    countries: [CountryCode.Israel],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Israeli Shekel",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AA",
    symbol_native: "\u20AA",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JamaicaDollar: {
    code: "JMD" /* JamaicaDollar */,
    countries: [CountryCode.Jamaica],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Jamaica Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "J$",
    symbol_native: "J$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JapanYen: {
    code: "JPY" /* JapanYen */,
    countries: [CountryCode.Japan],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Japan Yen",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA5",
    symbol_native: "\uFFE5",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JerseyPound: {
    code: "JEP" /* JerseyPound */,
    countries: [CountryCode.Jersey],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Jersey Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JordanDinar: {
    code: "JOD" /* JordanDinar */,
    countries: [CountryCode.Jordan],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Jordan Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "JD",
    symbol_native: "JD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KazakhstanTenge: {
    code: "KZT" /* KazakhstanTenge */,
    countries: [CountryCode.Kazakhstan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Kazakhstan Tenge",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B8",
    symbol_native: "\u20B8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KenyaShilling: {
    code: "KES" /* KenyaShilling */,
    countries: [CountryCode.Kenya],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Kenya Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KSh",
    symbol_native: "KSh",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KuwaitDinar: {
    code: "KWD" /* KuwaitDinar */,
    countries: [CountryCode.Kuwait],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Kuwait Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KD",
    symbol_native: "KD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KyrgyzstanSom: {
    code: "KGS" /* KyrgyzstanSom */,
    countries: [CountryCode.Kyrgyzstan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Kyrgyzstan Som",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KGS",
    symbol_native: "KGS",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LaosKip: {
    code: "LAK" /* LaosKip */,
    countries: [CountryCode.Laos],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Laos Kip",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AD",
    symbol_native: "\u20AD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LatviaLats: {
    code: "LVL" /* LatviaLats */,
    countries: [CountryCode.Latvia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Latvia Lat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Ls",
    symbol_native: "Ls",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LebanonPound: {
    code: "LBP" /* LebanonPound */,
    countries: [CountryCode.Lebanon],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Lebanon Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LesothoLoti: {
    code: "LSL" /* LesothoLoti */,
    countries: [CountryCode.Lesotho],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Lesotho Loti",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "M",
    symbol_native: "M",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LiberiaDollar: {
    code: "LRD" /* LiberiaDollar */,
    countries: [CountryCode.Liberia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Liberia Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LibyanDinar: {
    code: "LYD" /* LibyanDinar */,
    countries: [CountryCode.Libya],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Libyan Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "LD",
    symbol_native: "LD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LithuaniaLitas: {
    code: "LTL" /* LithuaniaLitas */,
    countries: [CountryCode.Lithuania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Lithuania Litas",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Lt",
    symbol_native: "Lt",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MacauPataca: {
    code: "MOP" /* MacauPataca */,
    countries: [CountryCode.Macau],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Macau Pataca",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "MOP$",
    symbol_native: "MOP$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MacedoniaDenar: {
    code: "MKD" /* MacedoniaDenar */,
    countries: [CountryCode.NorthMacedonia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Macedonia Denar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0434\u0435\u043D",
    symbol_native: "\u0434\u0435\u043D",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MadagascarAriary: {
    code: "MGA" /* MadagascarAriary */,
    countries: [CountryCode.Madagascar],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Madagascar Ariary",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Ar",
    symbol_native: "Ar",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MalawiKwacha: {
    code: "MWK" /* MalawiKwacha */,
    countries: [CountryCode.Malawi],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Malawi Kwacha",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "MK",
    symbol_native: "MK",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MalaysiaRinggit: {
    code: "MYR" /* MalaysiaRinggit */,
    countries: [CountryCode.Malaysia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Malaysia Ringgit",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "RM",
    symbol_native: "RM",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MaldivesRufiyaa: {
    code: "MVR" /* MaldivesRufiyaa */,
    countries: [CountryCode.Maldives],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Maldives Rufiyaa",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Rf",
    symbol_native: "Rf",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MaltaLira: {
    code: "MTL" /* MaltaLira */,
    countries: [CountryCode.Malta],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Malta Lira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Lm",
    symbol_native: "Lm",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MauritiusRupee: {
    code: "MUR" /* MauritiusRupee */,
    countries: [CountryCode.Mauritius],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mauritius Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MexicoPeso: {
    code: "MXN" /* MexicoPeso */,
    countries: [CountryCode.Mexico],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mexico Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MoldovaLeu: {
    code: "MDL" /* MoldovaLeu */,
    countries: [CountryCode.Moldova],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Moldova Leu",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "L",
    symbol_native: "L",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MongoliaTughrik: {
    code: "MNT" /* MongoliaTughrik */,
    countries: [CountryCode.Mongolia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mongolia Tughrik",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AE",
    symbol_native: "\u20AE",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MoroccoDirham: {
    code: "MAD" /* MoroccoDirham */,
    countries: [CountryCode.Morocco],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Morocco Dirham",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "DH",
    symbol_native: "DH",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MozambiqueMetical: {
    code: "MZN" /* MozambiqueMetical */,
    countries: [CountryCode.Mozambique],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mozambique Metical",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "MT",
    symbol_native: "MT",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MyanmarKyat: {
    code: "MMK" /* MyanmarKyat */,
    countries: [CountryCode.Myanmar],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Myanmar Kyat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "K",
    symbol_native: "K",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NamibiaDollar: {
    code: "NAD" /* NamibiaDollar */,
    countries: [CountryCode.Namibia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Namibia Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NepalRupee: {
    code: "NPR" /* NepalRupee */,
    countries: [CountryCode.Nepal],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Nepal Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NetherlandsAntillesGuilder: {
    code: "ANG" /* NetherlandsAntillesGuilder */,
    countries: [CountryCode.NetherlandsAntilles],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Netherlands Antilles Guilder",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0192",
    symbol_native: "\u0192",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NewCaledoniaFranc: {
    code: "XPF" /* NewCaledoniaFranc */,
    countries: [CountryCode.NewCaledonia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "New Caledonia Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A3",
    symbol_native: "\u20A3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NewZealandDollar: {
    code: "NZD" /* NewZealandDollar */,
    countries: [CountryCode.NewZealand],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "New Zealand Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NicaraguaCordoba: {
    code: "NIO" /* NicaraguaCordoba */,
    countries: [CountryCode.Nicaragua],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Nicaragua Cordoba",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "C$",
    symbol_native: "C$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NigerCFAFranc: {
    code: "XOF" /* NigerCFAFranc */,
    countries: [CountryCode.Niger],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Niger CFA Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "CFA",
    symbol_native: "CFA",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NigeriaNaira: {
    code: "NGN" /* NigeriaNaira */,
    countries: [CountryCode.Nigeria],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Nigeria Naira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A6",
    symbol_native: "\u20A6",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NorthKoreaWon: {
    code: "KPW" /* NorthKoreaWon */,
    countries: [CountryCode.NorthKorea],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "North Korea Won",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A9",
    symbol_native: "\u20A9",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NorwayKrone: {
    code: "NOK" /* NorwayKrone */,
    countries: [CountryCode.Norway],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Norway Krone",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  OmanRial: {
    code: "OMR" /* OmanRial */,
    countries: [CountryCode.Oman],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Oman Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PakistanRupee: {
    code: "PKR" /* PakistanRupee */,
    countries: [CountryCode.Pakistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Pakistan Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PanamaBalboa: {
    code: "PAB" /* PanamaBalboa */,
    countries: [CountryCode.Panama],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Panama Balboa",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "B/.",
    symbol_native: "B/.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ParaguayGuarani: {
    code: "PYG" /* ParaguayGuarani */,
    countries: [CountryCode.Paraguay],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Paraguay Guarani",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Gs",
    symbol_native: "Gs",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PeruvianNuevo: {
    code: "PEN" /* PeruNuevo */,
    countries: [CountryCode.Peru],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Peruvian Nuevo",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "S/.",
    symbol_native: "S/.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PhilippinesPeso: {
    code: "PHP" /* PhilippinesPeso */,
    countries: [CountryCode.Philippines],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Philippines Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B1",
    symbol_native: "\u20B1",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PolandZloty: {
    code: "PLN" /* PolandZloty */,
    countries: [CountryCode.Poland],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Poland Zloty",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "z\u0142",
    symbol_native: "z\u0142",
    symbol_placement: "before",
    thousands_separator: "."
  },
  QatarRial: {
    code: "QAR" /* QatarRial */,
    countries: [CountryCode.Qatar],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Qatar Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  RomaniaNewLeu: {
    code: "RON" /* RomaniaNewLeu */,
    countries: [CountryCode.Romania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Romania New Leu",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "lei",
    symbol_native: "lei",
    symbol_placement: "before",
    thousands_separator: "."
  },
  RussiaRuble: {
    code: "RUB" /* RussiaRuble */,
    countries: [CountryCode.RussianFederation],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Russia Ruble",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20BD",
    symbol_native: "\u20BD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  RwandaFranc: {
    code: "RWF" /* RwandaFranc */,
    countries: [CountryCode.Rwanda],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Rwanda Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "RF",
    symbol_native: "RF",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SaudiArabiaRiyal: {
    code: "SAR" /* SaudiArabiaRiyal */,
    countries: [CountryCode.SaudiArabia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Saudi Arabia Riyal",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SerbiaDinar: {
    code: "RSD" /* SerbiaDinar */,
    countries: [CountryCode.Serbia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Serbia Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0414\u0438\u043D.",
    symbol_native: "\u0414\u0438\u043D.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SeychellesRupee: {
    code: "SCR" /* SeychellesRupee */,
    countries: [CountryCode.Seychelles],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Seychelles Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SingaporeDollar: {
    code: "SGD" /* SingaporeDollar */,
    countries: [CountryCode.Singapore],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Singapore Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SlovakiaKoruna: {
    code: "SKK" /* SlovakiaKoruna */,
    countries: [CountryCode.Slovakia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Slovakia Koruna",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Sk",
    symbol_native: "Sk",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SloveniaTolar: {
    code: "SIT" /* SloveniaTolar */,
    countries: [CountryCode.Slovenia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Slovenia Tolar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "SIT",
    symbol_native: "SIT",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SolomonIslandsDollar: {
    code: "SBD" /* SolomonIslandsDollar */,
    countries: [CountryCode.SolomonIslands],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Solomon Islands Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SomaliaShilling: {
    code: "SOS" /* SomaliaShilling */,
    countries: [CountryCode.Somalia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Somalia Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "S",
    symbol_native: "S",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SouthAfricaRand: {
    code: "ZAR" /* SouthAfricaRand */,
    countries: [CountryCode.SouthAfrica],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "South Africa Rand",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "R",
    symbol_native: "R",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SouthKoreaWon: {
    code: "KRW" /* SouthKoreaWon */,
    countries: [CountryCode.SouthKorea],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "South Korea Won",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A9",
    symbol_native: "\u20A9",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SriLankaRupee: {
    code: "LKR" /* SriLankaRupee */,
    countries: [CountryCode.SriLanka],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Sri Lanka Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SudanPound: {
    code: "SDG" /* SudanPound */,
    countries: [CountryCode.Sudan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Sudan Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SurinameDollar: {
    code: "SRD" /* SurinameDollar */,
    countries: [CountryCode.Suriname],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Suriname Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SwazilandLilangeni: {
    code: "SZL" /* SwazilandLilangeni */,
    countries: [CountryCode.Swaziland],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Swaziland Lilangeni",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "E",
    symbol_native: "E",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SwedenKrona: {
    code: "SEK" /* SwedenKrona */,
    countries: [CountryCode.Sweden],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Sweden Krona",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SwitzerlandFranc: {
    code: "CHF" /* SwitzerlandFranc */,
    countries: [CountryCode.Switzerland],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Switzerland Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "CHF",
    symbol_native: "CHF",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SyriaPound: {
    code: "SYP" /* SyriaPound */,
    countries: [CountryCode.Syria],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Syria Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TaiwanNewDollar: {
    code: "TWD" /* TaiwanNewDollar */,
    countries: [CountryCode.Taiwan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Taiwan New Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "NT$",
    symbol_native: "NT$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TajikistanSomoni: {
    code: "TJS" /* TajikistanSomoni */,
    countries: [CountryCode.Tajikistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Tajikistan Somoni",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "TJS",
    symbol_native: "TJS",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TanzaniaShilling: {
    code: "TZS" /* TanzaniaShilling */,
    countries: [CountryCode.Tanzania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Tanzania Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "TSh",
    symbol_native: "TSh",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ThailandBaht: {
    code: "THB" /* ThailandBaht */,
    countries: [CountryCode.Thailand],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Thailand Baht",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0E3F",
    symbol_native: "\u0E3F",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TunisiaDinar: {
    code: "TND" /* TunisiaDinar */,
    countries: [CountryCode.Tunisia],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Tunisia Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u062F.\u062A",
    symbol_native: "\u062F.\u062A",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TurkeyLira: {
    code: "TRY" /* TurkeyLira */,
    countries: [CountryCode.Turkey],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Turkey Lira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20BA",
    symbol_native: "\u20BA",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TurkmenistanManat: {
    code: "TMT" /* TurkmenistanManat */,
    countries: [CountryCode.Turkmenistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Turkmenistan Manat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "m",
    symbol_native: "m",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UgandaShilling: {
    code: "UGX" /* UgandaShilling */,
    countries: [CountryCode.Uganda],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Uganda Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "USh",
    symbol_native: "USh",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UkraineHryvnia: {
    code: "UAH" /* UkraineHryvnia */,
    countries: [CountryCode.Ukraine],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Ukraine Hryvnia",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B4",
    symbol_native: "\u20B4",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UnitedArabEmiratesDirham: {
    code: "AED" /* UnitedArabEmiratesDirham */,
    countries: [CountryCode.UnitedArabEmirates],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "United Arab Emirates Dirham",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u062F.\u0625",
    symbol_native: "\u062F.\u0625",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UnitedKingdomPound: {
    code: "GBP" /* UnitedKingdomPound */,
    countries: [CountryCode.UnitedKingdom],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "United Kingdom Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UnitedStatesDollar: {
    code: "USD" /* UnitedStatesDollar */,
    countries: [CountryCode.UnitedStates],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "United States Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UruguayPeso: {
    code: "UYU" /* UruguayPeso */,
    countries: [CountryCode.Uruguay],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Uruguay Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$U",
    symbol_native: "$U",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UzbekistanSom: {
    code: "UZS" /* UzbekistanSom */,
    countries: [CountryCode.Uzbekistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Uzbekistan Som",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "UZS",
    symbol_native: "UZS",
    symbol_placement: "before",
    thousands_separator: "."
  },
  VanuatuVatu: {
    code: "VUV" /* VanuatuVatu */,
    countries: [CountryCode.Vanuatu],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Vanuatu Vatu",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "VT",
    symbol_native: "VT",
    symbol_placement: "before",
    thousands_separator: "."
  },
  VenezuelaBolivar: {
    code: "VEF" /* VenezuelaBolivar */,
    countries: [CountryCode.Venezuela],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Venezuela Bolivar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Bs. F",
    symbol_native: "Bs. F",
    symbol_placement: "before",
    thousands_separator: "."
  },
  VietnamDong: {
    code: "VND" /* VietnamDong */,
    countries: [CountryCode.Vietnam],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Vietnam Dong",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AB",
    symbol_native: "\u20AB",
    symbol_placement: "before",
    thousands_separator: "."
  },
  YemenRial: {
    code: "YER" /* YemenRial */,
    countries: [CountryCode.Yemen],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Yemen Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ZambiaKwacha: {
    code: "ZMW" /* ZambiaKwacha */,
    countries: [CountryCode.Zambia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Zambia Kwacha",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "ZK",
    symbol_native: "ZK",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ZimbabweDollar: {
    code: "ZWL" /* ZimbabweDollar */,
    countries: [CountryCode.Zimbabwe],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Zimbabwe Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AB",
    symbol_native: "\u20AB",
    symbol_placement: "before",
    thousands_separator: "."
  }
});

var LanguageCode = /* @__PURE__ */ ((LanguageCode2) => {
  LanguageCode2["Afrikaans"] = "af";
  LanguageCode2["Albanian"] = "sq";
  LanguageCode2["Amharic"] = "am";
  LanguageCode2["Arabic"] = "ar";
  LanguageCode2["Armenian"] = "hy";
  LanguageCode2["Azerbaijani"] = "az";
  LanguageCode2["Bashkir"] = "ba";
  LanguageCode2["Basque"] = "eu";
  LanguageCode2["Belarusian"] = "be";
  LanguageCode2["Bengali"] = "bn";
  LanguageCode2["Berber"] = "ber";
  LanguageCode2["Bhutani"] = "dz";
  LanguageCode2["Bihari"] = "bh";
  LanguageCode2["Bislama"] = "bi";
  LanguageCode2["Bosnian"] = "bs";
  LanguageCode2["Breten"] = "br";
  LanguageCode2["Bulgarian"] = "bg";
  LanguageCode2["Burmese"] = "my";
  LanguageCode2["Cantonese"] = "yue";
  LanguageCode2["Catalan"] = "ca";
  LanguageCode2["Chinese"] = "zh";
  LanguageCode2["Chuvash"] = "cv";
  LanguageCode2["Corsican"] = "co";
  LanguageCode2["Croatian"] = "hr";
  LanguageCode2["Czech"] = "cs";
  LanguageCode2["Danish"] = "da";
  LanguageCode2["Dari"] = "prs";
  LanguageCode2["Divehi"] = "dv";
  LanguageCode2["Dutch"] = "nl";
  LanguageCode2["English"] = "en";
  LanguageCode2["Esperanto"] = "eo";
  LanguageCode2["Estonian"] = "et";
  LanguageCode2["Faroese"] = "fo";
  LanguageCode2["Farsi"] = "fa";
  LanguageCode2["Filipino"] = "fil";
  LanguageCode2["Finnish"] = "fi";
  LanguageCode2["French"] = "fr";
  LanguageCode2["Frisian"] = "fy";
  LanguageCode2["Galician"] = "gl";
  LanguageCode2["Georgian"] = "ka";
  LanguageCode2["German"] = "de";
  LanguageCode2["Greek"] = "el";
  LanguageCode2["Greenlandic"] = "kl";
  LanguageCode2["Gujarati"] = "gu";
  LanguageCode2["Haitian"] = "ht";
  LanguageCode2["Hausa"] = "ha";
  LanguageCode2["Hebrew"] = "he";
  LanguageCode2["Hindi"] = "hi";
  LanguageCode2["Hungarian"] = "hu";
  LanguageCode2["Icelandic"] = "is";
  LanguageCode2["Igbo"] = "ig";
  LanguageCode2["Indonesian"] = "id";
  LanguageCode2["Irish"] = "ga";
  LanguageCode2["Italian"] = "it";
  LanguageCode2["Japanese"] = "ja";
  LanguageCode2["Javanese"] = "jv";
  LanguageCode2["Kannada"] = "kn";
  LanguageCode2["Karelian"] = "krl";
  LanguageCode2["Kazakh"] = "kk";
  LanguageCode2["Khmer"] = "km";
  LanguageCode2["Komi"] = "kv";
  LanguageCode2["Konkani"] = "kok";
  LanguageCode2["Korean"] = "ko";
  LanguageCode2["Kurdish"] = "ku";
  LanguageCode2["Kyrgyz"] = "ky";
  LanguageCode2["Lao"] = "lo";
  LanguageCode2["Latin"] = "la";
  LanguageCode2["Latvian"] = "lv";
  LanguageCode2["Lithuanian"] = "lt";
  LanguageCode2["Luxembourgish"] = "lb";
  LanguageCode2["Ossetian"] = "os";
  LanguageCode2["Macedonian"] = "mk";
  LanguageCode2["Malagasy"] = "mg";
  LanguageCode2["Malay"] = "ms";
  LanguageCode2["Malayalam"] = "ml";
  LanguageCode2["Maltese"] = "mt";
  LanguageCode2["Maori"] = "mi";
  LanguageCode2["Marathi"] = "mr";
  LanguageCode2["Mari"] = "mhr";
  LanguageCode2["Mongolian"] = "mn";
  LanguageCode2["Montenegrin"] = "me";
  LanguageCode2["Nepali"] = "ne";
  LanguageCode2["NorthernSotho"] = "nso";
  LanguageCode2["Norwegian"] = "no";
  LanguageCode2["NorwegianBokmal"] = "nb";
  LanguageCode2["NorwegianNynorsk"] = "nn";
  LanguageCode2["Oriya"] = "or";
  LanguageCode2["Pashto"] = "ps";
  LanguageCode2["Persian"] = "fa";
  LanguageCode2["Polish"] = "pl";
  LanguageCode2["Portuguese"] = "pt";
  LanguageCode2["Punjabi"] = "pa";
  LanguageCode2["Quechua"] = "qu";
  LanguageCode2["Romanian"] = "ro";
  LanguageCode2["Russian"] = "ru";
  LanguageCode2["Sakha"] = "sah";
  LanguageCode2["Sami"] = "se";
  LanguageCode2["Samoan"] = "sm";
  LanguageCode2["Sanskrit"] = "sa";
  LanguageCode2["Scots"] = "gd";
  LanguageCode2["Serbian"] = "sr";
  LanguageCode2["SerbianCyrillic"] = "sr-Cyrl";
  LanguageCode2["Sesotho"] = "st";
  LanguageCode2["Shona"] = "sn";
  LanguageCode2["Sindhi"] = "sd";
  LanguageCode2["Sinhala"] = "si";
  LanguageCode2["Slovak"] = "sk";
  LanguageCode2["Slovenian"] = "sl";
  LanguageCode2["Somali"] = "so";
  LanguageCode2["Spanish"] = "es";
  LanguageCode2["Sudanese"] = "su";
  LanguageCode2["Sutu"] = "sx";
  LanguageCode2["Swahili"] = "sw";
  LanguageCode2["Swedish"] = "sv";
  LanguageCode2["Syriac"] = "syr";
  LanguageCode2["Tagalog"] = "tl";
  LanguageCode2["Tajik"] = "tg";
  LanguageCode2["Tamazight"] = "tmh";
  LanguageCode2["Tamil"] = "ta";
  LanguageCode2["Tatar"] = "tt";
  LanguageCode2["Telugu"] = "te";
  LanguageCode2["Thai"] = "th";
  LanguageCode2["Tibetan"] = "bo";
  LanguageCode2["Tsonga"] = "ts";
  LanguageCode2["Tswana"] = "tn";
  LanguageCode2["Turkish"] = "tr";
  LanguageCode2["Turkmen"] = "tk";
  LanguageCode2["Ukrainian"] = "uk";
  LanguageCode2["Urdu"] = "ur";
  LanguageCode2["Uzbek"] = "uz";
  LanguageCode2["Vietnamese"] = "vi";
  LanguageCode2["Welsh"] = "cy";
  LanguageCode2["Xhosa"] = "xh";
  LanguageCode2["Yiddish"] = "yi";
  LanguageCode2["Yoruba"] = "yo";
  LanguageCode2["Zulu"] = "zu";
  return LanguageCode2;
})(LanguageCode || {});

var LocaleCode = /* @__PURE__ */ ((LocaleCode2) => {
  LocaleCode2["Afrikaans"] = "af";
  LocaleCode2["AfrikaansSouthAfrica"] = "af-ZA";
  LocaleCode2["Albanian"] = "sq";
  LocaleCode2["AlbanianAlbania"] = "sq-AL";
  LocaleCode2["Amharic"] = "am";
  LocaleCode2["AmharicEthiopia"] = "am-ET";
  LocaleCode2["Arabic"] = "ar";
  LocaleCode2["ArabicAlgeria"] = "ar-DZ";
  LocaleCode2["ArabicBahrain"] = "ar-BH";
  LocaleCode2["ArabicEgypt"] = "ar-EG";
  LocaleCode2["ArabicIraq"] = "ar-IQ";
  LocaleCode2["ArabicJordan"] = "ar-JO";
  LocaleCode2["ArabicKuwait"] = "ar-KW";
  LocaleCode2["ArabicLebanon"] = "ar-LB";
  LocaleCode2["ArabicLibya"] = "ar-LY";
  LocaleCode2["ArabicMorocco"] = "ar-MA";
  LocaleCode2["ArabicOman"] = "ar-OM";
  LocaleCode2["ArabicQatar"] = "ar-QA";
  LocaleCode2["ArabicSaudiArabia"] = "ar-SA";
  LocaleCode2["ArabicSyria"] = "ar-SY";
  LocaleCode2["ArabicTunisia"] = "ar-TN";
  LocaleCode2["ArabicUnitedArabEmirates"] = "ar-AE";
  LocaleCode2["ArabicYemen"] = "ar-YE";
  LocaleCode2["Armenian"] = "hy";
  LocaleCode2["ArmenianArmenia"] = "hy-AM";
  LocaleCode2["Azerbaijani"] = "az";
  LocaleCode2["AzerbaijaniAzerbaijan"] = "az-AZ";
  LocaleCode2["AzerbaijaniCyrillicAzerbaijan"] = "az-Cyrl-AZ";
  LocaleCode2["Bashkir"] = "ba";
  LocaleCode2["Basque"] = "eu";
  LocaleCode2["BasqueSpain"] = "eu-ES";
  LocaleCode2["Belarusian"] = "be";
  LocaleCode2["BelarusianBelarus"] = "be-BY";
  LocaleCode2["Bengali"] = "bn";
  LocaleCode2["BengaliBangladesh"] = "bn-BD";
  LocaleCode2["BengaliIndia"] = "bn-IN";
  LocaleCode2["Berber"] = "ber";
  LocaleCode2["Bhutani"] = "dz";
  LocaleCode2["BhutaniBhutan"] = "dz-BT";
  LocaleCode2["Bosnian"] = "bs";
  LocaleCode2["BosnianBosniaAndHerzegovina"] = "bs-BA";
  LocaleCode2["Breton"] = "br";
  LocaleCode2["Bulgarian"] = "bg";
  LocaleCode2["BulgarianBosniaAndHerzegovina"] = "bg-BG";
  LocaleCode2["BulgarianBulgaria"] = "bg-BG";
  LocaleCode2["Burmese"] = "my";
  LocaleCode2["BurmeseMyanmar"] = "my-MM";
  LocaleCode2["Cantonese"] = "yue";
  LocaleCode2["CantoneseHongKong"] = "yue-HK";
  LocaleCode2["Catalan"] = "ca";
  LocaleCode2["CatalanSpain"] = "ca-ES";
  LocaleCode2["Chechen"] = "ce";
  LocaleCode2["Cherokee"] = "chr";
  LocaleCode2["Chinese"] = "zh";
  LocaleCode2["ChineseSimplified"] = "zh-Hans";
  LocaleCode2["ChineseSimplifiedChina"] = "zh-Hans-CN";
  LocaleCode2["ChineseSimplifiedHongKong"] = "zh-Hans-HK";
  LocaleCode2["ChineseSimplifiedMacau"] = "zh-Hans-MO";
  LocaleCode2["ChineseSimplifiedSingapore"] = "zh-Hans-SG";
  LocaleCode2["ChineseTraditional"] = "zh-Hant";
  LocaleCode2["ChineseTraditionalHongKong"] = "zh-Hant-HK";
  LocaleCode2["ChineseTraditionalMacau"] = "zh-Hant-MO";
  LocaleCode2["ChineseTraditionalSingapore"] = "zh-Hant-SG";
  LocaleCode2["ChineseTraditionalTaiwan"] = "zh-Hant-TW";
  LocaleCode2["Chuvash"] = "cv";
  LocaleCode2["CorsicanFrance"] = "co-FR";
  LocaleCode2["Croatian"] = "hr";
  LocaleCode2["CroatianBosniaAndHerzegovina"] = "hr-BA";
  LocaleCode2["CroatianCroatia"] = "hr-HR";
  LocaleCode2["Czech"] = "cs";
  LocaleCode2["CzechCzechRepublic"] = "cs-CZ";
  LocaleCode2["Danish"] = "da";
  LocaleCode2["DanishDenmark"] = "da-DK";
  LocaleCode2["Dari"] = "prs";
  LocaleCode2["DariAfghanistan"] = "prs-AF";
  LocaleCode2["Divehi"] = "dv";
  LocaleCode2["DivehiMaldives"] = "dv-MV";
  LocaleCode2["Dutch"] = "nl";
  LocaleCode2["DutchBelgium"] = "nl-BE";
  LocaleCode2["DutchNetherlands"] = "nl-NL";
  LocaleCode2["English"] = "en";
  LocaleCode2["EnglishAustralia"] = "en-AU";
  LocaleCode2["EnglishBelgium"] = "en-BE";
  LocaleCode2["EnglishBelize"] = "en-BZ";
  LocaleCode2["EnglishCanada"] = "en-CA";
  LocaleCode2["EnglishCaribbean"] = "en-029";
  LocaleCode2["EnglishIreland"] = "en-IE";
  LocaleCode2["EnglishJamaica"] = "en-JM";
  LocaleCode2["EnglishNewZealand"] = "en-NZ";
  LocaleCode2["EnglishPhilippines"] = "en-PH";
  LocaleCode2["EnglishSingapore"] = "en-SG";
  LocaleCode2["EnglishSouthAfrica"] = "en-ZA";
  LocaleCode2["EnglishTrinidadAndTobago"] = "en-TT";
  LocaleCode2["EnglishUnitedKingdom"] = "en-GB";
  LocaleCode2["EnglishUnitedStates"] = "en-US";
  LocaleCode2["EnglishZimbabwe"] = "en-ZW";
  LocaleCode2["Esperanto"] = "eo";
  LocaleCode2["Estonian"] = "et";
  LocaleCode2["EstonianEstonia"] = "et-EE";
  LocaleCode2["Faroese"] = "fo";
  LocaleCode2["FaroeseFaroeIslands"] = "fo-FO";
  LocaleCode2["Farsi"] = "fa";
  LocaleCode2["FarsiIran"] = "fa-IR";
  LocaleCode2["Filipino"] = "fil";
  LocaleCode2["FilipinoPhilippines"] = "fil-PH";
  LocaleCode2["Finnish"] = "fi";
  LocaleCode2["FinnishFinland"] = "fi-FI";
  LocaleCode2["French"] = "fr";
  LocaleCode2["FrenchBelgium"] = "fr-BE";
  LocaleCode2["FrenchCanada"] = "fr-CA";
  LocaleCode2["FrenchFrance"] = "fr-FR";
  LocaleCode2["FrenchLuxembourg"] = "fr-LU";
  LocaleCode2["FrenchMonaco"] = "fr-MC";
  LocaleCode2["FrenchReunion"] = "fr-RE";
  LocaleCode2["FrenchSwitzerland"] = "fr-CH";
  LocaleCode2["Frisian"] = "fy";
  LocaleCode2["FrisianNetherlands"] = "fy-NL";
  LocaleCode2["Galician"] = "gl";
  LocaleCode2["GalicianSpain"] = "gl-ES";
  LocaleCode2["Georgian"] = "ka";
  LocaleCode2["GeorgianGeorgia"] = "ka-GE";
  LocaleCode2["German"] = "de";
  LocaleCode2["GermanAustria"] = "de-AT";
  LocaleCode2["GermanBelgium"] = "de-BE";
  LocaleCode2["GermanGermany"] = "de-DE";
  LocaleCode2["GermanLiechtenstein"] = "de-LI";
  LocaleCode2["GermanLuxembourg"] = "de-LU";
  LocaleCode2["GermanSwitzerland"] = "de-CH";
  LocaleCode2["Greenlandic"] = "kl";
  LocaleCode2["GreenlandicGreenland"] = "kl-GL";
  LocaleCode2["Greek"] = "el";
  LocaleCode2["GreekGreece"] = "el-GR";
  LocaleCode2["Gujarati"] = "gu";
  LocaleCode2["GujaratiIndia"] = "gu-IN";
  LocaleCode2["Haitian"] = "ht";
  LocaleCode2["Hausa"] = "ha";
  LocaleCode2["HausaGhana"] = "ha-GH";
  LocaleCode2["HausaNiger"] = "ha-NE";
  LocaleCode2["HausaNigeria"] = "ha-NG";
  LocaleCode2["Hebrew"] = "he";
  LocaleCode2["HebrewIsrael"] = "he-IL";
  LocaleCode2["Hindi"] = "hi";
  LocaleCode2["HindiIndia"] = "hi-IN";
  LocaleCode2["Hungarian"] = "hu";
  LocaleCode2["HungarianHungary"] = "hu-HU";
  LocaleCode2["Icelandic"] = "is";
  LocaleCode2["IcelandicIceland"] = "is-IS";
  LocaleCode2["Igbo"] = "ig";
  LocaleCode2["IgboNigeria"] = "ig-NG";
  LocaleCode2["Indonesian"] = "id";
  LocaleCode2["IndonesianIndonesia"] = "id-ID";
  LocaleCode2["Irish"] = "ga";
  LocaleCode2["IrishIreland"] = "ga-IE";
  LocaleCode2["Italian"] = "it";
  LocaleCode2["ItalianItaly"] = "it-IT";
  LocaleCode2["ItalianSwitzerland"] = "it-CH";
  LocaleCode2["Japanese"] = "ja";
  LocaleCode2["JapaneseJapan"] = "ja-JP";
  LocaleCode2["Javanese"] = "jv";
  LocaleCode2["Kannada"] = "kn";
  LocaleCode2["KannadaIndia"] = "kn-IN";
  LocaleCode2["Karelian"] = "krl";
  LocaleCode2["Kazakh"] = "kk";
  LocaleCode2["KazakhKazakhstan"] = "kk-KZ";
  LocaleCode2["Khmer"] = "km";
  LocaleCode2["KhmerCambodia"] = "km-KH";
  LocaleCode2["KinyarwandaRwanda"] = "rw-RW";
  LocaleCode2["Komi"] = "kv";
  LocaleCode2["Konkani"] = "kok";
  LocaleCode2["KonkaniIndia"] = "kok-IN";
  LocaleCode2["Korean"] = "ko";
  LocaleCode2["KoreanSouthKorea"] = "ko-KR";
  LocaleCode2["Kurdish"] = "ku";
  LocaleCode2["KurdishIraq"] = "ku-IQ";
  LocaleCode2["KurdishTurkey"] = "ku-TR";
  LocaleCode2["Kyrgyz"] = "ky";
  LocaleCode2["KyrgyzKyrgyzstan"] = "ky-KG";
  LocaleCode2["Lao"] = "lo";
  LocaleCode2["LaoLaos"] = "lo-LA";
  LocaleCode2["Latin"] = "la";
  LocaleCode2["Latvian"] = "lv";
  LocaleCode2["LatvianLatvia"] = "lv-LV";
  LocaleCode2["Lithuanian"] = "lt";
  LocaleCode2["LithuanianLithuania"] = "lt-LT";
  LocaleCode2["Luxembourgish"] = "lb";
  LocaleCode2["LuxembourgishBelgium"] = "lb-LU";
  LocaleCode2["LuxembourgishLuxembourg"] = "lb-LU";
  LocaleCode2["Macedonian"] = "mk";
  LocaleCode2["MacedonianNorthMacedonia"] = "mk-MK";
  LocaleCode2["Malagasy"] = "mg";
  LocaleCode2["Malay"] = "ms";
  LocaleCode2["MalayBrunei"] = "ms-BN";
  LocaleCode2["MalayIndia"] = "ms-IN";
  LocaleCode2["MalayMalaysia"] = "ms-MY";
  LocaleCode2["MalaySingapore"] = "ms-SG";
  LocaleCode2["Malayalam"] = "ml";
  LocaleCode2["MalayalamIndia"] = "ml-IN";
  LocaleCode2["Maltese"] = "mt";
  LocaleCode2["MalteseMalta"] = "mt-MT";
  LocaleCode2["Maori"] = "mi";
  LocaleCode2["MaoriNewZealand"] = "mi-NZ";
  LocaleCode2["Marathi"] = "mr";
  LocaleCode2["MarathiIndia"] = "mr-IN";
  LocaleCode2["Mari"] = "chm";
  LocaleCode2["Mongolian"] = "mn";
  LocaleCode2["MongolianMongolia"] = "mn-MN";
  LocaleCode2["Montenegrin"] = "me";
  LocaleCode2["MontenegrinMontenegro"] = "me-ME";
  LocaleCode2["Nepali"] = "ne";
  LocaleCode2["NepaliNepal"] = "ne-NP";
  LocaleCode2["NorthernSotho"] = "ns";
  LocaleCode2["NorthernSothoSouthAfrica"] = "ns-ZA";
  LocaleCode2["Norwegian"] = "nb";
  LocaleCode2["NorwegianBokmalNorway"] = "nb-NO";
  LocaleCode2["NorwegianNynorskNorway"] = "nn-NO";
  LocaleCode2["Oriya"] = "or";
  LocaleCode2["OriyaIndia"] = "or-IN";
  LocaleCode2["Ossetian"] = "os";
  LocaleCode2["Pashto"] = "ps";
  LocaleCode2["PashtoAfghanistan"] = "ps-AF";
  LocaleCode2["Persian"] = "fa";
  LocaleCode2["PersianIran"] = "fa-IR";
  LocaleCode2["Polish"] = "pl";
  LocaleCode2["PolishPoland"] = "pl-PL";
  LocaleCode2["Portuguese"] = "pt";
  LocaleCode2["PortugueseBrazil"] = "pt-BR";
  LocaleCode2["PortuguesePortugal"] = "pt-PT";
  LocaleCode2["Punjabi"] = "pa";
  LocaleCode2["PunjabiIndia"] = "pa-IN";
  LocaleCode2["PunjabiPakistan"] = "pa-PK";
  LocaleCode2["Quechua"] = "qu";
  LocaleCode2["QuechuaBolivia"] = "qu-BO";
  LocaleCode2["QuechuaEcuador"] = "qu-EC";
  LocaleCode2["QuechuaPeru"] = "qu-PE";
  LocaleCode2["Romanian"] = "ro";
  LocaleCode2["RomanianRomania"] = "ro-RO";
  LocaleCode2["Russian"] = "ru";
  LocaleCode2["RussianKazakhstan"] = "ru-KZ";
  LocaleCode2["RussianKyrgyzstan"] = "ru-KG";
  LocaleCode2["RussianRussia"] = "ru-RU";
  LocaleCode2["RussianUkraine"] = "ru-UA";
  LocaleCode2["Sakha"] = "sah";
  LocaleCode2["Sanskrit"] = "sa";
  LocaleCode2["SanskritIndia"] = "sa-IN";
  LocaleCode2["Sami"] = "se";
  LocaleCode2["SamiNorway"] = "se-NO";
  LocaleCode2["SamiSweden"] = "se-SE";
  LocaleCode2["SamiFinland"] = "se-FI";
  LocaleCode2["Samoan"] = "sm";
  LocaleCode2["SamoanSamoa"] = "sm-WS";
  LocaleCode2["Scots"] = "gd";
  LocaleCode2["Serbian"] = "sr";
  LocaleCode2["SerbianBosniaAndHerzegovina"] = "sr-BA";
  LocaleCode2["SerbianSerbiaAndMontenegro"] = "sr-SP";
  LocaleCode2["SerbianCyrillic"] = "sr-SP-Cyrl";
  LocaleCode2["SerbianCyrillicBosniaAndHerzegovina"] = "sr-Cyrl-BA";
  LocaleCode2["SerbianCyrillicSerbiaAndMontenegro"] = "sr-Cyrl-SP";
  LocaleCode2["Sesotho"] = "st";
  LocaleCode2["SesothoSouthAfrica"] = "st-ZA";
  LocaleCode2["Shona"] = "sn";
  LocaleCode2["ShonaZimbabwe"] = "sn-ZW";
  LocaleCode2["Sindhi"] = "sd";
  LocaleCode2["SindhiPakistan"] = "sd-PK";
  LocaleCode2["Sinhala"] = "si";
  LocaleCode2["SinhalaSriLanka"] = "si-LK";
  LocaleCode2["Slovak"] = "sk";
  LocaleCode2["SlovakSlovakia"] = "sk-SK";
  LocaleCode2["Slovenian"] = "sl";
  LocaleCode2["SlovenianSlovenia"] = "sl-SI";
  LocaleCode2["Somali"] = "so";
  LocaleCode2["SomaliSomalia"] = "so-SO";
  LocaleCode2["Spanish"] = "es";
  LocaleCode2["SpanishArgentina"] = "es-AR";
  LocaleCode2["SpanishBolivia"] = "es-BO";
  LocaleCode2["SpanishChile"] = "es-CL";
  LocaleCode2["SpanishColombia"] = "es-CO";
  LocaleCode2["SpanishCostaRica"] = "es-CR";
  LocaleCode2["SpanishCuba"] = "es-CU";
  LocaleCode2["SpanishDominicanRepublic"] = "es-DO";
  LocaleCode2["SpanishEcuador"] = "es-EC";
  LocaleCode2["SpanishEquatorialGuinea"] = "es-GQ";
  LocaleCode2["SpanishElSalvador"] = "es-SV";
  LocaleCode2["SpanishGuatemala"] = "es-GT";
  LocaleCode2["SpanishHonduras"] = "es-HN";
  LocaleCode2["SpanishMexico"] = "es-MX";
  LocaleCode2["SpanishNicaragua"] = "es-NI";
  LocaleCode2["SpanishPanama"] = "es-PA";
  LocaleCode2["SpanishParaguay"] = "es-PY";
  LocaleCode2["SpanishPeru"] = "es-PE";
  LocaleCode2["SpanishPuertoRico"] = "es-PR";
  LocaleCode2["SpanishSpain"] = "es-ES";
  LocaleCode2["SpanishUnitedStates"] = "es-US";
  LocaleCode2["SpanishUruguay"] = "es-UY";
  LocaleCode2["SpanishVenezuela"] = "es-VE";
  LocaleCode2["Sudanese"] = "su";
  LocaleCode2["Sutu"] = "st";
  LocaleCode2["SutuSouthAfrica"] = "st-ZA";
  LocaleCode2["Swahili"] = "sw";
  LocaleCode2["SwahiliKenya"] = "sw-KE";
  LocaleCode2["Swedish"] = "sv";
  LocaleCode2["SwedishFinland"] = "sv-FI";
  LocaleCode2["SwedishSweden"] = "sv-SE";
  LocaleCode2["Syriac"] = "syr";
  LocaleCode2["SyriacSyria"] = "syr-SY";
  LocaleCode2["Tajik"] = "tg";
  LocaleCode2["TajikTajikistan"] = "tg-TJ";
  LocaleCode2["Tagalog"] = "tl";
  LocaleCode2["TagalogPhilippines"] = "tl-PH";
  LocaleCode2["Tamazight"] = "tmh";
  LocaleCode2["Tamil"] = "ta";
  LocaleCode2["TamilIndia"] = "ta-IN";
  LocaleCode2["Tatar"] = "tt";
  LocaleCode2["Telugu"] = "te";
  LocaleCode2["TeluguIndia"] = "te-IN";
  LocaleCode2["Thai"] = "th";
  LocaleCode2["ThaiThailand"] = "th-TH";
  LocaleCode2["Tibetan"] = "bo";
  LocaleCode2["TibetanBhutan"] = "bo-BT";
  LocaleCode2["TibetanChina"] = "bo-CN";
  LocaleCode2["TibetanIndia"] = "bo-IN";
  LocaleCode2["Tsonga"] = "ts";
  LocaleCode2["Tswana"] = "tn";
  LocaleCode2["TswanaSouthAfrica"] = "tn-ZA";
  LocaleCode2["Turkish"] = "tr";
  LocaleCode2["TurkishTurkey"] = "tr-TR";
  LocaleCode2["Turkmen"] = "tk";
  LocaleCode2["Ukrainian"] = "uk";
  LocaleCode2["UkrainianUkraine"] = "uk-UA";
  LocaleCode2["Urdu"] = "ur";
  LocaleCode2["UrduAfghanistan"] = "ur-AF";
  LocaleCode2["UrduIndia"] = "ur-IN";
  LocaleCode2["UrduPakistan"] = "ur-PK";
  LocaleCode2["Uzbek"] = "uz";
  LocaleCode2["UzbekCyrillic"] = "uz-Cyrl-UZ";
  LocaleCode2["UzbekLatin"] = "uz-Latn-UZ";
  LocaleCode2["UzbekUzbekistan"] = "uz-UZ";
  LocaleCode2["Vietnamese"] = "vi";
  LocaleCode2["VietnameseVietnam"] = "vi-VN";
  LocaleCode2["Welsh"] = "cy";
  LocaleCode2["WelshUnitedKingdom"] = "cy-GB";
  LocaleCode2["Xhosa"] = "xh";
  LocaleCode2["XhosaSouthAfrica"] = "xh-ZA";
  LocaleCode2["Yiddish"] = "yi";
  LocaleCode2["Yoruba"] = "yo";
  LocaleCode2["YorubaNigeria"] = "yo-NG";
  LocaleCode2["ZhuyinMandarinChina"] = "yue-Hant-CN";
  LocaleCode2["Zulu"] = "zu";
  LocaleCode2["ZuluSouthAfrica"] = "zu-ZA";
  return LocaleCode2;
})(LocaleCode || {});

var TimezoneRegions = /* @__PURE__ */ ((TimezoneRegions2) => {
  TimezoneRegions2["AfricaAbidjan"] = "Africa/Abidjan";
  TimezoneRegions2["AfricaAccra"] = "Africa/Accra";
  TimezoneRegions2["AfricaAddisAbaba"] = "Africa/Addis_Ababa";
  TimezoneRegions2["AfricaAlgiers"] = "Africa/Algiers";
  TimezoneRegions2["AfricaAsmara"] = "Africa/Asmara";
  TimezoneRegions2["AfricaBamako"] = "Africa/Bamako";
  TimezoneRegions2["AfricaBangui"] = "Africa/Bangui";
  TimezoneRegions2["AfricaBanjul"] = "Africa/Banjul";
  TimezoneRegions2["AfricaBissau"] = "Africa/Bissau";
  TimezoneRegions2["AfricaBlantyre"] = "Africa/Blantyre";
  TimezoneRegions2["AfricaBrazzaville"] = "Africa/Brazzaville";
  TimezoneRegions2["AfricaBujumbura"] = "Africa/Bujumbura";
  TimezoneRegions2["AfricaCairo"] = "Africa/Cairo";
  TimezoneRegions2["AfricaCasablanca"] = "Africa/Casablanca";
  TimezoneRegions2["AfricaCeuta"] = "Africa/Ceuta";
  TimezoneRegions2["AfricaConakry"] = "Africa/Conakry";
  TimezoneRegions2["AfricaDakar"] = "Africa/Dakar";
  TimezoneRegions2["AfricaDarEsSalaam"] = "Africa/Dar_es_Salaam";
  TimezoneRegions2["AfricaDjibouti"] = "Africa/Djibouti";
  TimezoneRegions2["AfricaDouala"] = "Africa/Douala";
  TimezoneRegions2["AfricaElAaiun"] = "Africa/El_Aaiun";
  TimezoneRegions2["AfricaFreetown"] = "Africa/Freetown";
  TimezoneRegions2["AfricaGaborone"] = "Africa/Gaborone";
  TimezoneRegions2["AfricaHarare"] = "Africa/Harare";
  TimezoneRegions2["AfricaJohannesburg"] = "Africa/Johannesburg";
  TimezoneRegions2["AfricaJuba"] = "Africa/Juba";
  TimezoneRegions2["AfricaKampala"] = "Africa/Kampala";
  TimezoneRegions2["AfricaKhartoum"] = "Africa/Khartoum";
  TimezoneRegions2["AfricaKigali"] = "Africa/Kigali";
  TimezoneRegions2["AfricaKinshasa"] = "Africa/Kinshasa";
  TimezoneRegions2["AfricaLagos"] = "Africa/Lagos";
  TimezoneRegions2["AfricaLibreville"] = "Africa/Libreville";
  TimezoneRegions2["AfricaLome"] = "Africa/Lome";
  TimezoneRegions2["AfricaLuanda"] = "Africa/Luanda";
  TimezoneRegions2["AfricaLubumbashi"] = "Africa/Lubumbashi";
  TimezoneRegions2["AfricaLusaka"] = "Africa/Lusaka";
  TimezoneRegions2["AfricaMalabo"] = "Africa/Malabo";
  TimezoneRegions2["AfricaMaputo"] = "Africa/Maputo";
  TimezoneRegions2["AfricaMaseru"] = "Africa/Maseru";
  TimezoneRegions2["AfricaMbabane"] = "Africa/Mbabane";
  TimezoneRegions2["AfricaMogadishu"] = "Africa/Mogadishu";
  TimezoneRegions2["AfricaMonrovia"] = "Africa/Monrovia";
  TimezoneRegions2["AfricaNairobi"] = "Africa/Nairobi";
  TimezoneRegions2["AfricaNdjamena"] = "Africa/Ndjamena";
  TimezoneRegions2["AfricaNiamey"] = "Africa/Niamey";
  TimezoneRegions2["AfricaNouakchott"] = "Africa/Nouakchott";
  TimezoneRegions2["AfricaOuagadougou"] = "Africa/Ouagadougou";
  TimezoneRegions2["AfricaPortoNovo"] = "Africa/Porto-Novo";
  TimezoneRegions2["AfricaSaoTome"] = "Africa/Sao_Tome";
  TimezoneRegions2["AfricaTripoli"] = "Africa/Tripoli";
  TimezoneRegions2["AfricaTunis"] = "Africa/Tunis";
  TimezoneRegions2["AfricaWindhoek"] = "Africa/Windhoek";
  TimezoneRegions2["AmericaAdak"] = "America/Adak";
  TimezoneRegions2["AmericaAnchorage"] = "America/Anchorage";
  TimezoneRegions2["AmericaAnguilla"] = "America/Anguilla";
  TimezoneRegions2["AmericaAntigua"] = "America/Antigua";
  TimezoneRegions2["AmericaAraguaina"] = "America/Araguaina";
  TimezoneRegions2["AmericaArgentinaBuenosAires"] = "America/Argentina/Buenos_Aires";
  TimezoneRegions2["AmericaArgentinaCatamarca"] = "America/Argentina/Catamarca";
  TimezoneRegions2["AmericaArgentinaCordoba"] = "America/Argentina/Cordoba";
  TimezoneRegions2["AmericaArgentinaJujuy"] = "America/Argentina/Jujuy";
  TimezoneRegions2["AmericaArgentinaLaRioja"] = "America/Argentina/La_Rioja";
  TimezoneRegions2["AmericaArgentinaMendoza"] = "America/Argentina/Mendoza";
  TimezoneRegions2["AmericaArgentinaRioGallegos"] = "America/Argentina/Rio_Gallegos";
  TimezoneRegions2["AmericaArgentinaSalta"] = "America/Argentina/Salta";
  TimezoneRegions2["AmericaArgentinaSanJuan"] = "America/Argentina/San_Juan";
  TimezoneRegions2["AmericaArgentinaSanLuis"] = "America/Argentina/San_Luis";
  TimezoneRegions2["AmericaArgentinaTucuman"] = "America/Argentina/Tucuman";
  TimezoneRegions2["AmericaArgentinaUshuaia"] = "America/Argentina/Ushuaia";
  TimezoneRegions2["AmericaAruba"] = "America/Aruba";
  TimezoneRegions2["AmericaAsuncion"] = "America/Asuncion";
  TimezoneRegions2["AmericaAtikokan"] = "America/Atikokan";
  TimezoneRegions2["AmericaAtka"] = "America/Atka";
  TimezoneRegions2["AmericaBahia"] = "America/Bahia";
  TimezoneRegions2["AmericaBahiaBanderas"] = "America/Bahia_Banderas";
  TimezoneRegions2["AmericaBarbados"] = "America/Barbados";
  TimezoneRegions2["AmericaBelem"] = "America/Belem";
  TimezoneRegions2["AmericaBelize"] = "America/Belize";
  TimezoneRegions2["AmericaBlancSablon"] = "America/Blanc-Sablon";
  TimezoneRegions2["AmericaBoaVista"] = "America/Boa_Vista";
  TimezoneRegions2["AmericaBogota"] = "America/Bogota";
  TimezoneRegions2["AmericaBoise"] = "America/Boise";
  TimezoneRegions2["AmericaCambridgeBay"] = "America/Cambridge_Bay";
  TimezoneRegions2["AmericaCampoGrande"] = "America/Campo_Grande";
  TimezoneRegions2["AmericaCancun"] = "America/Cancun";
  TimezoneRegions2["AmericaCaracas"] = "America/Caracas";
  TimezoneRegions2["AmericaCayenne"] = "America/Cayenne";
  TimezoneRegions2["AmericaCayman"] = "America/Cayman";
  TimezoneRegions2["AmericaChicago"] = "America/Chicago";
  TimezoneRegions2["AmericaChihuahua"] = "America/Chihuahua";
  TimezoneRegions2["AmericaCoralHarbour"] = "America/Coral_Harbour";
  TimezoneRegions2["AmericaCordoba"] = "America/Cordoba";
  TimezoneRegions2["AmericaCostaRica"] = "America/Costa_Rica";
  TimezoneRegions2["AmericaCreston"] = "America/Creston";
  TimezoneRegions2["AmericaCuiaba"] = "America/Cuiaba";
  TimezoneRegions2["AmericaCuracao"] = "America/Curacao";
  TimezoneRegions2["AmericaDanmarkshavn"] = "America/Danmarkshavn";
  TimezoneRegions2["AmericaDawson"] = "America/Dawson";
  TimezoneRegions2["AmericaDawsonCreek"] = "America/Dawson_Creek";
  TimezoneRegions2["AmericaDenver"] = "America/Denver";
  TimezoneRegions2["AmericaDetroit"] = "America/Detroit";
  TimezoneRegions2["AmericaDominica"] = "America/Dominica";
  TimezoneRegions2["AmericaEdmonton"] = "America/Edmonton";
  TimezoneRegions2["AmericaEirunepe"] = "America/Eirunepe";
  TimezoneRegions2["AmericaElSalvador"] = "America/El_Salvador";
  TimezoneRegions2["AmericaFortaleza"] = "America/Fortaleza";
  TimezoneRegions2["AmericaGlaceBay"] = "America/Glace_Bay";
  TimezoneRegions2["AmericaGodthab"] = "America/Godthab";
  TimezoneRegions2["AmericaGooseBay"] = "America/Goose_Bay";
  TimezoneRegions2["AmericaGrandTurk"] = "America/Grand_Turk";
  TimezoneRegions2["AmericaGrenada"] = "America/Grenada";
  TimezoneRegions2["AmericaGuadeloupe"] = "America/Guadeloupe";
  TimezoneRegions2["AmericaGuatemala"] = "America/Guatemala";
  TimezoneRegions2["AmericaGuayaquil"] = "America/Guayaquil";
  TimezoneRegions2["AmericaGuyana"] = "America/Guyana";
  TimezoneRegions2["AmericaHalifax"] = "America/Halifax";
  TimezoneRegions2["AmericaHavana"] = "America/Havana";
  TimezoneRegions2["AmericaHermosillo"] = "America/Hermosillo";
  TimezoneRegions2["AmericaIndianaIndianapolis"] = "America/Indiana/Indianapolis";
  TimezoneRegions2["AmericaIndianaKnox"] = "America/Indiana/Knox";
  TimezoneRegions2["AmericaIndianaMarengo"] = "America/Indiana/Marengo";
  TimezoneRegions2["AmericaIndianaPetersburg"] = "America/Indiana/Petersburg";
  TimezoneRegions2["AmericaIndianaTellCity"] = "America/Indiana/Tell_City";
  TimezoneRegions2["AmericaIndianaVevay"] = "America/Indiana/Vevay";
  TimezoneRegions2["AmericaIndianaVincennes"] = "America/Indiana/Vincennes";
  TimezoneRegions2["AmericaIndianaWinamac"] = "America/Indiana/Winamac";
  TimezoneRegions2["AmericaInuvik"] = "America/Inuvik";
  TimezoneRegions2["AmericaIqaluit"] = "America/Iqaluit";
  TimezoneRegions2["AmericaJamaica"] = "America/Jamaica";
  TimezoneRegions2["AmericaJuneau"] = "America/Juneau";
  TimezoneRegions2["AmericaKentuckyLouisville"] = "America/Kentucky/Louisville";
  TimezoneRegions2["AmericaKentuckyMonticello"] = "America/Kentucky/Monticello";
  TimezoneRegions2["AmericaKralendijk"] = "America/Kralendijk";
  TimezoneRegions2["AmericaLaPaz"] = "America/La_Paz";
  TimezoneRegions2["AmericaLima"] = "America/Lima";
  TimezoneRegions2["AmericaLosAngeles"] = "America/Los_Angeles";
  TimezoneRegions2["AmericaLouisville"] = "America/Louisville";
  TimezoneRegions2["AmericaLowerPrinces"] = "America/Lower_Princes";
  TimezoneRegions2["AmericaMaceio"] = "America/Maceio";
  TimezoneRegions2["AmericaManagua"] = "America/Managua";
  TimezoneRegions2["AmericaManaus"] = "America/Manaus";
  TimezoneRegions2["AmericaMarigot"] = "America/Marigot";
  TimezoneRegions2["AmericaMartinique"] = "America/Martinique";
  TimezoneRegions2["AmericaMatamoros"] = "America/Matamoros";
  TimezoneRegions2["AmericaMazatlan"] = "America/Mazatlan";
  TimezoneRegions2["AmericaMenominee"] = "America/Menominee";
  TimezoneRegions2["AmericaMerida"] = "America/Merida";
  TimezoneRegions2["AmericaMetlakatla"] = "America/Metlakatla";
  TimezoneRegions2["AmericaMexicoCity"] = "America/Mexico_City";
  TimezoneRegions2["AmericaMiquelon"] = "America/Miquelon";
  TimezoneRegions2["AmericaMoncton"] = "America/Moncton";
  TimezoneRegions2["AmericaMonterrey"] = "America/Monterrey";
  TimezoneRegions2["AmericaMontevideo"] = "America/Montevideo";
  TimezoneRegions2["AmericaMontserrat"] = "America/Montserrat";
  TimezoneRegions2["AmericaMontreal"] = "America/Montreal";
  TimezoneRegions2["AmericaNassau"] = "America/Nassau";
  TimezoneRegions2["AmericaNewYork"] = "America/New_York";
  TimezoneRegions2["AmericaNipigon"] = "America/Nipigon";
  TimezoneRegions2["AmericaNome"] = "America/Nome";
  TimezoneRegions2["AmericaNoronha"] = "America/Noronha";
  TimezoneRegions2["AmericaNorthDakotaBeulah"] = "America/North_Dakota/Beulah";
  TimezoneRegions2["AmericaNorthDakotaCenter"] = "America/North_Dakota/Center";
  TimezoneRegions2["AmericaNorthDakotaNewSalem"] = "America/North_Dakota/New_Salem";
  TimezoneRegions2["AmericaOjinaga"] = "America/Ojinaga";
  TimezoneRegions2["AmericaPanama"] = "America/Panama";
  TimezoneRegions2["AmericaPangnirtung"] = "America/Pangnirtung";
  TimezoneRegions2["AmericaParamaribo"] = "America/Paramaribo";
  TimezoneRegions2["AmericaPhoenix"] = "America/Phoenix";
  TimezoneRegions2["AmericaPortAuPrince"] = "America/Port-au-Prince";
  TimezoneRegions2["AmericaPortOfSpain"] = "America/Port_of_Spain";
  TimezoneRegions2["AmericaPortoVelho"] = "America/Porto_Velho";
  TimezoneRegions2["AmericaPuertoRico"] = "America/Puerto_Rico";
  TimezoneRegions2["AmericaRainyRiver"] = "America/Rainy_River";
  TimezoneRegions2["AmericaRankinInlet"] = "America/Rankin_Inlet";
  TimezoneRegions2["AmericaRecife"] = "America/Recife";
  TimezoneRegions2["AmericaRegina"] = "America/Regina";
  TimezoneRegions2["AmericaResolute"] = "America/Resolute";
  TimezoneRegions2["AmericaRioBranco"] = "America/Rio_Branco";
  TimezoneRegions2["AmericaSantaIsabel"] = "America/Santa_Isabel";
  TimezoneRegions2["AmericaSantarem"] = "America/Santarem";
  TimezoneRegions2["AmericaSantiago"] = "America/Santiago";
  TimezoneRegions2["AmericaSantoDomingo"] = "America/Santo_Domingo";
  TimezoneRegions2["AmericaSaoPaulo"] = "America/Sao_Paulo";
  TimezoneRegions2["AmericaScoresbysund"] = "America/Scoresbysund";
  TimezoneRegions2["AmericaShiprock"] = "America/Shiprock";
  TimezoneRegions2["AmericaSitka"] = "America/Sitka";
  TimezoneRegions2["AmericaStBarthelemy"] = "America/St_Barthelemy";
  TimezoneRegions2["AmericaStJohns"] = "America/St_Johns";
  TimezoneRegions2["AmericaStKitts"] = "America/St_Kitts";
  TimezoneRegions2["AmericaStLucia"] = "America/St_Lucia";
  TimezoneRegions2["AmericaStThomas"] = "America/St_Thomas";
  TimezoneRegions2["AmericaStVincent"] = "America/St_Vincent";
  TimezoneRegions2["AmericaSwiftCurrent"] = "America/Swift_Current";
  TimezoneRegions2["AmericaTegucigalpa"] = "America/Tegucigalpa";
  TimezoneRegions2["AmericaThule"] = "America/Thule";
  TimezoneRegions2["AmericaThunderBay"] = "America/Thunder_Bay";
  TimezoneRegions2["AmericaTijuana"] = "America/Tijuana";
  TimezoneRegions2["AmericaToronto"] = "America/Toronto";
  TimezoneRegions2["AmericaTortola"] = "America/Tortola";
  TimezoneRegions2["AmericaVancouver"] = "America/Vancouver";
  TimezoneRegions2["AmericaWhitehorse"] = "America/Whitehorse";
  TimezoneRegions2["AmericaWinnipeg"] = "America/Winnipeg";
  TimezoneRegions2["AmericaYakutat"] = "America/Yakutat";
  TimezoneRegions2["AmericaYellowknife"] = "America/Yellowknife";
  TimezoneRegions2["AntarcticaCasey"] = "Antarctica/Casey";
  TimezoneRegions2["AntarcticaDavis"] = "Antarctica/Davis";
  TimezoneRegions2["AntarcticaDumontDUrville"] = "Antarctica/DumontDUrville";
  TimezoneRegions2["AntarcticaMacquarie"] = "Antarctica/Macquarie";
  TimezoneRegions2["AntarcticaMawson"] = "Antarctica/Mawson";
  TimezoneRegions2["AntarcticaMcMurdo"] = "Antarctica/McMurdo";
  TimezoneRegions2["AntarcticaPalmer"] = "Antarctica/Palmer";
  TimezoneRegions2["AntarcticaRothera"] = "Antarctica/Rothera";
  TimezoneRegions2["AntarcticaSyowa"] = "Antarctica/Syowa";
  TimezoneRegions2["AntarcticaTroll"] = "Antarctica/Troll";
  TimezoneRegions2["AntarcticaVostok"] = "Antarctica/Vostok";
  TimezoneRegions2["ArcticLongyearbyen"] = "Arctic/Longyearbyen";
  TimezoneRegions2["AsiaAden"] = "Asia/Aden";
  TimezoneRegions2["AsiaAlmaty"] = "Asia/Almaty";
  TimezoneRegions2["AsiaAmman"] = "Asia/Amman";
  TimezoneRegions2["AsiaAnadyr"] = "Asia/Anadyr";
  TimezoneRegions2["AsiaAqtau"] = "Asia/Aqtau";
  TimezoneRegions2["AsiaAqtobe"] = "Asia/Aqtobe";
  TimezoneRegions2["AsiaAshgabat"] = "Asia/Ashgabat";
  TimezoneRegions2["AsiaBaghdad"] = "Asia/Baghdad";
  TimezoneRegions2["AsiaBahrain"] = "Asia/Bahrain";
  TimezoneRegions2["AsiaBaku"] = "Asia/Baku";
  TimezoneRegions2["AsiaBangkok"] = "Asia/Bangkok";
  TimezoneRegions2["AsiaBarnaul"] = "Asia/Barnaul";
  TimezoneRegions2["AsiaBeirut"] = "Asia/Beirut";
  TimezoneRegions2["AsiaBishkek"] = "Asia/Bishkek";
  TimezoneRegions2["AsiaBrunei"] = "Asia/Brunei";
  TimezoneRegions2["AsiaChita"] = "Asia/Chita";
  TimezoneRegions2["AsiaChoibalsan"] = "Asia/Choibalsan";
  TimezoneRegions2["AsiaColombo"] = "Asia/Colombo";
  TimezoneRegions2["AsiaDamascus"] = "Asia/Damascus";
  TimezoneRegions2["AsiaDhaka"] = "Asia/Dhaka";
  TimezoneRegions2["AsiaDili"] = "Asia/Dili";
  TimezoneRegions2["AsiaDubai"] = "Asia/Dubai";
  TimezoneRegions2["AsiaDushanbe"] = "Asia/Dushanbe";
  TimezoneRegions2["AsiaFamagusta"] = "Asia/Famagusta";
  TimezoneRegions2["AsiaGaza"] = "Asia/Gaza";
  TimezoneRegions2["AsiaHebron"] = "Asia/Hebron";
  TimezoneRegions2["AsiaHoChiMinh"] = "Asia/Ho_Chi_Minh";
  TimezoneRegions2["AsiaHongKong"] = "Asia/Hong_Kong";
  TimezoneRegions2["AsiaHovd"] = "Asia/Hovd";
  TimezoneRegions2["AsiaIrkutsk"] = "Asia/Irkutsk";
  TimezoneRegions2["AsiaJakarta"] = "Asia/Jakarta";
  TimezoneRegions2["AsiaJayapura"] = "Asia/Jayapura";
  TimezoneRegions2["AsiaJerusalem"] = "Asia/Jerusalem";
  TimezoneRegions2["AsiaKabul"] = "Asia/Kabul";
  TimezoneRegions2["AsiaKamchatka"] = "Asia/Kamchatka";
  TimezoneRegions2["AsiaKarachi"] = "Asia/Karachi";
  TimezoneRegions2["AsiaKathmandu"] = "Asia/Kathmandu";
  TimezoneRegions2["AsiaKhandyga"] = "Asia/Khandyga";
  TimezoneRegions2["AsiaKolkata"] = "Asia/Kolkata";
  TimezoneRegions2["AsiaKrasnoyarsk"] = "Asia/Krasnoyarsk";
  TimezoneRegions2["AsiaKualaLumpur"] = "Asia/Kuala_Lumpur";
  TimezoneRegions2["AsiaKuching"] = "Asia/Kuching";
  TimezoneRegions2["AsiaKuwait"] = "Asia/Kuwait";
  TimezoneRegions2["AsiaMacau"] = "Asia/Macau";
  TimezoneRegions2["AsiaMagadan"] = "Asia/Magadan";
  TimezoneRegions2["AsiaMakassar"] = "Asia/Makassar";
  TimezoneRegions2["AsiaManila"] = "Asia/Manila";
  TimezoneRegions2["AsiaMuscat"] = "Asia/Muscat";
  TimezoneRegions2["AsiaNicosia"] = "Asia/Nicosia";
  TimezoneRegions2["AsiaNovokuznetsk"] = "Asia/Novokuznetsk";
  TimezoneRegions2["AsiaNovosibirsk"] = "Asia/Novosibirsk";
  TimezoneRegions2["AsiaOmsk"] = "Asia/Omsk";
  TimezoneRegions2["AsiaOral"] = "Asia/Oral";
  TimezoneRegions2["AsiaPhnomPenh"] = "Asia/Phnom_Penh";
  TimezoneRegions2["AsiaPontianak"] = "Asia/Pontianak";
  TimezoneRegions2["AsiaPyongyang"] = "Asia/Pyongyang";
  TimezoneRegions2["AsiaQatar"] = "Asia/Qatar";
  TimezoneRegions2["AsiaQyzylorda"] = "Asia/Qyzylorda";
  TimezoneRegions2["AsiaRangoon"] = "Asia/Rangoon";
  TimezoneRegions2["AsiaRiyadh"] = "Asia/Riyadh";
  TimezoneRegions2["AsiaSakhalin"] = "Asia/Sakhalin";
  TimezoneRegions2["AsiaSamarkand"] = "Asia/Samarkand";
  TimezoneRegions2["AsiaSeoul"] = "Asia/Seoul";
  TimezoneRegions2["AsiaShanghai"] = "Asia/Shanghai";
  TimezoneRegions2["AsiaSingapore"] = "Asia/Singapore";
  TimezoneRegions2["AsiaSrednekolymsk"] = "Asia/Srednekolymsk";
  TimezoneRegions2["AsiaTaipei"] = "Asia/Taipei";
  TimezoneRegions2["AsiaTashkent"] = "Asia/Tashkent";
  TimezoneRegions2["AsiaTbilisi"] = "Asia/Tbilisi";
  TimezoneRegions2["AsiaTehran"] = "Asia/Tehran";
  TimezoneRegions2["AsiaThimphu"] = "Asia/Thimphu";
  TimezoneRegions2["AsiaTokyo"] = "Asia/Tokyo";
  TimezoneRegions2["AsiaTomsk"] = "Asia/Tomsk";
  TimezoneRegions2["AsiaUlaanbaatar"] = "Asia/Ulaanbaatar";
  TimezoneRegions2["AsiaUrumqi"] = "Asia/Urumqi";
  TimezoneRegions2["AsiaUstNera"] = "Asia/Ust-Nera";
  TimezoneRegions2["AsiaVientiane"] = "Asia/Vientiane";
  TimezoneRegions2["AsiaVladivostok"] = "Asia/Vladivostok";
  TimezoneRegions2["AsiaYakutsk"] = "Asia/Yakutsk";
  TimezoneRegions2["AsiaYekaterinburg"] = "Asia/Yekaterinburg";
  TimezoneRegions2["AsiaYerevan"] = "Asia/Yerevan";
  TimezoneRegions2["AtlanticAzores"] = "Atlantic/Azores";
  TimezoneRegions2["AtlanticBermuda"] = "Atlantic/Bermuda";
  TimezoneRegions2["AtlanticCanary"] = "Atlantic/Canary";
  TimezoneRegions2["AtlanticCapeVerde"] = "Atlantic/Cape_Verde";
  TimezoneRegions2["AtlanticFaroe"] = "Atlantic/Faroe";
  TimezoneRegions2["AtlanticMadeira"] = "Atlantic/Madeira";
  TimezoneRegions2["AtlanticReykjavik"] = "Atlantic/Reykjavik";
  TimezoneRegions2["AtlanticSouthGeorgia"] = "Atlantic/South_Georgia";
  TimezoneRegions2["AtlanticStHelena"] = "Atlantic/St_Helena";
  TimezoneRegions2["AtlanticStanley"] = "Atlantic/Stanley";
  TimezoneRegions2["AustraliaAdelaide"] = "Australia/Adelaide";
  TimezoneRegions2["AustraliaBrisbane"] = "Australia/Brisbane";
  TimezoneRegions2["AustraliaBrokenHill"] = "Australia/Broken_Hill";
  TimezoneRegions2["AustraliaCanberra"] = "Australia/Canberra";
  TimezoneRegions2["AustraliaCurrie"] = "Australia/Currie";
  TimezoneRegions2["AustraliaDarwin"] = "Australia/Darwin";
  TimezoneRegions2["AustraliaEucla"] = "Australia/Eucla";
  TimezoneRegions2["AustraliaHobart"] = "Australia/Hobart";
  TimezoneRegions2["AustraliaLindeman"] = "Australia/Lindeman";
  TimezoneRegions2["AustraliaLordHowe"] = "Australia/Lord_Howe";
  TimezoneRegions2["AustraliaMelbourne"] = "Australia/Melbourne";
  TimezoneRegions2["AustraliaPerth"] = "Australia/Perth";
  TimezoneRegions2["AustraliaSydney"] = "Australia/Sydney";
  TimezoneRegions2["EuropeAmsterdam"] = "Europe/Amsterdam";
  TimezoneRegions2["EuropeAndorra"] = "Europe/Andorra";
  TimezoneRegions2["EuropeAthens"] = "Europe/Athens";
  TimezoneRegions2["EuropeBelgrade"] = "Europe/Belgrade";
  TimezoneRegions2["EuropeBerlin"] = "Europe/Berlin";
  TimezoneRegions2["EuropeBratislava"] = "Europe/Bratislava";
  TimezoneRegions2["EuropeBrussels"] = "Europe/Brussels";
  TimezoneRegions2["EuropeBucharest"] = "Europe/Bucharest";
  TimezoneRegions2["EuropeBudapest"] = "Europe/Budapest";
  TimezoneRegions2["EuropeBusingen"] = "Europe/Busingen";
  TimezoneRegions2["EuropeChisinau"] = "Europe/Chisinau";
  TimezoneRegions2["EuropeCopenhagen"] = "Europe/Copenhagen";
  TimezoneRegions2["EuropeDublin"] = "Europe/Dublin";
  TimezoneRegions2["EuropeGibraltar"] = "Europe/Gibraltar";
  TimezoneRegions2["EuropeGuernsey"] = "Europe/Guernsey";
  TimezoneRegions2["EuropeHelsinki"] = "Europe/Helsinki";
  TimezoneRegions2["EuropeIsleOfMan"] = "Europe/Isle_of_Man";
  TimezoneRegions2["EuropeIstanbul"] = "Europe/Istanbul";
  TimezoneRegions2["EuropeJersey"] = "Europe/Jersey";
  TimezoneRegions2["EuropeKaliningrad"] = "Europe/Kaliningrad";
  TimezoneRegions2["EuropeKiev"] = "Europe/Kiev";
  TimezoneRegions2["EuropeKirov"] = "Europe/Kirov";
  TimezoneRegions2["EuropeLisbon"] = "Europe/Lisbon";
  TimezoneRegions2["EuropeLjubljana"] = "Europe/Ljubljana";
  TimezoneRegions2["EuropeLondon"] = "Europe/London";
  TimezoneRegions2["EuropeLuxembourg"] = "Europe/Luxembourg";
  TimezoneRegions2["EuropeMadrid"] = "Europe/Madrid";
  TimezoneRegions2["EuropeMalta"] = "Europe/Malta";
  TimezoneRegions2["EuropeMariehamn"] = "Europe/Mariehamn";
  TimezoneRegions2["EuropeMinsk"] = "Europe/Minsk";
  TimezoneRegions2["EuropeMonaco"] = "Europe/Monaco";
  TimezoneRegions2["EuropeMoscow"] = "Europe/Moscow";
  TimezoneRegions2["EuropeOslo"] = "Europe/Oslo";
  TimezoneRegions2["EuropeParis"] = "Europe/Paris";
  TimezoneRegions2["EuropePodgorica"] = "Europe/Podgorica";
  TimezoneRegions2["EuropePrague"] = "Europe/Prague";
  TimezoneRegions2["EuropeRiga"] = "Europe/Riga";
  TimezoneRegions2["EuropeRome"] = "Europe/Rome";
  TimezoneRegions2["EuropeSamara"] = "Europe/Samara";
  TimezoneRegions2["EuropeSanMarino"] = "Europe/San_Marino";
  TimezoneRegions2["EuropeSarajevo"] = "Europe/Sarajevo";
  TimezoneRegions2["EuropeSimferopol"] = "Europe/Simferopol";
  TimezoneRegions2["EuropeSkopje"] = "Europe/Skopje";
  TimezoneRegions2["EuropeSofia"] = "Europe/Sofia";
  TimezoneRegions2["EuropeStockholm"] = "Europe/Stockholm";
  TimezoneRegions2["EuropeTallinn"] = "Europe/Tallinn";
  TimezoneRegions2["EuropeTirane"] = "Europe/Tirane";
  TimezoneRegions2["EuropeUzhgorod"] = "Europe/Uzhgorod";
  TimezoneRegions2["EuropeVaduz"] = "Europe/Vaduz";
  TimezoneRegions2["EuropeVatican"] = "Europe/Vatican";
  TimezoneRegions2["EuropeVienna"] = "Europe/Vienna";
  TimezoneRegions2["EuropeVilnius"] = "Europe/Vilnius";
  TimezoneRegions2["EuropeVolgograd"] = "Europe/Volgograd";
  TimezoneRegions2["EuropeWarsaw"] = "Europe/Warsaw";
  TimezoneRegions2["EuropeZagreb"] = "Europe/Zagreb";
  TimezoneRegions2["EuropeZaporozhye"] = "Europe/Zaporozhye";
  TimezoneRegions2["EuropeZurich"] = "Europe/Zurich";
  TimezoneRegions2["GMT"] = "GMT";
  TimezoneRegions2["IndianAntananarivo"] = "Indian/Antananarivo";
  TimezoneRegions2["IndianChagos"] = "Indian/Chagos";
  TimezoneRegions2["IndianChristmas"] = "Indian/Christmas";
  TimezoneRegions2["IndianCocos"] = "Indian/Cocos";
  TimezoneRegions2["IndianComoro"] = "Indian/Comoro";
  TimezoneRegions2["IndianKerguelen"] = "Indian/Kerguelen";
  TimezoneRegions2["IndianMahe"] = "Indian/Mahe";
  TimezoneRegions2["IndianMaldives"] = "Indian/Maldives";
  TimezoneRegions2["IndianMauritius"] = "Indian/Mauritius";
  TimezoneRegions2["IndianMayotte"] = "Indian/Mayotte";
  TimezoneRegions2["IndianReunion"] = "Indian/Reunion";
  TimezoneRegions2["PacificApia"] = "Pacific/Apia";
  TimezoneRegions2["PacificAuckland"] = "Pacific/Auckland";
  TimezoneRegions2["PacificBougainville"] = "Pacific/Bougainville";
  TimezoneRegions2["PacificChatham"] = "Pacific/Chatham";
  TimezoneRegions2["PacificChuuk"] = "Pacific/Chuuk";
  TimezoneRegions2["PacificEaster"] = "Pacific/Easter";
  TimezoneRegions2["PacificEfate"] = "Pacific/Efate";
  TimezoneRegions2["PacificEnderbury"] = "Pacific/Enderbury";
  TimezoneRegions2["PacificFakaofo"] = "Pacific/Fakaofo";
  TimezoneRegions2["PacificFiji"] = "Pacific/Fiji";
  TimezoneRegions2["PacificFunafuti"] = "Pacific/Funafuti";
  TimezoneRegions2["PacificGalapagos"] = "Pacific/Galapagos";
  TimezoneRegions2["PacificGambier"] = "Pacific/Gambier";
  TimezoneRegions2["PacificGuadalcanal"] = "Pacific/Guadalcanal";
  TimezoneRegions2["PacificGuam"] = "Pacific/Guam";
  TimezoneRegions2["PacificHonolulu"] = "Pacific/Honolulu";
  TimezoneRegions2["PacificJohnston"] = "Pacific/Johnston";
  TimezoneRegions2["PacificKiritimati"] = "Pacific/Kiritimati";
  TimezoneRegions2["PacificKosrae"] = "Pacific/Kosrae";
  TimezoneRegions2["PacificKwajalein"] = "Pacific/Kwajalein";
  TimezoneRegions2["PacificMajuro"] = "Pacific/Majuro";
  TimezoneRegions2["PacificMarquesas"] = "Pacific/Marquesas";
  TimezoneRegions2["PacificMidway"] = "Pacific/Midway";
  TimezoneRegions2["PacificNauru"] = "Pacific/Nauru";
  TimezoneRegions2["PacificNiue"] = "Pacific/Niue";
  TimezoneRegions2["PacificNorfolk"] = "Pacific/Norfolk";
  TimezoneRegions2["PacificNoumea"] = "Pacific/Noumea";
  TimezoneRegions2["PacificPagoPago"] = "Pacific/Pago_Pago";
  TimezoneRegions2["PacificPalau"] = "Pacific/Palau";
  TimezoneRegions2["PacificPitcairn"] = "Pacific/Pitcairn";
  TimezoneRegions2["PacificPohnpei"] = "Pacific/Pohnpei";
  TimezoneRegions2["PacificPonape"] = "Pacific/Ponape";
  TimezoneRegions2["PacificPortMoresby"] = "Pacific/Port_Moresby";
  TimezoneRegions2["PacificRarotonga"] = "Pacific/Rarotonga";
  TimezoneRegions2["PacificSaipan"] = "Pacific/Saipan";
  TimezoneRegions2["PacificSamoa"] = "Pacific/Samoa";
  TimezoneRegions2["PacificTahiti"] = "Pacific/Tahiti";
  TimezoneRegions2["PacificTarawa"] = "Pacific/Tarawa";
  TimezoneRegions2["PacificTongatapu"] = "Pacific/Tongatapu";
  TimezoneRegions2["PacificTruk"] = "Pacific/Truk";
  TimezoneRegions2["PacificWake"] = "Pacific/Wake";
  TimezoneRegions2["PacificWallis"] = "Pacific/Wallis";
  TimezoneRegions2["PacificYap"] = "Pacific/Yap";
  return TimezoneRegions2;
})(TimezoneRegions || {});

var TimezoneOffset = /* @__PURE__ */ ((TimezoneOffset2) => {
  TimezoneOffset2["UTC_MINUS_12"] = "UTC-12";
  TimezoneOffset2["UTC_MINUS_11_30"] = "UTC-11:30";
  TimezoneOffset2["UTC_MINUS_11"] = "UTC-11";
  TimezoneOffset2["UTC_MINUS_10_30"] = "UTC-10:30";
  TimezoneOffset2["UTC_MINUS_10"] = "UTC-10";
  TimezoneOffset2["UTC_MINUS_9_30"] = "UTC-9:30";
  TimezoneOffset2["UTC_MINUS_9"] = "UTC-09";
  TimezoneOffset2["UTC_MINUS_8_45"] = "UTC-8:45";
  TimezoneOffset2["UTC_MINUS_8"] = "UTC-08";
  TimezoneOffset2["UTC_MINUS_7"] = "UTC-07";
  TimezoneOffset2["UTC_MINUS_6_30"] = "UTC-6:30";
  TimezoneOffset2["UTC_MINUS_6"] = "UTC-06";
  TimezoneOffset2["UTC_MINUS_5_45"] = "UTC-5:45";
  TimezoneOffset2["UTC_MINUS_5_30"] = "UTC-5:30";
  TimezoneOffset2["UTC_MINUS_5"] = "UTC-05";
  TimezoneOffset2["UTC_MINUS_4_30"] = "UTC-4:30";
  TimezoneOffset2["UTC_MINUS_4"] = "UTC-04";
  TimezoneOffset2["UTC_MINUS_3_30"] = "UTC-3:30";
  TimezoneOffset2["UTC_MINUS_3"] = "UTC-03";
  TimezoneOffset2["UTC_MINUS_2_30"] = "UTC-2:30";
  TimezoneOffset2["UTC_MINUS_2"] = "UTC-02";
  TimezoneOffset2["UTC_MINUS_1"] = "UTC-01";
  TimezoneOffset2["UTC_0"] = "UTC+00";
  TimezoneOffset2["UTC_PLUS_1"] = "UTC+01";
  TimezoneOffset2["UTC_PLUS_2"] = "UTC+02";
  TimezoneOffset2["UTC_PLUS_3"] = "UTC+03";
  TimezoneOffset2["UTC_PLUS_3_30"] = "UTC+3:30";
  TimezoneOffset2["UTC_PLUS_4"] = "UTC+04";
  TimezoneOffset2["UTC_PLUS_4_30"] = "UTC+4:30";
  TimezoneOffset2["UTC_PLUS_5"] = "UTC+05";
  TimezoneOffset2["UTC_PLUS_5_30"] = "UTC+5:30";
  TimezoneOffset2["UTC_PLUS_5_45"] = "UTC+5:45";
  TimezoneOffset2["UTC_PLUS_6"] = "UTC+06";
  TimezoneOffset2["UTC_PLUS_6_30"] = "UTC+6:30";
  TimezoneOffset2["UTC_PLUS_7"] = "UTC+07";
  TimezoneOffset2["UTC_PLUS_8"] = "UTC+08";
  TimezoneOffset2["UTC_PLUS_8_45"] = "UTC+8:45";
  TimezoneOffset2["UTC_PLUS_9"] = "UTC+09";
  TimezoneOffset2["UTC_PLUS_9_30"] = "UTC+9:30";
  TimezoneOffset2["UTC_PLUS_10"] = "UTC+10";
  TimezoneOffset2["UTC_PLUS_10_30"] = "UTC+10:30";
  TimezoneOffset2["UTC_PLUS_11"] = "UTC+11";
  TimezoneOffset2["UTC_PLUS_11_30"] = "UTC+11:30";
  TimezoneOffset2["UTC_PLUS_12"] = "UTC+12";
  TimezoneOffset2["UTC_PLUS_12_45"] = "UTC+12:45";
  TimezoneOffset2["UTC_PLUS_13"] = "UTC+13";
  TimezoneOffset2["UTC_PLUS_13_45"] = "UTC+13:45";
  TimezoneOffset2["UTC_PLUS_14"] = "UTC+14";
  return TimezoneOffset2;
})(TimezoneOffset || {});

var Timezones = /* @__PURE__ */ ((Timezones2) => {
  Timezones2["AcreTime"] = "ACT";
  Timezones2["AfghanistanTime"] = "AFT";
  Timezones2["AIXCentralEuropeanTime"] = "DFT";
  Timezones2["AlaskaDaylightTime"] = "AKDT";
  Timezones2["AlaskaStandardTime"] = "AKST";
  Timezones2["AlmaAtaTime"] = "ALMT";
  Timezones2["AmazonSummerTime"] = "AMST";
  Timezones2["AmazonTime"] = "AMT";
  Timezones2["AnadyrTime"] = "ANAT";
  Timezones2["AqtobeTime"] = "AQTT";
  Timezones2["ArabiaStandardTime"] = "AST";
  Timezones2["ArgentinaTime"] = "ART";
  Timezones2["ArmeniaTime"] = "AMT";
  Timezones2["ASEANCommonTime"] = "ASEAN";
  Timezones2["AtlanticDaylightTime"] = "ADT";
  Timezones2["AtlanticStandardTime"] = "AST";
  Timezones2["AustralianCentralDaylightSavingTime"] = "ACDT";
  Timezones2["AustralianCentralStandardTime"] = "ACST";
  Timezones2["AustralianCentralWesternStandardTime"] = "ACWST";
  Timezones2["AustralianEasternDaylightSavingTime"] = "AEDT";
  Timezones2["AustralianEasternStandardTime"] = "AEST";
  Timezones2["AustralianEasternTime"] = "AET";
  Timezones2["AustralianWesternStandardTime"] = "AWST";
  Timezones2["AzerbaijanTime"] = "AZT";
  Timezones2["AzoresStandardTime"] = "AZOT";
  Timezones2["AzoresSummerTime"] = "AZOST";
  Timezones2["BakerIslandTime"] = "BIT";
  Timezones2["BangladeshStandardTime"] = "BST";
  Timezones2["BhutanTime"] = "BTT";
  Timezones2["BoliviaTime"] = "BOT";
  Timezones2["BougainvilleStandardTime"] = "BST";
  Timezones2["BrasiliaSummerTime"] = "BRST";
  Timezones2["BrasiliaTime"] = "BRT";
  Timezones2["BritishIndianOceanTime"] = "BIOT";
  Timezones2["BritishSummerTime"] = "BST";
  Timezones2["BruneiTime"] = "BNT";
  Timezones2["CapeVerdeTime"] = "CVT";
  Timezones2["CentralAfricaTime"] = "CAT";
  Timezones2["CentralDaylightTime"] = "CDT";
  Timezones2["CentralEuropeanSummerTime"] = "CEST";
  Timezones2["CentralEuropeanTime"] = "CET";
  Timezones2["CentralIndonesiaTime"] = "WITA";
  Timezones2["CentralStandardTime"] = "CST";
  Timezones2["CentralTime"] = "CT";
  Timezones2["CentralWesternStandardTime"] = "CWST";
  Timezones2["ChamorroStandardTime"] = "CHST";
  Timezones2["ChathamDaylightTime"] = "CHADT";
  Timezones2["ChathamStandardTime"] = "CHAST";
  Timezones2["ChileStandardTime"] = "CLT";
  Timezones2["ChileSummerTime"] = "CLST";
  Timezones2["ChinaStandardTime"] = "CST";
  Timezones2["ChoibalsanStandardTime"] = "CHOT";
  Timezones2["ChoibalsanSummerTime"] = "CHOST";
  Timezones2["ChristmasIslandTime"] = "CXT";
  Timezones2["ChuukTime"] = "CHUT";
  Timezones2["ClipptertonIslandStandardTime"] = "CIST";
  Timezones2["CocosIslandsTime"] = "CCT";
  Timezones2["ColombiaSummerTime"] = "COST";
  Timezones2["ColombiaTime"] = "COT";
  Timezones2["CookIslandTime"] = "CKT";
  Timezones2["CoordinatedUniversalTime"] = "UTC";
  Timezones2["CubaDaylightTime"] = "CDT";
  Timezones2["CubaStandardTime"] = "CST";
  Timezones2["DavisTime"] = "DAVT";
  Timezones2["DumontDUrvilleTime"] = "DDUT";
  Timezones2["EastAfricaTime"] = "EAT";
  Timezones2["EasterIslandStandardTime"] = "EAST";
  Timezones2["EasterIslandSummerTime"] = "EASST";
  Timezones2["EasternCaribbeanTime"] = "ECT";
  Timezones2["EasternDaylightTime"] = "EDT";
  Timezones2["EasternEuropeanSummerTime"] = "EEST";
  Timezones2["EasternEuropeanTime"] = "EET";
  Timezones2["EasternGreenlandSummerTime"] = "EGST";
  Timezones2["EasternGreenlandTime"] = "EGT";
  Timezones2["EasternIndonesianTime"] = "WIT";
  Timezones2["EasternStandardTime"] = "EST";
  Timezones2["EasternTime"] = "ET";
  Timezones2["EcuadorTime"] = "ECT";
  Timezones2["FalklandIslandsSummerTime"] = "FKST";
  Timezones2["FalklandIslandsTime"] = "FKT";
  Timezones2["FernandoDeNoronhaTime"] = "FNT";
  Timezones2["FijiTime"] = "FJT";
  Timezones2["FrenchGuianaTime"] = "GFT";
  Timezones2["FrenchSouthernAndAntarcticTime"] = "TFT";
  Timezones2["FurtherEasternEuropeanTime"] = "FET";
  Timezones2["GalapagosTime"] = "GALT";
  Timezones2["GambierIslandTime"] = "GIT";
  Timezones2["GambierIslandsTime"] = "GAMT";
  Timezones2["GeorgiaStandardTime"] = "GET";
  Timezones2["GilbertIslandTime"] = "GILT";
  Timezones2["GreenwichMeanTime"] = "GMT";
  Timezones2["GulfStandardTime"] = "GST";
  Timezones2["GuyanaTime"] = "GYT";
  Timezones2["HawaiiAleutianDaylightTime"] = "HDT";
  Timezones2["HawaiiAleutianStandardTime"] = "HST";
  Timezones2["HeardAndMcDonaldIslandsTime"] = "HMT";
  Timezones2["HeureAvanceeDEuropeCentraleTime"] = "HAEC";
  Timezones2["HongKongTime"] = "HKT";
  Timezones2["HovdSummerTime"] = "HOVST";
  Timezones2["HovdTime"] = "HOVT";
  Timezones2["IndianOceanTime"] = "IOT";
  Timezones2["IndianStandardTime"] = "IST";
  Timezones2["IndochinaTime"] = "ICT";
  Timezones2["InternationalDayLineWestTime"] = "IDLW";
  Timezones2["IranDaylightTime"] = "IRDT";
  Timezones2["IranStandardTime"] = "IRST";
  Timezones2["IrishStandardTime"] = "IST";
  Timezones2["IrkutskSummerTime"] = "IRKST";
  Timezones2["IrkutskTime"] = "IRKT";
  Timezones2["IsraelDaylightTime"] = "IDT";
  Timezones2["IsraelStandardTime"] = "IST";
  Timezones2["JapanStandardTime"] = "JST";
  Timezones2["KaliningradTime"] = "KALT";
  Timezones2["KamchatkaTime"] = "KAMT";
  Timezones2["KoreaStandardTime"] = "KST";
  Timezones2["KosraeTime"] = "KOST";
  Timezones2["KrasnoyarskSummerTime"] = "KRAST";
  Timezones2["KrasnoyarskTime"] = "KRAT";
  Timezones2["KyrgyzstanTime"] = "KGT";
  Timezones2["LineIslandsTime"] = "LINT";
  Timezones2["KazakhstanStandardTime"] = "KAST";
  Timezones2["LordHoweStandardTime"] = "LHST";
  Timezones2["LordHoweSummerTime"] = "LHST";
  Timezones2["MacquarieIslandStationTime"] = "MIST";
  Timezones2["MagadanTime"] = "MAGT";
  Timezones2["MalaysiaStandardTime"] = "MST";
  Timezones2["MalaysiaTime"] = "MYT";
  Timezones2["MaldivesTime"] = "MVT";
  Timezones2["MarquesasIslandsTime"] = "MART";
  Timezones2["MarshallIslandsTime"] = "MHT";
  Timezones2["MauritiusTime"] = "MUT";
  Timezones2["MawsonStationTime"] = "MAWT";
  Timezones2["MiddleEuropeanSummerTime"] = "MEDT";
  Timezones2["MiddleEuropeanTime"] = "MET";
  Timezones2["MoscowTime"] = "MSK";
  Timezones2["MountainDaylightTime"] = "MDT";
  Timezones2["MountainStandardTime"] = "MST";
  Timezones2["MyanmarStandardTime"] = "MMT";
  Timezones2["NepalTime"] = "NCT";
  Timezones2["NauruTime"] = "NRT";
  Timezones2["NewCaledoniaTime"] = "NCT";
  Timezones2["NewZealandDaylightTime"] = "NZDT";
  Timezones2["NewZealandStandardTime"] = "NZST";
  Timezones2["NewfoundlandDaylightTime"] = "NDT";
  Timezones2["NewfoundlandStandardTime"] = "NST";
  Timezones2["NewfoundlandTime"] = "NT";
  Timezones2["NiueTime"] = "NUT";
  Timezones2["NorfolkIslandTime"] = "NFT";
  Timezones2["NovosibirskTime"] = "NOVT";
  Timezones2["OmskTime"] = "OMST";
  Timezones2["OralTime"] = "ORAT";
  Timezones2["PacificDaylightTime"] = "PDT";
  Timezones2["PacificStandardTime"] = "PST";
  Timezones2["PakistanStandardTime"] = "PKT";
  Timezones2["PalauTime"] = "PWT";
  Timezones2["PapuaNewGuineaTime"] = "PGT";
  Timezones2["ParaguaySummerTime"] = "PYST";
  Timezones2["ParaguayTime"] = "PYT";
  Timezones2["PeruTime"] = "PET";
  Timezones2["PhilippineStandardTime"] = "PHST";
  Timezones2["PhilippineTime"] = "PHT";
  Timezones2["PhoenixIslandTime"] = "PHOT";
  Timezones2["PitcairnTime"] = "PST";
  Timezones2["PohnpeiStandardTime"] = "PONT";
  Timezones2["ReunionTime"] = "RET";
  Timezones2["RotheraResearchStationTime"] = "ROTT";
  Timezones2["SaintPierreAndMiquelonDaylightTime"] = "PMDT";
  Timezones2["SaintPierreAndMiquelonStandardTime"] = "PMST";
  Timezones2["SakhalinIslandTime"] = "SAKT";
  Timezones2["SamaraTime"] = "SAMT";
  Timezones2["SamoaDaylightTime"] = "SDT";
  Timezones2["SamoaStandardTime"] = "SST";
  Timezones2["SeychellesTime"] = "SCT";
  Timezones2["ShowaStationTime"] = "SYOT";
  Timezones2["SingaporeStandardTime"] = "SST";
  Timezones2["SingaporeTime"] = "SGT";
  Timezones2["SolomonIslandsTime"] = "SBT";
  Timezones2["SouthAfricanStandardTime"] = "SAST";
  Timezones2["SouthGeorgiaAndTheSouthSandwichIslandsTime"] = "GST";
  Timezones2["SrednekolymskTime"] = "SRET";
  Timezones2["SriLankaStandardTime"] = "SLST";
  Timezones2["SurinameTime"] = "SRT";
  Timezones2["TahitiTime"] = "TAHT";
  Timezones2["TajikistanTime"] = "TJT";
  Timezones2["ThailandStandardTime"] = "THA";
  Timezones2["TimorLesteTime"] = "TLT";
  Timezones2["TokelauTime"] = "TKT";
  Timezones2["TongaTime"] = "TOT";
  Timezones2["TurkeyTime"] = "TRT";
  Timezones2["TurkmenistanTime"] = "TMT";
  Timezones2["TuvaluTime"] = "TVT";
  Timezones2["UlaanbaatarStandardTime"] = "ULAT";
  Timezones2["UlaanbaatarSummerTime"] = "ULAST";
  Timezones2["UruguayStandardTime"] = "UYT";
  Timezones2["UruguaySummerTime"] = "UYST";
  Timezones2["UzbekistanTime"] = "UZT";
  Timezones2["VanuatuTime"] = "VUT";
  Timezones2["VenezuelaStandardTime"] = "VET";
  Timezones2["VladivostokTime"] = "VLAT";
  Timezones2["VolgogradTime"] = "VOLT";
  Timezones2["VostokStationTime"] = "VOST";
  Timezones2["WakeIslandTime"] = "WAKT";
  Timezones2["WestAfricaSummerTime"] = "WAST";
  Timezones2["WestAfricaTime"] = "WAT";
  Timezones2["WestGreenlandSummerTime"] = "WGST";
  Timezones2["WestGreenlandTime"] = "WGT";
  Timezones2["WestKazakhstanTime"] = "WKT";
  Timezones2["WesternEuropeanSummerTime"] = "WEDT";
  Timezones2["WesternEuropeanTime"] = "WET";
  Timezones2["WesternIndonesianTime"] = "WIT";
  Timezones2["WesternStandardTime"] = "WST";
  Timezones2["YakutskTime"] = "YAKT";
  Timezones2["YekaterinburgTime"] = "YEKT";
  return Timezones2;
})(Timezones || {});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ACT" /* AcreTime */,
  name: "Acre Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AFT" /* AfghanistanTime */,
  name: "Afghanistan Time",
  offset: TimezoneOffset.UTC_PLUS_4_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "DFT" /* AIXCentralEuropeanTime */,
  name: "AIX Central European Time",
  offset: TimezoneOffset.UTC_PLUS_1
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "AKDT" /* AlaskaDaylightTime */,
  name: "Alaska Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AKST" /* AlaskaStandardTime */,
  name: "Alaska Standard Time",
  offset: TimezoneOffset.UTC_MINUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ALMT" /* AlmaAtaTime */,
  name: "Alma-Ata Time",
  offset: TimezoneOffset.UTC_PLUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AMST" /* AmazonSummerTime */,
  name: "Amazon Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AMT" /* AmazonTime */,
  name: "Amazon Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ANAT" /* AnadyrTime */,
  name: "Anadyr Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AQTT" /* AqtobeTime */,
  name: "Aqtobe Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AST" /* ArabiaStandardTime */,
  name: "Arabia Standard Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ART" /* ArgentinaTime */,
  name: "Argentina Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AMT" /* ArmeniaTime */,
  name: "Armenia Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "ADT" /* AtlanticDaylightTime */,
  name: "Atlantic Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AST" /* AtlanticStandardTime */,
  name: "Atlantic Standard Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "ACDT" /* AustralianCentralDaylightSavingTime */,
  name: "Australian Central Daylight Saving Time",
  offset: TimezoneOffset.UTC_PLUS_10_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ACST" /* AustralianCentralStandardTime */,
  name: "Australian Central Standard Time",
  offset: TimezoneOffset.UTC_PLUS_9_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ACWST" /* AustralianCentralWesternStandardTime */,
  name: "Australian Central Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8_45
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "AEDT" /* AustralianEasternDaylightSavingTime */,
  name: "Australian Eastern Daylight Saving Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AEST" /* AustralianEasternStandardTime */,
  name: "Australian Eastern Standard Time",
  offset: TimezoneOffset.UTC_PLUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AET" /* AustralianEasternTime */,
  name: "Australian Eastern Time",
  offset: TimezoneOffset.UTC_PLUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AWST" /* AustralianWesternStandardTime */,
  name: "Australian Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AZT" /* AzerbaijanTime */,
  name: "Azerbaijan Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "AZOT" /* AzoresStandardTime */,
  name: "Azores Standard Time",
  offset: TimezoneOffset.UTC_MINUS_1
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "AZOST" /* AzoresSummerTime */,
  name: "Azores Summer Time",
  offset: TimezoneOffset.UTC_0
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BIT" /* BakerIslandTime */,
  name: "Baker Island Time",
  offset: TimezoneOffset.UTC_MINUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BST" /* BangladeshStandardTime */,
  name: "Bangladesh Standard Time",
  offset: TimezoneOffset.UTC_PLUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BTT" /* BhutanTime */,
  name: "Bhutan Time",
  offset: TimezoneOffset.UTC_PLUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BOT" /* BoliviaTime */,
  name: "Bolivia Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BST" /* BougainvilleStandardTime */,
  name: "Bougainville Standard Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "BRST" /* BrasiliaSummerTime */,
  name: "Brasilia Summer Time",
  offset: TimezoneOffset.UTC_MINUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BRT" /* BrasiliaTime */,
  name: "Brasilia Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BIOT" /* BritishIndianOceanTime */,
  name: "British Indian Ocean Time",
  offset: TimezoneOffset.UTC_PLUS_6
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "BST" /* BritishSummerTime */,
  name: "British Summer Time",
  offset: TimezoneOffset.UTC_PLUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "BNT" /* BruneiTime */,
  name: "Brunei Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CVT" /* CapeVerdeTime */,
  name: "Cape Verde Time",
  offset: TimezoneOffset.UTC_MINUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CAT" /* CentralAfricaTime */,
  name: "Central Africa Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "CDT" /* CentralDaylightTime */,
  name: "Central Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "CEST" /* CentralEuropeanSummerTime */,
  name: "Central European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CET" /* CentralEuropeanTime */,
  name: "Central European Time",
  offset: TimezoneOffset.UTC_PLUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WITA" /* CentralIndonesiaTime */,
  name: "Central Indonesia Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CST" /* CentralStandardTime */,
  name: "Central Standard Time",
  offset: TimezoneOffset.UTC_MINUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CT" /* CentralTime */,
  name: "Central Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CWST" /* CentralWesternStandardTime */,
  name: "Central Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8_45
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CHST" /* ChamorroStandardTime */,
  name: "Chamorro Standard Time",
  offset: TimezoneOffset.UTC_PLUS_10
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "CHADT" /* ChathamDaylightTime */,
  name: "Chatham Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_13_45
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CHAST" /* ChathamStandardTime */,
  name: "Chatham Standard Time",
  offset: TimezoneOffset.UTC_PLUS_12_45
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CLT" /* ChileStandardTime */,
  name: "Chile Standard Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "CLST" /* ChileSummerTime */,
  name: "Chile Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CST" /* ChinaStandardTime */,
  name: "China Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CHOT" /* ChoibalsanStandardTime */,
  name: "Choibalsan Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "CHOST" /* ChoibalsanSummerTime */,
  name: "Choibalsan Summer Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CXT" /* ChristmasIslandTime */,
  name: "Christmas Island Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CHUT" /* ChuukTime */,
  name: "Chuuk Time",
  offset: TimezoneOffset.UTC_PLUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CIST" /* ClipptertonIslandStandardTime */,
  name: "Clippterton Island Standard Time",
  offset: TimezoneOffset.UTC_MINUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CCT" /* CocosIslandsTime */,
  name: "Cocos Standard Time",
  offset: TimezoneOffset.UTC_PLUS_6_30
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "COST" /* ColombiaSummerTime */,
  name: "Colombia Summer Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "COT" /* ColombiaTime */,
  name: "Colombia Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CKT" /* CookIslandTime */,
  name: "Cook Island Time",
  offset: TimezoneOffset.UTC_MINUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "UTC" /* CoordinatedUniversalTime */,
  name: "Coordinated Universal Time",
  offset: TimezoneOffset.UTC_0
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "CDT" /* CubaDaylightTime */,
  name: "Cuba Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "CST" /* CubaStandardTime */,
  name: "Cuba Standard Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "DAVT" /* DavisTime */,
  name: "Davis Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "DDUT" /* DumontDUrvilleTime */,
  name: "Dumont D'Urville Time",
  offset: TimezoneOffset.UTC_PLUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "EAT" /* EastAfricaTime */,
  name: "East Africa Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "EAST" /* EasterIslandStandardTime */,
  name: "Easter Island Standard Time",
  offset: TimezoneOffset.UTC_MINUS_6
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "EASST" /* EasterIslandSummerTime */,
  name: "Easter Island Summer Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ECT" /* EasternCaribbeanTime */,
  name: "Eastern Caribbean Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "EDT" /* EasternDaylightTime */,
  name: "Eastern Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "EEST" /* EasternEuropeanSummerTime */,
  name: "Eastern European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "EET" /* EasternEuropeanTime */,
  name: "Eastern European Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "EGST" /* EasternGreenlandSummerTime */,
  name: "Eastern Greenland Summer Time",
  offset: TimezoneOffset.UTC_0
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "EGT" /* EasternGreenlandTime */,
  name: "Eastern Greenland Time",
  offset: TimezoneOffset.UTC_MINUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WIT" /* EasternIndonesianTime */,
  name: "Eastern Indonesian Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "EST" /* EasternStandardTime */,
  name: "Eastern Standard Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ET" /* EasternTime */,
  name: "Eastern Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ECT" /* EcuadorTime */,
  name: "Ecuador Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "FKST" /* FalklandIslandsSummerTime */,
  name: "Falkland Islands Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "FKT" /* FalklandIslandsTime */,
  name: "Falkland Islands Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "FNT" /* FernandoDeNoronhaTime */,
  name: "Fernando de Noronha Time",
  offset: TimezoneOffset.UTC_MINUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "FJT" /* FijiTime */,
  name: "Fiji Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GFT" /* FrenchGuianaTime */,
  name: "French Guiana Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TFT" /* FrenchSouthernAndAntarcticTime */,
  name: "French Southern and Antarctic Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "FET" /* FurtherEasternEuropeanTime */,
  name: "Further Eastern European Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GALT" /* GalapagosTime */,
  name: "Galapagos Time",
  offset: TimezoneOffset.UTC_MINUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GIT" /* GambierIslandTime */,
  name: "Gambier Island Time",
  offset: TimezoneOffset.UTC_MINUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GAMT" /* GambierIslandsTime */,
  name: "Gambier Islands Time",
  offset: TimezoneOffset.UTC_MINUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GET" /* GeorgiaStandardTime */,
  name: "Georgia Standard Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GILT" /* GilbertIslandTime */,
  name: "Gilbert Island Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GMT" /* GreenwichMeanTime */,
  name: "Greenwich Mean Time",
  offset: TimezoneOffset.UTC_0
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GST" /* GulfStandardTime */,
  name: "Gulf Standard Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GYT" /* GuyanaTime */,
  name: "Guyana Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "HDT" /* HawaiiAleutianDaylightTime */,
  name: "Hawaii-Aleutian Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "HST" /* HawaiiAleutianStandardTime */,
  name: "Hawaii-Aleutian Standard Time",
  offset: TimezoneOffset.UTC_MINUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "HMT" /* HeardAndMcDonaldIslandsTime */,
  name: "Heard and McDonald Islands Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "HKT" /* HongKongTime */,
  name: "Hong Kong Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "HOVST" /* HovdSummerTime */,
  name: "Hovd Summer Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "HOVT" /* HovdTime */,
  name: "Hovd Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "IOT" /* IndianOceanTime */,
  name: "Indian Ocean Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "IST" /* IndianStandardTime */,
  name: "Indian Standard Time",
  offset: TimezoneOffset.UTC_PLUS_5_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ICT" /* IndochinaTime */,
  name: "Indochina Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "IDLW" /* InternationalDayLineWestTime */,
  name: "International Day Line West Time",
  offset: TimezoneOffset.UTC_MINUS_12
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "IRDT" /* IranDaylightTime */,
  name: "Iran Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_4_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "IRST" /* IranStandardTime */,
  name: "Iran Standard Time",
  offset: TimezoneOffset.UTC_PLUS_3_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "IST" /* IrishStandardTime */,
  name: "Irish Standard Time",
  offset: TimezoneOffset.UTC_PLUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "IRKT" /* IrkutskTime */,
  name: "Irkutsk Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: true,
    uses: true
  },
  id: "IDT" /* IsraelDaylightTime */,
  name: "Israel Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "IST" /* IsraelStandardTime */,
  name: "Israel Standard Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "JST" /* JapanStandardTime */,
  name: "Japan Standard Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "KALT" /* KaliningradTime */,
  name: "Kaliningrad Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "KAMT" /* KamchatkaTime */,
  name: "Kamchatka Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "KST" /* KoreaStandardTime */,
  name: "Korea Standard Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "KOST" /* KosraeTime */,
  name: "Kosrae Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "KRAT" /* KrasnoyarskTime */,
  name: "Krasnoyarsk Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "KGT" /* KyrgyzstanTime */,
  name: "Kyrgyzstan Time",
  offset: TimezoneOffset.UTC_PLUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "LINT" /* LineIslandsTime */,
  name: "Line Islands Time",
  offset: TimezoneOffset.UTC_PLUS_14
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "LHST" /* LordHoweStandardTime */,
  name: "Lord Howe Standard Time",
  offset: TimezoneOffset.UTC_PLUS_10_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "LHST" /* LordHoweSummerTime */,
  name: "Lord Howe Summer Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MIST" /* MacquarieIslandStationTime */,
  name: "Macquarie Island Station Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MAGT" /* MagadanTime */,
  name: "Magadan Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MST" /* MalaysiaStandardTime */,
  name: "Malaysia Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MYT" /* MalaysiaTime */,
  name: "Malaysia Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MVT" /* MaldivesTime */,
  name: "Maldives Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MART" /* MarquesasIslandsTime */,
  name: "Marquesas Islands Time",
  offset: TimezoneOffset.UTC_PLUS_9_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MHT" /* MarshallIslandsTime */,
  name: "Marshall Islands Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MUT" /* MauritiusTime */,
  name: "Mauritius Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MAWT" /* MawsonStationTime */,
  name: "Mawson Station Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MEDT" /* MiddleEuropeanSummerTime */,
  name: "Middle European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MET" /* MiddleEuropeanTime */,
  name: "Middle European Time",
  offset: TimezoneOffset.UTC_PLUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MSK" /* MoscowTime */,
  name: "Moscow Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MDT" /* MountainDaylightTime */,
  name: "Mountain Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MST" /* MountainStandardTime */,
  name: "Mountain Standard Time",
  offset: TimezoneOffset.UTC_MINUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "MMT" /* MyanmarStandardTime */,
  name: "Myanmar Standard Time",
  offset: TimezoneOffset.UTC_PLUS_6_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NCT" /* NepalTime */,
  name: "Nepal Time",
  offset: TimezoneOffset.UTC_PLUS_5_45
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NRT" /* NauruTime */,
  name: "Nauru Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NCT" /* NewCaledoniaTime */,
  name: "New Caledonia Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NZDT" /* NewZealandDaylightTime */,
  name: "New Zealand Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_13
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NZST" /* NewZealandStandardTime */,
  name: "New Zealand Standard Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NDT" /* NewfoundlandDaylightTime */,
  name: "Newfoundland Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_2_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NT" /* NewfoundlandTime */,
  name: "Newfoundland Time",
  offset: TimezoneOffset.UTC_MINUS_3_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NUT" /* NiueTime */,
  name: "Niue Time",
  offset: TimezoneOffset.UTC_MINUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NFT" /* NorfolkIslandTime */,
  name: "Norfolk Island Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "NOVT" /* NovosibirskTime */,
  name: "Novosibirsk Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "OMST" /* OmskTime */,
  name: "Omsk Time",
  offset: TimezoneOffset.UTC_PLUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ORAT" /* OralTime */,
  name: "Oral Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PDT" /* PacificDaylightTime */,
  name: "Pacific Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PST" /* PacificStandardTime */,
  name: "Pacific Standard Time",
  offset: TimezoneOffset.UTC_MINUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PKT" /* PakistanStandardTime */,
  name: "Pakistan Standard Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PWT" /* PalauTime */,
  name: "Palau Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PGT" /* PapuaNewGuineaTime */,
  name: "Papua New Guinea Time",
  offset: TimezoneOffset.UTC_PLUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PYST" /* ParaguaySummerTime */,
  name: "Paraguay Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PYT" /* ParaguayTime */,
  name: "Paraguay Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PET" /* PeruTime */,
  name: "Peru Time",
  offset: TimezoneOffset.UTC_MINUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PHST" /* PhilippineStandardTime */,
  name: "Philippine Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PHT" /* PhilippineTime */,
  name: "Philippine Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PHOT" /* PhoenixIslandTime */,
  name: "Phoenix Island Time",
  offset: TimezoneOffset.UTC_PLUS_13
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PST" /* PitcairnTime */,
  name: "Pitcairn Time",
  offset: TimezoneOffset.UTC_MINUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PONT" /* PohnpeiStandardTime */,
  name: "Pohnpei Standard Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "RET" /* ReunionTime */,
  name: "Reunion Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ROTT" /* RotheraResearchStationTime */,
  name: "Rothera Research Station Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PMDT" /* SaintPierreAndMiquelonDaylightTime */,
  name: "Saint Pierre and Miquelon Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "PMST" /* SaintPierreAndMiquelonStandardTime */,
  name: "Saint Pierre and Miquelon Standard Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SAKT" /* SakhalinIslandTime */,
  name: "Sakhalin Island Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SAMT" /* SamaraTime */,
  name: "Samara Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SDT" /* SamoaDaylightTime */,
  name: "Samoa Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SST" /* SamoaStandardTime */,
  name: "Samoa Standard Time",
  offset: TimezoneOffset.UTC_MINUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SCT" /* SeychellesTime */,
  name: "Seychelles Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SYOT" /* ShowaStationTime */,
  name: "Showa Station Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SST" /* SingaporeStandardTime */,
  name: "Singapore Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SGT" /* SingaporeTime */,
  name: "Singapore Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SBT" /* SolomonIslandsTime */,
  name: "Solomon Islands Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SAST" /* SouthAfricanStandardTime */,
  name: "South African Standard Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "GST" /* SouthGeorgiaAndTheSouthSandwichIslandsTime */,
  name: "South Georgia and the South Sandwich Islands Time",
  offset: TimezoneOffset.UTC_MINUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SRET" /* SrednekolymskTime */,
  name: "Srednekolymsk Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SLST" /* SriLankaStandardTime */,
  name: "Sri Lanka Standard Time",
  offset: TimezoneOffset.UTC_PLUS_5_30
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "SRT" /* SurinameTime */,
  name: "Suriname Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TAHT" /* TahitiTime */,
  name: "Tahiti Time",
  offset: TimezoneOffset.UTC_MINUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TJT" /* TajikistanTime */,
  name: "Tajikistan Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "THA" /* ThailandStandardTime */,
  name: "Thailand Standard Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TLT" /* TimorLesteTime */,
  name: "Timor-Leste Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TKT" /* TokelauTime */,
  name: "Tokelau Time",
  offset: TimezoneOffset.UTC_PLUS_13
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TOT" /* TongaTime */,
  name: "Tonga Time",
  offset: TimezoneOffset.UTC_PLUS_13
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TRT" /* TurkeyTime */,
  name: "Turkey Time",
  offset: TimezoneOffset.UTC_PLUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TMT" /* TurkmenistanTime */,
  name: "Turkmenistan Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "TVT" /* TuvaluTime */,
  name: "Tuvalu Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ULAT" /* UlaanbaatarStandardTime */,
  name: "Ulaanbaatar Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "ULAST" /* UlaanbaatarSummerTime */,
  name: "Ulaanbaatar Summer Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "UYT" /* UruguayStandardTime */,
  name: "Uruguay Standard Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "UYST" /* UruguaySummerTime */,
  name: "Uruguay Summer Time",
  offset: TimezoneOffset.UTC_MINUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "UZT" /* UzbekistanTime */,
  name: "Uzbekistan Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "VUT" /* VanuatuTime */,
  name: "Vanuatu Time",
  offset: TimezoneOffset.UTC_PLUS_11
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "VET" /* VenezuelaStandardTime */,
  name: "Venezuela Standard Time",
  offset: TimezoneOffset.UTC_MINUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "VLAT" /* VladivostokTime */,
  name: "Vladivostok Time",
  offset: TimezoneOffset.UTC_PLUS_10
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "VOLT" /* VolgogradTime */,
  name: "Volgograd Time",
  offset: TimezoneOffset.UTC_PLUS_4
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "VOST" /* VostokStationTime */,
  name: "Vostok Station Time",
  offset: TimezoneOffset.UTC_PLUS_6
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WAKT" /* WakeIslandTime */,
  name: "Wake Island Time",
  offset: TimezoneOffset.UTC_PLUS_12
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WAST" /* WestAfricaSummerTime */,
  name: "West Africa Summer Time",
  offset: TimezoneOffset.UTC_PLUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WAT" /* WestAfricaTime */,
  name: "West Africa Time",
  offset: TimezoneOffset.UTC_PLUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WGST" /* WestGreenlandSummerTime */,
  name: "West Greenland Summer Time",
  offset: TimezoneOffset.UTC_MINUS_2
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WGT" /* WestGreenlandTime */,
  name: "West Greenland Time",
  offset: TimezoneOffset.UTC_MINUS_3
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WKT" /* WestKazakhstanTime */,
  name: "West Kazakhstan Time",
  offset: TimezoneOffset.UTC_PLUS_5
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WEDT" /* WesternEuropeanSummerTime */,
  name: "Western European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_1
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WET" /* WesternEuropeanTime */,
  name: "Western European Time",
  offset: TimezoneOffset.UTC_0
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WIT" /* WesternIndonesianTime */,
  name: "Western Indonesian Time",
  offset: TimezoneOffset.UTC_PLUS_7
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "WST" /* WesternStandardTime */,
  name: "Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "YAKT" /* YakutskTime */,
  name: "Yakutsk Time",
  offset: TimezoneOffset.UTC_PLUS_9
});
({
  dst: {
    is: false,
    uses: true
  },
  id: "YEKT" /* YekaterinburgTime */,
  name: "Yekaterinburg Time",
  offset: TimezoneOffset.UTC_PLUS_5
});

var Region = /* @__PURE__ */ ((Region2) => {
  Region2["Africa"] = "Africa";
  Region2["Americas"] = "Americas";
  Region2["Asia"] = "Asia";
  Region2["Europe"] = "Europe";
  Region2["Oceania"] = "Oceania";
  Region2["Polar"] = "Polar";
  return Region2;
})(Region || {});
var SubRegion = /* @__PURE__ */ ((SubRegion2) => {
  SubRegion2["CentralAmerica"] = "Central America";
  SubRegion2["EasternAsia"] = "Eastern Asia";
  SubRegion2["EasternEurope"] = "Eastern Europe";
  SubRegion2["EasternAfrica"] = "Eastern Africa";
  SubRegion2["MiddleAfrica"] = "Middle Africa";
  SubRegion2["MiddleEast"] = "Middle East";
  SubRegion2["NorthernAfrica"] = "Northern Africa";
  SubRegion2["NorthernAmerica"] = "Northern America";
  SubRegion2["NorthernEurope"] = "Northern Europe";
  SubRegion2["Polynesia"] = "Polynesia";
  SubRegion2["SouthAmerica"] = "South America";
  SubRegion2["SouthernAfrica"] = "Southern Africa";
  SubRegion2["SouthernAsia"] = "Southern Asia";
  SubRegion2["SouthernEurope"] = "Southern Europe";
  SubRegion2["WesternAfrica"] = "Western Africa";
  SubRegion2["WesternAsia"] = "Western Asia";
  SubRegion2["WesternEurope"] = "Western Europe";
  SubRegion2["WesternAustralia"] = "Western Australia";
  return SubRegion2;
})(SubRegion || {});

({
  Afghanistan: {
    i18n: {
      calling_codes: [93],
      currencies: [CurrencyCode.AfghanistanAfghani],
      languages: [
        LocaleCode.Pashto,
        LocaleCode.Dari,
        LocaleCode.Turkmen,
        LocaleCode.Uzbek
      ],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_4_30],
        regions: [TimezoneRegions.AsiaKabul],
        timezones: [Timezones.AfghanistanTime]
      }
    },
    id: CountryCode.Afghanistan,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1EB}",
        emoji_unicode: "U+1F1E6 U+1F1EB",
        svg: "https://www.countryflags.io/af/flat/64.svg"
      },
      tld: [".af"]
    },
    iso: {
      alpha2: CountryCode.Afghanistan,
      alpha3: "AFG",
      numeric: "004"
    },
    name: {
      alt_spellings: ["AF", "Af\u0121\u0101nist\u0101n"],
      demonym: "Afghan",
      native: {
        endonym: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
      },
      official: "Islamic Republic of Afghanistan",
      short: "Afghanistan",
      translations: {
        [LocaleCode.Afrikaans]: "Afghanistan",
        [LocaleCode.Albanian]: "Shqip\xEBri",
        [LocaleCode.Amharic]: "\u12A0\u134D\u130B\u1295",
        [LocaleCode.Arabic]: "\u0623\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Basque]: "Afganist\xE1n",
        [LocaleCode.Belarusian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Bengali]: "\u0986\u09AB\u0997\u09BE\u09A8\u09BF\u09B8\u09CD\u09A4\u09BE\u09A8",
        [LocaleCode.Berber]: "\u0623\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB2\u0F7C\u0F51\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F51\u0F7C\u0F53\u0F0B\u0F63\u0F7A\u0F0B\u0F66\u0F90\u0F51\u0F0B\u0F46\u0F0D",
        [LocaleCode.Bosnian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Breton]: "Afganistan",
        [LocaleCode.Bulgarian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Burmese]: "\u1021\u102C\u1019\u1001\u103B\u1004\u103A\u1010\u1031\u102C\u103A",
        [LocaleCode.Catalan]: "Afganistan",
        [LocaleCode.Chinese]: "\u963F\u5BCC\u6C57",
        [LocaleCode.Croatian]: "Afganistan",
        [LocaleCode.Czech]: "Afganistan",
        [LocaleCode.Danish]: "Afghanistan",
        [LocaleCode.Dutch]: "Afghanistan",
        [LocaleCode.English]: "Afghanistan",
        [LocaleCode.Esperanto]: "Afganistan",
        [LocaleCode.Estonian]: "Afganistan",
        [LocaleCode.Finnish]: "Afghanistan",
        [LocaleCode.French]: "Afghanistan",
        [LocaleCode.Frisian]: "Afghanistan",
        [LocaleCode.Galician]: "Afganist\xE1n",
        [LocaleCode.Georgian]: "\u10D0\u10D5\u10E6\u10D0\u10DC\u10D4\u10D7\u10D8",
        [LocaleCode.German]: "Afghanistan",
        [LocaleCode.Greenlandic]: "Afghanistan",
        [LocaleCode.Greek]: "\u0391\u03C6\u03B3\u03B1\u03BD\u03B9\u03C3\u03C4\u03AC\u03BD",
        [LocaleCode.Gujarati]: "\u0A85\u0AAB\u0A97\u0ABE\u0AA8\u0ABF\u0AB8\u0ACD\u0AA4\u0ABE\u0AA8",
        [LocaleCode.Haitian]: "Afghanistan",
        [LocaleCode.Hausa]: "Afghanistan",
        [LocaleCode.Hebrew]: "\u05D0\u05E4\u05D2\u05E0\u05D9\u05E1\u05D8\u05DF",
        [LocaleCode.Hindi]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Hungarian]: "Afganistan",
        [LocaleCode.Icelandic]: "Afghanistan",
        [LocaleCode.Igbo]: "Afghanistan",
        [LocaleCode.Indonesian]: "Afghanistan",
        [LocaleCode.Irish]: "Afghanistan",
        [LocaleCode.Italian]: "Afghanistan",
        [LocaleCode.Japanese]: "\u30A2\u30D5\u30AC\u30CB\u30B9\u30BF\u30F3",
        [LocaleCode.Javanese]: "Afghanistan",
        [LocaleCode.Kannada]: "\u0C85\u0CAB\u0C97\u0CBE\u0CA8\u0CBF\u0CB8\u0CCD\u0CA4\u0CBE\u0CA8",
        [LocaleCode.Kazakh]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u17A0\u17D2\u179C\u17D2\u179A\u17B7\u1780",
        [LocaleCode.Korean]: "\uC544\uD504\uAC00\uB2C8\uC2A4\uD0C4",
        [LocaleCode.Kurdish]: "Afghanistan",
        [LocaleCode.Kyrgyz]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0E9F\u0EB2\u0EA5\u0EBD\u0E99",
        [LocaleCode.Latin]: "Afghanistan",
        [LocaleCode.Latvian]: "Afghanistan",
        [LocaleCode.Lithuanian]: "Afganistanas",
        [LocaleCode.Luxembourgish]: "Afghanistan",
        [LocaleCode.Macedonian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Malagasy]: "Afghanistan",
        [LocaleCode.Malay]: "Afghanistan",
        [LocaleCode.Malayalam]: "\u0D05\u0D2B\u0D17\u0D3E\u0D28\u0D3F\u0D38\u0D4D\u0D24\u0D3E\u0D28",
        [LocaleCode.Maltese]: "Afghanistan",
        [LocaleCode.Maori]: "Afghanistan",
        [LocaleCode.Marathi]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Mongolian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Nepali]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Norwegian]: "Afghanistan",
        [LocaleCode.Pashto]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Persian]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Polish]: "Afganistan",
        [LocaleCode.Portuguese]: "Afghanistan",
        [LocaleCode.Punjabi]: "Afghanistan",
        [LocaleCode.Romanian]: "Afghanistan",
        [LocaleCode.Polish]: "Afganistan",
        [LocaleCode.Russian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Samoan]: "Afghanistan",
        [LocaleCode.Sanskrit]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Scots]: "Afghanistan",
        [LocaleCode.Serbian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Sesotho]: "Afghanistan",
        [LocaleCode.Shona]: "Afghanistan",
        [LocaleCode.Sindhi]: "Afghanistan",
        [LocaleCode.Sinhala]: "\u0D86\u0D9C\u0DCA\u200D\u0DBB\u0DDC\u0D9A\u0DCA\u0D9A\u0DD2\u0DBA\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Afganistan",
        [LocaleCode.Slovenian]: "Afganistan",
        [LocaleCode.Somali]: "Afghanistan",
        [LocaleCode.Spanish]: "Afganist\xE1n",
        [LocaleCode.Sudanese]: "Afghanistan",
        [LocaleCode.Swahili]: "Afghanistan",
        [LocaleCode.Swedish]: "Afghanistan",
        [LocaleCode.Tagalog]: "Afghanistan",
        [LocaleCode.Tajik]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Tatar]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Tamil]: "\u0B86\u0BAA\u0BCD\u0BAA\u0B95\u0BBE\u0BA9\u0BBF\u0BB8\u0BCD\u0BA4\u0BBE\u0BA9\u0BCD",
        [LocaleCode.Telugu]: "\u0C06\u0C2B\u0C4D\u0C18\u0C28\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C28\u0C4D",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E1F\u0E01\u0E32\u0E19\u0E34\u0E2A\u0E16\u0E32\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F55\u0F0B\u0F42\u0F7A\u0F0B\u0F53\u0F72\u0F66\u0F72\u0F0B\u0F4F\u0F7A\u0F53\u0F66\u0F72\u0F0D",
        [LocaleCode.Turkish]: "Afganistan",
        [LocaleCode.Ukrainian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Urdu]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Uzbek]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Vietnamese]: "Afghanistan",
        [LocaleCode.Welsh]: "Afghanistan",
        [LocaleCode.Xhosa]: "Afghanistan",
        [LocaleCode.Yiddish]: "Afghanistan",
        [LocaleCode.Yoruba]: "Afghanistan",
        [LocaleCode.Zulu]: "Afghanistan"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Kabul",
          total: 341e5
        }
      },
      geography: {
        area: 652230,
        region: Region.Asia,
        sub_region: SubRegion.SouthernAsia
      },
      government: {
        capital: "Kabul",
        type: "Islamic Emirate"
      }
    }
  },
  Albania: {
    i18n: {
      calling_codes: [355],
      currencies: [CurrencyCode.AlbaniaLek],
      languages: [LocaleCode.Albanian, LocaleCode.Greek, LocaleCode.Turkish],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1],
        regions: [TimezoneRegions.EuropeBrussels],
        timezones: [Timezones.CentralEuropeanTime]
      }
    },
    id: CountryCode.Albania,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F1}",
        emoji_unicode: "U+1F1E6 U+1F1F1",
        svg: "https://www.countryflags.io/al/flat/64.svg"
      },
      tld: [".al"]
    },
    iso: {
      alpha2: CountryCode.Albania,
      alpha3: "ALB",
      numeric: "008"
    },
    name: {
      alt_spellings: ["AL", "Shqip\xEBri", "Shqip\xEBria", "Shqipnia"],
      demonym: "Albanian",
      native: {
        endonym: "Shqip\xEBri"
      },
      official: "Republic of Albania",
      short: "Albania",
      translations: {
        [LocaleCode.Afrikaans]: "Albania",
        [LocaleCode.Albanian]: "Albania",
        [LocaleCode.Amharic]: "\u12A0\u120D\u1263\u1295\u12EB",
        [LocaleCode.Arabic]: "\u0623\u0644\u0628\u0627\u0646\u064A\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Basque]: "Albania",
        [LocaleCode.Belarusian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Bengali]: "\u0986\u09B2\u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09BE",
        [LocaleCode.Berber]: "\u0623\u0644\u0628\u0627\u0646\u064A\u0627",
        [LocaleCode.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B",
        [LocaleCode.Bosnian]: "Albanija",
        [LocaleCode.Breton]: "Albania",
        [LocaleCode.Bulgarian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Burmese]: "\u1021\u102C\u1019\u1001\u103B\u1004\u103A\u1010\u1031\u102C\u103A",
        [LocaleCode.Catalan]: "Alb\xE0nia",
        [LocaleCode.Chinese]: "\u963F\u5C14\u5DF4\u5C3C\u4E9A",
        [LocaleCode.Croatian]: "Albanija",
        [LocaleCode.Czech]: "Alb\xE1nie",
        [LocaleCode.Danish]: "Albanien",
        [LocaleCode.Dutch]: "Albani\xEB",
        [LocaleCode.English]: "Albania",
        [LocaleCode.Esperanto]: "Albanio",
        [LocaleCode.Estonian]: "Albaania",
        [LocaleCode.Finnish]: "Albania",
        [LocaleCode.French]: "Albanie",
        [LocaleCode.Frisian]: "Albani\xEB",
        [LocaleCode.Galician]: "Alb\xE2nia",
        [LocaleCode.Georgian]: "\u10D0\u10DA\u10D1\u10D0\u10DC\u10D8\u10D0",
        [LocaleCode.German]: "Albanien",
        [LocaleCode.Greenlandic]: "Albania",
        [LocaleCode.Greek]: "\u0391\u03BB\u03B2\u03B1\u03BD\u03AF\u03B1",
        [LocaleCode.Gujarati]: "\u0A85\u0AB2\u0AAC\u0AA8\u0ABF\u0AAF\u0ABE",
        [LocaleCode.Haitian]: "Albanais",
        [LocaleCode.Hausa]: "Albania",
        [LocaleCode.Hebrew]: "\u05D0\u05DC\u05D1\u05E0\u05D9\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E",
        [LocaleCode.Hungarian]: "Alb\xE1nia",
        [LocaleCode.Icelandic]: "Alb\xFAnir",
        [LocaleCode.Igbo]: "Albania",
        [LocaleCode.Indonesian]: "Albania",
        [LocaleCode.Irish]: "Alb\xE1in",
        [LocaleCode.Italian]: "Albania",
        [LocaleCode.Japanese]: "\u30A2\u30EB\u30D0\u30CB\u30A2",
        [LocaleCode.Javanese]: "Albania",
        [LocaleCode.Kannada]: "\u0C85\u0CB2\u0CCD\u0CAC\u0CBE\u0CA8\u0CBF\u0CAF\u0CBE",
        [LocaleCode.Kazakh]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u17A0\u17D2\u179C\u17D2\u179A\u17C1\u179F\u17CA\u17B8",
        [LocaleCode.Korean]: "\uC54C\uBC14\uB2C8\uC544",
        [LocaleCode.Kurdish]: "\u0622\u0644\u0628\u0627\u0646\u06CC\u0627",
        [LocaleCode.Kyrgyz]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EA5\u0EB2\u0E99\u0EB5",
        [LocaleCode.Latin]: "Albania",
        [LocaleCode.Latvian]: "Alb\u0101nija",
        [LocaleCode.Lithuanian]: "Albanija",
        [LocaleCode.Luxembourgish]: "Albani\xEB",
        [LocaleCode.Macedonian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u0458\u0430",
        [LocaleCode.Malagasy]: "Albania",
        [LocaleCode.Malay]: "Albania",
        [LocaleCode.Malayalam]: "\u0D05\u0D32\u0D4D\u0D2C\u0D3E\u0D28\u0D3F\u0D2F\u0D3E",
        [LocaleCode.Maltese]: "Albania",
        [LocaleCode.Maori]: "Albania",
        [LocaleCode.Marathi]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Nepali]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E",
        [LocaleCode.Norwegian]: "Albania",
        [LocaleCode.Pashto]: "\u0627\u0627\u0644\u0628\u0627\u0646\u06CC",
        [LocaleCode.Persian]: "\u0622\u0644\u0628\u0627\u0646\u06CC",
        [LocaleCode.Polish]: "Albania",
        [LocaleCode.Portuguese]: "Alb\xE2nia",
        [LocaleCode.Punjabi]: "\u0A05\u0A32\u0A2C\u0A28\u0A40\u0A06",
        [LocaleCode.Romanian]: "Alb\u0103n",
        [LocaleCode.Russian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Samoan]: "Albania",
        [LocaleCode.Sanskrit]: "Albani",
        [LocaleCode.Scots]: "Alb\xE0inia",
        [LocaleCode.Serbian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u0458\u0430",
        [LocaleCode.Sesotho]: "Albania",
        [LocaleCode.Shona]: "Albania",
        [LocaleCode.Sindhi]: "Albania",
        [LocaleCode.Sinhala]: "\u0D87\u0DBD\u0DCA\u0DB6\u0DCF\u0DB1\u0DD2\u0DBA",
        [LocaleCode.Slovak]: "Alb\xE1nsko",
        [LocaleCode.Slovenian]: "Albanija",
        [LocaleCode.Somali]: "Albania",
        [LocaleCode.Spanish]: "Albania",
        [LocaleCode.Sudanese]: "Albania",
        [LocaleCode.Swahili]: "Albania",
        [LocaleCode.Swedish]: "Albanien",
        [LocaleCode.Tagalog]: "Albania",
        [LocaleCode.Tajik]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Tamil]: "\u0B85\u0BB2\u0BCD\u0BAA\u0BBE\u0BA9\u0BBF\u0BAF\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Telugu]: "\u0C05\u0C32\u0C4D\u0C2C\u0C3E\u0C28\u0C3F\u0C2F\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E25\u0E41\u0E1A\u0E19\u0E34\u0E19\u0E35",
        [LocaleCode.Tibetan]: "\u0F68\u0F63\u0F0B\u0F56\u0F72\u0F0B\u0F53\u0F72\u0F0B\u0F61\u0F72",
        [LocaleCode.Turkish]: "Albaniye",
        [LocaleCode.Ukrainian]: "\u0410\u043B\u0431\u0430\u043D\u0456\u044F",
        [LocaleCode.Urdu]: "\u0622\u0644\u0628\u0627\u0646\u06CC",
        [LocaleCode.Uzbek]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Vietnamese]: "Albanie",
        [LocaleCode.Welsh]: "Albania",
        [LocaleCode.Xhosa]: "Albania",
        [LocaleCode.Yiddish]: "\u05D0\u05DC\u05D1\u05E0\u05D9\u05E9",
        [LocaleCode.Yoruba]: "Albania",
        [LocaleCode.Zulu]: "Albania"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Tirana",
          total: 2853e3
        }
      },
      geography: {
        area: 28748,
        region: Region.Europe,
        sub_region: SubRegion.SouthernEurope
      },
      government: {
        capital: "Tirana",
        type: "Republic"
      }
    }
  },
  Algeria: {
    i18n: {
      calling_codes: [213],
      currencies: [CurrencyCode.AlgeriaDinar],
      languages: [
        LocaleCode.Arabic,
        LocaleCode.French,
        LocaleCode.Berber,
        LocaleCode.Tamazight
      ],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1, TimezoneOffset.UTC_PLUS_2],
        regions: [TimezoneRegions.AfricaAlgiers],
        timezones: [Timezones.CentralEuropeanTime]
      }
    },
    id: CountryCode.Algeria,
    info: {
      flag: {
        emoji: "\u{1F1E9}\u{1F1FF}",
        emoji_unicode: "U+1F1E9 U+1F1FF",
        svg: "https://www.countryflags.io/dz/flat/64.svg"
      },
      tld: [".dz", ".\u062C\u0632\u0627\u0626\u0631"]
    },
    iso: {
      alpha2: CountryCode.Algeria,
      alpha3: "DZA",
      numeric: "012"
    },
    name: {
      alt_spellings: ["DZ", "Dzayer", "Alg\xE9rie"],
      demonym: "Algerian",
      native: {
        endonym: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631"
      },
      official: "People's Democratic Republic of Algeria",
      short: "Algeria",
      translations: {
        [LocaleCode.Afrikaans]: "Algerije",
        [LocaleCode.Albanian]: "Algeria",
        [LocaleCode.Amharic]: "\u12A0\u120D\u1300\u122D\u1235",
        [LocaleCode.Arabic]: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631",
        [LocaleCode.Armenian]: "\u0531\u056C\u0563\u0578\u0580\u056B\u0561",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Basque]: "Algeria",
        [LocaleCode.Belarusian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Bengali]: "\u0986\u09B2\u099C\u09C7\u09B0",
        [LocaleCode.Berber]: "\u062C\u0632\u0627\u0626\u0631",
        [LocaleCode.Bhutani]: "\u0F62\u0FAB\u0F7C\u0F44\u0F0B\u0F41",
        [LocaleCode.Bosnian]: "Al\u017Eir",
        [LocaleCode.Breton]: "Algeria",
        [LocaleCode.Bulgarian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Burmese]: "\u1021\u102C\u101B\u1015\u103A",
        [LocaleCode.Catalan]: "Alg\xE8ria",
        [LocaleCode.Chinese]: "\u963F\u5C14\u53CA\u5229\u4E9A",
        [LocaleCode.Croatian]: "Al\u017Eir",
        [LocaleCode.Czech]: "Al\u017E\xEDrsko",
        [LocaleCode.Danish]: "Algeriet",
        [LocaleCode.Dutch]: "Algerije",
        [LocaleCode.English]: "Algeria",
        [LocaleCode.Esperanto]: "Al\u011Derio",
        [LocaleCode.Estonian]: "Al\u017Eira",
        [LocaleCode.Finnish]: "Algeria",
        [LocaleCode.French]: "Alg\xE9rie",
        [LocaleCode.Frisian]: "Algeri\xEB",
        [LocaleCode.Galician]: "Alxeria",
        [LocaleCode.Georgian]: "\u10D0\u10DA\u10D2\u10D8\u10E3\u10E0\u10D8",
        [LocaleCode.German]: "Algerien",
        [LocaleCode.Greenlandic]: "Algeria",
        [LocaleCode.Greek]: "\u0391\u03BB\u03B3\u03B5\u03C1\u03AF\u03B1",
        [LocaleCode.Gujarati]: "\u0A86\u0AB2\u0AC7\u0A97\u0AB0\u0ABF\u0AAF\u0ABE",
        [LocaleCode.Haitian]: "Alg\xE9rie",
        [LocaleCode.Hausa]: "Algeria",
        [LocaleCode.Hebrew]: "\u05D0\u05DC\u05D2\u05F3\u05D9\u05E8\u05D9\u05D4",
        [LocaleCode.Hindi]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Hungarian]: "Alg\xE1r",
        [LocaleCode.Icelandic]: "Alg\xFAra",
        [LocaleCode.Igbo]: "Algeria",
        [LocaleCode.Indonesian]: "Aljir",
        [LocaleCode.Irish]: "Alg\xE9rie",
        [LocaleCode.Italian]: "Algeria",
        [LocaleCode.Japanese]: "\u30A2\u30EB\u30B8\u30A7\u30EA\u30A2",
        [LocaleCode.Javanese]: "Aljir",
        [LocaleCode.Kannada]: "\u0C86\u0CB2\u0CCD\u0C97\u0CC7\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD",
        [LocaleCode.Kazakh]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u179B\u17CB\u1794\u17B6\u1793\u17B8",
        [LocaleCode.Korean]: "\uC54C\uC81C\uB9AC",
        [LocaleCode.Kurdish]: "\u062C\u0632\u0627\u06CC\u0631 \u0627\u0644\u062C\u0632\u0627\u06CC\u0631",
        [LocaleCode.Kyrgyz]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EA5\u0EB2\u0E88\u0EB5\u0E99",
        [LocaleCode.Latin]: "Algeria",
        [LocaleCode.Latvian]: "Al\u017E\u012Brija",
        [LocaleCode.Lithuanian]: "Al\u017Eyras",
        [LocaleCode.Luxembourgish]: "Algeria",
        [LocaleCode.Macedonian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Malagasy]: "Alg\xE9rie",
        [LocaleCode.Malay]: "Aljir",
        [LocaleCode.Malayalam]: "\u0D06\u0D32\u0D02\u0D17\u0D47\u0D30\u0D3F\u0D2F\u0D7B",
        [LocaleCode.Maltese]: "Alg\xE9rie",
        [LocaleCode.Maori]: "Algeria",
        [LocaleCode.Marathi]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Nepali]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Norwegian]: "Algeria",
        [LocaleCode.Pashto]: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631",
        [LocaleCode.Persian]: "\u062C\u0632\u0627\u06CC\u0631 \u0627\u0644\u0639\u0631\u0628",
        [LocaleCode.Polish]: "Algieria",
        [LocaleCode.Portuguese]: "Alg\xE9ria",
        [LocaleCode.Punjabi]: "\u0A06\u0A32\u0A47\u0A17\u0A40\u0A06",
        [LocaleCode.Romanian]: "Algeria",
        [LocaleCode.Russian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Samoan]: "Algeria",
        [LocaleCode.Sanskrit]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Scots]: "Algeria",
        [LocaleCode.Serbian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Sesotho]: "Algeria",
        [LocaleCode.Shona]: "Algeria",
        [LocaleCode.Sindhi]: "Algeria",
        [LocaleCode.Sinhala]: "\u0D86\u0DBD\u0DCA\u0DB6\u0DCF\u0DB1\u0DD2\u0DBA",
        [LocaleCode.Slovak]: "Al\u017E\xEDrsko",
        [LocaleCode.Slovenian]: "Al\u017Eir",
        [LocaleCode.Somali]: "Algeria",
        [LocaleCode.Spanish]: "Algeria",
        [LocaleCode.Sudanese]: "Aljir",
        [LocaleCode.Swahili]: "Aljir",
        [LocaleCode.Swedish]: "Algeriet",
        [LocaleCode.Tagalog]: "Algeria",
        [LocaleCode.Tajik]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Tamil]: "\u0B86\u0BB2\u0BCD\u0B95\u0BC7\u0BB0\u0BBF\u0BAF\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Telugu]: "\u0C06\u0C32\u0C4D\u0C17\u0C47\u0C30\u0C3F\u0C2F\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E32\u0E23\u0E32\u0E01\u0E2D\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F63\u0F9F\u0F72\u0F0B\u0F62\u0F72\u0F0B\u0F61\u0F72",
        [LocaleCode.Turkish]: "Cezayir",
        [LocaleCode.Ukrainian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Urdu]: "\u0622\u0644\u062C\u06CC\u0631",
        [LocaleCode.Uzbek]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Vietnamese]: "\u1EA2\u0301\u1EA1\u1EA3\u1EAD\u1EB5",
        [LocaleCode.Welsh]: "Algeria",
        [LocaleCode.Xhosa]: "Algeria",
        [LocaleCode.Yiddish]: "\u05D0\u05DC\u05D2\u05F3\u05D9\u05E8\u05D9\u05D4",
        [LocaleCode.Yoruba]: "Algeria",
        [LocaleCode.Zulu]: "Algeria"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Oran",
          total: 371e5
        }
      },
      geography: {
        area: 2381740,
        region: Region.Africa,
        sub_region: SubRegion.NorthernAfrica
      },
      government: {
        capital: "Algiers",
        type: "Republic"
      }
    }
  },
  AmericanSamoa: {
    i18n: {
      calling_codes: [1684],
      currencies: [CurrencyCode.AmericanSamoaTala],
      languages: [LocaleCode.English, LocaleCode.Samoan],
      tz: {
        offsets: [TimezoneOffset.UTC_MINUS_11],
        regions: [TimezoneRegions.PacificSamoa],
        timezones: [Timezones.SamoaStandardTime]
      }
    },
    id: CountryCode.AmericanSamoa,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F8}",
        emoji_unicode: "U+1F1E6 U+1F1F8",
        svg: "https://www.countryflags.io/as/flat/64.svg"
      },
      tld: [".as"]
    },
    iso: {
      alpha2: CountryCode.AmericanSamoa,
      alpha3: "ASM",
      numeric: "016"
    },
    name: {
      alt_spellings: ["AS", "Amerika S\u0101moa", "Amelika S\u0101moa", "S\u0101moa Amelika"],
      demonym: "American Samoan",
      native: {
        endonym: "American Samoa"
      },
      official: "American Samoa",
      short: "American Samoa",
      translations: {
        [LocaleCode.Afrikaans]: "Amerikaans Samoa",
        [LocaleCode.Albanian]: "Samoa Amerikane",
        [LocaleCode.Amharic]: "\u1233\u121E\u12A0\u122D",
        [LocaleCode.Arabic]: "\u0633\u0627\u0645\u0648\u0627 \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629",
        [LocaleCode.Armenian]: "\u054D\u0561\u0570\u0561\u0574\u0561\u056C\u056B\u0561",
        [LocaleCode.Azerbaijani]: "Samoa Amerikana",
        [LocaleCode.Bashkir]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Basque]: "Samoa Amerikana",
        [LocaleCode.Belarusian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430\u044F \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Bengali]: "\u0986\u09AE\u09C7\u09B0\u09BF\u0995\u09BE\u09A8 \u09B8\u09BE\u09AE\u09CB\u09AF\u09BC\u09BE",
        [LocaleCode.Berber]: "\u062C\u0632\u0631 \u0633\u0627\u0645\u0648\u0627 \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629",
        [LocaleCode.Bhutani]: "\u0F68\u0F62\u0F92\u0FB1\u0F0B\u0F58\u0F72\u0F0B\u0F51\u0F58\u0F44\u0F66\u0F0B\u0F66\u0FA4\u0FB2\u0F7C\u0F51\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F66\u0F90\u0F56\u0F66\u0F0B\u0F62\u0F92\u0FB1\u0F74\u0F51\u0F0B\u0F46\u0F7A\u0F53\u0F0B\u0F54\u0F7C\u0F0D",
        [LocaleCode.Bosnian]: "Ameri\u010Dka Samoa",
        [LocaleCode.Breton]: "Samoa Amerikan",
        [LocaleCode.Bulgarian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Burmese]: "\u1021\u1019\u1039\u1038\u1019\u101B\u102D\u102F\u1018\u102C\u101E\u102C",
        [LocaleCode.Catalan]: "Samoa Americana",
        [LocaleCode.Chinese]: "\u7F8E\u5C5E\u8428\u6469\u4E9A",
        [LocaleCode.Croatian]: "Ameri\u010Dka Samoa",
        [LocaleCode.Czech]: "Americk\xE1 Samoa",
        [LocaleCode.Danish]: "Amerikansk Samoa",
        [LocaleCode.Dutch]: "Amerikaans Samoa",
        [LocaleCode.English]: "American Samoa",
        [LocaleCode.Esperanto]: "Samoa Amerika",
        [LocaleCode.Estonian]: "Ameerika Samoa",
        [LocaleCode.Finnish]: "Amerikka Samoa",
        [LocaleCode.French]: "American Samoa",
        [LocaleCode.Frisian]: "Amerikaans Samoa",
        [LocaleCode.Galician]: "Samoa Americana",
        [LocaleCode.Georgian]: "\u10D0\u10DB\u10D4\u10E0\u10D8\u10D9\u10D8\u10E1 \u10E1\u10D0\u10DB\u10DD\u10D0",
        [LocaleCode.German]: "Amerikanisch-Samoa",
        [LocaleCode.Greenlandic]: "Amerikaans Samoa",
        [LocaleCode.Greek]: "\u0391\u03BC\u03B5\u03C1\u03B9\u03BA\u03B1\u03BD\u03B9\u03BA\u03AE \u03A3\u03B1\u03BC\u03CC\u03B1",
        [LocaleCode.Gujarati]: "\u0A86\u0AAE\u0AC7\u0AB0\u0ABF\u0A95\u0AA8 \u0AB8\u0ABE\u0AAE\u0ACB\u0AAF\u0ABE",
        [LocaleCode.Haitian]: "Amerikaans Samoa",
        [LocaleCode.Hausa]: "Amerikaans Samoa",
        [LocaleCode.Hebrew]: "\u05D0\u05DE\u05E8\u05D9\u05E7\u05E0\u05D9\u05D4 \u05E1\u05DE\u05D5\u05D0\u05D4",
        [LocaleCode.Hindi]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Hungarian]: "Amerikai Szamoa",
        [LocaleCode.Icelandic]: "Amerikai Szamoa",
        [LocaleCode.Igbo]: "Ikina Amerika",
        [LocaleCode.Indonesian]: "Samoa Amerika",
        [LocaleCode.Irish]: "Samoa Amerikana",
        [LocaleCode.Italian]: "Samoa Americane",
        [LocaleCode.Japanese]: "\u30A2\u30E1\u30EA\u30AB\u9818\u30B5\u30E2\u30A2",
        [LocaleCode.Javanese]: "Samoa Amerika",
        [LocaleCode.Kannada]: "\u0C85\u0CAE\u0CC7\u0CB0\u0CBF\u0C95\u0CA8\u0CCD \u0CB8\u0CAE\u0CCB\u0C86",
        [LocaleCode.Kazakh]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u1798\u17C9\u17B6\u179A\u17B8\u179F\u17D2\u178F\u1784\u17CB",
        [LocaleCode.Korean]: "\uC544\uBA54\uB9AC\uCE74 \uC0AC\uBAA8\uC544",
        [LocaleCode.Kurdish]: "Amerikaans Samoa",
        [LocaleCode.Kyrgyz]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EA1\u0EB2\u0E99\u0EB2\u0E94\u0EB2\u0EA1\u0EB2\u0E99\u0EB2\u0E94",
        [LocaleCode.Latin]: "Samoa Amerikana",
        [LocaleCode.Latvian]: "Amerikas Samoa",
        [LocaleCode.Lithuanian]: "Amerikos Samoa",
        [LocaleCode.Luxembourgish]: "Amerikaans Samoa",
        [LocaleCode.Macedonian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Malagasy]: "Samoa Amerika",
        [LocaleCode.Malay]: "Amerika Samo",
        [LocaleCode.Malayalam]: "\u0D05\u0D2E\u0D47\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D28\u0D4D\u0D31\u0D4D \u0D38\u0D2E\u0D4B\u0D06",
        [LocaleCode.Maltese]: "Samoa Amerika",
        [LocaleCode.Maori]: "Samoa Amerika",
        [LocaleCode.Marathi]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Mongolian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Nepali]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Norwegian]: "Amerikansk Samoa",
        [LocaleCode.Pashto]: "\u0627\u0645\u0631\u06CC\u06A9\u0627\u06CC \u0633\u0645\u0648\u0627",
        [LocaleCode.Persian]: "\u0622\u0645\u0631\u06CC\u06A9\u0627\u06CC \u0633\u0645\u0648\u0627",
        [LocaleCode.Polish]: "Samoa Ameryka\u0144skie",
        [LocaleCode.Portuguese]: "Samoa Americana",
        [LocaleCode.Punjabi]: "\u0A05\u0A2E\u0A30\u0A40\u0A15\u0A40 \u0A38\u0A3E\u0A2E\u0A4B\u0A06",
        [LocaleCode.Romanian]: "Samoa americane",
        [LocaleCode.Russian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430\u044F \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Samoan]: "Samoa Amerika",
        [LocaleCode.Sanskrit]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Scots]: "Amerikaans Samoa",
        [LocaleCode.Serbian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Sesotho]: "Amerikaans Samoa",
        [LocaleCode.Shona]: "Amerikaans Samoa",
        [LocaleCode.Sindhi]: "Amerikaans Samoa",
        [LocaleCode.Sinhala]: "\u0D86\u0DBB\u0DCA\u0DA2\u0DD2\u0DB1\u0DCF\u0DB1\u0DD4 \u0DC3\u0DD0\u0DB8\u0DD0\u0DBD\u0DCA\u0DC0",
        [LocaleCode.Slovak]: "Amerikaans Samoa",
        [LocaleCode.Slovenian]: "Amerikaans Samoa",
        [LocaleCode.Somali]: "Amerikaans Samoa",
        [LocaleCode.Spanish]: "Samoa Americana",
        [LocaleCode.Sudanese]: "Amerikaans Samoa",
        [LocaleCode.Swahili]: "Amerikaans Samoa",
        [LocaleCode.Swedish]: "Amerikansk Samoa",
        [LocaleCode.Tagalog]: "Amerikaans Samoa",
        [LocaleCode.Tajik]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0BAE\u0BC6\u0BB0\u0BBF\u0B95\u0BCD \u0B9A\u0BAE\u0BCB\u0BB5\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C2E\u0C46\u0C30\u0C3F\u0C15\u0C4D \u0C38\u0C2E\u0C4B\u0C35\u0C3E",
        [LocaleCode.Thai]: "\u0E2A\u0E2B\u0E23\u0E32\u0E0A\u0E2D\u0E32\u0E13\u0E32\u0E08\u0E31\u0E01\u0E23\u0E41\u0E2D\u0E1F\u0E23\u0E34\u0E01\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F7A\u0F0B\u0F62\u0F72\u0F0B\u0F40\u0F0B\u0F68\u0F7A\u0F0B\u0F58\u0F72\u0F0B\u0F51\u0F74\u0F0B\u0F61\u0F72\u0F0B\u0F62\u0F72\u0F0B\u0F40",
        [LocaleCode.Turkish]: "Amerikan Samoas\u0131",
        [LocaleCode.Ukrainian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u044C\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Urdu]: "\u0627\u0645\u0631\u06CC\u06A9\u06CC \u0633\u0645\u0648\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430",
        [LocaleCode.Vietnamese]: "Amerikaans Samoa",
        [LocaleCode.Welsh]: "Amerikaans Samoa",
        [LocaleCode.Xhosa]: "Amerikaans Samoa",
        [LocaleCode.Yiddish]: "Amerikaans Samoa",
        [LocaleCode.Yoruba]: "Amerikaans Samoa",
        [LocaleCode.Zulu]: "Amerikaans Samoa"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Pago Pago",
          total: 558e3
        }
      },
      geography: {
        area: 199,
        region: Region.Oceania,
        sub_region: SubRegion.Polynesia
      },
      government: {
        capital: "Pago Pago",
        type: "Nonmetropolitan Territory of the US"
      }
    }
  },
  Andorra: {
    i18n: {
      calling_codes: [376],
      currencies: [CurrencyCode.Euro],
      languages: [LocaleCode.Catalan, LocaleCode.Spanish],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1, TimezoneOffset.UTC_PLUS_2],
        regions: [TimezoneRegions.EuropeAndorra],
        timezones: [Timezones.CentralEuropeanTime]
      }
    },
    id: CountryCode.Andorra,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F4}",
        emoji_unicode: "U+1F1E6 U+1F1F4",
        svg: "https://www.countryflags.io/ad/flat/64.svg"
      },
      tld: [".ad"]
    },
    iso: {
      alpha2: CountryCode.Andorra,
      alpha3: "AND",
      numeric: "020"
    },
    name: {
      alt_spellings: ["AD", "Principality of Andorra", "Principat d'Andorra"],
      demonym: "Andorran",
      native: {
        endonym: "Andorra"
      },
      official: "Principality of Andorra",
      short: "Andorra",
      translations: {
        [LocaleCode.Afrikaans]: "Andorra",
        [LocaleCode.Albanian]: "Andorra",
        [LocaleCode.Amharic]: "\u12A0\u1295\u12F6\u122B",
        [LocaleCode.Arabic]: "\u0623\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0576\u0564\u0561\u0580\u0561\u057E\u0561\u0575\u0584",
        [LocaleCode.Azerbaijani]: "Andorra",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0434\u043E\u0440\u0430",
        [LocaleCode.Basque]: "Andorra",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Bengali]: "\u0985\u09A8\u09CD\u09A1\u09CB\u09B0\u09BE",
        [LocaleCode.Berber]: "\u0623\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Bhutani]: "\u0F68\u0F53\u0F0B\u0F4C\u0F7C\u0F0B",
        [LocaleCode.Bosnian]: "Andora",
        [LocaleCode.Breton]: "Andorra",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0434\u043E\u0440\u0430",
        [LocaleCode.Burmese]: "\u1021\u1014\u1039\u1010\u102C\u101B\u102D\u102F\u1038",
        [LocaleCode.Catalan]: "Andorra",
        [LocaleCode.Chinese]: "\u5B89\u9053\u5C14",
        [LocaleCode.Croatian]: "Andora",
        [LocaleCode.Czech]: "Andorra",
        [LocaleCode.Danish]: "Andorra",
        [LocaleCode.Dutch]: "Andorra",
        [LocaleCode.English]: "Andorra",
        [LocaleCode.Esperanto]: "Andora",
        [LocaleCode.Estonian]: "Andorra",
        [LocaleCode.Finnish]: "Andorra",
        [LocaleCode.French]: "Andorra",
        [LocaleCode.Frisian]: "Andorra",
        [LocaleCode.Galician]: "Andorra",
        [LocaleCode.Georgian]: "\u12A0\u1295\u12F6\u122B",
        [LocaleCode.German]: "Andorra",
        [LocaleCode.Greek]: "\u0391\u03BD\u03B4\u03CC\u03C1\u03B1",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D3\u05D5\u05E8\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Hungarian]: "Andorra",
        [LocaleCode.Icelandic]: "Andorra",
        [LocaleCode.Igbo]: "Andorra",
        [LocaleCode.Indonesian]: "Andorra",
        [LocaleCode.Irish]: "Andorra",
        [LocaleCode.Italian]: "Andorra",
        [LocaleCode.Japanese]: "\u30A2\u30F3\u30C9\u30E9",
        [LocaleCode.Javanese]: "Andorra",
        [LocaleCode.Kannada]: "\u0C85\u0C82\u0CA1\u0CCB\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u178A\u17B6\u179A\u17B6",
        [LocaleCode.Korean]: "\uC548\uB3C4\uB77C",
        [LocaleCode.Kurdish]: "Andorra",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB1\u0E99\u0EC2\u0E94\u0EA3\u0EB2",
        [LocaleCode.Latin]: "Andorra",
        [LocaleCode.Latvian]: "Andora",
        [LocaleCode.Lithuanian]: "Andora",
        [LocaleCode.Luxembourgish]: "Andorra",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Malagasy]: "Andorra",
        [LocaleCode.Malay]: "Andorra",
        [LocaleCode.Malayalam]: "\u0D05\u0D02\u0D21\u0D4B\u0D30\u0D3F\u0D2F\u0D28\u0D4D",
        [LocaleCode.Maltese]: "Andorra",
        [LocaleCode.Maori]: "Andorra",
        [LocaleCode.Marathi]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Nepali]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Norwegian]: "Andorra",
        [LocaleCode.Pashto]: "\u0622\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Polish]: "Andora",
        [LocaleCode.Portuguese]: "Andorra",
        [LocaleCode.Punjabi]: "\u0A05\u0A70\u0A21\u0A4B\u0A30\u0A3E",
        [LocaleCode.Romanian]: "Andorra",
        [LocaleCode.Russian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Samoan]: "Andorra",
        [LocaleCode.Sanskrit]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Scots]: "Andorra",
        [LocaleCode.Serbian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Sesotho]: "Andorra",
        [LocaleCode.Shona]: "Andorra",
        [LocaleCode.Sindhi]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Sinhala]: "\u0D86\u0DB1\u0DCA\u0DAF\u0DDA",
        [LocaleCode.Slovak]: "Andorra",
        [LocaleCode.Slovenian]: "Andora",
        [LocaleCode.Somali]: "Andorra",
        [LocaleCode.Spanish]: "Andorra",
        [LocaleCode.Sudanese]: "Andorra",
        [LocaleCode.Swahili]: "Andorra",
        [LocaleCode.Swedish]: "Andorra",
        [LocaleCode.Tagalog]: "Andorra",
        [LocaleCode.Tajik]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0BA9\u0BCB\u0BB0\u0BCD\u0B9F\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C02\u0C21\u0C4B\u0C30\u0C4D\u0C30\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E19\u0E14\u0E2D\u0E23\u0E4C\u0E23\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F53\u0F0B\u0F4C\u0F7C\u0F0B",
        [LocaleCode.Turkish]: "Andora",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Urdu]: "\u0622\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Vietnamese]: "Andorra",
        [LocaleCode.Welsh]: "Andorra",
        [LocaleCode.Xhosa]: "Andorra",
        [LocaleCode.Yiddish]: "\u05D0\u05E0\u05D3\u05D5\u05E8\u05D4",
        [LocaleCode.Yoruba]: "Andorra",
        [LocaleCode.Zulu]: "Andorra"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Andorra la Vella",
          total: 78e3
        }
      },
      geography: {
        area: 468,
        region: Region.Europe,
        sub_region: SubRegion.SouthernEurope
      },
      government: {
        capital: "Andorra la Vella",
        type: "Constitutional Monarchy"
      }
    }
  },
  Angola: {
    i18n: {
      calling_codes: [244],
      currencies: [CurrencyCode.AngolaKwanza],
      languages: [
        LocaleCode.Portuguese,
        LocaleCode.Spanish,
        LocaleCode.French,
        LocaleCode.Italian,
        LocaleCode.German,
        LocaleCode.English
      ],
      tz: {
        offsets: [
          TimezoneOffset.UTC_0,
          TimezoneOffset.UTC_PLUS_1,
          TimezoneOffset.UTC_PLUS_2
        ],
        regions: [TimezoneRegions.AfricaLuanda],
        timezones: [Timezones.WestAfricaTime]
      }
    },
    id: CountryCode.Angola,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1EC}",
        emoji_unicode: "U+1F1E6 U+1F1EC",
        svg: "https://www.countryflags.io/ao/flat/64.svg"
      },
      tld: [".ao"]
    },
    iso: {
      alpha2: CountryCode.Angola,
      alpha3: "AGO",
      numeric: "024"
    },
    name: {
      alt_spellings: ["AO", "Rep\xFAblica de Angola", "\u0281\u025Bpublika de an"],
      demonym: "Angolan",
      native: {
        endonym: "Angola"
      },
      official: "Republic of Angola",
      short: "Angola",
      translations: {
        [LocaleCode.Afrikaans]: "Angola",
        [LocaleCode.Albanian]: "Ang\xF2la",
        [LocaleCode.Amharic]: "\u12A0\u1295\u130E\u120A\u12EB",
        [LocaleCode.Arabic]: "\u0623\u0646\u063A\u0648\u0644\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0576\u0563\u0561\u056C\u0561\u056F\u0561",
        [LocaleCode.Azerbaijani]: "Ang\u0259l",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Basque]: "Angola",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Bengali]: "\u0985\u0999\u09CD\u0997\u09B2\u09BE",
        [LocaleCode.Berber]: "Angola",
        [LocaleCode.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42",
        [LocaleCode.Bosnian]: "Angola",
        [LocaleCode.Breton]: "Angola",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Burmese]: "\u1021\u1004\u103A\u1039\u1002\u101C\u102D\u1010\u103A",
        [LocaleCode.Catalan]: "Angola",
        [LocaleCode.Chinese]: "\u5B89\u54E5\u62C9",
        [LocaleCode.Croatian]: "Angola",
        [LocaleCode.Czech]: "Angola",
        [LocaleCode.Danish]: "Angola",
        [LocaleCode.Dutch]: "Angola",
        [LocaleCode.English]: "Angola",
        [LocaleCode.Esperanto]: "Angolo",
        [LocaleCode.Estonian]: "Angola",
        [LocaleCode.Finnish]: "Angola",
        [LocaleCode.French]: "Angola",
        [LocaleCode.Frisian]: "Angola",
        [LocaleCode.Galician]: "Angola",
        [LocaleCode.Georgian]: "\u10D0\u10DC\u10D2\u10DD\u10DA\u10D0",
        [LocaleCode.German]: "Angola",
        [LocaleCode.Greenlandic]: "Angola",
        [LocaleCode.Greek]: "\u0391\u03B3\u03BA\u03CC\u03BB\u03B1",
        [LocaleCode.Gujarati]: "\u0A85\u0A82\u0A97\u0ACB\u0AB2\u0ABE",
        [LocaleCode.Haitian]: "Angola",
        [LocaleCode.Hausa]: "Angola",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D2\u05D5\u05DC\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Hungarian]: "Angola",
        [LocaleCode.Icelandic]: "Angola",
        [LocaleCode.Igbo]: "Angola",
        [LocaleCode.Indonesian]: "Angola",
        [LocaleCode.Irish]: "Angola",
        [LocaleCode.Italian]: "Angola",
        [LocaleCode.Japanese]: "\u30A2\u30F3\u30B4\u30E9",
        [LocaleCode.Javanese]: "Anggol",
        [LocaleCode.Kannada]: "\u0C85\u0C82\u0C97\u0CCB\u0CB2\u0CBE",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u1780\u17B6\u179B\u17A2\u1784\u17CB\u1782\u17D2\u179B\u17C1\u179F",
        [LocaleCode.Korean]: "\uC559\uACE8\uB77C",
        [LocaleCode.Kurdish]: "Angola",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB0\u0E99\u0EB2\u0E94\u0EB2",
        [LocaleCode.Latin]: "Angola",
        [LocaleCode.Latvian]: "Angola",
        [LocaleCode.Lithuanian]: "Angola",
        [LocaleCode.Luxembourgish]: "Angola",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Malagasy]: "Angola",
        [LocaleCode.Malay]: "Angola",
        [LocaleCode.Malayalam]: "\u0D05\u0D02\u0D17\u0D4B\u0D33\u0D3E",
        [LocaleCode.Maltese]: "Angola",
        [LocaleCode.Maori]: "Angola",
        [LocaleCode.Marathi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Nepali]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Norwegian]: "Angola",
        [LocaleCode.Pashto]: "\u0627\u0646\u06AB\u0648\u0644\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Polish]: "Angola",
        [LocaleCode.Portuguese]: "Angola",
        [LocaleCode.Punjabi]: "\u0A05\u0A19\u0A4D\u0A17\u0A4B\u0A32\u0A3E",
        [LocaleCode.Romanian]: "Angole",
        [LocaleCode.Russian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Samoan]: "Angola",
        [LocaleCode.Sanskrit]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Scots]: "Angola",
        [LocaleCode.Serbian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Sesotho]: "Angola",
        [LocaleCode.Shona]: "Angola",
        [LocaleCode.Sindhi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Sinhala]: "\u0D86\u0D9C\u0DBD\u0DD2\u0DBA\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Angola",
        [LocaleCode.Slovenian]: "Angola",
        [LocaleCode.Somali]: "Angola",
        [LocaleCode.Spanish]: "Angola",
        [LocaleCode.Sudanese]: "Angola",
        [LocaleCode.Swahili]: "Angola",
        [LocaleCode.Swedish]: "Angola",
        [LocaleCode.Tagalog]: "Angola",
        [LocaleCode.Tajik]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0B99\u0BCD\u0B95\u0BCB\u0BB2\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C02\u0C17\u0C4B\u0C32\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E32\u0E23\u0E2D\u0E32\u0E19\u0E32\u0E21\u0E34\u0E2A\u0E16\u0E32\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F44\u0F0B\u0F63\u0F7C\u0F0B",
        [LocaleCode.Turkish]: "Angola",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Urdu]: "\u0627\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Uzbek]: "Angola",
        [LocaleCode.Vietnamese]: "Angola",
        [LocaleCode.Xhosa]: "Angola",
        [LocaleCode.Welsh]: "Angola",
        [LocaleCode.Yiddish]: "\u05D0\u05E0\u05D2\u05D5\u05DC\u05D4",
        [LocaleCode.Yoruba]: "Angola",
        [LocaleCode.Zulu]: "Angola"
      }
    }
  },
  Anguilla: {
    i18n: {
      calling_codes: [1264],
      currencies: [
        CurrencyCode.DominicaDollar,
        CurrencyCode.EastCaribbeanDollar,
        CurrencyCode.Euro,
        CurrencyCode.UnitedStatesDollar,
        CurrencyCode.BritishPound
      ],
      languages: [LocaleCode.English, LocaleCode.Spanish],
      tz: {
        offsets: [TimezoneOffset.UTC_MINUS_4],
        regions: [TimezoneRegions.AmericaAnguilla],
        timezones: [Timezones.AtlanticStandardTime]
      }
    },
    id: CountryCode.Anguilla,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1EC}",
        emoji_unicode: "U+1F1E6 U+1F1EC",
        svg: "https://www.countryflags.io/ai/flat/64.svg"
      },
      tld: [".ai"]
    },
    iso: {
      alpha2: CountryCode.Anguilla,
      alpha3: "AIA",
      numeric: "660"
    },
    name: {
      alt_spellings: ["AI"],
      demonym: "Anguillian",
      native: {
        endonym: "Anguilla"
      },
      official: "Anguilla",
      short: "Anguilla",
      translations: {
        [LocaleCode.Afrikaans]: "Anguilla",
        [LocaleCode.Albanian]: "Anguilla",
        [LocaleCode.Amharic]: "\u12A0\u1295\u1309\u120B",
        [LocaleCode.Arabic]: "\u0623\u0646\u063A\u0648\u064A\u0644\u0627",
        [LocaleCode.Armenian]: "\u0531\u0576\u0563\u056B\u056C\u0561",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Basque]: "Angila",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Bengali]: "\u0985\u0999\u09CD\u0997\u09C0\u09B2\u09BE",
        [LocaleCode.Berber]: "\u0623\u0646\u063A\u0648\u064A\u0644\u0627",
        [LocaleCode.Bhutani]: "\u0F68\u0F44\u0F0B\u0F63\u0F7C\u0F0B",
        [LocaleCode.Bosnian]: "Angila",
        [LocaleCode.Breton]: "Angila",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Burmese]: "\u1021\u1004\u103A\u1039\u1002\u101C\u102D\u1010\u103A",
        [LocaleCode.Catalan]: "Angilla",
        [LocaleCode.Chinese]: "\u5B89\u572D\u62C9",
        [LocaleCode.Croatian]: "Angila",
        [LocaleCode.Czech]: "Anguilla",
        [LocaleCode.Danish]: "Anguilla",
        [LocaleCode.Dutch]: "Anguilla",
        [LocaleCode.English]: "Anguilla",
        [LocaleCode.Esperanto]: "Angila",
        [LocaleCode.Estonian]: "Anguilla",
        [LocaleCode.Finnish]: "Anguilla",
        [LocaleCode.French]: "Anguilla",
        [LocaleCode.Frisian]: "Angila",
        [LocaleCode.Galician]: "Anguilla",
        [LocaleCode.Georgian]: "\u10D0\u10DC\u10D2\u10D8\u10DA\u10D0",
        [LocaleCode.German]: "Anguilla",
        [LocaleCode.Greenlandic]: "Anguilla",
        [LocaleCode.Greek]: "\u0391\u03BD\u03B3\u03BA\u03C5\u03BB\u03AC",
        [LocaleCode.Gujarati]: "\u0A85\u0A82\u0A97\u0ACD\u0AAF\u0ABE\u0AB2\u0ABE",
        [LocaleCode.Haitian]: "Anguilla",
        [LocaleCode.Hausa]: "Anguilla",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D2\u05D5\u05D9\u05D0\u05DC\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Hungarian]: "Anguilla",
        [LocaleCode.Icelandic]: "Anguilla",
        [LocaleCode.Igbo]: "Anguilla",
        [LocaleCode.Indonesian]: "Anguilla",
        [LocaleCode.Irish]: "Anguilla",
        [LocaleCode.Italian]: "Anguilla",
        [LocaleCode.Japanese]: "\u30A2\u30F3\u30AE\u30E9",
        [LocaleCode.Javanese]: "Anguilla",
        [LocaleCode.Kannada]: "\u0C85\u0C82\u0C97\u0CCD\u0CB5\u0CC7\u0CB2\u0CBE",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u1780\u17B6\u179A\u17A0\u17D2\u1782\u17B8\u1798",
        [LocaleCode.Korean]: "\uC575\uADC8\uB77C",
        [LocaleCode.Kurdish]: "Anguilla",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Lao]: "\u0EAD\u0EB0\u0E99\u0EB0\u0E88\u0EB3",
        [LocaleCode.Latin]: "Anguilla",
        [LocaleCode.Latvian]: "Anguilla",
        [LocaleCode.Lithuanian]: "Anguilla",
        [LocaleCode.Luxembourgish]: "Angilla",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Malagasy]: "Angila",
        [LocaleCode.Malay]: "Anguilla",
        [LocaleCode.Malayalam]: "\u0D05\u0D02\u0D17\u0D4D\u0D35\u0D47\u0D32\u0D3E",
        [LocaleCode.Maltese]: "Anguilla",
        [LocaleCode.Maori]: "Anguilla",
        [LocaleCode.Marathi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Nepali]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Norwegian]: "Anguilla",
        [LocaleCode.Pashto]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Polish]: "Anguilla",
        [LocaleCode.Portuguese]: "Anguilla",
        [LocaleCode.Punjabi]: "\u0A05\u0A02\u0A17\u0A40\u0A32\u0A3E",
        [LocaleCode.Romanian]: "Anguilla",
        [LocaleCode.Russian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Samoan]: "Anguilla",
        [LocaleCode.Sanskrit]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Scots]: "Anguilla",
        [LocaleCode.Serbian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Sesotho]: "Anguilla",
        [LocaleCode.Shona]: "Anguilla",
        [LocaleCode.Sindhi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Sinhala]: "\u0D86\u0D82\u0D9C\u0DD2\u0DBD\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Anguilla",
        [LocaleCode.Slovenian]: "Anguilla",
        [LocaleCode.Somali]: "Anguilla",
        [LocaleCode.Spanish]: "Anguilla",
        [LocaleCode.Sudanese]: "Anguilla",
        [LocaleCode.Swahili]: "Anguilla",
        [LocaleCode.Swedish]: "Anguilla",
        [LocaleCode.Tagalog]: "Anguilla",
        [LocaleCode.Tajik]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Tamil]: "\u0B85\u0B99\u0BCD\u0B95\u0BC8\u0BB2\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Telugu]: "\u0C05\u0C02\u0C17\u0C4D\u0C35\u0C47\u0C32\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E07\u0E01\u0E32\u0E25\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F44\u0F0B\u0F63\u0F72\u0F0B",
        [LocaleCode.Turkish]: "Anguilla",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Urdu]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Vietnamese]: "Anguilla",
        [LocaleCode.Welsh]: "Anguilla",
        [LocaleCode.Xhosa]: "Anguilla",
        [LocaleCode.Yiddish]: "Anguilla",
        [LocaleCode.Yoruba]: "Anguilla",
        [LocaleCode.Zulu]: "Anguilla"
      }
    }
  },
  Antarctica: {
    i18n: {
      calling_codes: [672],
      currencies: [CurrencyCode.UnitedStatesDollar, CurrencyCode.Euro],
      languages: [
        LocaleCode.English,
        LocaleCode.Spanish,
        LocaleCode.French,
        LocaleCode.Portuguese,
        LocaleCode.Italian,
        LocaleCode.Dutch,
        LocaleCode.German,
        LocaleCode.Swedish,
        LocaleCode.Norwegian,
        LocaleCode.Danish,
        LocaleCode.Finnish
      ],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1, TimezoneOffset.UTC_PLUS_2],
        regions: [
          TimezoneRegions.AntarcticaCasey,
          TimezoneRegions.AntarcticaDavis,
          TimezoneRegions.AntarcticaMcMurdo,
          TimezoneRegions.AntarcticaPalmer,
          TimezoneRegions.AntarcticaRothera
        ],
        timezones: [
          Timezones.AtlanticStandardTime,
          Timezones.CentralTime,
          Timezones.EasternTime,
          Timezones.AtlanticStandardTime,
          Timezones.AzoresStandardTime,
          Timezones.NewfoundlandStandardTime
        ]
      }
    },
    id: CountryCode.Antarctica,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F6}",
        emoji_unicode: "U+1F1E6 U+1F1F6",
        svg: "https://www.countryflags.io/aq/flat/64.svg"
      },
      tld: [".aq"]
    },
    iso: {
      alpha2: CountryCode.Antarctica,
      alpha3: "ATA",
      numeric: "010"
    },
    name: {
      alt_spellings: ["AQ"],
      demonym: "Antarctican",
      native: {
        endonym: "Antarctica"
      },
      official: "Antarctica",
      short: "Antarctica",
      translations: {
        [LocaleCode.Afrikaans]: "Antarctica",
        [LocaleCode.Albanian]: "Antarktika",
        [LocaleCode.Amharic]: "\u12A0\u1295\u1272\u120D\u12AB\u1293",
        [LocaleCode.Arabic]: "\u0623\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0576\u0561\u0580\u0561\u057F\u056F\u0578",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Basque]: "Antarktika",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Bengali]: "\u0985\u09A8\u09CD\u09A4\u09B0\u09BE\u09B6\u09CD\u09AC\u09C0",
        [LocaleCode.Berber]: "\u0623\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627",
        [LocaleCode.Bhutani]: "\u0F68\u0F44\u0F0B\u0F63\u0F72\u0F0B",
        [LocaleCode.Bosnian]: "Antarktika",
        [LocaleCode.Breton]: "Antarktika",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Burmese]: "\u1021\u1014\u1039\u1010\u102C\u101B\u102E\u1038\u101A\u102C\u1038",
        [LocaleCode.Catalan]: "Ant\xE0rtida",
        [LocaleCode.Chinese]: "\u5357\u6781\u6D32",
        [LocaleCode.Croatian]: "Antarktika",
        [LocaleCode.Czech]: "Antarktida",
        [LocaleCode.Danish]: "Antarktis",
        [LocaleCode.Dutch]: "Antarctica",
        [LocaleCode.English]: "Antarctica",
        [LocaleCode.Esperanto]: "Antarktika",
        [LocaleCode.Estonian]: "Antarktika",
        [LocaleCode.Finnish]: "Antarktis",
        [LocaleCode.French]: "Antarctica",
        [LocaleCode.Frisian]: "Antarktis",
        [LocaleCode.Galician]: "Ant\xE1rtida",
        [LocaleCode.Georgian]: "\u10D0\u10DC\u10E2\u10D0\u10E0\u10E5\u10E2\u10D8\u10D9\u10D0",
        [LocaleCode.German]: "Antarktis",
        [LocaleCode.Greenlandic]: "Antarktis",
        [LocaleCode.Greek]: "\u0391\u03BD\u03C4\u03B1\u03C1\u03BA\u03C4\u03B9\u03BA\u03AE",
        [LocaleCode.Gujarati]: "\u0A85\u0AA8\u0ACD\u0AA4\u0AB0\u0ABE\u0AB6\u0ACD\u0AB5\u0AC0",
        [LocaleCode.Haitian]: "Antarctica",
        [LocaleCode.Hausa]: "Antarktika",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D8\u05E8\u05E7\u05D8\u05D9\u05E7\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0928\u094D\u0924\u0930\u0915\u094D\u0937\u0947\u0924\u094D\u0930",
        [LocaleCode.Hungarian]: "Antarktika",
        [LocaleCode.Icelandic]: "Antarktis",
        [LocaleCode.Igbo]: "Antarktika",
        [LocaleCode.Indonesian]: "Antarktika",
        [LocaleCode.Irish]: "Antarktika",
        [LocaleCode.Italian]: "Antartide",
        [LocaleCode.Japanese]: "\u5357\u6975",
        [LocaleCode.Javanese]: "Antarktika",
        [LocaleCode.Kannada]: "\u0C85\u0CA8\u0CCD\u0CA4\u0CB0\u0CBE\u0CB6\u0CCD\u0CB5\u0CBF",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u179F\u17D2\u1780\u179A\u17A2\u17B6\u1798\u17C9\u17BB\u1799",
        [LocaleCode.Korean]: "\uC564\uD2F0\uCE74\uD1A0\uB2C9",
        [LocaleCode.Kurdish]: "Antarktika",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB0\u0E99\u0EAD\u0EA5\u0EB2\u0E81\u0EB4\u0EAA\u0EB0",
        [LocaleCode.Latin]: "Antarctica",
        [LocaleCode.Latvian]: "Antarktika",
        [LocaleCode.Lithuanian]: "Antarktis",
        [LocaleCode.Luxembourgish]: "Antarktis",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Malagasy]: "Antarctica",
        [LocaleCode.Malay]: "Antarktika",
        [LocaleCode.Malayalam]: "\u0D05\u0D28\u0D4D\u0D24\u0D30\u0D3E\u0D36\u0D4D\u0D35\u0D3F",
        [LocaleCode.Maltese]: "Antarktika",
        [LocaleCode.Maori]: "Antarktika",
        [LocaleCode.Marathi]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Nepali]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E",
        [LocaleCode.Norwegian]: "Antarktis",
        [LocaleCode.Pashto]: "\u0627\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u062A\u0627\u0631\u06A9\u062A\u06CC\u06A9\u0627",
        [LocaleCode.Polish]: "Antarktyka",
        [LocaleCode.Portuguese]: "Ant\xE1rtida",
        [LocaleCode.Punjabi]: "\u0A05\u0A28\u0A4D\u0A24\u0A30\u0A3E\u0A36\u0A3F\u0A15\u0A3E",
        [LocaleCode.Romanian]: "Antarctica",
        [LocaleCode.Russian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Samoan]: "Antarktika",
        [LocaleCode.Sanskrit]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E",
        [LocaleCode.Scots]: "Antarktika",
        [LocaleCode.Serbian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Sesotho]: "Antarktika",
        [LocaleCode.Shona]: "Antarktika",
        [LocaleCode.Sindhi]: "Antarktika",
        [LocaleCode.Sinhala]: "\u0D86\u0DB1\u0DCA\u0DA7\u0DCA\u0DA7\u0DD2\u0D9A\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Antarktika",
        [LocaleCode.Slovenian]: "Antarktika",
        [LocaleCode.Somali]: "Antarktika",
        [LocaleCode.Spanish]: "Ant\xE1rtida",
        [LocaleCode.Sudanese]: "Antarktika",
        [LocaleCode.Swahili]: "Antarktika",
        [LocaleCode.Swedish]: "Antarktis",
        [LocaleCode.Tagalog]: "Antarktika",
        [LocaleCode.Tajik]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0BA9\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0B95\u0BCD",
        [LocaleCode.Tatar]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C28\u0C4D\u0C24\u0C30\u0C3E\u0C36\u0C4D\u0C35\u0C3F\u0C15\u0C3E",
        [LocaleCode.Thai]: "\u0E20\u0E39\u0E21\u0E34\u0E20\u0E32\u0E04\u0E2D\u0E32\u0E19\u0E31\u0E19\u0E15\u0E34\u0E01\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F7A\u0F53\u0F0B\u0F4A\u0F72\u0F4A\u0F7A\u0F53\u0F0B\u0F40\u0F72\u0F66\u0F72\u0F0B\u0F68\u0F7A\u0F53\u0F0B\u0F4A\u0F72\u0F4A\u0F7A\u0F53\u0F0B\u0F40\u0F72\u0F66\u0F72",
        [LocaleCode.Turkish]: "Antarktika",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Urdu]: "\u0627\u0646\u062A\u0627\u0631\u06A9\u062A\u06CC\u06A9\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Vietnamese]: "\u0110\u1EA5t Antarktik",
        [LocaleCode.Welsh]: "Antarktika",
        [LocaleCode.Xhosa]: "Antarktika",
        [LocaleCode.Yiddish]: "Antarktika",
        [LocaleCode.Yoruba]: "Antarktika",
        [LocaleCode.Zulu]: "Antarktika"
      }
    }
  },
  Armenia: {
    i18n: {
      calling_codes: [374],
      currencies: [CurrencyCode.ArmeniaDram],
      languages: [LocaleCode.Armenian],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_4],
        regions: [TimezoneRegions.AsiaJakarta],
        timezones: [Timezones.ArmeniaTime]
      }
    },
    id: CountryCode.Armenia,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F2}",
        emoji_unicode: "U+1F1E6 U+1F1F2",
        svg: "https://www.countryflags.io/am/flat/64.svg"
      },
      tld: [".am"]
    },
    iso: {
      alpha2: CountryCode.Armenia,
      alpha3: "ARM",
      numeric: "051"
    },
    name: {
      alt_spellings: ["AM", "Hayastan", "Republic of Armenia", "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576"],
      demonym: "Armenian",
      native: {
        endonym: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576"
      },
      official: "Republic of Armenia",
      short: "Armenia",
      translations: {
        [LocaleCode.Afrikaans]: "Armeni\xEB",
        [LocaleCode.Albanian]: "Armenia",
        [LocaleCode.Amharic]: "\u12A0\u121B\u122D\u129B",
        [LocaleCode.Arabic]: "\u0623\u0631\u0645\u064A\u0646\u064A\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Basque]: "Arm\xE9nia",
        [LocaleCode.Belarusian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Bengali]: "\u0986\u09B0\u09CD\u09AE\u09C7\u09A8\u09BF",
        [LocaleCode.Berber]: "\u0623\u0631\u0645\u064A\u0646\u064A\u0627",
        [LocaleCode.Bhutani]: "\u0F62\u0F92\u0FB1\u0F0B\u0F53\u0F42",
        [LocaleCode.Bosnian]: "Armenija",
        [LocaleCode.Breton]: "Armeni\xEB",
        [LocaleCode.Bulgarian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Burmese]: "\u1021\u102C\u1019\u1010\u102D\u1010\u1039",
        [LocaleCode.Catalan]: "Arm\xE8nia",
        [LocaleCode.Chinese]: "\u4E9A\u7F8E\u5C3C\u4E9A",
        [LocaleCode.Croatian]: "Armenija",
        [LocaleCode.Czech]: "Arm\xE9nie",
        [LocaleCode.Danish]: "Armenien",
        [LocaleCode.Dutch]: "Armeni\xEB",
        [LocaleCode.English]: "Armenia",
        [LocaleCode.Esperanto]: "Armenia",
        [LocaleCode.Estonian]: "Armeenia",
        [LocaleCode.Finnish]: "Armenia",
        [LocaleCode.French]: "Armenia",
        [LocaleCode.Frisian]: "Armeenia",
        [LocaleCode.Galician]: "Arm\xE9nia",
        [LocaleCode.Georgian]: "\u10D0\u10E0\u10DB\u10DD\u10DC\u10D8",
        [LocaleCode.German]: "Armenien",
        [LocaleCode.Greenlandic]: "Armenia",
        [LocaleCode.Greek]: "\u0391\u03C1\u03BC\u03B5\u03BD\u03AF\u03B1",
        [LocaleCode.Gujarati]: "\u0A85\u0AB0\u0ACD\u0AAE\u0AC7\u0AA8\u0ABF",
        [LocaleCode.Haitian]: "Armenia",
        [LocaleCode.Hausa]: "Armenia",
        [LocaleCode.Hebrew]: "\u05D0\u05E8\u05DE\u05E0\u05D9\u05D4",
        [LocaleCode.Hindi]: "\u0905\u05E8\u05DE\u05E0\u093F\u092F\u093E",
        [LocaleCode.Hungarian]: "\xD6rm\xE9nyorsz\xE1g",
        [LocaleCode.Icelandic]: "Armenia",
        [LocaleCode.Igbo]: "Armenia",
        [LocaleCode.Indonesian]: "Armenia",
        [LocaleCode.Irish]: "Armenia",
        [LocaleCode.Italian]: "Armenia",
        [LocaleCode.Japanese]: "\u30A2\u30EB\u30E1\u30CB\u30A2",
        [LocaleCode.Javanese]: "Armenia",
        [LocaleCode.Kannada]: "\u0C85\u0CB0\u0CCD\u0CAE\u0CC7\u0CA8\u0CBF",
        [LocaleCode.Kazakh]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u1798\u17C9\u17C1\u179A\u17B8",
        [LocaleCode.Korean]: "\uC544\uB974\uBA54\uB2C8\uC544",
        [LocaleCode.Kurdish]: "Armenia",
        [LocaleCode.Kyrgyz]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EAB\u0EBC\u0E99\u0EB2",
        [LocaleCode.Latin]: "Armenia",
        [LocaleCode.Latvian]: "Armeenia",
        [LocaleCode.Lithuanian]: "Arm\u0117nija",
        [LocaleCode.Luxembourgish]: "Armenien",
        [LocaleCode.Macedonian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u0458\u0430",
        [LocaleCode.Malagasy]: "Armenia",
        [LocaleCode.Malay]: "Armenia",
        [LocaleCode.Malayalam]: "\u0D05\u0D30\u0D4D\u200D\u0D2E\u0D47\u0D28\u0D3F",
        [LocaleCode.Maltese]: "Armenia",
        [LocaleCode.Maori]: "Armenia",
        [LocaleCode.Marathi]: "\u0905\u0930\u094D\u092E\u0947\u0928\u093F",
        [LocaleCode.Mongolian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Nepali]: "\u0905\u0930\u094D\u092E\u0947\u0928\u093F",
        [LocaleCode.Norwegian]: "Armenia",
        [LocaleCode.Pashto]: "\u0622\u0631\u0645\u06CC\u0646\u06CC\u0627",
        [LocaleCode.Persian]: "\u0627\u0631\u0645\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Polish]: "Armenia",
        [LocaleCode.Portuguese]: "Armenia",
        [LocaleCode.Punjabi]: "\u0A05\u0A30\u0A2E\u0A40\u0A28\u0A40",
        [LocaleCode.Romanian]: "Armenia",
        [LocaleCode.Russian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Samoan]: "Armenia",
        [LocaleCode.Sanskrit]: "Armenia",
        [LocaleCode.Scots]: "Armenia",
        [LocaleCode.Serbian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u0458\u0430",
        [LocaleCode.Sesotho]: "Armenia",
        [LocaleCode.Shona]: "Armenia",
        [LocaleCode.Sindhi]: "Armenia",
        [LocaleCode.Sinhala]: "\u0D86\u0DBB\u0DCA\u0DB8\u0DD3\u0DB1\u0DD2",
        [LocaleCode.Slovak]: "Armenia",
        [LocaleCode.Slovenian]: "Armenija",
        [LocaleCode.Somali]: "Armenia",
        [LocaleCode.Spanish]: "Armenia",
        [LocaleCode.Sudanese]: "Armenia",
        [LocaleCode.Swahili]: "Armenia",
        [LocaleCode.Swedish]: "Armenien",
        [LocaleCode.Tagalog]: "Armenia",
        [LocaleCode.Tajik]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Tamil]: "\u0B85\u0BB0\u0BCD\u0BAE\u0BC7\u0BA9\u0BBF\u0BAF\u0BA9\u0BCD",
        [LocaleCode.Tatar]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Telugu]: "\u0C05\u0C30\u0C4D\u0C2E\u0C47\u0C28\u0C3F",
        [LocaleCode.Thai]: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E21\u0E19\u0E34\u0E2A\u0E16\u0E32\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F62\u0F0B\u0F58\u0F7A\u0F0B\u0F53\u0F72\u0F0B\u0F61\u0F74\u0F0D",
        [LocaleCode.Turkish]: "Ermenistan",
        [LocaleCode.Ukrainian]: "\u0410\u0440\u043C\u0435\u043D\u0456\u044F",
        [LocaleCode.Urdu]: "\u0627\u0631\u0645\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Uzbek]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Vietnamese]: "Armenia",
        [LocaleCode.Welsh]: "Armenia",
        [LocaleCode.Xhosa]: "Armenia",
        [LocaleCode.Yiddish]: "\u05D0\u05E8\u05DE\u05E0\u05D9\u05D4",
        [LocaleCode.Yoruba]: "Armenia",
        [LocaleCode.Zulu]: "Armenia"
      }
    }
  },
  SomeCountry: {
    i18n: {
      calling_codes: [],
      currencies: [],
      languages: [],
      tz: {
        offsets: [],
        regions: [],
        timezones: []
      }
    },
    id: CountryCode.AmericanSamoa,
    info: {
      flag: {
        emoji: "",
        emoji_unicode: "",
        svg: ""
      },
      tld: []
    },
    iso: {
      alpha2: CountryCode.AmericanSamoa,
      alpha3: "",
      numeric: ""
    },
    name: {
      alt_spellings: [],
      demonym: "",
      native: {
        endonym: ""
      },
      official: "",
      short: "",
      translations: {
        [LocaleCode.Afrikaans]: "",
        [LocaleCode.Albanian]: "",
        [LocaleCode.Amharic]: "",
        [LocaleCode.Arabic]: "",
        [LocaleCode.Armenian]: "",
        [LocaleCode.Azerbaijani]: "",
        [LocaleCode.Bashkir]: "",
        [LocaleCode.Basque]: "",
        [LocaleCode.Belarusian]: "",
        [LocaleCode.Bengali]: "",
        [LocaleCode.Berber]: "",
        [LocaleCode.Bhutani]: "",
        [LocaleCode.Bosnian]: "",
        [LocaleCode.Breton]: "",
        [LocaleCode.Bulgarian]: "",
        [LocaleCode.Burmese]: "",
        [LocaleCode.Catalan]: "",
        [LocaleCode.Chinese]: "",
        [LocaleCode.Croatian]: "",
        [LocaleCode.Czech]: "",
        [LocaleCode.Danish]: "",
        [LocaleCode.Dutch]: "",
        [LocaleCode.English]: "",
        [LocaleCode.Esperanto]: "",
        [LocaleCode.Estonian]: "",
        [LocaleCode.Finnish]: "",
        [LocaleCode.French]: "",
        [LocaleCode.Frisian]: "",
        [LocaleCode.Galician]: "",
        [LocaleCode.Georgian]: "",
        [LocaleCode.German]: "",
        [LocaleCode.Greenlandic]: "",
        [LocaleCode.Greek]: "",
        [LocaleCode.Gujarati]: "",
        [LocaleCode.Haitian]: "",
        [LocaleCode.Hausa]: "",
        [LocaleCode.Hebrew]: "",
        [LocaleCode.Hindi]: "",
        [LocaleCode.Hungarian]: "",
        [LocaleCode.Icelandic]: "",
        [LocaleCode.Igbo]: "",
        [LocaleCode.Indonesian]: "",
        [LocaleCode.Irish]: "",
        [LocaleCode.Italian]: "",
        [LocaleCode.Japanese]: "",
        [LocaleCode.Javanese]: "",
        [LocaleCode.Kannada]: "",
        [LocaleCode.Kazakh]: "",
        [LocaleCode.Khmer]: "",
        [LocaleCode.Korean]: "",
        [LocaleCode.Kurdish]: "",
        [LocaleCode.Kyrgyz]: "",
        [LocaleCode.Lao]: "",
        [LocaleCode.Latin]: "",
        [LocaleCode.Latvian]: "",
        [LocaleCode.Lithuanian]: "",
        [LocaleCode.Luxembourgish]: "",
        [LocaleCode.Macedonian]: "",
        [LocaleCode.Malagasy]: "",
        [LocaleCode.Malay]: "",
        [LocaleCode.Malayalam]: "",
        [LocaleCode.Maltese]: "",
        [LocaleCode.Maori]: "",
        [LocaleCode.Marathi]: "",
        [LocaleCode.Mongolian]: "",
        [LocaleCode.Nepali]: "",
        [LocaleCode.Norwegian]: "",
        [LocaleCode.Pashto]: "",
        [LocaleCode.Persian]: "",
        [LocaleCode.Polish]: "",
        [LocaleCode.Portuguese]: "",
        [LocaleCode.Punjabi]: "",
        [LocaleCode.Romanian]: "",
        [LocaleCode.Russian]: "",
        [LocaleCode.Samoan]: "",
        [LocaleCode.Sanskrit]: "",
        [LocaleCode.Scots]: "",
        [LocaleCode.Serbian]: "",
        [LocaleCode.Sesotho]: "",
        [LocaleCode.Shona]: "",
        [LocaleCode.Sindhi]: "",
        [LocaleCode.Sinhala]: "",
        [LocaleCode.Slovak]: "",
        [LocaleCode.Slovenian]: "",
        [LocaleCode.Somali]: "",
        [LocaleCode.Spanish]: "",
        [LocaleCode.Sudanese]: "",
        [LocaleCode.Swahili]: "",
        [LocaleCode.Swedish]: "",
        [LocaleCode.Tagalog]: "",
        [LocaleCode.Tajik]: "",
        [LocaleCode.Tamil]: "",
        [LocaleCode.Tatar]: "",
        [LocaleCode.Telugu]: "",
        [LocaleCode.Thai]: "",
        [LocaleCode.Tibetan]: "",
        [LocaleCode.Turkish]: "",
        [LocaleCode.Ukrainian]: "",
        [LocaleCode.Urdu]: "",
        [LocaleCode.Uzbek]: "",
        [LocaleCode.Vietnamese]: "",
        [LocaleCode.Welsh]: "",
        [LocaleCode.Xhosa]: "",
        [LocaleCode.Yiddish]: "",
        [LocaleCode.Yoruba]: "",
        [LocaleCode.Zulu]: ""
      }
    }
  }
});

({
  id: LocaleCode.Afrikaans,
  language: {
    code: LanguageCode.Afrikaans,
    name: "Afrikaans",
    native: "Afrikaans"
  },
  name: "Afrikaans",
  native_name: "Afrikaans",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.AfrikaansSouthAfrica,
  language: {
    code: LanguageCode.Afrikaans,
    name: "Afrikaans",
    native: "Afrikaans"
  },
  name: "Afrikaans (South Africa)",
  native_name: "Afrikaans (Suid-Afrika)",
  rtl: false
});
({
  id: LocaleCode.Albanian,
  language: {
    code: LanguageCode.Albanian,
    name: "Albanian",
    native: "Shqip"
  },
  name: "Albanian",
  native_name: "Shqip",
  rtl: false
});
({
  country: {
    code: CountryCode.Albania,
    name: "Albania",
    native: "Shqip\xEBria"
  },
  id: LocaleCode.AlbanianAlbania,
  language: {
    code: LanguageCode.Albanian,
    name: "Albanian",
    native: "Shqip"
  },
  name: "Albanian (Albania)",
  native_name: "Shqip (Shqip\xEBria)",
  rtl: false
});
({
  id: LocaleCode.Amharic,
  language: {
    code: LanguageCode.Amharic,
    name: "Amharic",
    native: "\u12A0\u121B\u122D\u129B"
  },
  name: "Amharic",
  native_name: "\u12A0\u121B\u122D\u129B",
  rtl: false
});
({
  country: {
    code: CountryCode.Ethiopia,
    name: "Ethiopia",
    native: "\u12A2\u1275\u12EE\u1335\u12EB"
  },
  id: LocaleCode.AmharicEthiopia,
  language: {
    code: LanguageCode.Amharic,
    name: "Amharic",
    native: "\u12A0\u121B\u122D\u129B"
  },
  name: "Amharic (Ethiopia)",
  native_name: "\u12A0\u121B\u122D\u129B (\u12A2\u1275\u12EE\u1335\u12EB)",
  rtl: false
});
({
  id: LocaleCode.Arabic,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  rtl: true
});
({
  country: {
    code: CountryCode.Algeria,
    name: "Algeria",
    native: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631"
  },
  id: LocaleCode.ArabicAlgeria,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Algeria)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u062C\u0632\u0627\u0626\u0631)",
  rtl: true
});
({
  country: {
    code: CountryCode.Bahrain,
    name: "Bahrain",
    native: "\u0627\u0644\u0628\u062D\u0631\u064A\u0646"
  },
  id: LocaleCode.ArabicBahrain,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Bahrain)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0628\u062D\u0631\u064A\u0646)",
  rtl: true
});
({
  country: {
    code: CountryCode.Egypt,
    name: "Egypt",
    native: "\u0645\u0635\u0631"
  },
  id: LocaleCode.ArabicEgypt,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Egypt)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0645\u0635\u0631)",
  rtl: true
});
({
  country: {
    code: CountryCode.Iraq,
    name: "Iraq",
    native: "\u0627\u0644\u0639\u0631\u0627\u0642"
  },
  id: LocaleCode.ArabicIraq,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Iraq)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0639\u0631\u0627\u0642)",
  rtl: true
});
({
  country: {
    code: CountryCode.Jordan,
    name: "Jordan",
    native: "\u0627\u0644\u0623\u0631\u062F\u0646"
  },
  id: LocaleCode.ArabicJordan,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Jordan)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0623\u0631\u062F\u0646)",
  rtl: true
});
({
  country: {
    code: CountryCode.Kuwait,
    name: "Kuwait",
    native: "\u0627\u0644\u0643\u0648\u064A\u062A"
  },
  id: LocaleCode.ArabicKuwait,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Kuwait)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0643\u0648\u064A\u062A)",
  rtl: true
});
({
  country: {
    code: CountryCode.Lebanon,
    name: "Lebanon",
    native: "\u0644\u0628\u0646\u0627\u0646"
  },
  id: LocaleCode.ArabicLebanon,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Lebanon)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0644\u0628\u0646\u0627\u0646)",
  rtl: true
});
({
  country: {
    code: CountryCode.Libya,
    name: "Libya",
    native: "\u0644\u064A\u0628\u064A\u0627"
  },
  id: LocaleCode.ArabicLibya,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Libya)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0644\u064A\u0628\u064A\u0627)",
  rtl: true
});
({
  country: {
    code: CountryCode.Morocco,
    name: "Morocco",
    native: "\u0627\u0644\u0645\u063A\u0631\u0628"
  },
  id: LocaleCode.ArabicMorocco,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Morocco)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0645\u063A\u0631\u0628)",
  rtl: true
});
({
  country: {
    code: CountryCode.Oman,
    name: "Oman",
    native: "\u0639\u0645\u0627\u0646"
  },
  id: LocaleCode.ArabicOman,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Oman)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0639\u0645\u0627\u0646)",
  rtl: true
});
({
  country: {
    code: CountryCode.Qatar,
    name: "Qatar",
    native: "\u0642\u0637\u0631"
  },
  id: LocaleCode.ArabicQatar,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Qatar)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0642\u0637\u0631)",
  rtl: true
});
({
  country: {
    code: CountryCode.SaudiArabia,
    name: "Saudi Arabia",
    native: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629"
  },
  id: LocaleCode.ArabicSaudiArabia,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Saudi Arabia)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629)",
  rtl: true
});
({
  country: {
    code: CountryCode.Tunisia,
    name: "Tunisia",
    native: "\u062A\u0648\u0646\u0633"
  },
  id: LocaleCode.ArabicTunisia,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Tunisia)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u062A\u0648\u0646\u0633)",
  rtl: true
});
({
  country: {
    code: CountryCode.UnitedArabEmirates,
    name: "United Arab Emirates",
    native: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629"
  },
  id: LocaleCode.ArabicUnitedArabEmirates,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (United Arab Emirates)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629)",
  rtl: true
});
({
  country: {
    code: CountryCode.Yemen,
    name: "Yemen",
    native: "\u0627\u0644\u064A\u0645\u0646"
  },
  id: LocaleCode.ArabicYemen,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Yemen)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u064A\u0645\u0646)",
  rtl: true
});
({
  id: LocaleCode.Armenian,
  language: {
    code: LanguageCode.Armenian,
    name: "Armenian",
    native: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576"
  },
  name: "Armenian",
  native_name: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576",
  rtl: false
});
({
  country: { code: CountryCode.Armenia, name: "Armenia", native: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576" },
  id: LocaleCode.ArmenianArmenia,
  language: {
    code: LanguageCode.Armenian,
    name: "Armenian",
    native: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576"
  },
  name: "Armenian (Armenia)",
  native_name: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576 (\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576)",
  rtl: false
});
({
  id: LocaleCode.Azerbaijani,
  language: {
    code: LanguageCode.Azerbaijani,
    name: "Azeribaijani",
    native: "Az\u0259rbaycan"
  },
  name: "Azeri",
  native_name: "Az\u0259rbaycan",
  rtl: false
});
({
  country: {
    code: CountryCode.Azerbaijan,
    name: "Azerbaijan",
    native: "Az\u0259rbaycan"
  },
  id: LocaleCode.AzerbaijaniAzerbaijan,
  language: {
    code: LanguageCode.Azerbaijani,
    name: "Azerbaijani",
    native: "Az\u0259rbaycan"
  },
  name: "Azeri (Azerbaijan)",
  native_name: "Az\u0259rbaycan (Az\u0259rbaycan)",
  rtl: false
});
({
  id: LocaleCode.Basque,
  language: {
    code: LanguageCode.Basque,
    name: "Basque",
    native: "Euskara"
  },
  name: "Basque",
  native_name: "Euskara",
  rtl: false
});
({
  country: {
    code: CountryCode.Spain,
    name: "Spain",
    native: "Espa\xF1a"
  },
  id: LocaleCode.BasqueSpain,
  language: {
    code: LanguageCode.Basque,
    name: "Basque",
    native: "Euskara"
  },
  name: "Basque (Spain)",
  native_name: "Euskara (Espa\xF1a)",
  rtl: false
});
({
  id: LocaleCode.Belarusian,
  language: {
    code: LanguageCode.Belarusian,
    name: "Belarusian",
    native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F"
  },
  name: "Belarusian",
  native_name: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F",
  rtl: false
});
({
  country: {
    code: CountryCode.Belarus,
    name: "Belarus",
    native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C"
  },
  id: LocaleCode.BelarusianBelarus,
  language: {
    code: LanguageCode.Belarusian,
    name: "Belarusian",
    native: "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F"
  },
  name: "Belarusian (Belarus)",
  native_name: "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F (\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C)",
  rtl: false
});
({
  id: LocaleCode.Bengali,
  language: {
    code: LanguageCode.Bengali,
    name: "Bengali",
    native: "\u09AC\u09BE\u0982\u09B2\u09BE"
  },
  name: "Bengali",
  native_name: "\u09AC\u09BE\u0982\u09B2\u09BE",
  rtl: false
});
({
  country: {
    code: CountryCode.Bangladesh,
    name: "Bangladesh",
    native: "\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6"
  },
  id: LocaleCode.BengaliBangladesh,
  language: {
    code: LanguageCode.Bengali,
    name: "Bengali",
    native: "\u09AC\u09BE\u0982\u09B2\u09BE"
  },
  name: "Bengali (Bangladesh)",
  native_name: "\u09AC\u09BE\u0982\u09B2\u09BE (\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6)",
  rtl: false
});
({
  id: LocaleCode.Bhutani,
  language: {
    code: LanguageCode.Bhutani,
    name: "Bhutani",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Bhutani",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42",
  rtl: false
});
({
  country: {
    code: CountryCode.Bhutan,
    name: "Bhutan",
    native: "\u0F60\u0F56\u0FB2\u0F74\u0F42"
  },
  id: LocaleCode.BhutaniBhutan,
  language: {
    code: LanguageCode.Bhutani,
    name: "Bhutani",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Bhutani (Bhutan)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F60\u0F56\u0FB2\u0F74\u0F42)",
  rtl: false
});
({
  id: LocaleCode.Bulgarian,
  language: {
    code: LanguageCode.Bulgarian,
    name: "Bulgarian",
    native: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"
  },
  name: "Bulgarian",
  native_name: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438",
  rtl: false
});
({
  country: {
    code: CountryCode.Bulgaria,
    name: "Bulgaria",
    native: "\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F"
  },
  id: LocaleCode.BulgarianBulgaria,
  language: {
    code: LanguageCode.Bulgarian,
    name: "Bulgarian",
    native: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"
  },
  name: "Bulgarian (Bulgaria)",
  native_name: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 (\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F)",
  rtl: false
});
({
  id: LocaleCode.Burmese,
  language: {
    code: LanguageCode.Burmese,
    name: "Burmese",
    native: "\u1017\u1019\u102C\u1005\u102C"
  },
  name: "Burmese",
  native_name: "\u1017\u1019\u102C\u1005\u102C",
  rtl: false
});
({
  country: {
    code: CountryCode.Myanmar,
    name: "Myanmar",
    native: "\u1019\u103C\u1014\u103A\u1019\u102C"
  },
  id: LocaleCode.BurmeseMyanmar,
  language: {
    code: LanguageCode.Burmese,
    name: "Burmese",
    native: "\u1017\u1019\u102C\u1005\u102C"
  },
  name: "Burmese (Myanmar)",
  native_name: "\u1017\u1019\u102C\u1005\u102C (\u1019\u103C\u1014\u103A\u1019\u102C)",
  rtl: false
});
({
  id: LocaleCode.Cantonese,
  language: {
    code: LanguageCode.Cantonese,
    name: "Cantonese",
    native: "\u5EE3\u6771\u8A71"
  },
  name: "Cantonese",
  native_name: "\u5EE3\u6771\u8A71",
  rtl: false
});
({
  country: {
    code: CountryCode.HongKong,
    name: "Hong Kong",
    native: "\u9999\u6E2F"
  },
  id: LocaleCode.CantoneseHongKong,
  language: {
    code: LanguageCode.Cantonese,
    name: "Cantonese",
    native: "\u5EE3\u6771\u8A71"
  },
  name: "Cantonese (Hong Kong)",
  native_name: "\u5EE3\u6771\u8A71 (\u9999\u6E2F)",
  rtl: false
});
({
  id: LocaleCode.Catalan,
  language: {
    code: LanguageCode.Catalan,
    name: "Catalan",
    native: "Catal\xE0"
  },
  name: "Catalan",
  native_name: "Catal\xE0",
  rtl: false
});
({
  country: {
    code: CountryCode.Spain,
    name: "Spain",
    native: "Espa\xF1a"
  },
  id: LocaleCode.CatalanSpain,
  language: {
    code: LanguageCode.Catalan,
    name: "Catalan",
    native: "Catal\xE0"
  },
  name: "Catalan (Spain)",
  native_name: "Catal\xE0 (Espanya)",
  rtl: false
});
({
  id: LocaleCode.ChineseSimplified,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified)",
  native_name: "\u4E2D\u6587",
  rtl: false
});
({
  country: {
    code: CountryCode.China,
    name: "China",
    native: "\u4E2D\u56FD"
  },
  id: LocaleCode.ChineseSimplifiedChina,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/China)",
  native_name: "\u4E2D\u6587 (\u4E2D\u56FD)",
  rtl: false
});
({
  country: {
    code: CountryCode.HongKong,
    name: "Hong Kong",
    native: "\u9999\u6E2F"
  },
  id: LocaleCode.ChineseSimplifiedHongKong,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/Hong Kong)",
  native_name: "\u4E2D\u6587 (\u9999\u6E2F)",
  rtl: false
});
({
  country: {
    code: CountryCode.Macau,
    name: "Macau",
    native: "\u6FB3\u9580"
  },
  id: LocaleCode.ChineseSimplifiedMacau,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/Macau)",
  native_name: "\u4E2D\u6587 (\u6FB3\u9580)",
  rtl: false
});
({
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "\u65B0\u52A0\u5761"
  },
  id: LocaleCode.ChineseSimplifiedSingapore,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/Singapore)",
  native_name: "\u4E2D\u6587 (\u65B0\u52A0\u5761)",
  rtl: false
});
({
  id: LocaleCode.ChineseTraditional,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Traditional)",
  native_name: "\u4E2D\u6587",
  rtl: false
});
({
  country: {
    code: CountryCode.HongKong,
    name: "Hong Kong",
    native: "\u9999\u6E2F"
  },
  id: LocaleCode.ChineseTraditionalHongKong,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese (Traditional/Hong Kong)",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Hong Kong)",
  native_name: "\u4E2D\u6587 (\u9999\u6E2F)",
  rtl: false
});
({
  country: {
    code: CountryCode.Macau,
    name: "Macau",
    native: "\u6FB3\u9580"
  },
  id: LocaleCode.ChineseTraditionalMacau,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese (Traditional/Macau)",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Macau)",
  native_name: "\u4E2D\u6587 (\u6FB3\u9580)",
  rtl: false
});
({
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "\u65B0\u52A0\u5761"
  },
  id: LocaleCode.ChineseTraditionalSingapore,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese (Traditional/Singapore)",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Singapore)",
  native_name: "\u4E2D\u6587 (\u65B0\u52A0\u5761)",
  rtl: false
});
({
  id: LocaleCode.Croatian,
  language: {
    code: LanguageCode.Croatian,
    name: "Croatian",
    native: "Hrvatski"
  },
  name: "Croatian",
  native_name: "Hrvatski",
  rtl: false
});
({
  country: {
    code: CountryCode.BosniaAndHerzegovina,
    name: "Bosnia and Herzegovina",
    native: "Bosna i Hercegovina"
  },
  id: LocaleCode.CroatianBosniaAndHerzegovina,
  language: {
    code: LanguageCode.Croatian,
    name: "Croatian",
    native: "Hrvatski"
  },
  name: "Croatian (Bosnia and Herzegovina)",
  native_name: "Hrvatski (Bosna i Hercegovina)",
  rtl: false
});
({
  country: {
    code: CountryCode.Croatia,
    name: "Croatia",
    native: "Hrvatska"
  },
  id: LocaleCode.CroatianCroatia,
  language: {
    code: LanguageCode.Croatian,
    name: "Croatian",
    native: "Hrvatski"
  },
  name: "Croatian (Croatia)",
  native_name: "Hrvatski (Hrvatska)",
  rtl: false
});
({
  id: LocaleCode.Czech,
  language: {
    code: LanguageCode.Czech,
    name: "Czech",
    native: "\u010Ce\u0161tina"
  },
  name: "Czech",
  native_name: "\u010Ce\u0161tina",
  rtl: false
});
({
  country: {
    code: CountryCode.CzechRepublic,
    name: "Czech Republic",
    native: "\u010Cesk\xE1 republika"
  },
  id: LocaleCode.CzechCzechRepublic,
  language: {
    code: LanguageCode.Czech,
    name: "Czech",
    native: "\u010Ce\u0161tina"
  },
  name: "Czech (Czech Republic)",
  native_name: "\u010Ce\u0161tina (\u010Cesk\xE1 republika)",
  rtl: false
});
({
  id: LocaleCode.Danish,
  language: {
    code: LanguageCode.Danish,
    name: "Danish",
    native: "Dansk"
  },
  name: "Danish",
  native_name: "Dansk",
  rtl: false
});
({
  country: {
    code: CountryCode.Denmark,
    name: "Denmark",
    native: "Danmark"
  },
  id: LocaleCode.DanishDenmark,
  language: {
    code: LanguageCode.Danish,
    name: "Danish",
    native: "Dansk"
  },
  name: "Danish (Denmark)",
  native_name: "Dansk (Danmark)",
  rtl: false
});
({
  id: LocaleCode.Divehi,
  language: {
    code: LanguageCode.Divehi,
    name: "Divehi",
    native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0"
  },
  name: "Divehi",
  native_name: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0",
  rtl: true
});
({
  country: {
    code: CountryCode.Maldives,
    name: "Maldives",
    native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8 \u0783\u07A7\u0787\u07B0\u0796\u07AC"
  },
  id: LocaleCode.DivehiMaldives,
  language: {
    code: LanguageCode.Divehi,
    name: "Divehi",
    native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0"
  },
  name: "Divehi (Maldives)",
  native_name: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0 (\u078B\u07A8\u0788\u07AC\u0780\u07A8 \u0783\u07A7\u0787\u07B0\u0796\u07AC)",
  rtl: true
});
({
  id: LocaleCode.Dutch,
  language: {
    code: LanguageCode.Dutch,
    name: "Dutch",
    native: "Nederlands"
  },
  name: "Dutch",
  native_name: "Nederlands",
  rtl: false
});
({
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.DutchBelgium,
  language: {
    code: LanguageCode.Dutch,
    name: "Dutch",
    native: "Nederlands"
  },
  name: "Dutch (Belgium)",
  native_name: "Nederlands (Belgi\xEB)",
  rtl: false
});
({
  country: {
    code: CountryCode.Netherlands,
    name: "Netherlands",
    native: "Nederland"
  },
  id: LocaleCode.DutchNetherlands,
  language: {
    code: LanguageCode.Dutch,
    name: "Dutch",
    native: "Nederlands"
  },
  name: "Dutch (Netherlands)",
  native_name: "Nederlands (Nederland)",
  rtl: false
});
({
  id: LocaleCode.English,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English",
  native_name: "English",
  rtl: false
});
({
  country: {
    code: CountryCode.Australia,
    name: "Australia",
    native: "Australia"
  },
  id: LocaleCode.EnglishAustralia,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Australia)",
  native_name: "English (Australia)",
  rtl: false
});
({
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.EnglishBelgium,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Belgium)",
  native_name: "English (Belgi\xEB)",
  rtl: false
});
({
  country: {
    code: CountryCode.Canada,
    name: "Canada",
    native: "Canada"
  },
  id: LocaleCode.EnglishCanada,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Canada)",
  native_name: "English (Canada)",
  rtl: false
});
({
  country: {
    code: CountryCode.Ireland,
    name: "Ireland",
    native: "\xC9ire"
  },
  id: LocaleCode.EnglishIreland,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Ireland)",
  native_name: "English (\xC9ire)",
  rtl: false
});
({
  country: {
    code: CountryCode.Jamaica,
    name: "Jamaica",
    native: "Jamaica"
  },
  id: LocaleCode.EnglishJamaica,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Jamaica)",
  native_name: "English (Jamaica)",
  rtl: false
});
({
  country: {
    code: CountryCode.NewZealand,
    name: "New Zealand",
    native: "New Zealand"
  },
  id: LocaleCode.EnglishNewZealand,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (New Zealand)",
  native_name: "English (New Zealand)",
  rtl: false
});
({
  country: {
    code: CountryCode.Philippines,
    name: "Philippines",
    native: "Philippines"
  },
  id: LocaleCode.EnglishPhilippines,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Philippines)",
  native_name: "English (Philippines)",
  rtl: false
});
({
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "Singapore"
  },
  id: LocaleCode.EnglishSingapore,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Singapore)",
  native_name: "English (Singapore)",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.EnglishSouthAfrica,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (South Africa)",
  native_name: "English (South Africa)",
  rtl: false
});
({
  country: {
    code: CountryCode.TrinidadAndTobago,
    name: "Trinidad and Tobago",
    native: "Trinidad and Tobago"
  },
  id: LocaleCode.EnglishTrinidadAndTobago,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Trinidad and Tobago)",
  native_name: "English (Trinidad and Tobago)",
  rtl: false
});
({
  country: {
    code: CountryCode.UnitedKingdom,
    name: "United Kingdom",
    native: "United Kingdom"
  },
  id: LocaleCode.EnglishUnitedKingdom,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (United Kingdom)",
  native_name: "English (United Kingdom)",
  rtl: false
});
({
  country: {
    code: CountryCode.UnitedStates,
    name: "United States",
    native: "United States"
  },
  id: LocaleCode.EnglishUnitedStates,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (United States)",
  native_name: "English (United States)",
  rtl: false
});
({
  country: {
    code: CountryCode.Zimbabwe,
    name: "Zimbabwe",
    native: "Zimbabwe"
  },
  id: LocaleCode.EnglishZimbabwe,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Zimbabwe)",
  native_name: "English (Zimbabwe)",
  rtl: false
});
({
  id: LocaleCode.Esperanto,
  language: {
    code: LanguageCode.Esperanto,
    name: "Esperanto",
    native: "Esperanto"
  },
  name: "Esperanto",
  native_name: "Esperanto",
  rtl: false
});
({
  id: LocaleCode.Estonian,
  language: {
    code: LanguageCode.Estonian,
    name: "Estonian",
    native: "Eesti"
  },
  name: "Estonian",
  native_name: "Eesti",
  rtl: false
});
({
  country: {
    code: CountryCode.Estonia,
    name: "Estonia",
    native: "Eesti"
  },
  id: LocaleCode.EstonianEstonia,
  language: {
    code: LanguageCode.Estonian,
    name: "Estonian",
    native: "Eesti"
  },
  name: "Estonian (Estonia)",
  native_name: "Eesti (Eesti)",
  rtl: false
});
({
  id: LocaleCode.Faroese,
  language: {
    code: LanguageCode.Faroese,
    name: "Faroese",
    native: "F\xF8royskt"
  },
  name: "Faroese",
  native_name: "F\xF8royskt",
  rtl: false
});
({
  country: {
    code: CountryCode.FaroeIslands,
    name: "Faroe Islands",
    native: "F\xF8royar"
  },
  id: LocaleCode.FaroeseFaroeIslands,
  language: {
    code: LanguageCode.Faroese,
    name: "Faroese",
    native: "F\xF8royskt"
  },
  name: "Faroese (Faroe Islands)",
  native_name: "F\xF8royskt (F\xF8royar)",
  rtl: false
});
({
  id: LocaleCode.Farsi,
  language: {
    code: LanguageCode.Farsi,
    name: "Farsi",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Farsi",
  native_name: "\u0641\u0627\u0631\u0633\u06CC",
  rtl: true
});
({
  country: {
    code: CountryCode.Iran,
    name: "Iran",
    native: "\u0627\u06CC\u0631\u0627\u0646"
  },
  id: LocaleCode.FarsiIran,
  language: {
    code: LanguageCode.Farsi,
    name: "Farsi",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Farsi (Iran)",
  native_name: "\u0641\u0627\u0631\u0633\u06CC (\u0627\u06CC\u0631\u0627\u0646)",
  rtl: true
});
({
  id: LocaleCode.Filipino,
  language: {
    code: LanguageCode.Filipino,
    name: "Filipino",
    native: "Filipino"
  },
  name: "Filipino",
  native_name: "Filipino",
  rtl: false
});
({
  country: {
    code: CountryCode.Philippines,
    name: "Philippines",
    native: "Pilipinas"
  },
  id: LocaleCode.FilipinoPhilippines,
  language: {
    code: LanguageCode.Filipino,
    name: "Filipino",
    native: "Filipino"
  },
  name: "Filipino (Philippines)",
  native_name: "Filipino (Pilipinas)",
  rtl: false
});
({
  id: LocaleCode.Finnish,
  language: {
    code: LanguageCode.Finnish,
    name: "Finnish",
    native: "Suomi"
  },
  name: "Finnish",
  native_name: "Suomi",
  rtl: false
});
({
  country: {
    code: CountryCode.Finland,
    name: "Finland",
    native: "Suomi"
  },
  id: LocaleCode.FinnishFinland,
  language: {
    code: LanguageCode.Finnish,
    name: "Finnish",
    native: "Suomi"
  },
  name: "Finnish (Finland)",
  native_name: "Suomi (Suomi)",
  rtl: false
});
({
  id: LocaleCode.French,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French",
  native_name: "Fran\xE7ais",
  rtl: false
});
({
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgique"
  },
  id: LocaleCode.FrenchBelgium,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Belgium)",
  native_name: "Fran\xE7ais (Belgique)",
  rtl: false
});
({
  country: {
    code: CountryCode.Canada,
    name: "Canada",
    native: "Canada"
  },
  id: LocaleCode.FrenchCanada,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Canada)",
  native_name: "Fran\xE7ais (Canada)",
  rtl: false
});
({
  country: {
    code: CountryCode.France,
    name: "France",
    native: "France"
  },
  id: LocaleCode.FrenchFrance,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (France)",
  native_name: "Fran\xE7ais (France)",
  rtl: false
});
({
  country: {
    code: CountryCode.Luxembourg,
    name: "Luxembourg",
    native: "Luxembourg"
  },
  id: LocaleCode.FrenchLuxembourg,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Luxembourg)",
  native_name: "Fran\xE7ais (Luxembourg)",
  rtl: false
});
({
  country: {
    code: CountryCode.Monaco,
    name: "Monaco",
    native: "Monaco"
  },
  id: LocaleCode.FrenchMonaco,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Monaco)",
  native_name: "Fran\xE7ais (Monaco)",
  rtl: false
});
({
  country: {
    code: CountryCode.Reunion,
    name: "Reunion",
    native: "La R\xE9union"
  },
  id: LocaleCode.FrenchReunion,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Reunion)",
  native_name: "Fran\xE7ais (La R\xE9union)",
  rtl: false
});
({
  country: {
    code: CountryCode.Switzerland,
    name: "Switzerland",
    native: "Suisse"
  },
  id: LocaleCode.FrenchSwitzerland,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Switzerland)",
  native_name: "Fran\xE7ais (Suisse)",
  rtl: false
});
({
  id: LocaleCode.Frisian,
  language: {
    code: LanguageCode.Frisian,
    name: "Frisian",
    native: "Frysk"
  },
  name: "Frisian",
  native_name: "Frysk",
  rtl: false
});
({
  country: {
    code: CountryCode.Netherlands,
    name: "Netherlands",
    native: "Nederland"
  },
  id: LocaleCode.FrisianNetherlands,
  language: {
    code: LanguageCode.Frisian,
    name: "Frisian",
    native: "Frysk"
  },
  name: "Frisian (Netherlands)",
  native_name: "Frysk (Nederland)",
  rtl: false
});
({
  id: LocaleCode.Galician,
  language: {
    code: LanguageCode.Galician,
    name: "Galician",
    native: "Galego"
  },
  name: "Galician",
  native_name: "Galego",
  rtl: false
});
({
  country: {
    code: CountryCode.Spain,
    name: "Spain",
    native: "Espa\xF1a"
  },
  id: LocaleCode.GalicianSpain,
  language: {
    code: LanguageCode.Galician,
    name: "Galician",
    native: "Galego"
  },
  name: "Galician (Spain)",
  native_name: "Galego (Espa\xF1a)",
  rtl: false
});
({
  id: LocaleCode.Georgian,
  language: {
    code: LanguageCode.Georgian,
    name: "Georgian",
    native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8"
  },
  name: "Georgian",
  native_name: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8",
  rtl: false
});
({
  country: {
    code: CountryCode.Georgia,
    name: "Georgia",
    native: "\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD"
  },
  id: LocaleCode.GeorgianGeorgia,
  language: {
    code: LanguageCode.Georgian,
    name: "Georgian",
    native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8"
  },
  name: "Georgian (Georgia)",
  native_name: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8 (\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD)",
  rtl: false
});
({
  id: LocaleCode.German,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German",
  native_name: "Deutsch",
  rtl: false
});
({
  country: {
    code: CountryCode.Austria,
    name: "Austria",
    native: "\xD6sterreich"
  },
  id: LocaleCode.GermanAustria,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Austria)",
  native_name: "Deutsch (\xD6sterreich)",
  rtl: false
});
({
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.GermanBelgium,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Belgium)",
  native_name: "Deutsch (Belgi\xEB)",
  rtl: false
});
({
  country: {
    code: CountryCode.Switzerland,
    name: "Switzerland",
    native: "Suisse"
  },
  id: LocaleCode.GermanSwitzerland,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Switzerland)",
  native_name: "Deutsch (Suisse)",
  rtl: false
});
({
  country: {
    code: CountryCode.Liechtenstein,
    name: "Liechtenstein",
    native: "Liechtenstein"
  },
  id: LocaleCode.GermanLiechtenstein,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Liechtenstein)",
  native_name: "Deutsch (Liechtenstein)",
  rtl: false
});
({
  country: {
    code: CountryCode.Luxembourg,
    name: "Luxembourg",
    native: "Luxembourg"
  },
  id: LocaleCode.GermanLuxembourg,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Luxembourg)",
  native_name: "Deutsch (Luxembourg)",
  rtl: false
});
({
  id: LocaleCode.Greek,
  language: {
    code: LanguageCode.Greek,
    name: "Greek",
    native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"
  },
  name: "Greek",
  native_name: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
  rtl: false
});
({
  country: {
    code: CountryCode.Greece,
    name: "Greece",
    native: "\u0395\u03BB\u03BB\u03AC\u03B4\u03B1"
  },
  id: LocaleCode.GreekGreece,
  language: {
    code: LanguageCode.Greek,
    name: "Greek",
    native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"
  },
  name: "Greek (Greece)",
  native_name: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC (\u0395\u03BB\u03BB\u03AC\u03B4\u03B1)",
  rtl: false
});
({
  id: LocaleCode.Greenlandic,
  language: {
    code: LanguageCode.Greenlandic,
    name: "Greenlandic",
    native: "Kalaallisut"
  },
  name: "Greenlandic",
  native_name: "Kalaallisut",
  rtl: false
});
({
  country: {
    code: CountryCode.Greenland,
    name: "Greenland",
    native: "Kalaallit Nunaat"
  },
  id: LocaleCode.GreenlandicGreenland,
  language: {
    code: LanguageCode.Greenlandic,
    name: "Greenlandic",
    native: "Kalaallisut"
  },
  name: "Greenlandic (Greenland)",
  native_name: "Kalaallisut (Kalaallit Nunaat)",
  rtl: false
});
({
  id: LocaleCode.Gujarati,
  language: {
    code: LanguageCode.Gujarati,
    name: "Gujarati",
    native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0"
  },
  name: "Gujarati",
  native_name: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.GujaratiIndia,
  language: {
    code: LanguageCode.Gujarati,
    name: "Gujarati",
    native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0"
  },
  name: "Gujarati (India)",
  native_name: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0 (\u092D\u093E\u0930\u0924)",
  rtl: false
});
({
  id: LocaleCode.Hausa,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E",
  rtl: false
});
({
  country: {
    code: CountryCode.Ghana,
    name: "Ghana",
    native: "Ghana"
  },
  id: LocaleCode.HausaGhana,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa (Ghana)",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Ghana)",
  rtl: false
});
({
  country: {
    code: CountryCode.Niger,
    name: "Niger",
    native: "Niger"
  },
  id: LocaleCode.HausaNiger,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa (Niger)",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Niger)",
  rtl: false
});
({
  country: {
    code: CountryCode.Nigeria,
    name: "Nigeria",
    native: "Nigeria"
  },
  id: LocaleCode.HausaNigeria,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa (Nigeria)",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Nigeria)",
  rtl: false
});
({
  id: LocaleCode.Hebrew,
  language: {
    code: LanguageCode.Hebrew,
    name: "Hebrew",
    native: "\u05E2\u05D1\u05E8\u05D9\u05EA"
  },
  name: "Hebrew",
  native_name: "\u05E2\u05D1\u05E8\u05D9\u05EA",
  rtl: true
});
({
  country: {
    code: CountryCode.Israel,
    name: "Hebrew",
    native: ""
  },
  id: LocaleCode.HebrewIsrael,
  language: {
    code: LanguageCode.Hebrew,
    name: "Hebrew",
    native: ""
  },
  name: "Hebrew (Israel)",
  native_name: "",
  rtl: true
});
({
  id: LocaleCode.Hindi,
  language: {
    code: LanguageCode.Hindi,
    name: "Hindi",
    native: "\u0939\u093F\u0928\u094D\u0926\u0940"
  },
  name: "Hindi",
  native_name: "\u0939\u093F\u0928\u094D\u0926\u0940",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.HindiIndia,
  language: {
    code: LanguageCode.Hindi,
    name: "Hindi",
    native: "\u092D\u093E\u0930\u0924\u0940\u092F"
  },
  name: "Hindi (India)",
  native_name: "\u092D\u093E\u0930\u0924\u0940\u092F",
  rtl: false
});
({
  id: LocaleCode.Hungarian,
  language: {
    code: LanguageCode.Hungarian,
    name: "Hungarian",
    native: "Magyar"
  },
  name: "Hungarian",
  native_name: "Magyar",
  rtl: false
});
({
  country: {
    code: CountryCode.Hungary,
    name: "Hungary",
    native: "Magyarorsz\xE1g"
  },
  id: LocaleCode.HungarianHungary,
  language: {
    code: LanguageCode.Hungarian,
    name: "Hungarian",
    native: "Magyar"
  },
  name: "Hungarian (Hungary)",
  native_name: "Magyar (Magyarorsz\xE1g)",
  rtl: false
});
({
  id: LocaleCode.Icelandic,
  language: {
    code: LanguageCode.Icelandic,
    name: "Icelandic",
    native: "\xCDslenska"
  },
  name: "Icelandic",
  native_name: "\xCDslenska",
  rtl: false
});
({
  country: {
    code: CountryCode.Iceland,
    name: "Iceland",
    native: "\xCDsland"
  },
  id: LocaleCode.IcelandicIceland,
  language: {
    code: LanguageCode.Icelandic,
    name: "Icelandic",
    native: "\xCDslenska"
  },
  name: "Icelandic (Iceland)",
  native_name: "\xCDslenska (\xCDsland)",
  rtl: false
});
({
  id: LocaleCode.Igbo,
  language: {
    code: LanguageCode.Igbo,
    name: "Igbo",
    native: "Igbo"
  },
  name: "Igbo",
  native_name: "Igbo",
  rtl: false
});
({
  id: LocaleCode.Indonesian,
  language: {
    code: LanguageCode.Indonesian,
    name: "Indonesian",
    native: "Bahasa Indonesia"
  },
  name: "Indonesian",
  native_name: "Bahasa Indonesia",
  rtl: false
});
({
  country: {
    code: CountryCode.Indonesia,
    name: "Indonesia",
    native: "Indonesia"
  },
  id: LocaleCode.IndonesianIndonesia,
  language: {
    code: LanguageCode.Indonesian,
    name: "Indonesian",
    native: "Bahasa Indonesia"
  },
  name: "Indonesian (Indonesia)",
  native_name: "Bahasa Indonesia (Indonesia)",
  rtl: false
});
({
  id: LocaleCode.Irish,
  language: {
    code: LanguageCode.Irish,
    name: "Irish",
    native: "Gaeilge"
  },
  name: "Irish",
  native_name: "Gaeilge",
  rtl: false
});
({
  country: {
    code: CountryCode.Ireland,
    name: "Ireland",
    native: "\xC9ire"
  },
  id: LocaleCode.IrishIreland,
  language: {
    code: LanguageCode.Irish,
    name: "Irish",
    native: "Gaeilge"
  },
  name: "Irish (Ireland)",
  native_name: "Gaeilge (\xC9ire)",
  rtl: false
});
({
  id: LocaleCode.Italian,
  language: {
    code: LanguageCode.Italian,
    name: "Italian",
    native: "Italiano"
  },
  name: "Italian",
  native_name: "Italiano",
  rtl: false
});
({
  country: {
    code: CountryCode.Italy,
    name: "Italy",
    native: "Italia"
  },
  id: LocaleCode.ItalianItaly,
  language: {
    code: LanguageCode.Italian,
    name: "Italian",
    native: "Italiano"
  },
  name: "Italian (Italy)",
  native_name: "Italiano (Italia)",
  rtl: false
});
({
  country: {
    code: CountryCode.Switzerland,
    name: "Switzerland",
    native: "Schweiz"
  },
  id: LocaleCode.ItalianSwitzerland,
  language: {
    code: LanguageCode.Italian,
    name: "Italian",
    native: "Italiano"
  },
  name: "Italian (Switzerland)",
  native_name: "Italiano (Svizzera)",
  rtl: false
});
({
  id: LocaleCode.Japanese,
  language: {
    code: LanguageCode.Japanese,
    name: "Japanese",
    native: "\u65E5\u672C\u8A9E"
  },
  name: "Japanese",
  native_name: "\u65E5\u672C\u8A9E",
  rtl: false
});
({
  country: {
    code: CountryCode.Japan,
    name: "Japan",
    native: "\u65E5\u672C"
  },
  id: LocaleCode.JapaneseJapan,
  language: {
    code: LanguageCode.Japanese,
    name: "Japanese",
    native: "\u65E5\u672C\u8A9E"
  },
  name: "Japanese (Japan)",
  native_name: "\u65E5\u672C\u8A9E (\u65E5\u672C)",
  rtl: false
});
({
  id: LocaleCode.Kannada,
  language: {
    code: LanguageCode.Kannada,
    name: "Kannada",
    native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1"
  },
  name: "Kannada",
  native_name: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0CAD\u0CBE\u0CB0\u0CA4"
  },
  id: LocaleCode.KannadaIndia,
  language: {
    code: LanguageCode.Kannada,
    name: "Kannada",
    native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1"
  },
  name: "Kannada (India)",
  native_name: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1 (\u0CAD\u0CBE\u0CB0\u0CA4)",
  rtl: false
});
({
  id: LocaleCode.Kazakh,
  language: {
    code: LanguageCode.Kazakh,
    name: "Kazakh",
    native: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456"
  },
  name: "Kazakh",
  native_name: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456",
  rtl: false
});
({
  country: {
    code: CountryCode.Kazakhstan,
    name: "Kazakhstan",
    native: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D"
  },
  id: LocaleCode.KazakhKazakhstan,
  language: {
    code: LanguageCode.Kazakh,
    name: "Kazakh",
    native: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456"
  },
  name: "Kazakh (Kazakhstan)",
  native_name: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456 (\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D)",
  rtl: false
});
({
  id: LocaleCode.Khmer,
  language: {
    code: LanguageCode.Khmer,
    name: "Khmer",
    native: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A"
  },
  name: "Khmer",
  native_name: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A",
  rtl: false
});
({
  country: {
    code: CountryCode.Cambodia,
    name: "Cambodia",
    native: "\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6"
  },
  id: LocaleCode.KhmerCambodia,
  language: {
    code: LanguageCode.Khmer,
    name: "Khmer",
    native: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A"
  },
  name: "Khmer (Cambodia)",
  native_name: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A (\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6)",
  rtl: false
});
({
  id: LocaleCode.Konkani,
  language: {
    code: LanguageCode.Konkani,
    name: "Konkani",
    native: "\u0915\u094B\u0902\u0915\u0923\u0940"
  },
  name: "Konkani",
  native_name: "\u0915\u094B\u0902\u0915\u0923\u0940",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.KonkaniIndia,
  language: {
    code: LanguageCode.Konkani,
    name: "Konkani",
    native: "\u0915\u094B\u0902\u0915\u0923\u0940"
  },
  name: "Konkani (India)",
  native_name: "\u0915\u094B\u0902\u0915\u0923\u0940 (\u092D\u093E\u0930\u0924)",
  rtl: false
});
({
  id: LocaleCode.Korean,
  language: {
    code: LanguageCode.Korean,
    name: "Korean",
    native: "\uD55C\uAD6D\uC5B4"
  },
  name: "Korean",
  native_name: "\uD55C\uAD6D\uC5B4",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthKorea,
    name: "South Korea",
    native: "\uB300\uD55C\uBBFC\uAD6D"
  },
  id: LocaleCode.KoreanSouthKorea,
  language: {
    code: LanguageCode.Korean,
    name: "Korean",
    native: "\uD55C\uAD6D\uC5B4"
  },
  name: "Korean (South Korea)",
  native_name: "\uD55C\uAD6D\uC5B4 (\uB300\uD55C\uBBFC\uAD6D)",
  rtl: false
});
({
  id: LocaleCode.Kurdish,
  language: {
    code: LanguageCode.Kurdish,
    name: "Kurdish",
    native: "Kurd\xEE"
  },
  name: "Kurdish",
  native_name: "Kurd\xEE",
  rtl: false
});
({
  country: {
    code: CountryCode.Iraq,
    name: "Iraq",
    native: "\u0627\u0644\u0639\u0631\u0627\u0642"
  },
  id: LocaleCode.KurdishIraq,
  language: {
    code: LanguageCode.Kurdish,
    name: "Kurdish",
    native: "Kurd\xEE"
  },
  name: "Kurdish (Iraq)",
  native_name: "Kurd\xEE (\u0627\u0644\u0639\u0631\u0627\u0642)",
  rtl: false
});
({
  country: {
    code: CountryCode.Turkey,
    name: "Turkey",
    native: "T\xFCrkiye"
  },
  id: LocaleCode.KurdishTurkey,
  language: {
    code: LanguageCode.Kurdish,
    name: "Kurdish",
    native: "Kurd\xEE"
  },
  name: "Kurdish (Turkey)",
  native_name: "Kurd\xEE (T\xFCrkiye)",
  rtl: false
});
({
  id: LocaleCode.Kyrgyz,
  language: {
    code: LanguageCode.Kyrgyz,
    name: "Kyrgyz",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
  },
  name: "Kyrgyz",
  native_name: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430",
  rtl: false
});
({
  country: {
    code: CountryCode.Kyrgyzstan,
    name: "Kyrgyzstan",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D"
  },
  id: LocaleCode.KyrgyzKyrgyzstan,
  language: {
    code: LanguageCode.Kyrgyz,
    name: "Kyrgyz",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
  },
  name: "Kyrgyz (Kyrgyzstan)",
  native_name: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430 (\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D)",
  rtl: false
});
({
  id: LocaleCode.Lao,
  language: {
    code: LanguageCode.Lao,
    name: "Lao",
    native: "\u0EA5\u0EB2\u0EA7"
  },
  name: "Lao",
  native_name: "\u0EA5\u0EB2\u0EA7",
  rtl: false
});
({
  country: {
    code: CountryCode.Laos,
    name: "Laos",
    native: "\u0EAA.\u0E9B.\u0E9B\u0EB0\u0E8A\u0EB2\u0E97\u0EB4\u0E9B\u0EB0\u0EC4\u0E95"
  },
  id: LocaleCode.LaoLaos,
  language: {
    code: LanguageCode.Lao,
    name: "Lao",
    native: "\u0EA5\u0EB2\u0EA7"
  },
  name: "Lao (Laos)",
  native_name: "\u0EA5\u0EB2\u0EA7 (\u0EAA.\u0E9B.\u0E9B\u0EB0\u0E8A\u0EB2\u0E97\u0EB4\u0E9B\u0EB0\u0EC4\u0E95)",
  rtl: false
});
({
  id: LocaleCode.Latvian,
  language: {
    code: LanguageCode.Latvian,
    name: "Latvian",
    native: "Latvie\u0161u"
  },
  name: "Latvian",
  native_name: "Latvie\u0161u",
  rtl: false
});
({
  country: {
    code: CountryCode.Latvia,
    name: "Latvia",
    native: "Latvija"
  },
  id: LocaleCode.LatvianLatvia,
  language: {
    code: LanguageCode.Latvian,
    name: "Latvian",
    native: "Latvie\u0161u"
  },
  name: "Latvian (Latvia)",
  native_name: "Latvie\u0161u (Latvija)",
  rtl: false
});
({
  id: LocaleCode.Lithuanian,
  language: {
    code: LanguageCode.Lithuanian,
    name: "Lithuanian",
    native: "Lietuvi\u0173"
  },
  name: "Lithuanian",
  native_name: "Lietuvi\u0173",
  rtl: false
});
({
  country: {
    code: CountryCode.Lithuania,
    name: "Lithuania",
    native: "Lietuva"
  },
  id: LocaleCode.LithuanianLithuania,
  language: {
    code: LanguageCode.Lithuanian,
    name: "Lithuanian",
    native: "Lietuvi\u0173"
  },
  name: "Lithuanian (Lithuania)",
  native_name: "Lietuvi\u0173 (Lietuva)",
  rtl: false
});
({
  id: LocaleCode.Luxembourgish,
  language: {
    code: LanguageCode.Luxembourgish,
    name: "Luxembourgish",
    native: "L\xEBtzebuergesch"
  },
  name: "Luxembourgish",
  native_name: "L\xEBtzebuergesch",
  rtl: false
});
({
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.LuxembourgishBelgium,
  language: {
    code: LanguageCode.Luxembourgish,
    name: "Luxembourgish",
    native: "L\xEBtzebuergesch"
  },
  name: "Luxembourgish (Belgium)",
  native_name: "L\xEBtzebuergesch (Belgi\xEB)",
  rtl: false
});
({
  country: {
    code: CountryCode.Luxembourg,
    name: "Luxembourg",
    native: "Luxembourg"
  },
  id: LocaleCode.LuxembourgishLuxembourg,
  language: {
    code: LanguageCode.Luxembourgish,
    name: "Luxembourgish",
    native: "L\xEBtzebuergesch"
  },
  name: "Luxembourgish (Luxembourg)",
  native_name: "L\xEBtzebuergesch (Luxembourg)",
  rtl: false
});
({
  id: LocaleCode.Macedonian,
  language: {
    code: LanguageCode.Macedonian,
    name: "Macedonian",
    native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438"
  },
  name: "Macedonian",
  native_name: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438",
  rtl: false
});
({
  country: {
    code: CountryCode.NorthMacedonia,
    name: "Macedonia",
    native: "\u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430"
  },
  id: LocaleCode.MacedonianNorthMacedonia,
  language: {
    code: LanguageCode.Macedonian,
    name: "Macedonian",
    native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438"
  },
  name: "Macedonian (North Macedonia)",
  native_name: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438 (\u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430)",
  rtl: false
});
({
  id: LocaleCode.Malay,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay",
  native_name: "Bahasa Melayu",
  rtl: false
});
({
  country: {
    code: CountryCode.Brunei,
    name: "Brunei",
    native: "Negara Brunei Darussalam"
  },
  id: LocaleCode.MalayBrunei,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (Brunei)",
  native_name: "Bahasa Melayu (Negara Brunei Darussalam)",
  rtl: false
});
({
  country: {
    code: CountryCode.Malaysia,
    name: "Malaysia",
    native: "Malaysia"
  },
  id: LocaleCode.MalayMalaysia,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (Malaysia)",
  native_name: "Bahasa Melayu (Malaysia)",
  rtl: false
});
({
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "Singapore"
  },
  id: LocaleCode.MalaySingapore,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (Singapore)",
  native_name: "Bahasa Melayu (Singapore)",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.MalayIndia,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (India)",
  native_name: "Bahasa Melayu (\u092D\u093E\u0930\u0924)",
  rtl: false
});
({
  id: LocaleCode.Maltese,
  language: {
    code: LanguageCode.Maltese,
    name: "Maltese",
    native: "Malti"
  },
  name: "Maltese",
  native_name: "Malti",
  rtl: false
});
({
  country: {
    code: CountryCode.Malta,
    name: "Malta",
    native: "Malta"
  },
  id: LocaleCode.MalteseMalta,
  language: {
    code: LanguageCode.Maltese,
    name: "Maltese",
    native: "Malti"
  },
  name: "Maltese (Malta)",
  native_name: "Malti (Malta)",
  rtl: false
});
({
  id: LocaleCode.Maori,
  language: {
    code: LanguageCode.Maori,
    name: "Maori",
    native: "M\u0101ori"
  },
  name: "Maori",
  native_name: "M\u0101ori",
  rtl: false
});
({
  country: {
    code: CountryCode.NewZealand,
    name: "New Zealand",
    native: "New Zealand"
  },
  id: LocaleCode.MaoriNewZealand,
  language: {
    code: LanguageCode.Maori,
    name: "Maori",
    native: "M\u0101ori"
  },
  name: "Maori (New Zealand)",
  native_name: "M\u0101ori (New Zealand)",
  rtl: false
});
({
  id: LocaleCode.Marathi,
  language: {
    code: LanguageCode.Marathi,
    name: "Marathi",
    native: "\u092E\u0930\u093E\u0920\u0940"
  },
  name: "Marathi",
  native_name: "\u092E\u0930\u093E\u0920\u0940",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.MarathiIndia,
  language: {
    code: LanguageCode.Marathi,
    name: "Marathi",
    native: "\u092E\u0930\u093E\u0920\u0940"
  },
  name: "Marathi (India)",
  native_name: "\u092E\u0930\u093E\u0920\u0940 (\u092D\u093E\u0930\u0924)",
  rtl: false
});
({
  id: LocaleCode.Mongolian,
  language: {
    code: LanguageCode.Mongolian,
    name: "Mongolian",
    native: "\u041C\u043E\u043D\u0433\u043E\u043B"
  },
  name: "Mongolian",
  native_name: "\u041C\u043E\u043D\u0433\u043E\u043B",
  rtl: false
});
({
  country: {
    code: CountryCode.Mongolia,
    name: "Mongolia",
    native: "\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441"
  },
  id: LocaleCode.MongolianMongolia,
  language: {
    code: LanguageCode.Mongolian,
    name: "Mongolian",
    native: "\u041C\u043E\u043D\u0433\u043E\u043B"
  },
  name: "Mongolian (Mongolia)",
  native_name: "\u041C\u043E\u043D\u0433\u043E\u043B (\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441)",
  rtl: false
});
({
  id: LocaleCode.Montenegrin,
  language: {
    code: LanguageCode.Montenegrin,
    name: "Montenegrin",
    native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A"
  },
  name: "Montenegrin",
  native_name: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A",
  rtl: false
});
({
  country: {
    code: CountryCode.Montenegro,
    name: "Montenegro",
    native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A"
  },
  id: LocaleCode.MontenegrinMontenegro,
  language: {
    code: LanguageCode.Montenegrin,
    name: "Montenegrin",
    native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A"
  },
  name: "Montenegrin (Montenegro)",
  native_name: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A (\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A)",
  rtl: false
});
({
  id: LocaleCode.Nepali,
  language: {
    code: LanguageCode.Nepali,
    name: "Nepali",
    native: "\u0928\u0947\u092A\u093E\u0932\u0940"
  },
  name: "Nepali",
  native_name: "\u0928\u0947\u092A\u093E\u0932\u0940",
  rtl: false
});
({
  country: {
    code: CountryCode.Nepal,
    name: "Nepal",
    native: "\u0928\u0947\u092A\u093E\u0932"
  },
  id: LocaleCode.NepaliNepal,
  language: {
    code: LanguageCode.Nepali,
    name: "Nepali",
    native: "\u0928\u0947\u092A\u093E\u0932\u0940"
  },
  name: "Nepali (Nepal)",
  native_name: "\u0928\u0947\u092A\u093E\u0932\u0940 (\u0928\u0947\u092A\u093E\u0932)",
  rtl: false
});
({
  id: LocaleCode.NorthernSotho,
  language: {
    code: LanguageCode.NorthernSotho,
    name: "Northern Sotho",
    native: "Sesotho sa Leboa"
  },
  name: "Northern Sotho",
  native_name: "Sesotho sa Leboa",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.NorthernSothoSouthAfrica,
  language: {
    code: LanguageCode.NorthernSotho,
    name: "Northern Sotho",
    native: "Sesotho sa Leboa"
  },
  name: "Northern Sotho (South Africa)",
  native_name: "Sesotho sa Leboa (South Africa)",
  rtl: false
});
({
  id: LocaleCode.Norwegian,
  language: {
    code: LanguageCode.Norwegian,
    name: "Norwegian",
    native: "Norsk"
  },
  name: "Norwegian",
  native_name: "Norsk",
  rtl: false
});
({
  country: {
    code: CountryCode.Norway,
    name: "Norway",
    native: "Norge"
  },
  id: LocaleCode.NorwegianBokmalNorway,
  language: {
    code: LanguageCode.NorwegianBokmal,
    name: "Norwegian",
    native: "Norsk"
  },
  name: "Norwegian (Bokmal)",
  native_name: "Norsk (Bokm\xE5l)",
  rtl: false
});
({
  country: {
    code: CountryCode.Norway,
    name: "Norway",
    native: "Norge"
  },
  id: LocaleCode.NorwegianNynorskNorway,
  language: {
    code: LanguageCode.NorwegianNynorsk,
    name: "Norwegian",
    native: "Norsk"
  },
  name: "Norwegian (Nynorsk)",
  native_name: "Norsk (Nynorsk)",
  rtl: false
});
({
  id: LocaleCode.Oriya,
  language: {
    code: LanguageCode.Oriya,
    name: "Oriya",
    native: "\u0B13\u0B21\u0B3C\u0B3F\u0B06"
  },
  name: "Oriya",
  native_name: "\u0B13\u0B21\u0B3C\u0B3F\u0B06",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
  },
  id: LocaleCode.OriyaIndia,
  language: {
    code: LanguageCode.Oriya,
    name: "Oriya",
    native: "\u0B13\u0B21\u0B3C\u0B3F\u0B06"
  },
  name: "Oriya (India)",
  native_name: "\u0B13\u0B21\u0B3C\u0B3F\u0B06 (\u0B2D\u0B3E\u0B30\u0B24)",
  rtl: false
});
({
  id: LocaleCode.Pashto,
  language: {
    code: LanguageCode.Pashto,
    name: "Pashto",
    native: "\u067E\u069A\u062A\u0648"
  },
  name: "Pashto",
  native_name: "\u067E\u069A\u062A\u0648",
  rtl: true
});
({
  country: {
    code: CountryCode.Afghanistan,
    name: "Afghanistan",
    native: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.PashtoAfghanistan,
  language: {
    code: LanguageCode.Pashto,
    name: "Pashto",
    native: "\u067E\u069A\u062A\u0648"
  },
  name: "Pashto (Afghanistan)",
  native_name: "\u067E\u069A\u062A\u0648 (\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646)",
  rtl: true
});
({
  id: LocaleCode.Persian,
  language: {
    code: LanguageCode.Persian,
    name: "Persian",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Persian",
  native_name: "\u0641\u0627\u0631\u0633\u06CC",
  rtl: true
});
({
  country: {
    code: CountryCode.Iran,
    name: "Iran",
    native: "\u0627\u06CC\u0631\u0627\u0646"
  },
  id: LocaleCode.PersianIran,
  language: {
    code: LanguageCode.Persian,
    name: "Persian",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Persian (Iran)",
  native_name: "\u0641\u0627\u0631\u0633\u06CC (\u0627\u06CC\u0631\u0627\u0646)",
  rtl: true
});
({
  id: LocaleCode.Polish,
  language: {
    code: LanguageCode.Polish,
    name: "Polish",
    native: "Polski"
  },
  name: "Polish",
  native_name: "Polski",
  rtl: false
});
({
  country: {
    code: CountryCode.Poland,
    name: "Poland",
    native: "Polska"
  },
  id: LocaleCode.PolishPoland,
  language: {
    code: LanguageCode.Polish,
    name: "Polish",
    native: "Polski"
  },
  name: "Polish (Poland)",
  native_name: "Polski (Polska)",
  rtl: false
});
({
  id: LocaleCode.Portuguese,
  language: {
    code: LanguageCode.Portuguese,
    name: "Portuguese",
    native: "Portugu\xEAs"
  },
  name: "Portuguese",
  native_name: "Portugu\xEAs",
  rtl: false
});
({
  country: {
    code: CountryCode.Brazil,
    name: "Brazil",
    native: "Brasil"
  },
  id: LocaleCode.PortugueseBrazil,
  language: {
    code: LanguageCode.Portuguese,
    name: "Portuguese",
    native: "Portugu\xEAs"
  },
  name: "Portuguese (Brazil)",
  native_name: "Portugu\xEAs (Brasil)",
  rtl: false
});
({
  country: {
    code: CountryCode.Portugal,
    name: "Portugal",
    native: "Portugal"
  },
  id: LocaleCode.PortuguesePortugal,
  language: {
    code: LanguageCode.Portuguese,
    name: "Portuguese",
    native: "Portugu\xEAs"
  },
  name: "Portuguese (Portugal)",
  native_name: "Portugu\xEAs (Portugal)",
  rtl: false
});
({
  id: LocaleCode.Punjabi,
  language: {
    code: LanguageCode.Punjabi,
    name: "Punjabi",
    native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
  },
  name: "Punjabi",
  native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",
  rtl: true
});
({
  country: {
    code: CountryCode.Pakistan,
    name: "Pakistan",
    native: "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.PunjabiPakistan,
  language: {
    code: LanguageCode.Punjabi,
    name: "Punjabi",
    native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
  },
  name: "Punjabi (Pakistan)",
  native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 (\u067E\u0627\u06A9\u0633\u062A\u0627\u0646)",
  rtl: true
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0A2D\u0A3E\u0A30\u0A24"
  },
  id: LocaleCode.PunjabiIndia,
  language: {
    code: LanguageCode.Punjabi,
    name: "Punjabi",
    native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
  },
  name: "Punjabi (India)",
  native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 (\u0A2D\u0A3E\u0A30\u0A24)",
  rtl: true
});
({
  id: LocaleCode.Quechua,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua",
  native_name: "Runa Simi",
  rtl: false
});
({
  country: {
    code: CountryCode.Bolivia,
    name: "Bolivia",
    native: "Bolivia"
  },
  id: LocaleCode.QuechuaBolivia,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua (Bolivia)",
  native_name: "Runa Simi (Bolivia)",
  rtl: false
});
({
  country: {
    code: CountryCode.Ecuador,
    name: "Ecuador",
    native: "Ecuador"
  },
  id: LocaleCode.QuechuaEcuador,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua (Ecuador)",
  native_name: "Runa Simi (Ecuador)",
  rtl: false
});
({
  country: {
    code: CountryCode.Peru,
    name: "Peru",
    native: "Per\xFA"
  },
  id: LocaleCode.QuechuaPeru,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua (Peru)",
  native_name: "Runa Simi (Per\xFA)",
  rtl: false
});
({
  id: LocaleCode.Romanian,
  language: {
    code: LanguageCode.Romanian,
    name: "Romanian",
    native: "Rom\xE2n\u0103"
  },
  name: "Romanian",
  native_name: "Rom\xE2n\u0103",
  rtl: false
});
({
  country: {
    code: CountryCode.Romania,
    name: "Romania",
    native: "Rom\xE2nia"
  },
  id: LocaleCode.RomanianRomania,
  language: {
    code: LanguageCode.Romanian,
    name: "Romanian",
    native: "Rom\xE2n\u0103"
  },
  name: "Romanian (Romania)",
  native_name: "Rom\xE2n\u0103 (Rom\xE2nia)",
  rtl: false
});
({
  id: LocaleCode.Russian,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
  rtl: false
});
({
  country: {
    code: CountryCode.RussianFederation,
    name: "Russian Federation",
    native: "\u0420\u043E\u0441\u0441\u0438\u044F"
  },
  id: LocaleCode.RussianRussia,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Russia)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u0420\u043E\u0441\u0441\u0438\u044F)",
  rtl: false
});
({
  country: {
    code: CountryCode.Ukraine,
    name: "Ukraine",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430"
  },
  id: LocaleCode.RussianUkraine,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Ukraine)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u0423\u043A\u0440\u0430\u0457\u043D\u0430)",
  rtl: false
});
({
  country: {
    code: CountryCode.Kazakhstan,
    name: "Kazakhstan",
    native: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D"
  },
  id: LocaleCode.RussianKazakhstan,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Kazakhstan)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D)",
  rtl: false
});
({
  country: {
    code: CountryCode.Kyrgyzstan,
    name: "Kyrgyzstan",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
  },
  id: LocaleCode.RussianKyrgyzstan,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Kyrgyzstan)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430)",
  rtl: false
});
({
  id: LocaleCode.Sanskrit,
  language: {
    code: LanguageCode.Sanskrit,
    name: "Sanskrit",
    native: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D"
  },
  name: "Sanskrit",
  native_name: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.SanskritIndia,
  language: {
    code: LanguageCode.Sanskrit,
    name: "Sanskrit",
    native: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D"
  },
  name: "Sanskrit (India)",
  native_name: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D (\u092D\u093E\u0930\u0924)",
  rtl: false
});
({
  id: LocaleCode.Sami,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami",
  native_name: "S\xE1megiella",
  rtl: false
});
({
  country: {
    code: CountryCode.Finland,
    name: "Finland",
    native: "Suomi"
  },
  id: LocaleCode.SamiFinland,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami (Finland)",
  native_name: "S\xE1megiella (Suomi)",
  rtl: false
});
({
  country: {
    code: CountryCode.Norway,
    name: "Norway",
    native: "Norge"
  },
  id: LocaleCode.SamiNorway,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami (Norway)",
  native_name: "S\xE1megiella (Norge)",
  rtl: false
});
({
  country: {
    code: CountryCode.Sweden,
    name: "Sweden",
    native: "Sverige"
  },
  id: LocaleCode.SamiSweden,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami (Sweden)",
  native_name: "S\xE1megiella (Sverige)",
  rtl: false
});
({
  id: LocaleCode.Samoan,
  language: {
    code: LanguageCode.Samoan,
    name: "Samoan",
    native: "Gagana fa\u2019a S\u0101moa"
  },
  name: "Samoan",
  native_name: "Gagana fa\u2019a S\u0101moa",
  rtl: false
});
({
  country: {
    code: CountryCode.Samoa,
    name: "Samoa",
    native: "Samoa"
  },
  id: LocaleCode.SamoanSamoa,
  language: {
    code: LanguageCode.Samoan,
    name: "Samoan",
    native: "Gagana fa\u2019a S\u0101moa"
  },
  name: "Samoan (Samoa)",
  native_name: "Gagana fa\u2019a S\u0101moa (Samoa)",
  rtl: false
});
({
  id: LocaleCode.Serbian,
  language: {
    code: LanguageCode.Serbian,
    name: "Serbian (Latin)",
    native: "Srpski (Latinica)"
  },
  name: "Serbian (Latin)",
  native_name: "Srpski (Latinica)",
  rtl: false
});
({
  country: {
    code: CountryCode.BosniaAndHerzegovina,
    name: "Bosnia and Herzegovina",
    native: "Bosna i Hercegovina"
  },
  id: LocaleCode.SerbianBosniaAndHerzegovina,
  language: {
    code: LanguageCode.Serbian,
    name: "Serbian (Latin)",
    native: "Srpski (Latinica)"
  },
  name: "Serbian (Latin) (Bosnia and Herzegovina)",
  native_name: "Srpski (Latinica) (Bosna i Hercegovina)",
  rtl: false
});
({
  country: {
    code: CountryCode.SerbiaAndMontenegro,
    name: "Serbia and Montenegro",
    native: "Srbija i Crna Gora"
  },
  id: LocaleCode.SerbianSerbiaAndMontenegro,
  language: {
    code: LanguageCode.Serbian,
    name: "Serbian (Latin)",
    native: "Srpski (Latinica)"
  },
  name: "Serbian (Latin) (Serbia and Montenegro)",
  native_name: "Srpski (Latinica) (Srbija i Crna Gora)",
  rtl: false
});
({
  id: LocaleCode.SerbianCyrillic,
  language: {
    code: LanguageCode.SerbianCyrillic,
    name: "Serbian",
    native: "\u0421\u0440\u043F\u0441\u043A\u0438"
  },
  name: "Serbian (Cyrillic)",
  native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430)",
  rtl: false
});
({
  country: {
    code: CountryCode.BosniaAndHerzegovina,
    name: "Bosnia and Herzegovina",
    native: "\u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430"
  },
  id: LocaleCode.SerbianCyrillicBosniaAndHerzegovina,
  language: {
    code: LanguageCode.SerbianCyrillic,
    name: "Serbian",
    native: "\u0421\u0440\u043F\u0441\u043A\u0438"
  },
  name: "Serbian (Cyrillic, Bosnia and Herzegovina)",
  native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430, \u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430)",
  rtl: false
});
({
  country: {
    code: CountryCode.SerbiaAndMontenegro,
    name: "Serbia and Montenegro",
    native: "\u0421\u0440\u0431\u0438\u0458\u0430 \u0438 \u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430"
  },
  id: LocaleCode.SerbianCyrillicSerbiaAndMontenegro,
  language: {
    code: LanguageCode.SerbianCyrillic,
    name: "Serbian",
    native: "\u0421\u0440\u043F\u0441\u043A\u0438"
  },
  name: "Serbian (Cyrillic, Serbia and Montenegro)",
  native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430, \u0421\u0440\u0431\u0438\u0458\u0430 \u0438 \u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430)",
  rtl: false
});
({
  id: LocaleCode.Slovak,
  language: {
    code: LanguageCode.Slovak,
    name: "Slovak",
    native: "Sloven\u010Dina"
  },
  name: "Slovak",
  native_name: "Sloven\u010Dina",
  rtl: false
});
({
  country: {
    code: CountryCode.Slovakia,
    name: "Slovakia",
    native: "Slovensko"
  },
  id: LocaleCode.SlovakSlovakia,
  language: {
    code: LanguageCode.Slovak,
    name: "Slovak",
    native: "Sloven\u010Dina"
  },
  name: "Slovak (Slovakia)",
  native_name: "Sloven\u010Dina (Slovensko)",
  rtl: false
});
({
  id: LocaleCode.Slovenian,
  language: {
    code: LanguageCode.Slovenian,
    name: "Slovenian",
    native: "Sloven\u0161\u010Dina"
  },
  name: "Slovenian",
  native_name: "Sloven\u0161\u010Dina",
  rtl: false
});
({
  country: {
    code: CountryCode.Slovenia,
    name: "Slovenia",
    native: "Slovenija"
  },
  id: LocaleCode.SlovenianSlovenia,
  language: {
    code: LanguageCode.Slovenian,
    name: "Slovenian",
    native: "Sloven\u0161\u010Dina"
  },
  name: "Slovenian (Slovenia)",
  native_name: "Sloven\u0161\u010Dina (Slovenija)",
  rtl: false
});
({
  id: LocaleCode.Somali,
  language: {
    code: LanguageCode.Somali,
    name: "Somali",
    native: "Soomaaliga"
  },
  name: "Somali",
  native_name: "Soomaaliga",
  rtl: true
});
({
  country: {
    code: CountryCode.Somalia,
    name: "Somalia",
    native: "Soomaaliya"
  },
  id: LocaleCode.SomaliSomalia,
  language: {
    code: LanguageCode.Somali,
    name: "Somali",
    native: "Soomaaliga"
  },
  name: "Somali (Somalia)",
  native_name: "Soomaaliga (Soomaaliya)",
  rtl: true
});
({
  id: LocaleCode.Spanish,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish",
  native_name: "Espa\xF1ol",
  rtl: false
});
({
  country: {
    code: CountryCode.Argentina,
    name: "Argentina",
    native: "Argentina"
  },
  id: LocaleCode.SpanishArgentina,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Argentina)",
  native_name: "Espa\xF1ol (Argentina)",
  rtl: false
});
({
  country: {
    code: CountryCode.Bolivia,
    name: "Bolivia",
    native: "Bolivia"
  },
  id: LocaleCode.SpanishBolivia,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Bolivia)",
  native_name: "Espa\xF1ol (Bolivia)",
  rtl: false
});
({
  country: {
    code: CountryCode.Chile,
    name: "Chile",
    native: "Chile"
  },
  id: LocaleCode.SpanishChile,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Chile)",
  native_name: "Espa\xF1ol (Chile)",
  rtl: false
});
({
  country: {
    code: CountryCode.Colombia,
    name: "Colombia",
    native: "Colombia"
  },
  id: LocaleCode.SpanishColombia,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Colombia)",
  native_name: "Espa\xF1ol (Colombia)",
  rtl: false
});
({
  country: {
    code: CountryCode.CostaRica,
    name: "Costa Rica",
    native: "Costa Rica"
  },
  id: LocaleCode.SpanishCostaRica,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Costa Rica)",
  native_name: "Espa\xF1ol (Costa Rica)",
  rtl: false
});
({
  country: {
    code: CountryCode.Cuba,
    name: "Cuba",
    native: "Cuba"
  },
  id: LocaleCode.SpanishCuba,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Cuba)",
  native_name: "Espa\xF1ol (Cuba)",
  rtl: false
});
({
  country: {
    code: CountryCode.DominicanRepublic,
    name: "Dominican Republic",
    native: "Rep\xFAblica Dominicana"
  },
  id: LocaleCode.SpanishDominicanRepublic,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Dominican Republic)",
  native_name: "Espa\xF1ol (Rep\xFAblica Dominicana)",
  rtl: false
});
({
  country: {
    code: CountryCode.Ecuador,
    name: "Ecuador",
    native: "Ecuador"
  },
  id: LocaleCode.SpanishEcuador,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Ecuador)",
  native_name: "Espa\xF1ol (Ecuador)",
  rtl: false
});
({
  country: {
    code: CountryCode.ElSalvador,
    name: "El Salvador",
    native: "El Salvador"
  },
  id: LocaleCode.SpanishElSalvador,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (El Salvador)",
  native_name: "Espa\xF1ol (El Salvador)",
  rtl: false
});
({
  country: {
    code: CountryCode.EquatorialGuinea,
    name: "Equatorial Guinea",
    native: "Guinea Ecuatorial"
  },
  id: LocaleCode.SpanishEquatorialGuinea,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Equatorial Guinea)",
  native_name: "Espa\xF1ol (Guinea Ecuatorial)",
  rtl: false
});
({
  country: {
    code: CountryCode.Guatemala,
    name: "Guatemala",
    native: "Guatemala"
  },
  id: LocaleCode.SpanishGuatemala,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Guatemala)",
  native_name: "Espa\xF1ol (Guatemala)",
  rtl: false
});
({
  country: {
    code: CountryCode.Honduras,
    name: "Honduras",
    native: "Honduras"
  },
  id: LocaleCode.SpanishHonduras,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Honduras)",
  native_name: "Espa\xF1ol (Honduras)",
  rtl: false
});
({
  country: {
    code: CountryCode.Mexico,
    name: "Mexico",
    native: "M\xE9xico"
  },
  id: LocaleCode.SpanishMexico,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Mexico)",
  native_name: "Espa\xF1ol (M\xE9xico)",
  rtl: false
});
({
  country: {
    code: CountryCode.Nicaragua,
    name: "Nicaragua",
    native: "Nicaragua"
  },
  id: LocaleCode.SpanishNicaragua,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Nicaragua)",
  native_name: "Espa\xF1ol (Nicaragua)",
  rtl: false
});
({
  country: {
    code: CountryCode.Panama,
    name: "Panama",
    native: "Panam\xE1"
  },
  id: LocaleCode.SpanishPanama,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Panama)",
  native_name: "Espa\xF1ol (Panam\xE1)",
  rtl: false
});
({
  country: {
    code: CountryCode.Paraguay,
    name: "Paraguay",
    native: "Paraguay"
  },
  id: LocaleCode.SpanishParaguay,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Paraguay)",
  native_name: "Espa\xF1ol (Paraguay)",
  rtl: false
});
({
  country: {
    code: CountryCode.Peru,
    name: "Peru",
    native: "Per\xFA"
  },
  id: LocaleCode.SpanishPeru,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Peru)",
  native_name: "Espa\xF1ol (Per\xFA)",
  rtl: false
});
({
  country: {
    code: CountryCode.PuertoRico,
    name: "Puerto Rico",
    native: "Puerto Rico"
  },
  id: LocaleCode.SpanishPuertoRico,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Puerto Rico)",
  native_name: "Espa\xF1ol (Puerto Rico)",
  rtl: false
});
({
  country: {
    code: CountryCode.Uruguay,
    name: "Uruguay",
    native: "Uruguay"
  },
  id: LocaleCode.SpanishUruguay,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Uruguay)",
  native_name: "Espa\xF1ol (Uruguay)",
  rtl: false
});
({
  country: {
    code: CountryCode.Venezuela,
    name: "Venezuela",
    native: "Venezuela"
  },
  id: LocaleCode.SpanishVenezuela,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Venezuela)",
  native_name: "Espa\xF1ol (Venezuela)",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.SutuSouthAfrica,
  language: {
    code: LanguageCode.Sutu,
    name: "Sutu",
    native: "Sesotho"
  },
  name: "Sutu (South Africa)",
  native_name: "Sesotho (Afrika Borwa)",
  rtl: false
});
({
  id: LocaleCode.Swahili,
  language: {
    code: LanguageCode.Swahili,
    name: "Swahili",
    native: "Kiswahili"
  },
  name: "Swahili",
  native_name: "Kiswahili",
  rtl: false
});
({
  country: {
    code: CountryCode.Kenya,
    name: "Kenya",
    native: "Kenya"
  },
  id: LocaleCode.SwahiliKenya,
  language: {
    code: LanguageCode.Swahili,
    name: "Swahili",
    native: "Kiswahili"
  },
  name: "Swahili (Kenya)",
  native_name: "Kiswahili (Kenya)",
  rtl: false
});
({
  id: LocaleCode.Swedish,
  language: {
    code: LanguageCode.Swedish,
    name: "Swedish",
    native: "Svenska"
  },
  name: "Swedish",
  native_name: "Svenska",
  rtl: false
});
({
  country: {
    code: CountryCode.Finland,
    name: "Finland",
    native: "Suomi"
  },
  id: LocaleCode.SwedishFinland,
  language: {
    code: LanguageCode.Swedish,
    name: "Swedish",
    native: "Svenska"
  },
  name: "Swedish (Finland)",
  native_name: "Svenska (Finland)",
  rtl: false
});
({
  country: {
    code: CountryCode.Sweden,
    name: "Sweden",
    native: "Sverige"
  },
  id: LocaleCode.SwedishSweden,
  language: {
    code: LanguageCode.Swedish,
    name: "Swedish",
    native: "Svenska"
  },
  name: "Swedish (Sweden)",
  native_name: "Svenska (Sverige)",
  rtl: false
});
({
  id: LocaleCode.Syriac,
  language: {
    code: LanguageCode.Syriac,
    name: "Syriac",
    native: "\u0723\u0718\u072A\u071D\u071D\u0710"
  },
  name: "Syriac",
  native_name: "\u0723\u0718\u072A\u071D\u071D\u0710",
  rtl: true
});
({
  country: {
    code: CountryCode.Syria,
    name: "Syria",
    native: "\u0633\u0648\u0631\u064A\u0627"
  },
  id: LocaleCode.SyriacSyria,
  language: {
    code: LanguageCode.Syriac,
    name: "Syriac",
    native: "\u0723\u0718\u072A\u071D\u071D\u0710"
  },
  name: "Syriac (Syria)",
  native_name: "\u0723\u0718\u072A\u071D\u071D\u0710 (\u0633\u0648\u0631\u064A\u0627)",
  rtl: true
});
({
  id: LocaleCode.Tajik,
  language: {
    code: LanguageCode.Tajik,
    name: "Tajik",
    native: "\u0422\u043E\u04B7\u0438\u043A\u04E3"
  },
  name: "Tajik",
  native_name: "\u0422\u043E\u04B7\u0438\u043A\u04E3",
  rtl: false
});
({
  country: {
    code: CountryCode.Tajikistan,
    name: "Tajikistan",
    native: "\u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D"
  },
  id: LocaleCode.TajikTajikistan,
  language: {
    code: LanguageCode.Tajik,
    name: "Tajik",
    native: "\u0422\u043E\u04B7\u0438\u043A\u04E3"
  },
  name: "Tajik (Tajikistan)",
  native_name: "\u0422\u043E\u04B7\u0438\u043A\u04E3 (\u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D)",
  rtl: false
});
({
  id: LocaleCode.Tagalog,
  language: {
    code: LanguageCode.Tagalog,
    name: "Tagalog",
    native: "Tagalog"
  },
  name: "Tagalog",
  native_name: "Tagalog",
  rtl: false
});
({
  country: {
    code: CountryCode.Philippines,
    name: "Philippines",
    native: "Pilipinas"
  },
  id: LocaleCode.TagalogPhilippines,
  language: {
    code: LanguageCode.Tagalog,
    name: "Tagalog",
    native: "Tagalog"
  },
  name: "Tagalog (Philippines)",
  native_name: "Tagalog (Pilipinas)",
  rtl: false
});
({
  id: LocaleCode.Tamil,
  language: {
    code: LanguageCode.Tamil,
    name: "Tamil",
    native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD"
  },
  name: "Tamil",
  native_name: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
  },
  id: LocaleCode.TamilIndia,
  language: {
    code: LanguageCode.Tamil,
    name: "Tamil",
    native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD"
  },
  name: "Tamil (India)",
  native_name: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD (\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE)",
  rtl: false
});
({
  id: LocaleCode.Telugu,
  language: {
    code: LanguageCode.Telugu,
    name: "Telugu",
    native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"
  },
  name: "Telugu",
  native_name: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0C2D\u0C3E\u0C30\u0C24\u0C26\u0C47\u0C36\u0C02"
  },
  id: LocaleCode.TeluguIndia,
  language: {
    code: LanguageCode.Telugu,
    name: "Telugu",
    native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"
  },
  name: "Telugu (India)",
  native_name: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 (\u0C2D\u0C3E\u0C30\u0C24\u0C26\u0C47\u0C36\u0C02)",
  rtl: false
});
({
  id: LocaleCode.Thai,
  language: {
    code: LanguageCode.Thai,
    name: "Thai",
    native: "\u0E44\u0E17\u0E22"
  },
  name: "Thai",
  native_name: "\u0E44\u0E17\u0E22",
  rtl: false
});
({
  country: {
    code: CountryCode.Thailand,
    name: "Thailand",
    native: "\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22"
  },
  id: LocaleCode.ThaiThailand,
  language: {
    code: LanguageCode.Thai,
    name: "Thai",
    native: "\u0E44\u0E17\u0E22"
  },
  name: "Thai (Thailand)",
  native_name: "\u0E44\u0E17\u0E22 (\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22)",
  rtl: false
});
({
  id: LocaleCode.Tibetan,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42",
  rtl: false
});
({
  country: {
    code: CountryCode.China,
    name: "China",
    native: "\u4E2D\u56FD"
  },
  id: LocaleCode.TibetanChina,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan (China)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F62\u0F92\u0FB1\u0F0B\u0F53\u0F42)",
  rtl: false
});
({
  country: {
    code: CountryCode.Bhutan,
    name: "Bhutan",
    native: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB1\u0F72\u0F0B\u0F63\u0F7A\u0F53\u0F4C\u0F0D"
  },
  id: LocaleCode.TibetanBhutan,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan (Bhutan)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB1\u0F72\u0F0B\u0F63\u0F7A\u0F53\u0F4C\u0F0D)",
  rtl: false
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
  },
  id: LocaleCode.TibetanIndia,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan (India)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE)",
  rtl: false
});
({
  id: LocaleCode.Tsonga,
  language: {
    code: LanguageCode.Tsonga,
    name: "Tsonga",
    native: "Xitsonga"
  },
  name: "Tsonga",
  native_name: "Xitsonga",
  rtl: false
});
({
  id: LocaleCode.Tswana,
  language: {
    code: LanguageCode.Tswana,
    name: "Tswana",
    native: "Setswana"
  },
  name: "Tswana",
  native_name: "Setswana",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.TswanaSouthAfrica,
  language: {
    code: LanguageCode.Tswana,
    name: "Tswana",
    native: "Setswana"
  },
  name: "Tswana (South Africa)",
  native_name: "Setswana (South Africa)",
  rtl: false
});
({
  id: LocaleCode.Turkish,
  language: {
    code: LanguageCode.Turkish,
    name: "Turkish",
    native: "T\xFCrk\xE7e"
  },
  name: "Turkish",
  native_name: "T\xFCrk\xE7e",
  rtl: false
});
({
  country: {
    code: CountryCode.Turkey,
    name: "Turkey",
    native: "T\xFCrkiye"
  },
  id: LocaleCode.TurkishTurkey,
  language: {
    code: LanguageCode.Turkish,
    name: "Turkish",
    native: "T\xFCrk\xE7e"
  },
  name: "Turkish (Turkey)",
  native_name: "T\xFCrk\xE7e (T\xFCrkiye)",
  rtl: false
});
({
  id: LocaleCode.Ukrainian,
  language: {
    code: LanguageCode.Ukrainian,
    name: "Ukrainian",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"
  },
  name: "Ukrainian",
  native_name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  rtl: false
});
({
  country: {
    code: CountryCode.Ukraine,
    name: "Ukraine",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430"
  },
  id: LocaleCode.UkrainianUkraine,
  language: {
    code: LanguageCode.Ukrainian,
    name: "Ukrainian",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"
  },
  name: "Ukrainian (Ukraine)",
  native_name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 (\u0423\u043A\u0440\u0430\u0457\u043D\u0430)",
  rtl: false
});
({
  id: LocaleCode.Urdu,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu",
  native_name: "\u0627\u0631\u062F\u0648",
  rtl: true
});
({
  country: {
    code: CountryCode.Afghanistan,
    name: "Afghanistan",
    native: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.UrduAfghanistan,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu (Afghanistan)",
  native_name: "\u0627\u0631\u062F\u0648 (\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646)",
  rtl: true
});
({
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.UrduIndia,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu (India)",
  native_name: "\u0627\u0631\u062F\u0648 (\u092D\u093E\u0930\u0924)",
  rtl: true
});
({
  country: {
    code: CountryCode.Pakistan,
    name: "Pakistan",
    native: "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.UrduPakistan,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu (Pakistan)",
  native_name: "\u0627\u0631\u062F\u0648 (\u067E\u0627\u06A9\u0633\u062A\u0627\u0646)",
  rtl: true
});
({
  id: LocaleCode.Uzbek,
  language: {
    code: LanguageCode.Uzbek,
    name: "Uzbek",
    native: "O\u02BBzbekcha"
  },
  name: "Uzbek",
  native_name: "O\u02BBzbekcha",
  rtl: false
});
({
  country: {
    code: CountryCode.Uzbekistan,
    name: "Uzbekistan",
    native: "O\u02BBzbekiston"
  },
  id: LocaleCode.UzbekUzbekistan,
  language: {
    code: LanguageCode.Uzbek,
    name: "Uzbek",
    native: "O\u02BBzbekcha"
  },
  name: "Uzbek (Latin, Uzbekistan)",
  native_name: "O\u02BBzbekcha (O\u02BBzbekiston)",
  rtl: false
});
({
  country: {
    code: CountryCode.Uzbekistan,
    name: "Uzbekistan",
    native: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D"
  },
  id: LocaleCode.UzbekCyrillic,
  language: {
    code: LanguageCode.Uzbek,
    name: "Uzbek",
    native: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D"
  },
  name: "Uzbek (Cyrillic)",
  native_name: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D (\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D)",
  rtl: false
});
({
  id: LocaleCode.Vietnamese,
  language: {
    code: LanguageCode.Vietnamese,
    name: "Vietnamese",
    native: "Ti\u1EBFng Vi\u1EC7t"
  },
  name: "Vietnamese",
  native_name: "Ti\u1EBFng Vi\u1EC7t",
  rtl: false
});
({
  country: {
    code: CountryCode.Vietnam,
    name: "Vietnam",
    native: "Vi\u1EC7t Nam"
  },
  id: LocaleCode.VietnameseVietnam,
  language: {
    code: LanguageCode.Vietnamese,
    name: "Vietnamese",
    native: "Ti\u1EBFng Vi\u1EC7t"
  },
  name: "Vietnamese (Vietnam)",
  native_name: "Ti\u1EBFng Vi\u1EC7t (Vi\u1EC7t Nam)",
  rtl: false
});
({
  id: LocaleCode.Welsh,
  language: {
    code: LanguageCode.Welsh,
    name: "Welsh",
    native: "Cymraeg"
  },
  name: "Welsh",
  native_name: "Cymraeg",
  rtl: false
});
({
  country: {
    code: CountryCode.UnitedKingdom,
    name: "United Kingdom",
    native: "United Kingdom"
  },
  id: LocaleCode.WelshUnitedKingdom,
  language: {
    code: LanguageCode.Welsh,
    name: "Welsh",
    native: "Cymraeg"
  },
  name: "Welsh (United Kingdom)",
  native_name: "Cymraeg (United Kingdom)",
  rtl: false
});
({
  id: LocaleCode.Xhosa,
  language: {
    code: LanguageCode.Xhosa,
    name: "Xhosa",
    native: "isiXhosa"
  },
  name: "Xhosa",
  native_name: "isiXhosa",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.XhosaSouthAfrica,
  language: {
    code: LanguageCode.Xhosa,
    name: "Xhosa",
    native: "isiXhosa"
  },
  name: "Xhosa (South Africa)",
  native_name: "isiXhosa (South Africa)",
  rtl: false
});
({
  id: LocaleCode.Yiddish,
  language: {
    code: LanguageCode.Yiddish,
    name: "Yiddish",
    native: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9"
  },
  name: "Yiddish",
  native_name: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9",
  rtl: false
});
({
  id: LocaleCode.Yoruba,
  language: {
    code: LanguageCode.Yoruba,
    name: "Yoruba",
    native: "Yor\xF9b\xE1"
  },
  name: "Yoruba",
  native_name: "Yor\xF9b\xE1",
  rtl: false
});
({
  country: {
    code: CountryCode.Nigeria,
    name: "Nigeria",
    native: "Nigeria"
  },
  id: LocaleCode.YorubaNigeria,
  language: {
    code: LanguageCode.Yoruba,
    name: "Yoruba",
    native: "Yor\xF9b\xE1"
  },
  name: "Yoruba (Nigeria)",
  native_name: "Yor\xF9b\xE1 (Nigeria)",
  rtl: false
});
({
  id: LocaleCode.Zulu,
  language: {
    code: LanguageCode.Zulu,
    name: "Zulu",
    native: "isiZulu"
  },
  name: "Zulu",
  native_name: "isiZulu",
  rtl: false
});
({
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.ZuluSouthAfrica,
  language: {
    code: LanguageCode.Zulu,
    name: "Zulu",
    native: "isiZulu"
  },
  name: "Zulu (South Africa)",
  native_name: "isiZulu (South Africa)",
  rtl: false
});

({
  id: TimezoneRegions.AfricaAbidjan,
  name: "Africa/Abidjan",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaAccra,
  name: "Africa/Accra",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaAddisAbaba,
  name: "Africa/Addis_Ababa",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaAlgiers,
  name: "Africa/Algiers",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.AfricaAsmara,
  name: "Africa/Asmara",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaBamako,
  name: "Africa/Bamako",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaBangui,
  name: "Africa/Bangui",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaBanjul,
  name: "Africa/Banjul",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaBissau,
  name: "Africa/Bissau",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaBlantyre,
  name: "Africa/Blantyre",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaBrazzaville,
  name: "Africa/Brazzaville",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaBujumbura,
  name: "Africa/Bujumbura",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaCairo,
  name: "Africa/Cairo",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AfricaCasablanca,
  name: "Africa/Casablanca",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WesternEuropeanTime
});
({
  id: TimezoneRegions.AfricaCeuta,
  name: "Africa/Ceuta",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.AfricaConakry,
  name: "Africa/Conakry",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaDakar,
  name: "Africa/Dakar",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaDarEsSalaam,
  name: "Africa/Dar_es_Salaam",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaDjibouti,
  name: "Africa/Djibouti",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaDouala,
  name: "Africa/Douala",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaElAaiun,
  name: "Africa/El_Aaiun",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaFreetown,
  name: "Africa/Freetown",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaGaborone,
  name: "Africa/Gaborone",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaHarare,
  name: "Africa/Harare",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaJohannesburg,
  name: "Africa/Johannesburg",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.SouthAfricanStandardTime
});
({
  id: TimezoneRegions.AfricaJuba,
  name: "Africa/Juba",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaKampala,
  name: "Africa/Kampala",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaKhartoum,
  name: "Africa/Khartoum",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaKigali,
  name: "Africa/Kigali",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaKinshasa,
  name: "Africa/Kinshasa",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaLagos,
  name: "Africa/Lagos",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaLibreville,
  name: "Africa/Libreville",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaLome,
  name: "Africa/Lome",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaLuanda,
  name: "Africa/Luanda",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaLubumbashi,
  name: "Africa/Lubumbashi",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaLusaka,
  name: "Africa/Lusaka",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaMalabo,
  name: "Africa/Malabo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaMaputo,
  name: "Africa/Maputo",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
});
({
  id: TimezoneRegions.AfricaMaseru,
  name: "Africa/Maseru",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.SouthAfricanStandardTime
});
({
  id: TimezoneRegions.AfricaMbabane,
  name: "Africa/Mbabane",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.SouthAfricanStandardTime
});
({
  id: TimezoneRegions.AfricaMogadishu,
  name: "Africa/Mogadishu",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaMonrovia,
  name: "Africa/Monrovia",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaNairobi,
  name: "Africa/Nairobi",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.AfricaNdjamena,
  name: "Africa/Ndjamena",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaNiamey,
  name: "Africa/Niamey",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaNouakchott,
  name: "Africa/Nouakchott",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.AfricaOuagadougou,
  name: "Africa/Ouagadougou",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaPortoNovo,
  name: "Africa/Porto-Novo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AfricaSaoTome,
  name: "Africa/SaoTome",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaTripoli,
  name: "Africa/Tripoli",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaTunis,
  name: "Africa/Tunis",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AfricaWindhoek,
  name: "Africa/Windhoek",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.WestAfricaTime
});
({
  id: TimezoneRegions.AmericaAdak,
  name: "America/Adak",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
});
({
  id: TimezoneRegions.AmericaAnchorage,
  name: "America/Anchorage",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.AlaskaStandardTime
});
({
  id: TimezoneRegions.AmericaAnguilla,
  name: "America/Anguilla",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaAntigua,
  name: "America/Antigua",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaAraguaina,
  name: "America/Araguaina",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaArgentinaBuenosAires,
  name: "America/Argentina/Buenos_Aires",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaCatamarca,
  name: "America/Argentina/Catamarca",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaCordoba,
  name: "America/Argentina/Cordoba",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaJujuy,
  name: "America/Argentina/Jujuy",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaLaRioja,
  name: "America/Argentina/La_Rioja",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaMendoza,
  name: "America/Argentina/Mendoza",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaRioGallegos,
  name: "America/Argentina/Rio_Gallegos",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaSalta,
  name: "America/Argentina/Salta",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaSanJuan,
  name: "America/Argentina/San_Juan",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaSanLuis,
  name: "America/Argentina/San_Luis",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaTucuman,
  name: "America/Argentina/Tucuman",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaArgentinaUshuaia,
  name: "America/Argentina/Ushuaia",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaAruba,
  name: "America/Aruba",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaAsuncion,
  name: "America/Asuncion",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.ParaguayTime
});
({
  id: TimezoneRegions.AmericaAtikokan,
  name: "America/Atikokan",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaAtka,
  name: "America/Atka",
  offset: TimezoneOffset.UTC_MINUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
});
({
  id: TimezoneRegions.AmericaBahia,
  name: "America/Bahia",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaBahiaBanderas,
  name: "America/Bahia_Banderas",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaBarbados,
  name: "America/Barbados",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaBelem,
  name: "America/Belem",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaBelize,
  name: "America/Belize",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaBlancSablon,
  name: "America/Blanc-Sablon",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaBoaVista,
  name: "America/Boa_Vista",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
});
({
  id: TimezoneRegions.AmericaBogota,
  name: "America/Bogota",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.ColombiaTime
});
({
  id: TimezoneRegions.AmericaBoise,
  name: "America/Boise",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaCambridgeBay,
  name: "America/Cambridge_Bay",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaCampoGrande,
  name: "America/Campo_Grande",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
});
({
  id: TimezoneRegions.AmericaCancun,
  name: "America/Cancun",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaCaracas,
  name: "America/Caracas",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.VenezuelaStandardTime
});
({
  id: TimezoneRegions.AmericaCayenne,
  name: "America/Cayenne",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.FrenchGuianaTime
});
({
  id: TimezoneRegions.AmericaCayman,
  name: "America/Cayman",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaChicago,
  name: "America/Chicago",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaChihuahua,
  name: "America/Chihuahua",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaCoralHarbour,
  name: "America/Coral_Harbour",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaCordoba,
  name: "America/Cordoba",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
});
({
  id: TimezoneRegions.AmericaCostaRica,
  name: "America/Costa_Rica",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaCreston,
  name: "America/Creston",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaCuiaba,
  name: "America/Cuiaba",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
});
({
  id: TimezoneRegions.AmericaCuracao,
  name: "America/Curacao",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaDanmarkshavn,
  name: "America/Danmarkshavn",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.AmericaDawson,
  name: "America/Dawson",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
});
({
  id: TimezoneRegions.AmericaDawsonCreek,
  name: "America/Dawson_Creek",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
});
({
  id: TimezoneRegions.AmericaDenver,
  name: "America/Denver",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaDetroit,
  name: "America/Detroit",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaDominica,
  name: "America/Dominica",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaEdmonton,
  name: "America/Edmonton",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaEirunepe,
  name: "America/Eirunepe",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.AcreTime
});
({
  id: TimezoneRegions.AmericaElSalvador,
  name: "America/El_Salvador",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaFortaleza,
  name: "America/Fortaleza",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaGlaceBay,
  name: "America/Glace_Bay",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaGodthab,
  name: "America/Godthab",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.WestGreenlandTime
});
({
  id: TimezoneRegions.AmericaGooseBay,
  name: "America/Goose_Bay",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaGrandTurk,
  name: "America/Grand_Turk",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaGrenada,
  name: "America/Grenada",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaGuadeloupe,
  name: "America/Guadeloupe",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaGuatemala,
  name: "America/Guatemala",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaGuayaquil,
  name: "America/Guayaquil",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EcuadorTime
});
({
  id: TimezoneRegions.AmericaGuyana,
  name: "America/Guyana",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaHalifax,
  name: "America/Halifax",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaHavana,
  name: "America/Havana",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.CubaStandardTime
});
({
  id: TimezoneRegions.AmericaHermosillo,
  name: "America/Hermosillo",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaIndianapolis,
  name: "America/Indiana/Indianapolis",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaKnox,
  name: "America/Indiana/Knox",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaMarengo,
  name: "America/Indiana/Marengo",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaPetersburg,
  name: "America/Indiana/Petersburg",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaTellCity,
  name: "America/Indiana/Tell_City",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaVevay,
  name: "America/Indiana/Vevay",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaVincennes,
  name: "America/Indiana/Vincennes",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaIndianaWinamac,
  name: "America/Indiana/Winamac",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaInuvik,
  name: "America/Inuvik",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaIqaluit,
  name: "America/Iqaluit",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaJamaica,
  name: "America/Jamaica",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaJuneau,
  name: "America/Juneau",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
});
({
  id: TimezoneRegions.AmericaKentuckyLouisville,
  name: "America/Kentucky/Louisville",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaKentuckyMonticello,
  name: "America/Kentucky/Monticello",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaKralendijk,
  name: "America/Kralendijk",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaLaPaz,
  name: "America/La_Paz",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.BoliviaTime
});
({
  id: TimezoneRegions.AmericaLima,
  name: "America/Lima",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.PeruTime
});
({
  id: TimezoneRegions.AmericaLosAngeles,
  name: "America/Los_Angeles",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
});
({
  id: TimezoneRegions.AmericaLouisville,
  name: "America/Louisville",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaLowerPrinces,
  name: "America/Lower_Princes",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaMaceio,
  name: "America/Maceio",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaManagua,
  name: "America/Managua",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaManaus,
  name: "America/Manaus",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
});
({
  id: TimezoneRegions.AmericaMarigot,
  name: "America/Marigot",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaMartinique,
  name: "America/Martinique",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaMatamoros,
  name: "America/Matamoros",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaMazatlan,
  name: "America/Mazatlan",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaMenominee,
  name: "America/Menominee",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaMerida,
  name: "America/Merida",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaMetlakatla,
  name: "America/Metlakatla",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
});
({
  id: TimezoneRegions.AmericaMexicoCity,
  name: "America/Mexico_City",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaMiquelon,
  name: "America/Miquelon",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.SaintPierreAndMiquelonStandardTime
});
({
  id: TimezoneRegions.AmericaMoncton,
  name: "America/Moncton",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaMonterrey,
  name: "America/Monterrey",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaMontevideo,
  name: "America/Montevideo",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.UruguayStandardTime
});
({
  id: TimezoneRegions.AmericaMontreal,
  name: "America/Montreal",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaMontserrat,
  name: "America/Montserrat",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaNassau,
  name: "America/Nassau",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaNewYork,
  name: "America/New_York",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaNipigon,
  name: "America/Nipigon",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaNome,
  name: "America/Nome",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
});
({
  id: TimezoneRegions.AmericaNoronha,
  name: "America/Noronha",
  offset: TimezoneOffset.UTC_MINUS_2,
  timezone: Timezones.FernandoDeNoronhaTime
});
({
  id: TimezoneRegions.AmericaNorthDakotaBeulah,
  name: "America/North_Dakota/Beulah",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaNorthDakotaCenter,
  name: "America/North_Dakota/Center",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaNorthDakotaNewSalem,
  name: "America/North_Dakota/New_Salem",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaOjinaga,
  name: "America/Ojinaga",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaPanama,
  name: "America/Panama",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaPangnirtung,
  name: "America/Pangnirtung",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaParamaribo,
  name: "America/Paramaribo",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.SurinameTime
});
({
  id: TimezoneRegions.AmericaPhoenix,
  name: "America/Phoenix",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaPortAuPrince,
  name: "America/Port-au-Prince",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaPortOfSpain,
  name: "America/Port_of_Spain",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaPortoVelho,
  name: "America/Porto_Velho",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
});
({
  id: TimezoneRegions.AmericaPuertoRico,
  name: "America/Puerto_Rico",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaRainyRiver,
  name: "America/Rainy_River",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaRankinInlet,
  name: "America/Rankin_Inlet",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaRecife,
  name: "America/Recife",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaRegina,
  name: "America/Regina",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaResolute,
  name: "America/Resolute",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaRioBranco,
  name: "America/Rio_Branco",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.AcreTime
});
({
  id: TimezoneRegions.AmericaSantaIsabel,
  name: "America/Santa_Isabel",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
});
({
  id: TimezoneRegions.AmericaSantarem,
  name: "America/Santarem",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaSantiago,
  name: "America/Santiago",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.ChileStandardTime
});
({
  id: TimezoneRegions.AmericaSantoDomingo,
  name: "America/Santo_Domingo",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaSaoPaulo,
  name: "America/Sao_Paulo",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
});
({
  id: TimezoneRegions.AmericaScoresbysund,
  name: "America/Scoresbysund",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.EasternGreenlandTime
});
({
  id: TimezoneRegions.AmericaShiprock,
  name: "America/Shiprock",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AmericaSitka,
  name: "America/Sitka",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
});
({
  id: TimezoneRegions.AmericaStBarthelemy,
  name: "America/St_Barthelemy",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaStJohns,
  name: "America/St_Johns",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.NewfoundlandStandardTime
});
({
  id: TimezoneRegions.AmericaStKitts,
  name: "America/St_Kitts",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaStLucia,
  name: "America/St_Lucia",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaStThomas,
  name: "America/St_Thomas",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaStVincent,
  name: "America/St_Vincent",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaSwiftCurrent,
  name: "America/Swift_Current",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaTegucigalpa,
  name: "America/Tegucigalpa",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaThule,
  name: "America/Thule",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaThunderBay,
  name: "America/Thunder_Bay",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaTijuana,
  name: "America/Tijuana",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
});
({
  id: TimezoneRegions.AmericaToronto,
  name: "America/Toronto",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
});
({
  id: TimezoneRegions.AmericaTortola,
  name: "America/Tortola",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AmericaVancouver,
  name: "America/Vancouver",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
});
({
  id: TimezoneRegions.AmericaWhitehorse,
  name: "America/Whitehorse",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
});
({
  id: TimezoneRegions.AmericaWinnipeg,
  name: "America/Winnipeg",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AmericaYakutat,
  name: "America/Yakutat",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
});
({
  id: TimezoneRegions.AmericaYellowknife,
  name: "America/Yellowknife",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.MountainStandardTime
});
({
  id: TimezoneRegions.AntarcticaCasey,
  name: "Antarctica/Casey",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.WesternStandardTime
});
({
  id: TimezoneRegions.AntarcticaDavis,
  name: "Antarctica/Davis",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.NewfoundlandStandardTime
});
({
  id: TimezoneRegions.AntarcticaDumontDUrville,
  name: "Antarctica/DumontDUrville",
  offset: TimezoneOffset.UTC_MINUS_10,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AntarcticaMacquarie,
  name: "Antarctica/Macquarie",
  offset: TimezoneOffset.UTC_MINUS_11,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AntarcticaMawson,
  name: "Antarctica/Mawson",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AntarcticaMcMurdo,
  name: "Antarctica/McMurdo",
  offset: TimezoneOffset.UTC_MINUS_12,
  timezone: Timezones.NewZealandStandardTime
});
({
  id: TimezoneRegions.AntarcticaPalmer,
  name: "Antarctica/Palmer",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.ChathamStandardTime
});
({
  id: TimezoneRegions.AntarcticaRothera,
  name: "Antarctica/Rothera",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.RotheraResearchStationTime
});
({
  id: TimezoneRegions.AntarcticaSyowa,
  name: "Antarctica/Syowa",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ShowaStationTime
});
({
  id: TimezoneRegions.AntarcticaTroll,
  name: "Antarctica/Troll",
  offset: TimezoneOffset.UTC_MINUS_2,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.AntarcticaVostok,
  name: "Antarctica/Vostok",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
});
({
  id: TimezoneRegions.ArcticLongyearbyen,
  name: "Arctic/Longyearbyen",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.AsiaAden,
  name: "Asia/Aden",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
});
({
  id: TimezoneRegions.AsiaAlmaty,
  name: "Asia/Almaty",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.AlmaAtaTime
});
({
  id: TimezoneRegions.AsiaAmman,
  name: "Asia/Amman",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AsiaAnadyr,
  name: "Asia/Anadyr",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.NewCaledoniaTime
});
({
  id: TimezoneRegions.AsiaAqtau,
  name: "Asia/Aqtau",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.AqtobeTime
});
({
  id: TimezoneRegions.AsiaAqtobe,
  name: "Asia/Aqtobe",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.AqtobeTime
});
({
  id: TimezoneRegions.AsiaAshgabat,
  name: "Asia/Ashgabat",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.TurkmenistanTime
});
({
  id: TimezoneRegions.AsiaBaghdad,
  name: "Asia/Baghdad",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
});
({
  id: TimezoneRegions.AsiaBahrain,
  name: "Asia/Bahrain",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
});
({
  id: TimezoneRegions.AsiaBaku,
  name: "Asia/Baku",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.AzerbaijanTime
});
({
  id: TimezoneRegions.AsiaBangkok,
  name: "Asia/Bangkok",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
});
({
  id: TimezoneRegions.AsiaBarnaul,
  name: "Asia/Barnaul",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.KrasnoyarskTime
});
({
  id: TimezoneRegions.AsiaBeirut,
  name: "Asia/Beirut",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AsiaBishkek,
  name: "Asia/Bishkek",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.KyrgyzstanTime
});
({
  id: TimezoneRegions.AsiaBrunei,
  name: "Asia/Brunei",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.BruneiTime
});
({
  id: TimezoneRegions.AsiaChita,
  name: "Asia/Chita",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.YakutskTime
});
({
  id: TimezoneRegions.AsiaChoibalsan,
  name: "Asia/Choibalsan",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChoibalsanStandardTime
});
({
  id: TimezoneRegions.AsiaColombo,
  name: "Asia/Colombo",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.IndianStandardTime
});
({
  id: TimezoneRegions.AsiaDamascus,
  name: "Asia/Damascus",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AsiaDhaka,
  name: "Asia/Dhaka",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.BangladeshStandardTime
});
({
  id: TimezoneRegions.AsiaDili,
  name: "Asia/Dili",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.JapanStandardTime
});
({
  id: TimezoneRegions.AsiaDubai,
  name: "Asia/Dubai",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.GulfStandardTime
});
({
  id: TimezoneRegions.AsiaDushanbe,
  name: "Asia/Dushanbe",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.TajikistanTime
});
({
  id: TimezoneRegions.AsiaFamagusta,
  name: "Asia/Famagusta",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AsiaGaza,
  name: "Asia/Gaza",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AsiaHebron,
  name: "Asia/Hebron",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AsiaHoChiMinh,
  name: "Asia/Ho_Chi_Minh",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
});
({
  id: TimezoneRegions.AsiaHongKong,
  name: "Asia/Hong_Kong",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.HongKongTime
});
({
  id: TimezoneRegions.AsiaHovd,
  name: "Asia/Hovd",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.HovdTime
});
({
  id: TimezoneRegions.AsiaIrkutsk,
  name: "Asia/Irkutsk",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.IrkutskTime
});
({
  id: TimezoneRegions.AsiaJakarta,
  name: "Asia/Jakarta",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.WesternIndonesianTime
});
({
  id: TimezoneRegions.AsiaJayapura,
  name: "Asia/Jayapura",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.JapanStandardTime
});
({
  id: TimezoneRegions.AsiaJerusalem,
  name: "Asia/Jerusalem",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.AsiaKabul,
  name: "Asia/Kabul",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.AfghanistanTime
});
({
  id: TimezoneRegions.AsiaKamchatka,
  name: "Asia/Kamchatka",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.KamchatkaTime
});
({
  id: TimezoneRegions.AsiaKarachi,
  name: "Asia/Karachi",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.PakistanStandardTime
});
({
  id: TimezoneRegions.AsiaKathmandu,
  name: "Asia/Kathmandu",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.NepalTime
});
({
  id: TimezoneRegions.AsiaKhandyga,
  name: "Asia/Khandyga",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.YakutskTime
});
({
  id: TimezoneRegions.AsiaKolkata,
  name: "Asia/Kolkata",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.IndianStandardTime
});
({
  id: TimezoneRegions.AsiaKrasnoyarsk,
  name: "Asia/Krasnoyarsk",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.KrasnoyarskTime
});
({
  id: TimezoneRegions.AsiaKualaLumpur,
  name: "Asia/Kuala_Lumpur",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.MalaysiaStandardTime
});
({
  id: TimezoneRegions.AsiaKuching,
  name: "Asia/Kuching",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.MalaysiaStandardTime
});
({
  id: TimezoneRegions.AsiaKuwait,
  name: "Asia/Kuwait",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
});
({
  id: TimezoneRegions.AsiaMacau,
  name: "Asia/Macau",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
});
({
  id: TimezoneRegions.AsiaMagadan,
  name: "Asia/Magadan",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.MagadanTime
});
({
  id: TimezoneRegions.AsiaMakassar,
  name: "Asia/Makassar",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.MalaysiaTime
});
({
  id: TimezoneRegions.AsiaManila,
  name: "Asia/Manila",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.PhilippineTime
});
({
  id: TimezoneRegions.AsiaMuscat,
  name: "Asia/Muscat",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.GulfStandardTime
});
({
  id: TimezoneRegions.AsiaNovokuznetsk,
  name: "Asia/Novokuznetsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.NovosibirskTime
});
({
  id: TimezoneRegions.AsiaNovosibirsk,
  name: "Asia/Novosibirsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.NovosibirskTime
});
({
  id: TimezoneRegions.AsiaOmsk,
  name: "Asia/Omsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.OmskTime
});
({
  id: TimezoneRegions.AsiaOral,
  name: "Asia/Oral",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.OralTime
});
({
  id: TimezoneRegions.AsiaPhnomPenh,
  name: "Asia/Phnom_Penh",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
});
({
  id: TimezoneRegions.AsiaPontianak,
  name: "Asia/Pontianak",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.WesternIndonesianTime
});
({
  id: TimezoneRegions.AsiaPyongyang,
  name: "Asia/Pyongyang",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.KoreaStandardTime
});
({
  id: TimezoneRegions.AsiaQatar,
  name: "Asia/Qatar",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
});
({
  id: TimezoneRegions.AsiaQyzylorda,
  name: "Asia/Qyzylorda",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.WestKazakhstanTime
});
({
  id: TimezoneRegions.AsiaRangoon,
  name: "Asia/Rangoon",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.MyanmarStandardTime
});
({
  id: TimezoneRegions.AsiaRiyadh,
  name: "Asia/Riyadh",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
});
({
  id: TimezoneRegions.AsiaSakhalin,
  name: "Asia/Sakhalin",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SakhalinIslandTime
});
({
  id: TimezoneRegions.AsiaSamarkand,
  name: "Asia/Samarkand",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.UzbekistanTime
});
({
  id: TimezoneRegions.AsiaSeoul,
  name: "Asia/Seoul",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.KoreaStandardTime
});
({
  id: TimezoneRegions.AsiaShanghai,
  name: "Asia/Shanghai",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
});
({
  id: TimezoneRegions.AsiaSingapore,
  name: "Asia/Singapore",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.SingaporeStandardTime
});
({
  id: TimezoneRegions.AsiaSrednekolymsk,
  name: "Asia/Srednekolymsk",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SrednekolymskTime
});
({
  id: TimezoneRegions.AsiaTaipei,
  name: "Asia/Taipei",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
});
({
  id: TimezoneRegions.AsiaTashkent,
  name: "Asia/Tashkent",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.UzbekistanTime
});
({
  id: TimezoneRegions.AsiaTbilisi,
  name: "Asia/Tbilisi",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.GeorgiaStandardTime
});
({
  id: TimezoneRegions.AsiaTehran,
  name: "Asia/Tehran",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.IranStandardTime
});
({
  id: TimezoneRegions.AsiaThimphu,
  name: "Asia/Thimphu",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.BhutanTime
});
({
  id: TimezoneRegions.AsiaTokyo,
  name: "Asia/Tokyo",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.JapanStandardTime
});
({
  id: TimezoneRegions.AsiaTomsk,
  name: "Asia/Tomsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.KrasnoyarskTime
});
({
  id: TimezoneRegions.AsiaUlaanbaatar,
  name: "Asia/Ulaanbaatar",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.UlaanbaatarStandardTime
});
({
  id: TimezoneRegions.AsiaUrumqi,
  name: "Asia/Urumqi",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
});
({
  id: TimezoneRegions.AsiaUstNera,
  name: "Asia/Ust-Nera",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.VladivostokTime
});
({
  id: TimezoneRegions.AsiaVientiane,
  name: "Asia/Vientiane",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
});
({
  id: TimezoneRegions.AsiaVladivostok,
  name: "Asia/Vladivostok",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.VladivostokTime
});
({
  id: TimezoneRegions.AsiaYakutsk,
  name: "Asia/Yakutsk",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.YakutskTime
});
({
  id: TimezoneRegions.AsiaYekaterinburg,
  name: "Asia/Yekaterinburg",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.YekaterinburgTime
});
({
  id: TimezoneRegions.AsiaYerevan,
  name: "Asia/Yerevan",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.ArmeniaTime
});
({
  id: TimezoneRegions.AtlanticAzores,
  name: "Atlantic/Azores",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.AzoresStandardTime
});
({
  id: TimezoneRegions.AtlanticBermuda,
  name: "Atlantic/Bermuda",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
});
({
  id: TimezoneRegions.AtlanticCanary,
  name: "Atlantic/Canary",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.WesternEuropeanTime
});
({
  id: TimezoneRegions.AtlanticCapeVerde,
  name: "Atlantic/Cape_Verde",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CapeVerdeTime
});
({
  id: TimezoneRegions.AtlanticFaroe,
  name: "Atlantic/Faroe",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.AtlanticMadeira,
  name: "Atlantic/Madeira",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.WesternEuropeanTime
});
({
  id: TimezoneRegions.AtlanticReykjavik,
  name: "Atlantic/Reykjavik",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.AtlanticSouthGeorgia,
  name: "Atlantic/South_Georgia",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
});
({
  id: TimezoneRegions.AtlanticStHelena,
  name: "Atlantic/St_Helena",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.AtlanticStanley,
  name: "Atlantic/Stanley",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.FalklandIslandsTime
});
({
  id: TimezoneRegions.AustraliaAdelaide,
  name: "Australia/Adelaide",
  offset: TimezoneOffset.UTC_PLUS_9_30,
  timezone: Timezones.AustralianCentralStandardTime
});
({
  id: TimezoneRegions.AustraliaBrisbane,
  name: "Australia/Brisbane",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
});
({
  id: TimezoneRegions.AustraliaBrokenHill,
  name: "Australia/Broken_Hill",
  offset: TimezoneOffset.UTC_PLUS_9_30,
  timezone: Timezones.AustralianCentralStandardTime
});
({
  id: TimezoneRegions.AustraliaCanberra,
  name: "Australia/Canberra",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
});
({
  id: TimezoneRegions.AustraliaCurrie,
  name: "Australia/Currie",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
});
({
  id: TimezoneRegions.AustraliaDarwin,
  name: "Australia/Darwin",
  offset: TimezoneOffset.UTC_PLUS_9_30,
  timezone: Timezones.AustralianCentralStandardTime
});
({
  id: TimezoneRegions.AustraliaEucla,
  name: "Australia/Eucla",
  offset: TimezoneOffset.UTC_PLUS_8_45,
  timezone: Timezones.AustralianCentralWesternStandardTime
});
({
  id: TimezoneRegions.AustraliaHobart,
  name: "Australia/Hobart",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
});
({
  id: TimezoneRegions.AustraliaLindeman,
  name: "Australia/Lindeman",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
});
({
  id: TimezoneRegions.AustraliaLordHowe,
  name: "Australia/Lord_Howe",
  offset: TimezoneOffset.UTC_PLUS_10_30,
  timezone: Timezones.LordHoweStandardTime
});
({
  id: TimezoneRegions.AustraliaMelbourne,
  name: "Australia/Melbourne",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
});
({
  id: TimezoneRegions.AustraliaPerth,
  name: "Australia/Perth",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.AustralianWesternStandardTime
});
({
  id: TimezoneRegions.AustraliaSydney,
  name: "Australia/Sydney",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
});
({
  id: TimezoneRegions.EuropeAmsterdam,
  name: "Europe/Amsterdam",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeAndorra,
  name: "Europe/Andorra",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeAthens,
  name: "Europe/Athens",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeBelgrade,
  name: "Europe/Belgrade",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeBerlin,
  name: "Europe/Berlin",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeBratislava,
  name: "Europe/Bratislava",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeBrussels,
  name: "Europe/Brussels",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeBucharest,
  name: "Europe/Bucharest",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeBudapest,
  name: "Europe/Budapest",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeBusingen,
  name: "Europe/Busingen",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeChisinau,
  name: "Europe/Chisinau",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeCopenhagen,
  name: "Europe/Copenhagen",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeDublin,
  name: "Europe/Dublin",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.EuropeGibraltar,
  name: "Europe/Gibraltar",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeGuernsey,
  name: "Europe/Guernsey",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeHelsinki,
  name: "Europe/Helsinki",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeIsleOfMan,
  name: "Europe/Isle_of_Man",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.EuropeIstanbul,
  name: "Europe/Istanbul",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeJersey,
  name: "Europe/Jersey",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeKaliningrad,
  name: "Europe/Kaliningrad",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeKiev,
  name: "Europe/Kiev",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeLisbon,
  name: "Europe/Lisbon",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.EuropeLjubljana,
  name: "Europe/Ljubljana",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeLondon,
  name: "Europe/London",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
});
({
  id: TimezoneRegions.EuropeLuxembourg,
  name: "Europe/Luxembourg",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeMadrid,
  name: "Europe/Madrid",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeMalta,
  name: "Europe/Malta",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeMariehamn,
  name: "Europe/Mariehamn",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeMinsk,
  name: "Europe/Minsk",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeMonaco,
  name: "Europe/Monaco",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeMoscow,
  name: "Europe/Moscow",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeOslo,
  name: "Europe/Oslo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeParis,
  name: "Europe/Paris",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropePodgorica,
  name: "Europe/Podgorica",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropePrague,
  name: "Europe/Prague",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeRiga,
  name: "Europe/Riga",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeRome,
  name: "Europe/Rome",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeSamara,
  name: "Europe/Samara",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeSanMarino,
  name: "Europe/San_Marino",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeSarajevo,
  name: "Europe/Sarajevo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeSimferopol,
  name: "Europe/Simferopol",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeSkopje,
  name: "Europe/Skopje",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeSofia,
  name: "Europe/Sofia",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeStockholm,
  name: "Europe/Stockholm",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeTallinn,
  name: "Europe/Tallinn",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeTirane,
  name: "Europe/Tirane",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeUzhgorod,
  name: "Europe/Uzhgorod",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeVaduz,
  name: "Europe/Vaduz",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeVatican,
  name: "Europe/Vatican",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeVienna,
  name: "Europe/Vienna",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeVilnius,
  name: "Europe/Vilnius",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeVolgograd,
  name: "Europe/Volgograd",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeWarsaw,
  name: "Europe/Warsaw",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeZagreb,
  name: "Europe/Zagreb",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.EuropeZaporozhye,
  name: "Europe/Zaporozhye",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
});
({
  id: TimezoneRegions.EuropeZurich,
  name: "Europe/Zurich",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
});
({
  id: TimezoneRegions.IndianAntananarivo,
  name: "Indian/Antananarivo",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.IndianChagos,
  name: "Indian/Chagos",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.IndianOceanTime
});
({
  id: TimezoneRegions.IndianChristmas,
  name: "Indian/Christmas",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.ChristmasIslandTime
});
({
  id: TimezoneRegions.IndianCocos,
  name: "Indian/Cocos",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.CocosIslandsTime
});
({
  id: TimezoneRegions.IndianComoro,
  name: "Indian/Comoro",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.IndianKerguelen,
  name: "Indian/Kerguelen",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.FrenchSouthernAndAntarcticTime
});
({
  id: TimezoneRegions.IndianMahe,
  name: "Indian/Mahe",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.SeychellesTime
});
({
  id: TimezoneRegions.IndianMaldives,
  name: "Indian/Maldives",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.MaldivesTime
});
({
  id: TimezoneRegions.IndianMauritius,
  name: "Indian/Mauritius",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.MauritiusTime
});
({
  id: TimezoneRegions.IndianMayotte,
  name: "Indian/Mayotte",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
});
({
  id: TimezoneRegions.IndianReunion,
  name: "Indian/Reunion",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.ReunionTime
});
({
  id: TimezoneRegions.PacificApia,
  name: "Pacific/Apia",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.SamoaStandardTime
});
({
  id: TimezoneRegions.PacificAuckland,
  name: "Pacific/Auckland",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.NewZealandStandardTime
});
({
  id: TimezoneRegions.PacificChatham,
  name: "Pacific/Chatham",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.ChathamStandardTime
});
({
  id: TimezoneRegions.PacificEaster,
  name: "Pacific/Easter",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.EasterIslandStandardTime
});
({
  id: TimezoneRegions.PacificEfate,
  name: "Pacific/Efate",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.VanuatuTime
});
({
  id: TimezoneRegions.PacificEnderbury,
  name: "Pacific/Enderbury",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.TongaTime
});
({
  id: TimezoneRegions.PacificFakaofo,
  name: "Pacific/Fakaofo",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.TongaTime
});
({
  id: TimezoneRegions.PacificFiji,
  name: "Pacific/Fiji",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.FijiTime
});
({
  id: TimezoneRegions.PacificFunafuti,
  name: "Pacific/Funafuti",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.TuvaluTime
});
({
  id: TimezoneRegions.PacificGalapagos,
  name: "Pacific/Galapagos",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.GalapagosTime
});
({
  id: TimezoneRegions.PacificGambier,
  name: "Pacific/Gambier",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.GambierIslandTime
});
({
  id: TimezoneRegions.PacificGuadalcanal,
  name: "Pacific/Guadalcanal",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SolomonIslandsTime
});
({
  id: TimezoneRegions.PacificGuam,
  name: "Pacific/Guam",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChamorroStandardTime
});
({
  id: TimezoneRegions.PacificHonolulu,
  name: "Pacific/Honolulu",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
});
({
  id: TimezoneRegions.PacificJohnston,
  name: "Pacific/Johnston",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
});
({
  id: TimezoneRegions.PacificKiritimati,
  name: "Pacific/Kiritimati",
  offset: TimezoneOffset.UTC_PLUS_14,
  timezone: Timezones.LineIslandsTime
});
({
  id: TimezoneRegions.PacificKosrae,
  name: "Pacific/Kosrae",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.KosraeTime
});
({
  id: TimezoneRegions.PacificKwajalein,
  name: "Pacific/Kwajalein",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.MarshallIslandsTime
});
({
  id: TimezoneRegions.PacificMajuro,
  name: "Pacific/Majuro",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.MarshallIslandsTime
});
({
  id: TimezoneRegions.PacificMarquesas,
  name: "Pacific/Marquesas",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.MarquesasIslandsTime
});
({
  id: TimezoneRegions.PacificMidway,
  name: "Pacific/Midway",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SamoaStandardTime
});
({
  id: TimezoneRegions.PacificNauru,
  name: "Pacific/Nauru",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.NauruTime
});
({
  id: TimezoneRegions.PacificNiue,
  name: "Pacific/Niue",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.NiueTime
});
({
  id: TimezoneRegions.PacificNorfolk,
  name: "Pacific/Norfolk",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.NorfolkIslandTime
});
({
  id: TimezoneRegions.PacificNoumea,
  name: "Pacific/Noumea",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.NewCaledoniaTime
});
({
  id: TimezoneRegions.PacificPagoPago,
  name: "Pacific/Pago_Pago",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SamoaStandardTime
});
({
  id: TimezoneRegions.PacificPalau,
  name: "Pacific/Palau",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.PalauTime
});
({
  id: TimezoneRegions.PacificPitcairn,
  name: "Pacific/Pitcairn",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.PitcairnTime
});
({
  id: TimezoneRegions.PacificPonape,
  name: "Pacific/Ponape",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.PohnpeiStandardTime
});
({
  id: TimezoneRegions.PacificPortMoresby,
  name: "Pacific/Port_Moresby",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.PapuaNewGuineaTime
});
({
  id: TimezoneRegions.PacificRarotonga,
  name: "Pacific/Rarotonga",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.CookIslandTime
});
({
  id: TimezoneRegions.PacificSaipan,
  name: "Pacific/Saipan",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChamorroStandardTime
});
({
  id: TimezoneRegions.PacificTahiti,
  name: "Pacific/Tahiti",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.TahitiTime
});
({
  id: TimezoneRegions.PacificTarawa,
  name: "Pacific/Tarawa",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.GilbertIslandTime
});
({
  id: TimezoneRegions.PacificTongatapu,
  name: "Pacific/Tongatapu",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.TongaTime
});
({
  id: TimezoneRegions.PacificChuuk,
  name: "Pacific/Chuuk",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChuukTime
});
({
  id: TimezoneRegions.PacificPohnpei,
  name: "Pacific/Pohnpei",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.PohnpeiStandardTime
});
({
  id: TimezoneRegions.PacificYap,
  name: "Pacific/Yap",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChuukTime
});

var Condition = /* @__PURE__ */ ((Condition2) => {
  Condition2["Contains"] = "contains";
  Condition2["HasCharacterCount"] = "has-character-count";
  Condition2["HasNumberCount"] = "has-number-count";
  Condition2["HasLetterCount"] = "has-letter-count";
  Condition2["HasLowercaseCount"] = "has-lowercase-count";
  Condition2["HasSpacesCount"] = "has-spaces-count";
  Condition2["HasSymbolCount"] = "has-symbol-count";
  Condition2["HasUppercaseCount"] = "has-uppercase-count";
  Condition2["IsAfter"] = "is-after";
  Condition2["IsAfterOrEqual"] = "is-after-or-equal";
  Condition2["IsAirport"] = "is-airport";
  Condition2["IsAlpha"] = "is-alpha";
  Condition2["IsAlphanumeric"] = "is-alphanumeric";
  Condition2["IsAlgorithmHash"] = "is-algorithm-hash";
  Condition2["IsAscii"] = "is-ascii";
  Condition2["IsBase64"] = "is-base-64";
  Condition2["IsBefore"] = "is-before";
  Condition2["IsBeforeOrAfter"] = "is-before-or-after";
  Condition2["IsBeforeOrEqual"] = "is-before-or-equal";
  Condition2["IsBetween"] = "is-between";
  Condition2["IsBIC"] = "is-bic";
  Condition2["IsBitcoinAddress"] = "is-bitcoin-address";
  Condition2["IsBoolean"] = "is-boolean";
  Condition2["IsColor"] = "is-color";
  Condition2["IsComplexEnough"] = "is-complex-enough";
  Condition2["IsCountry"] = "is-country";
  Condition2["IsCreditCard"] = "is-credit-card";
  Condition2["IsCurrency"] = "is-currency";
  Condition2["IsDataURI"] = "is-data-uri";
  Condition2["IsDate"] = "is-date";
  Condition2["IsDateRange"] = "is-date-range";
  Condition2["IsDateTime"] = "is-date-time";
  Condition2["IsDayOfMonth"] = "is-day-of-month";
  Condition2["IsDecimal"] = "is-decimal";
  Condition2["IsDivisibleBy"] = "is-divisible-by";
  Condition2["IsDomainName"] = "is-domain-name";
  Condition2["IsEmailAddress"] = "is-email-address";
  Condition2["IsEthereumAddress"] = "is-ethereum-address";
  Condition2["IsEAN"] = "is-ean";
  Condition2["IsEIN"] = "is-ein";
  Condition2["IsEqual"] = "is-equal";
  Condition2["IsEvenNumber"] = "is-even-number";
  Condition2["IsFloat"] = "is-float";
  Condition2["IsIBAN"] = "is-iban";
  Condition2["IsGreaterThan"] = "greater-than";
  Condition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  Condition2["IsHSLColor"] = "is-hsl-color";
  Condition2["IsHexColor"] = "is-hex-color";
  Condition2["IsHexadecimal"] = "is-hexadecimal";
  Condition2["IsIdentityCardCode"] = "is-identity-card-code";
  Condition2["IsIMEI"] = "is-imei";
  Condition2["IsInIPAddressRange"] = "is-in-ip-address-range";
  Condition2["IsInList"] = "is-in-list";
  Condition2["IsInTheLast"] = "is-in-the-last";
  Condition2["IsInteger"] = "is-integer";
  Condition2["IsIPAddress"] = "is-ip-address";
  Condition2["IsIPAddressRange"] = "is-ip-address-range";
  Condition2["IsISBN"] = "is-isbn";
  Condition2["IsISIN"] = "is-isin";
  Condition2["IsISMN"] = "is-ismn";
  Condition2["IsISRC"] = "is-isrc";
  Condition2["IsISSN"] = "is-issn";
  Condition2["IsISO4217"] = "is-iso-4217";
  Condition2["IsISO8601"] = "is-iso-8601";
  Condition2["IsISO31661Alpha2"] = "is-iso-31661-alpha-2";
  Condition2["IsISO31661Alpha3"] = "is-iso-31661-alpha-3";
  Condition2["IsJSON"] = "is-json";
  Condition2["IsLanguage"] = "is-language";
  Condition2["IsLatitude"] = "is-latitude";
  Condition2["IsLongitude"] = "is-longitude";
  Condition2["IsLengthEqual"] = "is-length-equal";
  Condition2["IsLengthGreaterThan"] = "is-length-greater-than";
  Condition2["IsLengthGreaterThanOrEqual"] = "is-length-great-than-or-equal";
  Condition2["IsLengthLessThan"] = "is-length-less-than";
  Condition2["IsLengthLessThanOrEqual"] = "is-length-less-than-or-equal";
  Condition2["IsLessThan"] = "less-than";
  Condition2["IsLessThanOrEqual"] = "less-than-or-equal";
  Condition2["IsLicensePlateNumber"] = "is-license-plate-number";
  Condition2["IsLowercase"] = "is-lowercase";
  Condition2["IsOctal"] = "is-octal";
  Condition2["IsMACAddress"] = "is-mac-address";
  Condition2["IsMD5"] = "is-md5";
  Condition2["IsMagnetURI"] = "is-magnet-uri";
  Condition2["IsMarkdown"] = "is-markdown";
  Condition2["IsMimeType"] = "is-mime-type";
  Condition2["IsMonth"] = "is-month";
  Condition2["IsNegativeNumber"] = "is-negative-number";
  Condition2["IsNotDate"] = "is-not-date";
  Condition2["IsNotEqual"] = "is-not-equal";
  Condition2["IsNotInIPAddressRange"] = "is-not-in-ip-address-range";
  Condition2["IsNotInList"] = "is-not-in-list";
  Condition2["IsNotNull"] = "is-not-null";
  Condition2["IsNotRegexMatch"] = "is-not-regex-match";
  Condition2["IsNotToday"] = "is-not-today";
  Condition2["IsNumber"] = "is-number";
  Condition2["IsNumeric"] = "is-numeric";
  Condition2["IsOddNumber"] = "is-odd-number";
  Condition2["IsPassportNumber"] = "is-passport-number";
  Condition2["IsPhoneNumber"] = "is-phone-number";
  Condition2["IsPort"] = "is-port";
  Condition2["IsPositiveNumber"] = "is-positive-number";
  Condition2["IsPostalCode"] = "is-postal-code";
  Condition2["IsProvince"] = "is-province";
  Condition2["IsRGBColor"] = "is-rgb-color";
  Condition2["IsRegexMatch"] = "is-regex-match";
  Condition2["IsRequired"] = "is-required";
  Condition2["IsSemanticVersion"] = "is-semantic-version";
  Condition2["IsSlug"] = "is-slug";
  Condition2["IsSSN"] = "is-ssn";
  Condition2["IsState"] = "is-state";
  Condition2["IsStreetAddress"] = "is-street-address";
  Condition2["IsString"] = "is-string";
  Condition2["IsStrongPassword"] = "is-strong-password";
  Condition2["IsTags"] = "is-tags";
  Condition2["IsTaxIDNumber"] = "is-tax-id-number";
  Condition2["IsThisMonth"] = "is-this-month";
  Condition2["IsThisQuarter"] = "is-this-quarter";
  Condition2["IsThisWeek"] = "is-this-week";
  Condition2["IsThisWeekend"] = "is-this-weekend";
  Condition2["IsThisYear"] = "is-this-year";
  Condition2["IsTime"] = "is-time";
  Condition2["IsTimeOfDay"] = "is-time-of-day";
  Condition2["IsTimeRange"] = "is-time-range";
  Condition2["IsToday"] = "is-today";
  Condition2["IsURL"] = "is-url";
  Condition2["IsUUID"] = "is-uuid";
  Condition2["IsUppercase"] = "is-uppercase";
  Condition2["IsUsernameAvailable"] = "is-username-available";
  Condition2["IsValidStreetAddress"] = "is-valid-street-address";
  Condition2["IsVATIDNumber"] = "is-vat-id-number";
  Condition2["IsWeekday"] = "is-weekday";
  Condition2["IsWeekend"] = "is-weekend";
  Condition2["IsYear"] = "is-year";
  return Condition2;
})(Condition || {});

var ColorCondition = ((ColorCondition2) => {
  ColorCondition2[ColorCondition2["IsHSLColor"] = Condition.IsHSLColor] = "IsHSLColor";
  ColorCondition2[ColorCondition2["IsHexColor"] = Condition.IsHexColor] = "IsHexColor";
  ColorCondition2[ColorCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  ColorCondition2[ColorCondition2["IsRGBColor"] = Condition.IsRGBColor] = "IsRGBColor";
  ColorCondition2[ColorCondition2["IsString"] = Condition.IsString] = "IsString";
  return ColorCondition2;
})(ColorCondition || {});

var AlgorithmHashCondition = ((AlgorithmHashCondition2) => {
  AlgorithmHashCondition2[AlgorithmHashCondition2["IsAlgorithmHash"] = Condition.IsAlgorithmHash] = "IsAlgorithmHash";
  AlgorithmHashCondition2[AlgorithmHashCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  AlgorithmHashCondition2[AlgorithmHashCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  AlgorithmHashCondition2[AlgorithmHashCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  AlgorithmHashCondition2[AlgorithmHashCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  AlgorithmHashCondition2[AlgorithmHashCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  AlgorithmHashCondition2[AlgorithmHashCondition2["IsString"] = Condition.IsString] = "IsString";
  return AlgorithmHashCondition2;
})(AlgorithmHashCondition || {});
var SemanticVersionCondition = ((SemanticVersionCondition2) => {
  SemanticVersionCondition2[SemanticVersionCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  SemanticVersionCondition2[SemanticVersionCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  SemanticVersionCondition2[SemanticVersionCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  SemanticVersionCondition2[SemanticVersionCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  SemanticVersionCondition2[SemanticVersionCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  SemanticVersionCondition2[SemanticVersionCondition2["IsSemanticVersion"] = Condition.IsSemanticVersion] = "IsSemanticVersion";
  SemanticVersionCondition2[SemanticVersionCondition2["IsString"] = Condition.IsString] = "IsString";
  return SemanticVersionCondition2;
})(SemanticVersionCondition || {});
var UUIDCondition = ((UUIDCondition2) => {
  UUIDCondition2[UUIDCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  UUIDCondition2[UUIDCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  UUIDCondition2[UUIDCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  UUIDCondition2[UUIDCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  UUIDCondition2[UUIDCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  UUIDCondition2[UUIDCondition2["IsString"] = Condition.IsString] = "IsString";
  UUIDCondition2[UUIDCondition2["IsUUID"] = Condition.IsUUID] = "IsUUID";
  return UUIDCondition2;
})(UUIDCondition || {});
var MD5Condition = ((MD5Condition2) => {
  MD5Condition2[MD5Condition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  MD5Condition2[MD5Condition2["IsInList"] = Condition.IsInList] = "IsInList";
  MD5Condition2[MD5Condition2["IsMD5"] = Condition.IsMD5] = "IsMD5";
  MD5Condition2[MD5Condition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  MD5Condition2[MD5Condition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  MD5Condition2[MD5Condition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  MD5Condition2[MD5Condition2["IsString"] = Condition.IsString] = "IsString";
  return MD5Condition2;
})(MD5Condition || {});

var BooleanCondition = ((BooleanCondition2) => {
  BooleanCondition2[BooleanCondition2["IsBoolean"] = Condition.IsBoolean] = "IsBoolean";
  BooleanCondition2[BooleanCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  BooleanCondition2[BooleanCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  BooleanCondition2[BooleanCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return BooleanCondition2;
})(BooleanCondition || {});

var DateCondition = ((DateCondition2) => {
  DateCondition2[DateCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  DateCondition2[DateCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  DateCondition2[DateCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  DateCondition2[DateCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  DateCondition2[DateCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  DateCondition2[DateCondition2["IsDate"] = Condition.IsDate] = "IsDate";
  DateCondition2[DateCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  DateCondition2[DateCondition2["IsNotDate"] = Condition.IsNotDate] = "IsNotDate";
  DateCondition2[DateCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  DateCondition2[DateCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  DateCondition2[DateCondition2["IsNotToday"] = Condition.IsNotToday] = "IsNotToday";
  DateCondition2[DateCondition2["IsThisWeek"] = Condition.IsThisWeek] = "IsThisWeek";
  DateCondition2[DateCondition2["IsThisMonth"] = Condition.IsThisMonth] = "IsThisMonth";
  DateCondition2[DateCondition2["IsThisQuarter"] = Condition.IsThisQuarter] = "IsThisQuarter";
  DateCondition2[DateCondition2["IsThisYear"] = Condition.IsThisYear] = "IsThisYear";
  DateCondition2[DateCondition2["IsToday"] = Condition.IsToday] = "IsToday";
  DateCondition2[DateCondition2["IsWeekend"] = Condition.IsWeekend] = "IsWeekend";
  return DateCondition2;
})(DateCondition || {});
var DateRangeCondition = ((DateRangeCondition2) => {
  DateRangeCondition2[DateRangeCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  DateRangeCondition2[DateRangeCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  DateRangeCondition2[DateRangeCondition2["IsBeforeOrAfter"] = Condition.IsBeforeOrAfter] = "IsBeforeOrAfter";
  DateRangeCondition2[DateRangeCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  DateRangeCondition2[DateRangeCondition2["IsDate"] = Condition.IsDate] = "IsDate";
  DateRangeCondition2[DateRangeCondition2["IsDateRange"] = Condition.IsDateRange] = "IsDateRange";
  DateRangeCondition2[DateRangeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  DateRangeCondition2[DateRangeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  DateRangeCondition2[DateRangeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return DateRangeCondition2;
})(DateRangeCondition || {});
var DateTimeCondition = ((DateTimeCondition2) => {
  DateTimeCondition2[DateTimeCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  DateTimeCondition2[DateTimeCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  DateTimeCondition2[DateTimeCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  DateTimeCondition2[DateTimeCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  DateTimeCondition2[DateTimeCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  DateTimeCondition2[DateTimeCondition2["IsDate"] = Condition.IsDate] = "IsDate";
  DateTimeCondition2[DateTimeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  DateTimeCondition2[DateTimeCondition2["IsNotDate"] = Condition.IsNotDate] = "IsNotDate";
  DateTimeCondition2[DateTimeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  DateTimeCondition2[DateTimeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  DateTimeCondition2[DateTimeCondition2["IsNotToday"] = Condition.IsNotToday] = "IsNotToday";
  DateTimeCondition2[DateTimeCondition2["IsThisWeek"] = Condition.IsThisWeek] = "IsThisWeek";
  DateTimeCondition2[DateTimeCondition2["IsThisMonth"] = Condition.IsThisMonth] = "IsThisMonth";
  DateTimeCondition2[DateTimeCondition2["IsThisQuarter"] = Condition.IsThisQuarter] = "IsThisQuarter";
  DateTimeCondition2[DateTimeCondition2["IsThisYear"] = Condition.IsThisYear] = "IsThisYear";
  DateTimeCondition2[DateTimeCondition2["IsToday"] = Condition.IsToday] = "IsToday";
  DateTimeCondition2[DateTimeCondition2["IsWeekend"] = Condition.IsWeekend] = "IsWeekend";
  return DateTimeCondition2;
})(DateTimeCondition || {});
var DayOfMonthCondition = ((DayOfMonthCondition2) => {
  DayOfMonthCondition2[DayOfMonthCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  DayOfMonthCondition2[DayOfMonthCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  DayOfMonthCondition2[DayOfMonthCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  DayOfMonthCondition2[DayOfMonthCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  DayOfMonthCondition2[DayOfMonthCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  DayOfMonthCondition2[DayOfMonthCondition2["IsDayOfMonth"] = Condition.IsDayOfMonth] = "IsDayOfMonth";
  DayOfMonthCondition2[DayOfMonthCondition2["IsEvenNumber"] = Condition.IsEvenNumber] = "IsEvenNumber";
  DayOfMonthCondition2[DayOfMonthCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  DayOfMonthCondition2[DayOfMonthCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  DayOfMonthCondition2[DayOfMonthCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  DayOfMonthCondition2[DayOfMonthCondition2["IsInteger"] = Condition.IsInteger] = "IsInteger";
  DayOfMonthCondition2[DayOfMonthCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  DayOfMonthCondition2[DayOfMonthCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  DayOfMonthCondition2[DayOfMonthCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  DayOfMonthCondition2[DayOfMonthCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  DayOfMonthCondition2[DayOfMonthCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  DayOfMonthCondition2[DayOfMonthCondition2["IsOddNumber"] = Condition.IsOddNumber] = "IsOddNumber";
  DayOfMonthCondition2[DayOfMonthCondition2["IsToday"] = Condition.IsToday] = "IsToday";
  DayOfMonthCondition2[DayOfMonthCondition2["IsWeekday"] = Condition.IsWeekday] = "IsWeekday";
  DayOfMonthCondition2[DayOfMonthCondition2["IsWeekend"] = Condition.IsWeekend] = "IsWeekend";
  return DayOfMonthCondition2;
})(DayOfMonthCondition || {});
var MonthCondition = ((MonthCondition2) => {
  MonthCondition2[MonthCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  MonthCondition2[MonthCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  MonthCondition2[MonthCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  MonthCondition2[MonthCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  MonthCondition2[MonthCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  MonthCondition2[MonthCondition2["IsEvenNumber"] = Condition.IsEvenNumber] = "IsEvenNumber";
  MonthCondition2[MonthCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  MonthCondition2[MonthCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  MonthCondition2[MonthCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  MonthCondition2[MonthCondition2["IsInteger"] = Condition.IsInteger] = "IsInteger";
  MonthCondition2[MonthCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  MonthCondition2[MonthCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  MonthCondition2[MonthCondition2["IsMonth"] = Condition.IsMonth] = "IsMonth";
  MonthCondition2[MonthCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  MonthCondition2[MonthCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  MonthCondition2[MonthCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  MonthCondition2[MonthCondition2["IsOddNumber"] = Condition.IsOddNumber] = "IsOddNumber";
  MonthCondition2[MonthCondition2["IsThisMonth"] = Condition.IsThisMonth] = "IsThisMonth";
  return MonthCondition2;
})(MonthCondition || {});
var TimeCondition = ((TimeCondition2) => {
  TimeCondition2[TimeCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  TimeCondition2[TimeCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  TimeCondition2[TimeCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  TimeCondition2[TimeCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  TimeCondition2[TimeCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  TimeCondition2[TimeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  TimeCondition2[TimeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  TimeCondition2[TimeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  TimeCondition2[TimeCondition2["IsTime"] = Condition.IsTime] = "IsTime";
  return TimeCondition2;
})(TimeCondition || {});
var TimeRangeCondition = ((TimeRangeCondition2) => {
  TimeRangeCondition2[TimeRangeCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  TimeRangeCondition2[TimeRangeCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  TimeRangeCondition2[TimeRangeCondition2["IsBeforeOrAfter"] = Condition.IsBeforeOrAfter] = "IsBeforeOrAfter";
  TimeRangeCondition2[TimeRangeCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  TimeRangeCondition2[TimeRangeCondition2["IsTime"] = Condition.IsTime] = "IsTime";
  TimeRangeCondition2[TimeRangeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  TimeRangeCondition2[TimeRangeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  TimeRangeCondition2[TimeRangeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  TimeRangeCondition2[TimeRangeCondition2["IsTimeRange"] = Condition.IsTimeRange] = "IsTimeRange";
  return TimeRangeCondition2;
})(TimeRangeCondition || {});
var TimeOfDayCondition = ((TimeOfDayCondition2) => {
  TimeOfDayCondition2[TimeOfDayCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  TimeOfDayCondition2[TimeOfDayCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  TimeOfDayCondition2[TimeOfDayCondition2["IsBeforeOrAfter"] = Condition.IsBeforeOrAfter] = "IsBeforeOrAfter";
  TimeOfDayCondition2[TimeOfDayCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  TimeOfDayCondition2[TimeOfDayCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  TimeOfDayCondition2[TimeOfDayCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  TimeOfDayCondition2[TimeOfDayCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  TimeOfDayCondition2[TimeOfDayCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  TimeOfDayCondition2[TimeOfDayCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  TimeOfDayCondition2[TimeOfDayCondition2["IsTimeOfDay"] = Condition.IsTimeOfDay] = "IsTimeOfDay";
  TimeOfDayCondition2[TimeOfDayCondition2["IsTimeRange"] = Condition.IsTimeRange] = "IsTimeRange";
  return TimeOfDayCondition2;
})(TimeOfDayCondition || {});
var WeekdayCondition = ((WeekdayCondition2) => {
  WeekdayCondition2[WeekdayCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  WeekdayCondition2[WeekdayCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  WeekdayCondition2[WeekdayCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  WeekdayCondition2[WeekdayCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  WeekdayCondition2[WeekdayCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  WeekdayCondition2[WeekdayCondition2["IsEvenNumber"] = Condition.IsEvenNumber] = "IsEvenNumber";
  WeekdayCondition2[WeekdayCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  WeekdayCondition2[WeekdayCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  WeekdayCondition2[WeekdayCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  WeekdayCondition2[WeekdayCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  WeekdayCondition2[WeekdayCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  WeekdayCondition2[WeekdayCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  WeekdayCondition2[WeekdayCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  WeekdayCondition2[WeekdayCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  WeekdayCondition2[WeekdayCondition2["IsOddNumber"] = Condition.IsOddNumber] = "IsOddNumber";
  WeekdayCondition2[WeekdayCondition2["IsWeekday"] = Condition.IsWeekday] = "IsWeekday";
  WeekdayCondition2[WeekdayCondition2["IsWeekend"] = Condition.IsWeekend] = "IsWeekend";
  return WeekdayCondition2;
})(WeekdayCondition || {});
var YearCondition = ((YearCondition2) => {
  YearCondition2[YearCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  YearCondition2[YearCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  YearCondition2[YearCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  YearCondition2[YearCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  YearCondition2[YearCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  YearCondition2[YearCondition2["IsEvenNumber"] = Condition.IsEvenNumber] = "IsEvenNumber";
  YearCondition2[YearCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  YearCondition2[YearCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  YearCondition2[YearCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  YearCondition2[YearCondition2["IsInteger"] = Condition.IsInteger] = "IsInteger";
  YearCondition2[YearCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  YearCondition2[YearCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  YearCondition2[YearCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  YearCondition2[YearCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  YearCondition2[YearCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  YearCondition2[YearCondition2["IsOddNumber"] = Condition.IsOddNumber] = "IsOddNumber";
  YearCondition2[YearCondition2["IsThisYear"] = Condition.IsThisYear] = "IsThisYear";
  YearCondition2[YearCondition2["IsYear"] = Condition.IsYear] = "IsYear";
  return YearCondition2;
})(YearCondition || {});

var HexadecimalCondition = ((HexadecimalCondition2) => {
  HexadecimalCondition2[HexadecimalCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  HexadecimalCondition2[HexadecimalCondition2["IsHexadecimal"] = Condition.IsHexadecimal] = "IsHexadecimal";
  HexadecimalCondition2[HexadecimalCondition2["IsLengthEqual"] = Condition.IsLengthEqual] = "IsLengthEqual";
  HexadecimalCondition2[HexadecimalCondition2["IsLengthGreaterThan"] = Condition.IsLengthGreaterThan] = "IsLengthGreaterThan";
  HexadecimalCondition2[HexadecimalCondition2["IsLengthGreaterThanOrEqual"] = Condition.IsLengthGreaterThanOrEqual] = "IsLengthGreaterThanOrEqual";
  HexadecimalCondition2[HexadecimalCondition2["IsLengthLessThan"] = Condition.IsLengthLessThan] = "IsLengthLessThan";
  HexadecimalCondition2[HexadecimalCondition2["IsLengthLessThanOrEqual"] = Condition.IsLengthLessThanOrEqual] = "IsLengthLessThanOrEqual";
  HexadecimalCondition2[HexadecimalCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  HexadecimalCondition2[HexadecimalCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  HexadecimalCondition2[HexadecimalCondition2["IsString"] = Condition.IsString] = "IsString";
  return HexadecimalCondition2;
})(HexadecimalCondition || {});
var JSONCondition = ((JSONCondition2) => {
  JSONCondition2[JSONCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  JSONCondition2[JSONCondition2["IsJSON"] = Condition.IsJSON] = "IsJSON";
  JSONCondition2[JSONCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  JSONCondition2[JSONCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return JSONCondition2;
})(JSONCondition || {});
var MarkdownCondition = ((MarkdownCondition2) => {
  MarkdownCondition2[MarkdownCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  MarkdownCondition2[MarkdownCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  MarkdownCondition2[MarkdownCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  MarkdownCondition2[MarkdownCondition2["IsMarkdown"] = Condition.IsMarkdown] = "IsMarkdown";
  MarkdownCondition2[MarkdownCondition2["IsString"] = Condition.IsString] = "IsString";
  return MarkdownCondition2;
})(MarkdownCondition || {});

var CurrencyCondition = ((CurrencyCondition2) => {
  CurrencyCondition2[CurrencyCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  CurrencyCondition2[CurrencyCondition2["IsCurrency"] = Condition.IsCurrency] = "IsCurrency";
  CurrencyCondition2[CurrencyCondition2["IsDecimal"] = Condition.IsDecimal] = "IsDecimal";
  CurrencyCondition2[CurrencyCondition2["IsDivisibleBy"] = Condition.IsDivisibleBy] = "IsDivisibleBy";
  CurrencyCondition2[CurrencyCondition2["IsEvenNumber"] = Condition.IsEvenNumber] = "IsEvenNumber";
  CurrencyCondition2[CurrencyCondition2["IsFloat"] = Condition.IsFloat] = "IsFloat";
  CurrencyCondition2[CurrencyCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  CurrencyCondition2[CurrencyCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  CurrencyCondition2[CurrencyCondition2["IsInteger"] = Condition.IsInteger] = "IsInteger";
  CurrencyCondition2[CurrencyCondition2["IsISO8601"] = Condition.IsISO8601] = "IsISO8601";
  CurrencyCondition2[CurrencyCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  CurrencyCondition2[CurrencyCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  CurrencyCondition2[CurrencyCondition2["IsNegativeNumber"] = Condition.IsNegativeNumber] = "IsNegativeNumber";
  CurrencyCondition2[CurrencyCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  CurrencyCondition2[CurrencyCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  CurrencyCondition2[CurrencyCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  CurrencyCondition2[CurrencyCondition2["IsOddNumber"] = Condition.IsOddNumber] = "IsOddNumber";
  CurrencyCondition2[CurrencyCondition2["IsPositiveNumber"] = Condition.IsPositiveNumber] = "IsPositiveNumber";
  return CurrencyCondition2;
})(CurrencyCondition || {});
var BitcoinAddressCondition = ((BitcoinAddressCondition2) => {
  BitcoinAddressCondition2[BitcoinAddressCondition2["IsBitcoinAddress"] = Condition.IsBitcoinAddress] = "IsBitcoinAddress";
  BitcoinAddressCondition2[BitcoinAddressCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  BitcoinAddressCondition2[BitcoinAddressCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  BitcoinAddressCondition2[BitcoinAddressCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return BitcoinAddressCondition2;
})(BitcoinAddressCondition || {});
var EthereumAddressCondition = ((EthereumAddressCondition2) => {
  EthereumAddressCondition2[EthereumAddressCondition2["IsEthereumAddress"] = Condition.IsEthereumAddress] = "IsEthereumAddress";
  EthereumAddressCondition2[EthereumAddressCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  EthereumAddressCondition2[EthereumAddressCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  EthereumAddressCondition2[EthereumAddressCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return EthereumAddressCondition2;
})(EthereumAddressCondition || {});

var LanguageCondition = ((LanguageCondition2) => {
  LanguageCondition2[LanguageCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  LanguageCondition2[LanguageCondition2["IsJSON"] = Condition.IsJSON] = "IsJSON";
  LanguageCondition2[LanguageCondition2["IsLanguage"] = Condition.IsLanguage] = "IsLanguage";
  LanguageCondition2[LanguageCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  LanguageCondition2[LanguageCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return LanguageCondition2;
})(LanguageCondition || {});

var CityCondition = ((CityCondition2) => {
  CityCondition2[CityCondition2["IsAlpha"] = Condition.IsAlpha] = "IsAlpha";
  CityCondition2[CityCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  CityCondition2[CityCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  CityCondition2[CityCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  CityCondition2[CityCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  CityCondition2[CityCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  CityCondition2[CityCondition2["IsString"] = Condition.IsString] = "IsString";
  return CityCondition2;
})(CityCondition || {});
var CountryCondition = ((CountryCondition2) => {
  CountryCondition2[CountryCondition2["IsAlpha"] = Condition.IsAlpha] = "IsAlpha";
  CountryCondition2[CountryCondition2["IsCountry"] = Condition.IsCountry] = "IsCountry";
  CountryCondition2[CountryCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  CountryCondition2[CountryCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  CountryCondition2[CountryCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  CountryCondition2[CountryCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  CountryCondition2[CountryCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  CountryCondition2[CountryCondition2["IsString"] = Condition.IsString] = "IsString";
  return CountryCondition2;
})(CountryCondition || {});
var LatitudeCondition = ((LatitudeCondition2) => {
  LatitudeCondition2[LatitudeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  LatitudeCondition2[LatitudeCondition2["IsFloat"] = Condition.IsFloat] = "IsFloat";
  LatitudeCondition2[LatitudeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  LatitudeCondition2[LatitudeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  LatitudeCondition2[LatitudeCondition2["IsNumeric"] = Condition.IsNumeric] = "IsNumeric";
  return LatitudeCondition2;
})(LatitudeCondition || {});
var LongitudeCondition = ((LongitudeCondition2) => {
  LongitudeCondition2[LongitudeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  LongitudeCondition2[LongitudeCondition2["IsFloat"] = Condition.IsFloat] = "IsFloat";
  LongitudeCondition2[LongitudeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  LongitudeCondition2[LongitudeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  LongitudeCondition2[LongitudeCondition2["IsNumeric"] = Condition.IsNumeric] = "IsNumeric";
  return LongitudeCondition2;
})(LongitudeCondition || {});
var PostalCodeCondition = ((PostalCodeCondition2) => {
  PostalCodeCondition2[PostalCodeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  PostalCodeCondition2[PostalCodeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  PostalCodeCondition2[PostalCodeCondition2["IsPostalCode"] = Condition.IsPostalCode] = "IsPostalCode";
  PostalCodeCondition2[PostalCodeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return PostalCodeCondition2;
})(PostalCodeCondition || {});
var ProvinceCondition = ((ProvinceCondition2) => {
  ProvinceCondition2[ProvinceCondition2["IsAlpha"] = Condition.IsAlpha] = "IsAlpha";
  ProvinceCondition2[ProvinceCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  ProvinceCondition2[ProvinceCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  ProvinceCondition2[ProvinceCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  ProvinceCondition2[ProvinceCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  ProvinceCondition2[ProvinceCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  ProvinceCondition2[ProvinceCondition2["IsProvince"] = Condition.IsProvince] = "IsProvince";
  ProvinceCondition2[ProvinceCondition2["IsString"] = Condition.IsString] = "IsString";
  return ProvinceCondition2;
})(ProvinceCondition || {});
var StateCondition = ((StateCondition2) => {
  StateCondition2[StateCondition2["IsAlpha"] = Condition.IsAlpha] = "IsAlpha";
  StateCondition2[StateCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  StateCondition2[StateCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  StateCondition2[StateCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  StateCondition2[StateCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  StateCondition2[StateCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  StateCondition2[StateCondition2["IsState"] = Condition.IsState] = "IsState";
  StateCondition2[StateCondition2["IsString"] = Condition.IsString] = "IsString";
  return StateCondition2;
})(StateCondition || {});
var StreetAddressCondition = ((StreetAddressCondition2) => {
  StreetAddressCondition2[StreetAddressCondition2["IsAlphanumeric"] = Condition.IsAlphanumeric] = "IsAlphanumeric";
  StreetAddressCondition2[StreetAddressCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  StreetAddressCondition2[StreetAddressCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  StreetAddressCondition2[StreetAddressCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  StreetAddressCondition2[StreetAddressCondition2["IsString"] = Condition.IsString] = "IsString";
  StreetAddressCondition2[StreetAddressCondition2["IsStreetAddress"] = Condition.IsStreetAddress] = "IsStreetAddress";
  return StreetAddressCondition2;
})(StreetAddressCondition || {});

var MenuCondition = ((MenuCondition2) => {
  MenuCondition2[MenuCondition2["Contains"] = Condition.Contains] = "Contains";
  MenuCondition2[MenuCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  MenuCondition2[MenuCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  MenuCondition2[MenuCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return MenuCondition2;
})(MenuCondition || {});
var TagsCondition = ((TagsCondition2) => {
  TagsCondition2[TagsCondition2["Contains"] = Condition.Contains] = "Contains";
  TagsCondition2[TagsCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  TagsCondition2[TagsCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  TagsCondition2[TagsCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return TagsCondition2;
})(TagsCondition || {});

var DataURICondition = ((DataURICondition2) => {
  DataURICondition2[DataURICondition2["Contains"] = Condition.Contains] = "Contains";
  DataURICondition2[DataURICondition2["IsDataURI"] = Condition.IsDataURI] = "IsDataURI";
  DataURICondition2[DataURICondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  DataURICondition2[DataURICondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  DataURICondition2[DataURICondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  DataURICondition2[DataURICondition2["IsString"] = Condition.IsString] = "IsString";
  return DataURICondition2;
})(DataURICondition || {});
var DomainNameCondition = ((DomainNameCondition2) => {
  DomainNameCondition2[DomainNameCondition2["Contains"] = Condition.Contains] = "Contains";
  DomainNameCondition2[DomainNameCondition2["IsDomainName"] = Condition.IsDomainName] = "IsDomainName";
  DomainNameCondition2[DomainNameCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  DomainNameCondition2[DomainNameCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  DomainNameCondition2[DomainNameCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  DomainNameCondition2[DomainNameCondition2["IsString"] = Condition.IsString] = "IsString";
  return DomainNameCondition2;
})(DomainNameCondition || {});
var EmailCondition = ((EmailCondition2) => {
  EmailCondition2[EmailCondition2["Contains"] = Condition.Contains] = "Contains";
  EmailCondition2[EmailCondition2["IsEmailAddress"] = Condition.IsEmailAddress] = "IsEmailAddress";
  EmailCondition2[EmailCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  EmailCondition2[EmailCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  EmailCondition2[EmailCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  EmailCondition2[EmailCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  EmailCondition2[EmailCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  EmailCondition2[EmailCondition2["IsString"] = Condition.IsString] = "IsString";
  return EmailCondition2;
})(EmailCondition || {});
var IPAddressCondition = ((IPAddressCondition2) => {
  IPAddressCondition2[IPAddressCondition2["Contains"] = Condition.Contains] = "Contains";
  IPAddressCondition2[IPAddressCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  IPAddressCondition2[IPAddressCondition2["IsIPAddress"] = Condition.IsIPAddress] = "IsIPAddress";
  IPAddressCondition2[IPAddressCondition2["IsInIPAddressRange"] = Condition.IsInIPAddressRange] = "IsInIPAddressRange";
  IPAddressCondition2[IPAddressCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  IPAddressCondition2[IPAddressCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  IPAddressCondition2[IPAddressCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  IPAddressCondition2[IPAddressCondition2["IsNotInIPAddressRange"] = Condition.IsNotInIPAddressRange] = "IsNotInIPAddressRange";
  IPAddressCondition2[IPAddressCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  IPAddressCondition2[IPAddressCondition2["IsString"] = Condition.IsString] = "IsString";
  return IPAddressCondition2;
})(IPAddressCondition || {});
var IPAddressRangeCondition = ((IPAddressRangeCondition2) => {
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsIPAddressRange"] = Condition.IsIPAddressRange] = "IsIPAddressRange";
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsNotInIPAddressRange"] = Condition.IsNotInIPAddressRange] = "IsNotInIPAddressRange";
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  IPAddressRangeCondition2[IPAddressRangeCondition2["IsString"] = Condition.IsString] = "IsString";
  return IPAddressRangeCondition2;
})(IPAddressRangeCondition || {});
var PortCondition = ((PortCondition2) => {
  PortCondition2[PortCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  PortCondition2[PortCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  PortCondition2[PortCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  PortCondition2[PortCondition2["IsInteger"] = Condition.IsInteger] = "IsInteger";
  PortCondition2[PortCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  PortCondition2[PortCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  PortCondition2[PortCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  PortCondition2[PortCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  return PortCondition2;
})(PortCondition || {});
var MACAddressCondition = ((MACAddressCondition2) => {
  MACAddressCondition2[MACAddressCondition2["Contains"] = Condition.Contains] = "Contains";
  MACAddressCondition2[MACAddressCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  MACAddressCondition2[MACAddressCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  MACAddressCondition2[MACAddressCondition2["IsMACAddress"] = Condition.IsMACAddress] = "IsMACAddress";
  MACAddressCondition2[MACAddressCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  MACAddressCondition2[MACAddressCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  MACAddressCondition2[MACAddressCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  MACAddressCondition2[MACAddressCondition2["IsString"] = Condition.IsString] = "IsString";
  return MACAddressCondition2;
})(MACAddressCondition || {});
var MagnetURICondition = ((MagnetURICondition2) => {
  MagnetURICondition2[MagnetURICondition2["Contains"] = Condition.Contains] = "Contains";
  MagnetURICondition2[MagnetURICondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  MagnetURICondition2[MagnetURICondition2["IsInList"] = Condition.IsInList] = "IsInList";
  MagnetURICondition2[MagnetURICondition2["IsMagnetURI"] = Condition.IsMagnetURI] = "IsMagnetURI";
  MagnetURICondition2[MagnetURICondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  MagnetURICondition2[MagnetURICondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  MagnetURICondition2[MagnetURICondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  MagnetURICondition2[MagnetURICondition2["IsString"] = Condition.IsString] = "IsString";
  return MagnetURICondition2;
})(MagnetURICondition || {});
var MimeTypeCondition = ((MimeTypeCondition2) => {
  MimeTypeCondition2[MimeTypeCondition2["Contains"] = Condition.Contains] = "Contains";
  MimeTypeCondition2[MimeTypeCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  MimeTypeCondition2[MimeTypeCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  MimeTypeCondition2[MimeTypeCondition2["IsMimeType"] = Condition.IsMimeType] = "IsMimeType";
  MimeTypeCondition2[MimeTypeCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  MimeTypeCondition2[MimeTypeCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  MimeTypeCondition2[MimeTypeCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  MimeTypeCondition2[MimeTypeCondition2["IsString"] = Condition.IsString] = "IsString";
  return MimeTypeCondition2;
})(MimeTypeCondition || {});
var SlugCondition = ((SlugCondition2) => {
  SlugCondition2[SlugCondition2["Contains"] = Condition.Contains] = "Contains";
  SlugCondition2[SlugCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  SlugCondition2[SlugCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  SlugCondition2[SlugCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  SlugCondition2[SlugCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  SlugCondition2[SlugCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  SlugCondition2[SlugCondition2["IsString"] = Condition.IsString] = "IsString";
  SlugCondition2[SlugCondition2["IsSlug"] = Condition.IsSlug] = "IsSlug";
  return SlugCondition2;
})(SlugCondition || {});
var URLCondition = ((URLCondition2) => {
  URLCondition2[URLCondition2["Contains"] = Condition.Contains] = "Contains";
  URLCondition2[URLCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  URLCondition2[URLCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  URLCondition2[URLCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  URLCondition2[URLCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  URLCondition2[URLCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  URLCondition2[URLCondition2["IsString"] = Condition.IsString] = "IsString";
  URLCondition2[URLCondition2["IsURL"] = Condition.IsURL] = "IsURL";
  return URLCondition2;
})(URLCondition || {});

var NumberCondition = ((NumberCondition2) => {
  NumberCondition2[NumberCondition2["IsAfter"] = Condition.IsAfter] = "IsAfter";
  NumberCondition2[NumberCondition2["IsAfterOrEqual"] = Condition.IsAfterOrEqual] = "IsAfterOrEqual";
  NumberCondition2[NumberCondition2["IsBefore"] = Condition.IsBefore] = "IsBefore";
  NumberCondition2[NumberCondition2["IsBeforeOrEqual"] = Condition.IsBeforeOrEqual] = "IsBeforeOrEqual";
  NumberCondition2[NumberCondition2["IsBetween"] = Condition.IsBetween] = "IsBetween";
  NumberCondition2[NumberCondition2["IsDecimal"] = Condition.IsDecimal] = "IsDecimal";
  NumberCondition2[NumberCondition2["IsDivisibleBy"] = Condition.IsDivisibleBy] = "IsDivisibleBy";
  NumberCondition2[NumberCondition2["IsEAN"] = Condition.IsEAN] = "IsEAN";
  NumberCondition2[NumberCondition2["IsEIN"] = Condition.IsEIN] = "IsEIN";
  NumberCondition2[NumberCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  NumberCondition2[NumberCondition2["IsEvenNumber"] = Condition.IsEvenNumber] = "IsEvenNumber";
  NumberCondition2[NumberCondition2["IsFloat"] = Condition.IsFloat] = "IsFloat";
  NumberCondition2[NumberCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  NumberCondition2[NumberCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  NumberCondition2[NumberCondition2["IsInt"] = Condition.IsInteger] = "IsInt";
  NumberCondition2[NumberCondition2["IsISBN"] = Condition.IsISBN] = "IsISBN";
  NumberCondition2[NumberCondition2["IsISMN"] = Condition.IsISMN] = "IsISMN";
  NumberCondition2[NumberCondition2["IsISSN"] = Condition.IsISSN] = "IsISSN";
  NumberCondition2[NumberCondition2["IsLatitude"] = Condition.IsLatitude] = "IsLatitude";
  NumberCondition2[NumberCondition2["IsLongitude"] = Condition.IsLongitude] = "IsLongitude";
  NumberCondition2[NumberCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  NumberCondition2[NumberCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  NumberCondition2[NumberCondition2["IsMACAddress"] = Condition.IsMACAddress] = "IsMACAddress";
  NumberCondition2[NumberCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  NumberCondition2[NumberCondition2["IsNegativeNumber"] = Condition.IsNegativeNumber] = "IsNegativeNumber";
  NumberCondition2[NumberCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  NumberCondition2[NumberCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  NumberCondition2[NumberCondition2["IsOddNumber"] = Condition.IsOddNumber] = "IsOddNumber";
  NumberCondition2[NumberCondition2["IsPassportNumber"] = Condition.IsPassportNumber] = "IsPassportNumber";
  NumberCondition2[NumberCondition2["IsPhoneNumber"] = Condition.IsPhoneNumber] = "IsPhoneNumber";
  NumberCondition2[NumberCondition2["IsPort"] = Condition.IsPort] = "IsPort";
  NumberCondition2[NumberCondition2["IsPositiveNumber"] = Condition.IsPositiveNumber] = "IsPositiveNumber";
  NumberCondition2[NumberCondition2["IsPostalCode"] = Condition.IsPostalCode] = "IsPostalCode";
  NumberCondition2[NumberCondition2["IsSemanticVersion"] = Condition.IsSemanticVersion] = "IsSemanticVersion";
  NumberCondition2[NumberCondition2["IsSSN"] = Condition.IsSSN] = "IsSSN";
  NumberCondition2[NumberCondition2["IsTaxIDNumber"] = Condition.IsTaxIDNumber] = "IsTaxIDNumber";
  NumberCondition2[NumberCondition2["IsUUID"] = Condition.IsUUID] = "IsUUID";
  NumberCondition2[NumberCondition2["IsVATIDNumber"] = Condition.IsVATIDNumber] = "IsVATIDNumber";
  return NumberCondition2;
})(NumberCondition || {});
var FloatCondition = ((FloatCondition2) => {
  FloatCondition2[FloatCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  FloatCondition2[FloatCondition2["IsFloat"] = Condition.IsFloat] = "IsFloat";
  FloatCondition2[FloatCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  FloatCondition2[FloatCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  FloatCondition2[FloatCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  FloatCondition2[FloatCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  FloatCondition2[FloatCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  FloatCondition2[FloatCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  FloatCondition2[FloatCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  FloatCondition2[FloatCondition2["IsNumeric"] = Condition.IsNumeric] = "IsNumeric";
  return FloatCondition2;
})(FloatCondition || {});
var IntegerCondition = ((IntegerCondition2) => {
  IntegerCondition2[IntegerCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  IntegerCondition2[IntegerCondition2["IsInteger"] = Condition.IsInteger] = "IsInteger";
  IntegerCondition2[IntegerCondition2["IsGreaterThan"] = Condition.IsGreaterThan] = "IsGreaterThan";
  IntegerCondition2[IntegerCondition2["IsGreaterThanOrEqual"] = Condition.IsGreaterThanOrEqual] = "IsGreaterThanOrEqual";
  IntegerCondition2[IntegerCondition2["IsLessThan"] = Condition.IsLessThan] = "IsLessThan";
  IntegerCondition2[IntegerCondition2["IsLessThanOrEqual"] = Condition.IsLessThanOrEqual] = "IsLessThanOrEqual";
  IntegerCondition2[IntegerCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  IntegerCondition2[IntegerCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  IntegerCondition2[IntegerCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  IntegerCondition2[IntegerCondition2["IsNumeric"] = Condition.IsNumeric] = "IsNumeric";
  return IntegerCondition2;
})(IntegerCondition || {});

var CreditCardCondition = ((CreditCardCondition2) => {
  CreditCardCondition2[CreditCardCondition2["IsCreditCard"] = Condition.IsCreditCard] = "IsCreditCard";
  CreditCardCondition2[CreditCardCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  CreditCardCondition2[CreditCardCondition2["IsLengthEqual"] = Condition.IsLengthEqual] = "IsLengthEqual";
  CreditCardCondition2[CreditCardCondition2["IsLengthGreaterThan"] = Condition.IsLengthGreaterThan] = "IsLengthGreaterThan";
  CreditCardCondition2[CreditCardCondition2["IsLengthGreaterThanOrEqual"] = Condition.IsLengthGreaterThanOrEqual] = "IsLengthGreaterThanOrEqual";
  CreditCardCondition2[CreditCardCondition2["IsLengthLessThan"] = Condition.IsLengthLessThan] = "IsLengthLessThan";
  CreditCardCondition2[CreditCardCondition2["IsLengthLessThanOrEqual"] = Condition.IsLengthLessThanOrEqual] = "IsLengthLessThanOrEqual";
  CreditCardCondition2[CreditCardCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  CreditCardCondition2[CreditCardCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  CreditCardCondition2[CreditCardCondition2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  CreditCardCondition2[CreditCardCondition2["IsNotRegexMatch"] = Condition.IsNotRegexMatch] = "IsNotRegexMatch";
  return CreditCardCondition2;
})(CreditCardCondition || {});
var EmailAddressCondition = ((EmailAddressCondition2) => {
  EmailAddressCondition2[EmailAddressCondition2["isEmailAddress"] = Condition.IsEmailAddress] = "isEmailAddress";
  EmailAddressCondition2[EmailAddressCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  EmailAddressCondition2[EmailAddressCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  EmailAddressCondition2[EmailAddressCondition2["IsLengthEqual"] = Condition.IsLengthEqual] = "IsLengthEqual";
  EmailAddressCondition2[EmailAddressCondition2["IsLengthGreaterThan"] = Condition.IsLengthGreaterThan] = "IsLengthGreaterThan";
  EmailAddressCondition2[EmailAddressCondition2["IsLengthGreaterThanOrEqual"] = Condition.IsLengthGreaterThanOrEqual] = "IsLengthGreaterThanOrEqual";
  EmailAddressCondition2[EmailAddressCondition2["IsLengthLessThan"] = Condition.IsLengthLessThan] = "IsLengthLessThan";
  EmailAddressCondition2[EmailAddressCondition2["IsLengthLessThanOrEqual"] = Condition.IsLengthLessThanOrEqual] = "IsLengthLessThanOrEqual";
  EmailAddressCondition2[EmailAddressCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  EmailAddressCondition2[EmailAddressCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  EmailAddressCondition2[EmailAddressCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  EmailAddressCondition2[EmailAddressCondition2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  EmailAddressCondition2[EmailAddressCondition2["IsNotRegexMatch"] = Condition.IsNotRegexMatch] = "IsNotRegexMatch";
  return EmailAddressCondition2;
})(EmailAddressCondition || {});
var LicensePlateNumber = ((LicensePlateNumber2) => {
  LicensePlateNumber2[LicensePlateNumber2["IsLicensePlateNumber"] = Condition.IsLicensePlateNumber] = "IsLicensePlateNumber";
  LicensePlateNumber2[LicensePlateNumber2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  LicensePlateNumber2[LicensePlateNumber2["IsNotRegexMatch"] = Condition.IsNotRegexMatch] = "IsNotRegexMatch";
  LicensePlateNumber2[LicensePlateNumber2["IsString"] = Condition.IsString] = "IsString";
  LicensePlateNumber2[LicensePlateNumber2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  return LicensePlateNumber2;
})(LicensePlateNumber || {});
var PassportNumberCondition = ((PassportNumberCondition2) => {
  PassportNumberCondition2[PassportNumberCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  PassportNumberCondition2[PassportNumberCondition2["IsPassportNumber"] = Condition.IsPassportNumber] = "IsPassportNumber";
  PassportNumberCondition2[PassportNumberCondition2["IsString"] = Condition.IsString] = "IsString";
  PassportNumberCondition2[PassportNumberCondition2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  return PassportNumberCondition2;
})(PassportNumberCondition || {});
var PasswordCondition = ((PasswordCondition2) => {
  PasswordCondition2[PasswordCondition2["IsComplexEnough"] = Condition.IsComplexEnough] = "IsComplexEnough";
  PasswordCondition2[PasswordCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  PasswordCondition2[PasswordCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  PasswordCondition2[PasswordCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  PasswordCondition2[PasswordCondition2["IsNotRegexMatch"] = Condition.IsNotRegexMatch] = "IsNotRegexMatch";
  PasswordCondition2[PasswordCondition2["IsLengthGreaterThan"] = Condition.IsLengthGreaterThan] = "IsLengthGreaterThan";
  PasswordCondition2[PasswordCondition2["IsLengthGreaterThanOrEqual"] = Condition.IsLengthGreaterThanOrEqual] = "IsLengthGreaterThanOrEqual";
  PasswordCondition2[PasswordCondition2["IsLengthLessThan"] = Condition.IsLengthLessThan] = "IsLengthLessThan";
  PasswordCondition2[PasswordCondition2["IsLengthLessThanOrEqual"] = Condition.IsLengthLessThanOrEqual] = "IsLengthLessThanOrEqual";
  PasswordCondition2[PasswordCondition2["IsStrongPassword"] = Condition.IsStrongPassword] = "IsStrongPassword";
  PasswordCondition2[PasswordCondition2["IsString"] = Condition.IsString] = "IsString";
  PasswordCondition2[PasswordCondition2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  return PasswordCondition2;
})(PasswordCondition || {});
var PhoneNumberCondition = ((PhoneNumberCondition2) => {
  PhoneNumberCondition2[PhoneNumberCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  PhoneNumberCondition2[PhoneNumberCondition2["IsNotRegexMatch"] = Condition.IsNotRegexMatch] = "IsNotRegexMatch";
  PhoneNumberCondition2[PhoneNumberCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  PhoneNumberCondition2[PhoneNumberCondition2["IsPhoneNumber"] = Condition.IsPhoneNumber] = "IsPhoneNumber";
  PhoneNumberCondition2[PhoneNumberCondition2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  return PhoneNumberCondition2;
})(PhoneNumberCondition || {});
var SocialSecurityNumberCondition = ((SocialSecurityNumberCondition2) => {
  SocialSecurityNumberCondition2[SocialSecurityNumberCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  SocialSecurityNumberCondition2[SocialSecurityNumberCondition2["IsSSN"] = Condition.IsSSN] = "IsSSN";
  SocialSecurityNumberCondition2[SocialSecurityNumberCondition2["IsString"] = Condition.IsString] = "IsString";
  SocialSecurityNumberCondition2[SocialSecurityNumberCondition2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  return SocialSecurityNumberCondition2;
})(SocialSecurityNumberCondition || {});

var AirportCondition = ((AirportCondition2) => {
  AirportCondition2[AirportCondition2["IsAirport"] = Condition.IsAirport] = "IsAirport";
  AirportCondition2[AirportCondition2["IsAlpha"] = Condition.IsAlpha] = "IsAlpha";
  AirportCondition2[AirportCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  AirportCondition2[AirportCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  AirportCondition2[AirportCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  AirportCondition2[AirportCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  AirportCondition2[AirportCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  AirportCondition2[AirportCondition2["IsString"] = Condition.IsString] = "IsString";
  return AirportCondition2;
})(AirportCondition || {});

var BICCondition = ((BICCondition2) => {
  BICCondition2[BICCondition2["Contains"] = Condition.Contains] = "Contains";
  BICCondition2[BICCondition2["IsBIC"] = Condition.IsBIC] = "IsBIC";
  BICCondition2[BICCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  BICCondition2[BICCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  BICCondition2[BICCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  BICCondition2[BICCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  BICCondition2[BICCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  BICCondition2[BICCondition2["IsString"] = Condition.IsString] = "IsString";
  return BICCondition2;
})(BICCondition || {});
var EANCondition = ((EANCondition2) => {
  EANCondition2[EANCondition2["Contains"] = Condition.Contains] = "Contains";
  EANCondition2[EANCondition2["IsEAN"] = Condition.IsEAN] = "IsEAN";
  EANCondition2[EANCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  EANCondition2[EANCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  EANCondition2[EANCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  EANCondition2[EANCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  EANCondition2[EANCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  EANCondition2[EANCondition2["IsString"] = Condition.IsString] = "IsString";
  return EANCondition2;
})(EANCondition || {});
var EINCondition = ((EINCondition2) => {
  EINCondition2[EINCondition2["Contains"] = Condition.Contains] = "Contains";
  EINCondition2[EINCondition2["IsEIN"] = Condition.IsEIN] = "IsEIN";
  EINCondition2[EINCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  EINCondition2[EINCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  EINCondition2[EINCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  EINCondition2[EINCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  EINCondition2[EINCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  EINCondition2[EINCondition2["IsString"] = Condition.IsString] = "IsString";
  return EINCondition2;
})(EINCondition || {});
var IBANCondition = ((IBANCondition2) => {
  IBANCondition2[IBANCondition2["Contains"] = Condition.Contains] = "Contains";
  IBANCondition2[IBANCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  IBANCondition2[IBANCondition2["IsIBAN"] = Condition.IsIBAN] = "IsIBAN";
  IBANCondition2[IBANCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  IBANCondition2[IBANCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  IBANCondition2[IBANCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  IBANCondition2[IBANCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  IBANCondition2[IBANCondition2["IsString"] = Condition.IsString] = "IsString";
  return IBANCondition2;
})(IBANCondition || {});
var ISBNCondition = ((ISBNCondition2) => {
  ISBNCondition2[ISBNCondition2["Contains"] = Condition.Contains] = "Contains";
  ISBNCondition2[ISBNCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  ISBNCondition2[ISBNCondition2["IsISBN"] = Condition.IsISBN] = "IsISBN";
  ISBNCondition2[ISBNCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  ISBNCondition2[ISBNCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  ISBNCondition2[ISBNCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  ISBNCondition2[ISBNCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  ISBNCondition2[ISBNCondition2["IsString"] = Condition.IsString] = "IsString";
  return ISBNCondition2;
})(ISBNCondition || {});
var ISINCondition = ((ISINCondition2) => {
  ISINCondition2[ISINCondition2["Contains"] = Condition.Contains] = "Contains";
  ISINCondition2[ISINCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  ISINCondition2[ISINCondition2["IsISIN"] = Condition.IsISIN] = "IsISIN";
  ISINCondition2[ISINCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  ISINCondition2[ISINCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  ISINCondition2[ISINCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  ISINCondition2[ISINCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  ISINCondition2[ISINCondition2["IsString"] = Condition.IsString] = "IsString";
  return ISINCondition2;
})(ISINCondition || {});
var ISMNCondition = ((ISMNCondition2) => {
  ISMNCondition2[ISMNCondition2["Contains"] = Condition.Contains] = "Contains";
  ISMNCondition2[ISMNCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  ISMNCondition2[ISMNCondition2["IsISMN"] = Condition.IsISMN] = "IsISMN";
  ISMNCondition2[ISMNCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  ISMNCondition2[ISMNCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  ISMNCondition2[ISMNCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  ISMNCondition2[ISMNCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  ISMNCondition2[ISMNCondition2["IsString"] = Condition.IsString] = "IsString";
  return ISMNCondition2;
})(ISMNCondition || {});
var ISSNCondition = ((ISSNCondition2) => {
  ISSNCondition2[ISSNCondition2["Contains"] = Condition.Contains] = "Contains";
  ISSNCondition2[ISSNCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  ISSNCondition2[ISSNCondition2["IsISSN"] = Condition.IsISSN] = "IsISSN";
  ISSNCondition2[ISSNCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  ISSNCondition2[ISSNCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  ISSNCondition2[ISSNCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  ISSNCondition2[ISSNCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  ISSNCondition2[ISSNCondition2["IsString"] = Condition.IsString] = "IsString";
  return ISSNCondition2;
})(ISSNCondition || {});
var TaxIDNumberCondition = ((TaxIDNumberCondition2) => {
  TaxIDNumberCondition2[TaxIDNumberCondition2["Contains"] = Condition.Contains] = "Contains";
  TaxIDNumberCondition2[TaxIDNumberCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  TaxIDNumberCondition2[TaxIDNumberCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  TaxIDNumberCondition2[TaxIDNumberCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  TaxIDNumberCondition2[TaxIDNumberCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  TaxIDNumberCondition2[TaxIDNumberCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  TaxIDNumberCondition2[TaxIDNumberCondition2["IsString"] = Condition.IsString] = "IsString";
  TaxIDNumberCondition2[TaxIDNumberCondition2["IsTaxIDNumber"] = Condition.IsTaxIDNumber] = "IsTaxIDNumber";
  return TaxIDNumberCondition2;
})(TaxIDNumberCondition || {});
var VATCondition = ((VATCondition2) => {
  VATCondition2[VATCondition2["Contains"] = Condition.Contains] = "Contains";
  VATCondition2[VATCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  VATCondition2[VATCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  VATCondition2[VATCondition2["IsNotEqual"] = Condition.IsNotEqual] = "IsNotEqual";
  VATCondition2[VATCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  VATCondition2[VATCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  VATCondition2[VATCondition2["IsString"] = Condition.IsString] = "IsString";
  VATCondition2[VATCondition2["IsVATIDNumber"] = Condition.IsVATIDNumber] = "IsVATIDNumber";
  return VATCondition2;
})(VATCondition || {});

var StringCondition = ((StringCondition2) => {
  StringCondition2[StringCondition2["Contains"] = Condition.Contains] = "Contains";
  StringCondition2[StringCondition2["HasNumberCount"] = Condition.HasNumberCount] = "HasNumberCount";
  StringCondition2[StringCondition2["HasLowercaseCount"] = Condition.HasLowercaseCount] = "HasLowercaseCount";
  StringCondition2[StringCondition2["HasLetterCount"] = Condition.HasLetterCount] = "HasLetterCount";
  StringCondition2[StringCondition2["HasSpacesCount"] = Condition.HasSpacesCount] = "HasSpacesCount";
  StringCondition2[StringCondition2["HasSymbolCount"] = Condition.HasSymbolCount] = "HasSymbolCount";
  StringCondition2[StringCondition2["HasUppercaseCount"] = Condition.HasUppercaseCount] = "HasUppercaseCount";
  StringCondition2[StringCondition2["IsAlpha"] = Condition.IsAlpha] = "IsAlpha";
  StringCondition2[StringCondition2["IsAlphanumeric"] = Condition.IsAlphanumeric] = "IsAlphanumeric";
  StringCondition2[StringCondition2["IsAscii"] = Condition.IsAscii] = "IsAscii";
  StringCondition2[StringCondition2["IsBase64"] = Condition.IsBase64] = "IsBase64";
  StringCondition2[StringCondition2["IsColor"] = Condition.IsColor] = "IsColor";
  StringCondition2[StringCondition2["IsComplexEnough"] = Condition.IsComplexEnough] = "IsComplexEnough";
  StringCondition2[StringCondition2["IsCreditCard"] = Condition.IsCreditCard] = "IsCreditCard";
  StringCondition2[StringCondition2["IsDataURI"] = Condition.IsDataURI] = "IsDataURI";
  StringCondition2[StringCondition2["IsDomainName"] = Condition.IsDomainName] = "IsDomainName";
  StringCondition2[StringCondition2["IsEmailAddress"] = Condition.IsEmailAddress] = "IsEmailAddress";
  StringCondition2[StringCondition2["IsEthereumAddress"] = Condition.IsEthereumAddress] = "IsEthereumAddress";
  StringCondition2[StringCondition2["IsEAN"] = Condition.IsEAN] = "IsEAN";
  StringCondition2[StringCondition2["IsEIN"] = Condition.IsEIN] = "IsEIN";
  StringCondition2[StringCondition2["IsEqual"] = Condition.IsEqual] = "IsEqual";
  StringCondition2[StringCondition2["IsIBAN"] = Condition.IsIBAN] = "IsIBAN";
  StringCondition2[StringCondition2["IsHSLColor"] = Condition.IsHSLColor] = "IsHSLColor";
  StringCondition2[StringCondition2["IsHexColor"] = Condition.IsHexColor] = "IsHexColor";
  StringCondition2[StringCondition2["IsHexadecimal"] = Condition.IsHexadecimal] = "IsHexadecimal";
  StringCondition2[StringCondition2["IsIdentityCardCode"] = Condition.IsIdentityCardCode] = "IsIdentityCardCode";
  StringCondition2[StringCondition2["IsIMEI"] = Condition.IsIMEI] = "IsIMEI";
  StringCondition2[StringCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  StringCondition2[StringCondition2["IsIPAddress"] = Condition.IsIPAddress] = "IsIPAddress";
  StringCondition2[StringCondition2["IsInIPAddressRange"] = Condition.IsInIPAddressRange] = "IsInIPAddressRange";
  StringCondition2[StringCondition2["IsISBN"] = Condition.IsISBN] = "IsISBN";
  StringCondition2[StringCondition2["IsISIN"] = Condition.IsISIN] = "IsISIN";
  StringCondition2[StringCondition2["IsISMN"] = Condition.IsISMN] = "IsISMN";
  StringCondition2[StringCondition2["IsISRC"] = Condition.IsISRC] = "IsISRC";
  StringCondition2[StringCondition2["IsISSN"] = Condition.IsISSN] = "IsISSN";
  StringCondition2[StringCondition2["IsLanguage"] = Condition.IsLanguage] = "IsLanguage";
  StringCondition2[StringCondition2["IsLatitude"] = Condition.IsLatitude] = "IsLatitude";
  StringCondition2[StringCondition2["IsLongitude"] = Condition.IsLongitude] = "IsLongitude";
  StringCondition2[StringCondition2["IsLengthEqual"] = Condition.IsLengthEqual] = "IsLengthEqual";
  StringCondition2[StringCondition2["IsLengthGreaterThan"] = Condition.IsLengthGreaterThan] = "IsLengthGreaterThan";
  StringCondition2[StringCondition2["IsLengthGreaterThanOrEqual"] = Condition.IsLengthGreaterThanOrEqual] = "IsLengthGreaterThanOrEqual";
  StringCondition2[StringCondition2["IsLengthLessThan"] = Condition.IsLengthLessThan] = "IsLengthLessThan";
  StringCondition2[StringCondition2["IsLengthLessThanOrEqual"] = Condition.IsLengthLessThanOrEqual] = "IsLengthLessThanOrEqual";
  StringCondition2[StringCondition2["IsLicensePlateNumber"] = Condition.IsLicensePlateNumber] = "IsLicensePlateNumber";
  StringCondition2[StringCondition2["IsLowercase"] = Condition.IsLowercase] = "IsLowercase";
  StringCondition2[StringCondition2["IsOctal"] = Condition.IsOctal] = "IsOctal";
  StringCondition2[StringCondition2["IsMACAddress"] = Condition.IsMACAddress] = "IsMACAddress";
  StringCondition2[StringCondition2["IsMD5"] = Condition.IsMD5] = "IsMD5";
  StringCondition2[StringCondition2["IsMagnetURI"] = Condition.IsMagnetURI] = "IsMagnetURI";
  StringCondition2[StringCondition2["IsMarkdown"] = Condition.IsMarkdown] = "IsMarkdown";
  StringCondition2[StringCondition2["IsMimeType"] = Condition.IsMimeType] = "IsMimeType";
  StringCondition2[StringCondition2["IsMonth"] = Condition.IsMonth] = "IsMonth";
  StringCondition2[StringCondition2["IsNotInIPAddressRange"] = Condition.IsNotInIPAddressRange] = "IsNotInIPAddressRange";
  StringCondition2[StringCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  StringCondition2[StringCondition2["IsNotNull"] = Condition.IsNotNull] = "IsNotNull";
  StringCondition2[StringCondition2["IsNotRegexMatch"] = Condition.IsNotRegexMatch] = "IsNotRegexMatch";
  StringCondition2[StringCondition2["IsNumber"] = Condition.IsNumber] = "IsNumber";
  StringCondition2[StringCondition2["IsNumeric"] = Condition.IsNumeric] = "IsNumeric";
  StringCondition2[StringCondition2["IsPassportNumber"] = Condition.IsPassportNumber] = "IsPassportNumber";
  StringCondition2[StringCondition2["IsPhoneNumber"] = Condition.IsPhoneNumber] = "IsPhoneNumber";
  StringCondition2[StringCondition2["IsPort"] = Condition.IsPort] = "IsPort";
  StringCondition2[StringCondition2["IsPostalCode"] = Condition.IsPostalCode] = "IsPostalCode";
  StringCondition2[StringCondition2["IsProvince"] = Condition.IsProvince] = "IsProvince";
  StringCondition2[StringCondition2["IsRegexMatch"] = Condition.IsRegexMatch] = "IsRegexMatch";
  StringCondition2[StringCondition2["IsSemanticVersion"] = Condition.IsSemanticVersion] = "IsSemanticVersion";
  StringCondition2[StringCondition2["IsSlug"] = Condition.IsSlug] = "IsSlug";
  StringCondition2[StringCondition2["IsSSN"] = Condition.IsSSN] = "IsSSN";
  StringCondition2[StringCondition2["IsState"] = Condition.IsState] = "IsState";
  StringCondition2[StringCondition2["IsStreetAddress"] = Condition.IsStreetAddress] = "IsStreetAddress";
  StringCondition2[StringCondition2["IsString"] = Condition.IsString] = "IsString";
  StringCondition2[StringCondition2["IsTaxIDNumber"] = Condition.IsTaxIDNumber] = "IsTaxIDNumber";
  StringCondition2[StringCondition2["IsURL"] = Condition.IsURL] = "IsURL";
  StringCondition2[StringCondition2["IsUUID"] = Condition.IsUUID] = "IsUUID";
  StringCondition2[StringCondition2["IsUppercase"] = Condition.IsUppercase] = "IsUppercase";
  StringCondition2[StringCondition2["IsVATIDNumber"] = Condition.IsVATIDNumber] = "IsVATIDNumber";
  StringCondition2[StringCondition2["IsWeekday"] = Condition.IsWeekday] = "IsWeekday";
  StringCondition2[StringCondition2["IsWeekend"] = Condition.IsWeekend] = "IsWeekend";
  StringCondition2[StringCondition2["IsYear"] = Condition.IsYear] = "IsYear";
  return StringCondition2;
})(StringCondition || {});
var LongTextCondition = ((LongTextCondition2) => {
  LongTextCondition2[LongTextCondition2["Contains"] = Condition.Contains] = "Contains";
  LongTextCondition2[LongTextCondition2["IsAlpha"] = Condition.IsAlpha] = "IsAlpha";
  LongTextCondition2[LongTextCondition2["IsAlphanumeric"] = Condition.IsAlphanumeric] = "IsAlphanumeric";
  LongTextCondition2[LongTextCondition2["IsInList"] = Condition.IsInList] = "IsInList";
  LongTextCondition2[LongTextCondition2["IsMarkdown"] = Condition.IsMarkdown] = "IsMarkdown";
  LongTextCondition2[LongTextCondition2["IsNotInList"] = Condition.IsNotInList] = "IsNotInList";
  LongTextCondition2[LongTextCondition2["IsNumeric"] = Condition.IsNumeric] = "IsNumeric";
  LongTextCondition2[LongTextCondition2["IsLowercase"] = Condition.IsLowercase] = "IsLowercase";
  LongTextCondition2[LongTextCondition2["IsString"] = Condition.IsString] = "IsString";
  LongTextCondition2[LongTextCondition2["IsUppercase"] = Condition.IsUppercase] = "IsUppercase";
  return LongTextCondition2;
})(LongTextCondition || {});

let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte > 62) {
      id += '-';
    } else {
      id += '_';
    }
    return id
  }, '');

var picocolors_browser = {exports: {}};

var x=String;
var create=function() {return {isColorSupported:false,reset:x,bold:x,dim:x,italic:x,underline:x,inverse:x,hidden:x,strikethrough:x,black:x,red:x,green:x,yellow:x,blue:x,magenta:x,cyan:x,white:x,gray:x,bgBlack:x,bgRed:x,bgGreen:x,bgYellow:x,bgBlue:x,bgMagenta:x,bgCyan:x,bgWhite:x}};
picocolors_browser.exports=create();
picocolors_browser.exports.createColors = create;

var pc = picocolors_browser.exports;

class Logger {
  constructor(config) {
    this.environment = config?.environment;
    this.level = config?.level ?? LogLevel.Info;
  }
  analytics(props) {
    const event = { ...props, ...this.getCommonProps() };
    console.info(event);
    return event;
  }
  critical({
    cause,
    id,
    message,
    ...eventArgs
  }) {
    const props = this.getCommonProps();
    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${id}:${message} 
      ${pc.bgRed(pc.white(cause?.name))}`
    };
    console.error(event.message);
    return event;
  }
  debug({ data, message, ...eventArgs }) {
    const props = this.getCommonProps();
    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${message} 
      ${pc.white(data)}`,
      ...this.getCommonProps()
    };
    console.debug(event.message);
    return event;
  }
  exception({
    message,
    cause,
    id,
    ...eventArgs
  }) {
    const props = this.getCommonProps();
    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${id}:${message} 
      ${pc.red(cause?.name)}`
    };
    console.error(event.message);
    return event;
  }
  http({ request, response, ...eventArgs }) {
    const { method, resource, details: requestDetails } = request ?? {};
    const { status, details: responseDetails } = response ?? {};
    const props = this.getCommonProps();
    const timeStamp = pc.white(`[${props.created}]`);
    const requestId = pc.bold(pc.yellow(`<${requestDetails?.id ?? "?"}>`));
    const requestMethod = status?.code === 200 ? pc.blue(`${method?.toUpperCase()} ${status?.code}`) : pc.gray(`${method?.toUpperCase()} ${status?.code}`);
    const duration = pc.gray(`${responseDetails?.duration}ms`);
    const event = {
      ...props,
      ...eventArgs,
      message: `${timeStamp} ${requestId} ${requestMethod} ${resource} ${duration}`.replace(/\n\s+/g, "")
    };
    console.info(event.message);
    return event;
  }
  info(message) {
    const props = this.getCommonProps();
    const event = {
      ...props,
      message: `[${pc.blue(props.created)}] ${message}`
    };
    console.info(event.message);
    return event;
  }
  warning({
    cause,
    id,
    message,
    ...eventArgs
  }) {
    const props = this.getCommonProps();
    const event = {
      ...props,
      ...eventArgs,
      message: `[${pc.blue(props.created)}]
      ${id}:${message} 
      ${pc.yellow(message)}`
    };
    console.warn(event);
    return event;
  }
  getCommonProps() {
    return {
      created: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
      environment: this.environment?.id,
      id: nanoid(),
      level: this.level
    };
  }
}

export { Logger, expressLoggerMiddleware };
//# sourceMappingURL=index.mjs.map
