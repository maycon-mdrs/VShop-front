import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  effectiveTheme: Theme; // Adiciona uma nova propriedade para armazenar o tema efetivo
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  effectiveTheme: "light", // Define um valor inicial para o tema efetivo
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [effectiveTheme, setEffectiveTheme] = useState<Theme>(theme) // Usa o tema como inicializador

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    root.classList.remove("light", "dark");

    let currentTheme = theme === "system" ? systemTheme : theme;
    root.classList.add(currentTheme);

    setEffectiveTheme(currentTheme); // Atualiza o tema efetivo com o tema atual

  }, [theme])

  const value = {
    theme,
    effectiveTheme, // Adiciona o tema efetivo ao contexto
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
