// app/components/DropdownMenu.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@lib/utils';
import { Check, ChevronDown } from 'lucide-react';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  buttonLabel?: string;
  buttonIcon?: React.ComponentType<{ size?: number; className?: string }>;
  ariaLabel?: string;
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
        // buttonRef.current?.focus(); // może przewijać,
        // buttonRef.current?.focus({ preventScroll: true }); //  ustawia focus, ale nie przewija.
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fokus na aktywnej opcji po otwarciu dropdownu i przewijanie
  useEffect(() => {
    if (open && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.focus();
      // optionRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, focusedIndex]);

  // Obsługa klawiatury
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
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
            return nextIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev > 0 ? prev - 1 : items.length - 1;
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
        case 'Tab':
          // event.preventDefault();
          setOpen(false);
          setFocusedIndex(-1);
          // Fokus przechodzi naturalnie dzięki przeglądarce
          break;
        default:
          break;
      }
    }
  };

  const selectedItem = items.find((item) => item.id === selectedId);
  const displayLabel = buttonLabel || selectedItem?.label || 'Wybierz opcję';
  const computedAriaLabel =
    ariaLabel ||
    `Wybierz stację radiową, wybrana: ${selectedItem?.label || 'brak'}`;

  return (
    <div className={cn('relative inline-block text-left font-sans', className)} ref={dropdownRef} role="presentation">
      {/* Główny przycisk z natywnym <button> */}
      <button
        id="dropdown-button"
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={computedAriaLabel}
        onClick={() => {
          setOpen(!open);
          if (!open) setFocusedIndex(0);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex',
          'items-center',
          'justify-between',
          'gap-2',
          'px-3',
          'py-1.5',
          'w-48',
          'rounded-md',
          'border',
          'bg-background',
          'text-foreground',
          'hover:bg-muted',
          // 'focus-visible:ring-2',
          // 'focus-visible:ring-ring',
          'text-sm',
          'font-medium',
          'transition-colors',
          'duration-200',
        )}
      >
        <span className="flex items-center gap-2">
          {ButtonIcon && <ButtonIcon size={16} aria-hidden="true" />}
          {displayLabel}
        </span>
        <ChevronDown
          size={16}
          className={cn('ml-2 transition-transform', open ? 'rotate-180' : '')}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown lista */}
      {open && (
        <ul
          role="listbox"
          aria-labelledby="dropdown-button"
          aria-activedescendant={open && focusedIndex >= 0 ? `dropdown-item-${items[focusedIndex].id}` : undefined}
          aria-multiselectable={false}
          className={cn(
            'absolute mt-1 w-48 rounded-md border bg-background shadow-lg z-50 max-h-60 overflow-y-auto',
            'text-sm font-medium transition-all duration-200 ease-in-out',
            open ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95',
          )}
          style={{ transformOrigin: 'top' }}
        >
          {items.map(({ id, label, icon: Icon }, index) => (
            <li key={id} id={`dropdown-item-${id}`} role="option" aria-selected={selectedId === id}>
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
                  'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
                  'transition-colors duration-200',
                  selectedId === id ? 'font-semibold' : '',
                  index === 0 ? 'rounded-t-md' : '',
                  index === items.length - 1 ? 'rounded-b-md' : '',
                )}
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon size={16} aria-hidden="true" />}
                  {label}
                </span>
                {selectedId === id && <Check size={16} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
