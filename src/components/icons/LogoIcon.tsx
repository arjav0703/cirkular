import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-ai-hint="abstract logo"
      {...props}
    >
      <path d="M4 7V5a2 2 0 0 1 2-2h2" />
      <path d="M4 17v2a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M16 20h2a2 2 0 0 0 2-2v-2" />
      <path d="M9.5 12A2.5 2.5 0 0 1 12 9.5a2.5 2.5 0 0 1 2.5 2.5" />
      <line x1="8" y1="15" x2="16" y2="15" />
      <path d="M12 15v-2.5" />
    </svg>
  );
}
