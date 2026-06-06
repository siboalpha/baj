'use client';

import { useState, useRef, useEffect } from 'react';
import { CalendarDays, ChevronDown, Check } from 'lucide-react';
import styles from './DateRangeFilter.module.css';

export type DateRange =
  | 'today'
  | 'this_week'
  | 'this_month'
  | 'last_month'
  | 'last_3_months';

const OPTIONS: { value: DateRange; label: string }[] = [
  { value: 'today',         label: 'Today' },
  { value: 'this_week',     label: 'This week' },
  { value: 'this_month',    label: 'This month' },
  { value: 'last_month',    label: 'Last month' },
  { value: 'last_3_months', label: 'Last 3 months' },
];

interface DateRangeFilterProps {
  value?:    DateRange;
  onChange?: (range: DateRange) => void;
}

export default function DateRangeFilter({
  value    = 'this_week',
  onChange,
}: DateRangeFilterProps) {
  const [selected, setSelected] = useState<DateRange>(value);
  const [open,     setOpen]     = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function select(range: DateRange) {
    setSelected(range);
    onChange?.(range);
    setOpen(false);
  }

  const selectedLabel = OPTIONS.find((o) => o.value === selected)?.label ?? 'This week';

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <CalendarDays size={15} aria-hidden="true" />
        <span>{selectedLabel}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={styles.chevron}
          data-open={open}
        />
      </button>

      {open && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-label="Select date range"
        >
          {OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={selected === opt.value}
              className={styles.option}
              data-active={selected === opt.value}
              onClick={() => select(opt.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') select(opt.value); }}
              tabIndex={0}
            >
              <span>{opt.label}</span>
              {selected === opt.value && (
                <Check size={14} className={styles.check} aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
