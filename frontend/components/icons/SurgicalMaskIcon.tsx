export function SurgicalMaskIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 10c0-1.5 1-3 2.5-3.5L8 6l.5-2C9 3 10 2 12 2s3 1 3.5 2L16 6l1.5.5C19 7 20 8.5 20 10v6c0 1.5-1 3-2.5 3.5l-2 .5c-1 .5-2.5.5-3.5.5s-2.5 0-3.5-.5l-2-.5C5 19 4 17.5 4 16v-6z" />
      <path d="M8 6C6.5 6.5 5.5 7.5 5 9" />
      <path d="M16 6c1.5.5 2.5 1.5 3 3" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="15" x2="16" y2="15" />
    </svg>
  );
}

