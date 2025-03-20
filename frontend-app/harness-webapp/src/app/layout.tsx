// src/app/layout.tsx
"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/createEmotionCache';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import theme from '@/app/styles/theme';
import Sidebar from '@/app/components/Sidebar';

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <html lang="en">
        <body style={{ backgroundColor: '#000', minHeight: '100vh' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          >
            <CircularProgress size={60} sx={{ color: 'white' }} />
          </Box>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
      </head>
      <body style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Sidebar />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
