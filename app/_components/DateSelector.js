"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 px-5 xl:px-8 place-self-center bg-primary-900 text-primary-200 min-h-[410px]  [&_.rdp-caption_label]:text-base md:[&_.rdp-caption_label]:text-lg   [&_.rdp-caption]:bg-accent-500 [&_.rdp-caption]:rounded-lg [&_.rdp-caption]:p-2 [&_.rdp-caption_label]:text-primary-900 [&_.rdp-caption_label]:font-bold [&_.rdp-nav_button]:text-primary-200   
         "
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        styles={{ months: { display: "flex", flexWrap: "nowrap" } }}
        modifiersClassNames={{
          selected: "bg-accent-500 text-primary-900 rounded-full outline-none",
          range_start:
            "bg-accent-500 text-primary-900 rounded-r-md outline-none",
          range_end: "bg-accent-500 text-primary-900 rounded-l-md outline-none",
          range_middle:
            "bg-accent-500 text-primary-200 rounded-none",
          disabled: "text-primary-700 opacity-70",
          outside: "text-primary-700 opacity-70",
          today: "text-accent-200 font-semibold",
        }}
        disabled={(curDate) => {
          if (isPast(curDate)) return true;
          if (bookedDates.some((date) => isSameDay(date, curDate))) return true;
          if (displayRange.from && !displayRange.to) {
            const diff = Math.ceil(
              (curDate - displayRange.from) / (1000 * 60 * 60 * 24)
            );
            if (diff < minBookingLength || diff > maxBookingLength) return true;
          }
          return false;
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
