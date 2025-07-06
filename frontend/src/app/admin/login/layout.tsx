'use client';

import React, { ReactNode } from 'react';
  import { AuthProvider } from '../../../context/AuthContext';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div>{children}</div>
  );
} 