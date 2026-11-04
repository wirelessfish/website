import en from "./en.json";
import cs from "./cs.json";
export const localization = { en, cs };
export type Locale = keyof typeof localization;
