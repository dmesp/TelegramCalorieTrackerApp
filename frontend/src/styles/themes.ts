const tgThemeParams = window.Telegram.WebApp.themeParams;
const mainColorChange = "all 0.30s linear;"

const userThemeType = window.Telegram.WebApp.colorScheme;

const hexToRgb = (hex: string): string => {
  // Удаление # из начала строки, если он есть
  hex = hex.replace(/^#/, '');
  
  // Преобразование HEX в RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};


export enum ThemeNames {
  LIGHT = 'light',
  DARK = 'dark',
  USER = 'user',
}

export const lightTheme = {
  appBgColor: "green",
  secBgColor: "green",
  appTextColor: "green",
  secTextColor: "green",
  accentColor100: "green",
  accentColor20: "green",
  accentColor50: "green",
  accentColor70: "green",
  buttonColor: "green",
  clickedColor: "#00a800",
  separatorColor:"green",
  colorChangeAnimation:"green",
  };
  
export const darkTheme = {
  appColor: "#1F1F1F", // темный фон приложения
  mainColor: 'rgb(20, 20, 20)', // основной фон
  appHeaderColor: "#1F1F1F",
  textColor: 'white', // основной текст
  buttonColor: 'black', // темные кнопки с легким контрастом
  accentColor: "rgba(20, 44, 13, 1)", // акцентный цвет
  clickedColor: "#00A800", // цвет при клике
  mainColorChange: mainColorChange,
};

const secBgColor = userThemeType === "light"
  ? tgThemeParams?.secondary_bg_color
  : userThemeType === "dark"
  ? tgThemeParams?.section_bg_color
  : tgThemeParams?.default_bg_color; // или любое другое значение по умолчанию

export const CustomTheme = {
  appBgColor: tgThemeParams?.bg_color,
  secBgColor: secBgColor,
  appTextColor: tgThemeParams?.text_color,
  secTextColor: tgThemeParams?.hint_color,
  accentColor100: tgThemeParams.accent_text_color,
  accentColor20: `rgba(${hexToRgb(tgThemeParams.accent_text_color)}, 0.2)`,
  accentColor50: `rgba(${hexToRgb(tgThemeParams.accent_text_color)}, 0.5)`,
  accentColor70: `rgba(${hexToRgb(tgThemeParams.accent_text_color)}, 0.7)`,
  buttonColor: tgThemeParams?.button_color,
  clickedColor: "#00a800",
  separatorColor: tgThemeParams?.section_separator_color,
  colorChangeAnimation: mainColorChange,
};

export const themes = {
  [ThemeNames.LIGHT]: lightTheme,
  [ThemeNames.DARK]: darkTheme,
  [ThemeNames.USER]: CustomTheme,
};