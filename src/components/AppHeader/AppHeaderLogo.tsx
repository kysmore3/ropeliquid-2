import ButtonLink from "components/Button/ButtonLink";

import { useTheme } from "context/ThemeContext/ThemeContext";

import logoIcon from "img/ropeliquid-icon.svg";
import LogoTextDark from "img/ropeliquid-text_white.svg?react";
import LogoTextLight from "img/ropeliquid-text.svg?react";

export function AppHeaderLogo() {
  const { theme } = useTheme();
  const LogoText = theme === "dark" ? LogoTextDark : LogoTextLight;

  return (
    <ButtonLink to="/" className="flex items-center gap-8 px-6 py-4 text-typography-primary lg:hidden">
      <img src={logoIcon} alt="GMX Logo" className="block" />
      <LogoText className="hidden md:block" />
    </ButtonLink>
  );
}
