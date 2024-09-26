import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import isEqual from 'lodash.isequal';
import type { Settings } from '../types/settings';

const STORAGE_KEY = 'app.settings';

let storage: Storage;

class MemoryStorage implements Storage {
  store = new Map();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  key(index: number): string | null {
    return Array.from(this.store.values())[index] || null;
  }
}

try {
  storage = globalThis.localStorage;
} catch (err) {
  console.error('[Settings Context] Local storage is not available', err);
  storage = new MemoryStorage();
}

const restoreSettings = (): Settings | null => {
  let value = null;

  try {
    const restored: string | null = storage.getItem(STORAGE_KEY);

    if (restored) {
      value = JSON.parse(restored);
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return value;
};

const deleteSettings = (): void => {
  storage.removeItem(STORAGE_KEY);
};

const storeSettings = (value: Record<string, any>): void => {
  storage.setItem(STORAGE_KEY, JSON.stringify(value));
};

const initialSettings: Settings = {
  direction: 'ltr',
  paletteMode: 'light',
  pinNav: true
};

interface State extends Settings {
  isInitialized: boolean;
}

const initialState: State = {
  ...initialSettings,
  isInitialized: false
};

export interface SettingsContextType extends State {
  handleReset: () => void;
  handleUpdate: (settings: Settings) => void;
  isCustom: boolean;
}

export const SettingsContext = createContext<SettingsContextType>({
  ...initialState,
  handleReset: () => {},
  handleUpdate: () => {},
  isCustom: false
});

interface SettingsProviderProps {
  children?: ReactNode;
}

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;
  const [state, setState] = useState<State>(initialState);

  useEffect(
    () => {
      const restored = restoreSettings();

      if (restored) {
        setState((prevState) => ({
          ...prevState,
          ...restored,
          isInitialized: true
        }));
      }
    },
    []
  );

  const handleReset = useCallback(
    (): void => {
      deleteSettings();
      setState((prevState) => ({
        ...prevState,
        ...initialSettings
      }));
    },
    []
  );

  const handleUpdate = useCallback(
    (settings: Settings): void => {
      setState((prevState) => {
        storeSettings({
          direction: prevState.direction,
          paletteMode: prevState.paletteMode,
          pinNav: prevState.pinNav,
          ...settings
        });

        return {
          ...prevState,
          ...settings
        };
      });
    },
    []
  );

  const isCustom = useMemo(
    () => {
      return !isEqual(
        initialSettings,
        {
          direction: state.direction,
          paletteMode: state.paletteMode,
          pinNav: state.pinNav
        }
      );
    },
    [state]
  );

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        handleReset,
        handleUpdate,
        isCustom
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const SettingsConsumer = SettingsContext.Consumer;
