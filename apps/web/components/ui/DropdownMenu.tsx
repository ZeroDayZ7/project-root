'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  buttonLabel: string;
  buttonIcon?: React.ComponentType<{ size?: number; className?: string }>;
  ariaLabel: string;
  className?: string;
}

export default function DropdownMenu({
  items,
  selectedId,
  onSelect,
  buttonLabel,
  buttonIcon: ButtonIcon,
  ariaLabel,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Zamykanie dropdownu po kliknięciu poza komponentem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Obsługa klawiatury
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!open && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      setOpen(true);
      setFocusedIndex(0);
    } else if (open) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev < items.length - 1 ? prev + 1 : 0;
            optionRefs.current[nextIndex]?.focus();
            return nextIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev > 0 ? prev - 1 : items.length - 1;
            optionRefs.current[nextIndex]?.focus();
            return nextIndex;
          });
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0) {
            onSelect(items[focusedIndex].id);
            setOpen(false);
            setFocusedIndex(-1);
            buttonRef.current?.focus();
          }
          break;
        case 'Escape':
          event.preventDefault();
          setOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        default:
          break;
      }
    }
  };

  // Fokus na pierwszej opcji po otwarciu dropdownu
  useEffect(() => {
    if (open && focusedIndex === 0) {
      optionRefs.current[0]?.focus();
    }
  }, [open]);

  return (
    <div
      className={cn('relative inline-block text-left font-sans', className)}
      ref={dropdownRef}
    >
      {/* Główny przycisk */}
      <button
        id="dropdown-button"
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => {
          setOpen(!open);
          if (!open) setFocusedIndex(0);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center justify-between gap-2 px-3 py-1.5 w-32 rounded-md border',
          'bg-background text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-muted focus-visible:outline-none',
          'text-xs font-medium transition-colors duration-200',
        )}
      >
        <span className="flex items-center gap-2">
          {ButtonIcon && <ButtonIcon size={14} aria-hidden="true" />}
          {buttonLabel}
        </span>
        <span className="sr-only">
          {items.find((item) => item.id === selectedId)?.label}
        </span>
      </button>

      {/* Dropdown lista */}
      {open && (
        <ul
          role="listbox"
          aria-labelledby="dropdown-button"
          className={cn(
            'absolute mt-2 w-32 rounded-md border bg-background shadow-lg z-50',
            'text-xs font-medium',
          )}
        >
          {items.map(({ id, label, icon: Icon }, index) => (
            <li key={id} role="option" aria-selected={selectedId === id}>
              <button
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                onClick={() => {
                  onSelect(id);
                  setOpen(false);
                  setFocusedIndex(-1);
                  buttonRef.current?.focus();
                }}
                onKeyDown={handleKeyDown}
                className={cn(
                  'flex items-center justify-between gap-2 w-full px-3 py-1.5',
                  'hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-none',
                  'transition-colors duration-200',
                  selectedId === id ? 'font-semibold' : '',
                  index === 0 ? 'rounded-t-md' : '', // Zaokrąglenie górne dla pierwszej opcji
                  index === items.length - 1 ? 'rounded-b-md' : '',
                )}
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon size={14} aria-hidden="true" />}
                  {label}
                </span>
                {selectedId === id && (
                  <Check
                    size={14}
                    className="text-green-500"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
