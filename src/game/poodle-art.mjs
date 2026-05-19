export function poodleSvg(poodleId = 'cloudy') {
  const palette = {
    cloudy: {
      coat: '#fff9f2',
      ear: '#f4eadf',
      bow: '#f477ad',
    },
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
  }[poodleId] ?? {
    coat: '#fff9f2',
    ear: '#f4eadf',
    bow: '#f477ad',
  };

  return `
    <svg viewBox="0 0 180 220" role="img" aria-label="White poodle Cloudy">
      <ellipse cx="88" cy="154" rx="45" ry="42" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <ellipse cx="56" cy="112" rx="22" ry="40" fill="${palette.ear}" stroke="#ead9cc" stroke-width="3"/>
      <ellipse cx="123" cy="112" rx="22" ry="40" fill="${palette.ear}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="90" cy="95" r="41" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="69" cy="57" r="18" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="91" cy="49" r="21" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="114" cy="59" r="18" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="76" cy="94" r="7" fill="#2a1d18"/>
      <circle cx="107" cy="94" r="7" fill="#2a1d18"/>
      <circle cx="78" cy="91" r="2.5" fill="#fff"/>
      <circle cx="109" cy="91" r="2.5" fill="#fff"/>
      <ellipse cx="92" cy="111" rx="10" ry="8" fill="#3a251e"/>
      <path d="M82 123 Q92 132 105 123" fill="none" stroke="#7b4b3b" stroke-width="5" stroke-linecap="round"/>
      <path d="M101 74 L130 61 L139 87 Z" fill="${palette.bow}" stroke="#df5f97" stroke-width="3"/>
      <path d="M99 74 L69 62 L61 88 Z" fill="${palette.bow}" stroke="#df5f97" stroke-width="3"/>
      <circle cx="100" cy="74" r="9" fill="#ff9bc6" stroke="#df5f97" stroke-width="3"/>
      <rect x="68" y="134" width="46" height="13" rx="7" fill="#f477ad"/>
      <path d="M110 140 Q150 133 143 165" fill="none" stroke="${palette.coat}" stroke-width="13" stroke-linecap="round"/>
      <circle cx="55" cy="190" r="16" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="121" cy="190" r="16" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
    </svg>
  `;
}

export const itemLabels = {
  bowl: 'Bowl',
  bed: '▱',
  toy: '●',
  family: 'Heart',
  sunny: 'Sun',
  obstacle: '■',
};
