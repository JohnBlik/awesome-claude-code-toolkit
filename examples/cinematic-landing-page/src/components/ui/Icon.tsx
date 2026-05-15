import type { SVGProps } from 'react';

export type IconName =
  | 'arrowRight'
  | 'arrowUpRight'
  | 'sparkle'
  | 'bolt'
  | 'shield'
  | 'layers'
  | 'cpu'
  | 'wand'
  | 'globe'
  | 'check'
  | 'chevron'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'play'
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'mail'
  | 'send';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, JSX.Element> = {
  arrowRight: (
    <path d="M5 12h14M13 5l7 7-7 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  ),
  arrowUpRight: (
    <path d="M7 17L17 7M8 7h9v9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={1.6} />
      <path d="M3 7l9 6 9-6" strokeWidth={1.6} strokeLinejoin="round" />
    </>
  ),
  send: (
    <path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sparkle: (
    <>
      <path
        d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.6 10.3 11 6 9.3l4.3-1.7L12 3z"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M19 14l.9 2.3L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.7L19 14z" strokeWidth={1.4} />
    </>
  ),
  bolt: (
    <path
      d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  ),
  shield: (
    <path
      d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5M3 17l9 5 9-5" strokeWidth={1.6} strokeLinejoin="round" />
    </>
  ),
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" strokeWidth={1.6} />
      <rect x="9" y="9" width="6" height="6" strokeWidth={1.6} />
      <path
        d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </>
  ),
  wand: (
    <>
      <path d="M15 4l5 5L9 20H4v-5L15 4z" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M13 6l5 5" strokeWidth={1.6} strokeLinecap="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth={1.6} />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" strokeWidth={1.6} />
    </>
  ),
  check: (
    <path d="M4 12l5 5L20 6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevron: (
    <path d="M6 9l6 6 6-6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" strokeWidth={1.6} />
      <path
        d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </>
  ),
  moon: (
    <path
      d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" strokeWidth={2} strokeLinecap="round" />,
  close: (
    <path d="M6 6l12 12M18 6L6 18" strokeWidth={2} strokeLinecap="round" />
  ),
  play: (
    <path d="M8 5v14l11-7L8 5z" strokeWidth={1.6} strokeLinejoin="round" fill="currentColor" />
  ),
  github: (
    <path
      d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 011-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 011 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0012 2z"
      strokeWidth={0.5}
      fill="currentColor"
    />
  ),
  twitter: (
    <path
      d="M22 5.8c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4.1 4.1 0 0011.7 9c0 .3 0 .6.1.9A11.7 11.7 0 013 4.8a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 003.3 4c-.6.2-1.2.2-1.9.1a4.1 4.1 0 003.8 2.9A8.2 8.2 0 012 18.5 11.6 11.6 0 008.3 20c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.1z"
      strokeWidth={0.5}
      fill="currentColor"
    />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.6} />
      <path
        d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 11v6"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </>
  ),
};

export function Icon({ name, size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
