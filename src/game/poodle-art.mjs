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
      <path class="poodle-shadow" d="M39 204 C58 194 121 194 141 204 C123 214 56 214 39 204Z" fill="#e8a9bf" opacity="0.35"/>
      <path class="tail" d="M124 145 Q162 123 154 166" fill="none" stroke="${palette.coat}" stroke-width="15" stroke-linecap="round"/>
      <ellipse class="body" cx="88" cy="154" rx="45" ry="42" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="71" cy="134" r="16" fill="${palette.coat}" opacity="0.94"/>
      <circle cx="103" cy="136" r="17" fill="${palette.coat}" opacity="0.94"/>
      <ellipse class="ear left-ear" cx="56" cy="112" rx="22" ry="40" fill="${palette.ear}" stroke="#ead9cc" stroke-width="3"/>
      <ellipse class="ear right-ear" cx="123" cy="112" rx="22" ry="40" fill="${palette.ear}" stroke="#ead9cc" stroke-width="3"/>
      <circle class="head" cx="90" cy="95" r="41" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="62" cy="76" r="12" fill="${palette.coat}" opacity="0.85"/>
      <circle cx="120" cy="77" r="12" fill="${palette.coat}" opacity="0.85"/>
      <circle cx="69" cy="57" r="18" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="91" cy="49" r="21" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="114" cy="59" r="18" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <g class="eyes">
        <circle cx="76" cy="94" r="8" fill="#2a1d18"/>
        <circle cx="107" cy="94" r="8" fill="#2a1d18"/>
        <circle cx="78" cy="91" r="2.8" fill="#fff"/>
        <circle cx="109" cy="91" r="2.8" fill="#fff"/>
      </g>
      <ellipse cx="92" cy="111" rx="10" ry="8" fill="#3a251e"/>
      <path class="smile" d="M82 123 Q92 132 105 123" fill="none" stroke="#7b4b3b" stroke-width="5" stroke-linecap="round"/>
      <path class="tongue" d="M92 126 Q101 132 93 139 Q85 132 92 126Z" fill="#f77d9a"/>
      <g class="bow">
        <path d="M101 74 L130 61 L139 87 Z" fill="${palette.bow}" stroke="#df5f97" stroke-width="3"/>
        <path d="M99 74 L69 62 L61 88 Z" fill="${palette.bow}" stroke="#df5f97" stroke-width="3"/>
        <circle cx="100" cy="74" r="9" fill="#ff9bc6" stroke="#df5f97" stroke-width="3"/>
      </g>
      <rect x="68" y="134" width="46" height="13" rx="7" fill="#f477ad"/>
      <path d="M86 146 L97 146 L101 160 L91 169 L82 160Z" fill="#ff7aad"/>
      <circle class="paw left-paw" cx="55" cy="190" r="16" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle class="paw right-paw" cx="121" cy="190" r="16" fill="${palette.coat}" stroke="#ead9cc" stroke-width="3"/>
      <circle cx="50" cy="187" r="3" fill="#f2d7cc"/>
      <circle cx="60" cy="187" r="3" fill="#f2d7cc"/>
      <circle cx="116" cy="187" r="3" fill="#f2d7cc"/>
      <circle cx="126" cy="187" r="3" fill="#f2d7cc"/>
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
