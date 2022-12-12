import * as React from 'react';

const ThemeContext = React.createContext<
  | {
      theme: 'light' | 'dark';
      onToggle: () => void;
    }
  | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const _theme = localStorage.getItem('theme');

  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    _theme ? (_theme as any) : 'light',
  );

  const onToggle = React.useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem('theme', newTheme);

      return newTheme;
    });
  }, []);

  const values = React.useMemo(() => ({ theme, onToggle }), [onToggle, theme]);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('UseTheme must be used within ThemeProvider');
  }
  return context;
}
