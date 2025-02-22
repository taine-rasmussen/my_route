import { createTamagui } from "tamagui";
import { optimizedThemes } from './app/theme';
import { defaultConfig } from "@tamagui/config/v4";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: optimizedThemes, 
});

export default tamaguiConfig;
export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
