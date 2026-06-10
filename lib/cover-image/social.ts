// The social icon row rendered at the bottom of the cover banner.
// react-icons is used so SVGs inherit `currentColor` and can be re-tinted
// per-item in the canvas download.

import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";

export type SocialIcon = { href: string; Icon: IconType };

export const SOCIAL_ICONS: SocialIcon[] = [
  { href: "https://github.com/Nano-Collective", Icon: FaGithub },
  { href: "https://discord.gg/ktPDV6rekE", Icon: FaDiscord },
  { href: "https://x.com/nano_collective", Icon: FaXTwitter },
  {
    href: "https://www.linkedin.com/company/nano-collective/",
    Icon: FaLinkedin,
  },
];
