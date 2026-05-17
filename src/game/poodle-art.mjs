export function poodleSvg(poodleId) {
  const palette = {
    mimi: {
      coat: '#d9a36f',
      ear: '#b87948',
      bow: '#ef6f8f',
    },
    beau: {
      coat: '#f5f1e8',
      ear: '#d9d1c3',
      bow: '#5f8dd3',
    },
  }[poodleId];

  return `
    <svg viewBox="0 0 96 96" role="img" aria-label="Realistic poodle marker">
      <ellipse cx="50" cy="58" rx="30" ry="22" fill="${palette.coat}"/>
      <circle cx="32" cy="54" r="12" fill="${palette.ear}"/>
      <circle cx="63" cy="54" r="12" fill="${palette.ear}"/>
      <circle cx="48" cy="43" r="20" fill="${palette.coat}"/>
      <circle cx="37" cy="30" r="11" fill="${palette.coat}"/>
      <circle cx="49" cy="25" r="13" fill="${palette.coat}"/>
      <circle cx="62" cy="31" r="11" fill="${palette.coat}"/>
      <circle cx="41" cy="45" r="3" fill="#33241d"/>
      <circle cx="56" cy="45" r="3" fill="#33241d"/>
      <ellipse cx="49" cy="53" rx="5" ry="4" fill="#33241d"/>
      <path d="M42 59 Q49 64 57 59" fill="none" stroke="#6d4a37" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="72" r="8" fill="${palette.coat}"/>
      <circle cx="68" cy="72" r="8" fill="${palette.coat}"/>
      <path d="M70 55 Q88 43 85 65" fill="none" stroke="${palette.coat}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="49" cy="70" r="5" fill="${palette.bow}"/>
    </svg>
  `;
}

export const itemLabels = {
  bowl: '🥣',
  bed: '▱',
  toy: '●',
  family: '♡',
  sunny: '☼',
  obstacle: '■',
};
