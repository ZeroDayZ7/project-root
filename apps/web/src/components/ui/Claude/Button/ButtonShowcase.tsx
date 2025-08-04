'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { ButtonVariant, ButtonSize, ButtonColor } from './button.types';

// Icons for demonstration (you can replace with your preferred icon library)
const PlusIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export const ButtonShowcase = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );

  const handleLoadingDemo = (buttonId: string) => {
    setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  const variants: ButtonVariant[] = [
    'primary',
    'secondary',
    'outline',
    'ghost',
    'destructive',
  ];
  const sizes: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];
  const colors: ButtonColor[] = [
    'blue',
    'green',
    'red',
    'yellow',
    'purple',
    'gray',
  ];

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Button Component Showcase
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Comprehensive demonstration of all button variants, sizes, colors, and
          features.
        </p>

        {/* Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Button Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {variants.map((variant) => (
              <div key={variant} className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 capitalize">
                  {variant}
                </h3>
                <Button variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Button Sizes
          </h2>
          <div className="flex flex-wrap items-end gap-4">
            {sizes.map((size) => (
              <Button key={size} size={size}>
                Size {size.toUpperCase()}
              </Button>
            ))}
          </div>
        </section>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Button Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colors.map((color) => (
              <div key={color} className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 capitalize">
                  {color}
                </h3>
                <Button color={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Button States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Normal</h3>
              <Button>Normal Button</Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Disabled</h3>
              <Button disabled>Disabled Button</Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Loading</h3>
              <Button
                isLoading={loadingStates.demo1}
                onClick={() => handleLoadingDemo('demo1')}
              >
                {loadingStates.demo1 ? 'Loading...' : 'Click for Loading'}
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Full Width</h3>
              <Button fullWidth>Full Width Button</Button>
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Buttons with Icons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Left Icon</h3>
              <Button leftIcon={<PlusIcon />}>Add Item</Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Right Icon</h3>
              <Button rightIcon={<ChevronRightIcon />}>Continue</Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">
                Icon with Loading
              </h3>
              <Button
                leftIcon={<HeartIcon />}
                isLoading={loadingStates.demo2}
                onClick={() => handleLoadingDemo('demo2')}
                color="red"
              >
                {loadingStates.demo2 ? 'Saving...' : 'Like'}
              </Button>
            </div>
          </div>
        </section>

        {/* Complex Examples Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Complex Examples
          </h2>
          <div className="space-y-8">
            {/* CTA Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Call-to-Action Section
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" leftIcon={<PlusIcon />}>
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
                <Button variant="ghost" size="lg">
                  Skip for now
                </Button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Form Actions
              </h3>
              <div className="flex justify-between items-center">
                <Button variant="ghost" color="gray">
                  Cancel
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button
                    isLoading={loadingStates.submit}
                    onClick={() => handleLoadingDemo('submit')}
                  >
                    {loadingStates.submit ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Destructive Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Destructive Actions
              </h3>
              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  leftIcon={<TrashIcon />}
                  size="sm"
                >
                  Delete
                </Button>
                <Button variant="outline" color="red" leftIcon={<TrashIcon />}>
                  Remove Item
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Accessibility Features
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Custom ARIA Label
                </h3>
                <Button
                  aria-label="Close modal dialog"
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">
                  With Description
                </h3>
                <div>
                  <Button
                    aria-describedby="delete-help"
                    variant="destructive"
                    size="sm"
                  >
                    Delete Account
                  </Button>
                  <p id="delete-help" className="text-xs text-gray-500 mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Combinations Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            All Variant + Color Combinations
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
            <div className="grid grid-cols-6 gap-3 min-w-max">
              <div></div>
              {colors.map((color) => (
                <h3
                  key={color}
                  className="text-xs font-medium text-gray-700 capitalize text-center"
                >
                  {color}
                </h3>
              ))}

              {variants.map((variant) => (
                <React.Fragment key={variant}>
                  <h3 className="text-xs font-medium text-gray-700 capitalize flex items-center">
                    {variant}
                  </h3>
                  {colors.map((color) => (
                    <Button
                      key={`${variant}-${color}`}
                      variant={variant}
                      color={color}
                      size="sm"
                    >
                      {variant === 'destructive' ? 'Delete' : 'Button'}
                    </Button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
