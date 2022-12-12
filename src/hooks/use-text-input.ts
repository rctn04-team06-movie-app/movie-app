import * as React from 'react';

export default function useTextInput(
  value: string,
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [_value, setValue] = React.useState(value);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return [_value, onChange];
}
