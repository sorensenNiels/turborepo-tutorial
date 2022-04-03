import React from 'react';

interface Props {
  children: string;
}

export const Button = ({ children }: Props) => (
  <button type="button" className="bg-blue-500 hover:bg-blue-700 h-16 w-16">
    {children}
  </button>
);
