import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

describe('<Button />', () => {
  it('renderuje się z domyślnym tekstem', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('wywołuje funkcję onClick', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('pokazuje loader, gdy loading = true', () => {
    render(<Button loading={true}>Loading</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
  });

  it('renderuje ikonę, gdy podano prop icon', () => {
    render(<Button icon={<Loader2 data-testid="icon" />}>With icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('With icon')).toBeInTheDocument();
  });

  it('blokuje kliknięcia, gdy disabled = true', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
