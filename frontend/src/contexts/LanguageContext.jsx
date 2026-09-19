import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({
  children,
}) {
  const getInitialLanguage = () => {
    const savedLanguage =
      localStorage.getItem("language");

    if (savedLanguage) {
      return savedLanguage;
    }

    return "id";
  };


  const [language, setLanguage] =
    useState(getInitialLanguage);


  useEffect(() => {
    localStorage.setItem(
      "language",
      language
    );

    document.documentElement.lang = language;
  }, [language]);


  const changeLanguage = (value) => {
    setLanguage(value);
  };


  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}