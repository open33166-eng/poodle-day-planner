const curlPoints = [
  [63, 50, 13], [78, 42, 14], [94, 39, 15], [111, 45, 13], [124, 58, 12],
  [54, 67, 12], [71, 64, 13], [91, 61, 14], [111, 66, 13], [128, 75, 11],
  [61, 86, 13], [80, 82, 12], [101, 82, 12], [120, 91, 13],
  [60, 121, 11], [72, 139, 13], [88, 130, 12], [105, 139, 13], [120, 124, 11],
  [56, 158, 12], [75, 164, 11], [94, 160, 12], [114, 166, 11], [128, 153, 12],
  [46, 100, 11], [135, 103, 11], [48, 130, 10], [134, 132, 10],
];

export function poodleSvg(poodleId = 'cloudy') {
  const palette = {
    cloudy: {
      coat: '#fffaf4',
      curl: '#f6eadf',
      shade: '#e8d8cc',
      ear: '#f3e5da',
      bow: '#f46fa9',
      collar: '#f06da5',
    },
    mimi: {
      coat: '#f2c18c',
      curl: '#e6a86d',
      shade: '#c8854c',
      ear: '#d99b64',
      bow: '#ef6f8f',
      collar: '#ee7fa0',
    },
    beau: {
      coat: '#fffaf2',
      curl: '#ebe3d6',
      shade: '#d8cbbb',
      ear: '#e7ddd0',
      bow: '#5f8dd3',
      collar: '#6e98d8',
    },
  }[poodleId] ?? {
    coat: '#fffaf4',
    curl: '#f6eadf',
    shade: '#e8d8cc',
    ear: '#f3e5da',
    bow: '#f46fa9',
    collar: '#f06da5',
  };

  const curls = curlPoints
    .map(([cx, cy, r], index) => `
      <circle class="fur-curl curl-${index % 5}" cx="${cx}" cy="${cy}" r="${r}" fill="${palette.curl}" stroke="${palette.shade}" stroke-width="1.2" opacity="0.88"/>
    `)
    .join('');

  return `
    <svg class="cloudy-svg" viewBox="0 0 190 230" role="img" aria-label="Detailed animated poodle Cloudy">
      <defs>
        <radialGradient id="cloudyCoat-${poodleId}" cx="35%" cy="20%" r="80%">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.58" stop-color="${palette.coat}"/>
          <stop offset="1" stop-color="${palette.shade}"/>
        </radialGradient>
        <linearGradient id="cloudyBow-${poodleId}" x1="0" x2="1">
          <stop offset="0" stop-color="#ff9cc8"/>
          <stop offset="1" stop-color="${palette.bow}"/>
        </linearGradient>
      </defs>

      <ellipse class="ground-shadow" cx="94" cy="208" rx="62" ry="13" fill="#d986a5" opacity="0.23"/>

      <g class="tail">
        <path d="M129 149 C158 126 174 141 166 166" fill="none" stroke="${palette.shade}" stroke-width="18" stroke-linecap="round"/>
        <path d="M130 147 C158 126 171 143 163 165" fill="none" stroke="url(#cloudyCoat-${poodleId})" stroke-width="14" stroke-linecap="round"/>
        <circle cx="163" cy="164" r="12" fill="${palette.curl}" stroke="${palette.shade}" stroke-width="1.4"/>
      </g>

      <g class="body">
        <ellipse cx="93" cy="153" rx="48" ry="44" fill="url(#cloudyCoat-${poodleId})" stroke="${palette.shade}" stroke-width="2.4"/>
        <circle cx="67" cy="135" r="17" fill="${palette.curl}" stroke="${palette.shade}" stroke-width="1.5"/>
        <circle cx="88" cy="130" r="16" fill="${palette.curl}" stroke="${palette.shade}" stroke-width="1.5"/>
        <circle cx="110" cy="137" r="17" fill="${palette.curl}" stroke="${palette.shade}" stroke-width="1.5"/>
        <path d="M70 145 C84 154 105 154 121 145" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.55"/>
      </g>

      <g class="ears">
        <ellipse class="left-ear" cx="55" cy="111" rx="23" ry="45" fill="${palette.ear}" stroke="${palette.shade}" stroke-width="2.5"/>
        <ellipse class="right-ear" cx="132" cy="111" rx="23" ry="45" fill="${palette.ear}" stroke="${palette.shade}" stroke-width="2.5"/>
        <circle cx="50" cy="92" r="11" fill="${palette.curl}" opacity="0.72"/>
        <circle cx="137" cy="92" r="11" fill="${palette.curl}" opacity="0.72"/>
      </g>

      <g class="head">
        <circle cx="94" cy="94" r="43" fill="url(#cloudyCoat-${poodleId})" stroke="${palette.shade}" stroke-width="2.6"/>
        ${curls}
      </g>

      <g class="face">
        <g class="eyes">
          <circle cx="78" cy="94" r="9" fill="#261915"/>
          <circle cx="111" cy="94" r="9" fill="#261915"/>
          <circle cx="81" cy="90" r="3" fill="#ffffff"/>
          <circle cx="114" cy="90" r="3" fill="#ffffff"/>
          <circle cx="75" cy="99" r="2" fill="#5b3a31" opacity="0.5"/>
          <circle cx="108" cy="99" r="2" fill="#5b3a31" opacity="0.5"/>
        </g>
        <ellipse cx="95" cy="112" rx="10.5" ry="8" fill="#3a251f"/>
        <path class="smile" d="M83 124 C91 134 105 134 114 124" fill="none" stroke="#754a3e" stroke-width="5" stroke-linecap="round"/>
        <path class="tongue" d="M94 127 C105 132 100 143 94 143 C88 143 83 132 94 127Z" fill="#f47b98"/>
        <path d="M71 83 C78 78 84 79 89 82" fill="none" stroke="#c59a8d" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
        <path d="M102 82 C108 78 116 79 122 84" fill="none" stroke="#c59a8d" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
      </g>

      <g class="bow">
        <path d="M104 72 L135 57 C142 69 143 83 135 93 L103 79Z" fill="url(#cloudyBow-${poodleId})" stroke="#df5f97" stroke-width="2.5"/>
        <path d="M101 72 L69 58 C61 70 61 84 70 93 L103 79Z" fill="url(#cloudyBow-${poodleId})" stroke="#df5f97" stroke-width="2.5"/>
        <circle cx="102" cy="76" r="10" fill="#ffa8cf" stroke="#df5f97" stroke-width="2.5"/>
        <path d="M111 67 C115 70 119 73 124 75" stroke="#ffd5e6" stroke-width="2" stroke-linecap="round"/>
      </g>

      <g class="collar">
        <rect x="67" y="135" width="55" height="13" rx="7" fill="${palette.collar}"/>
        <circle cx="95" cy="153" r="8" fill="#ff8dbb" stroke="#d8528b" stroke-width="2"/>
        <path d="M91 151 C89 147 84 148 84 153 C84 159 95 164 95 164 C95 164 106 159 106 153 C106 148 101 147 99 151 C97 148 93 148 91 151Z" fill="#ffe3ef"/>
      </g>

      <g class="paws">
        <circle class="left-paw" cx="57" cy="192" r="17" fill="url(#cloudyCoat-${poodleId})" stroke="${palette.shade}" stroke-width="2"/>
        <circle class="right-paw" cx="128" cy="192" r="17" fill="url(#cloudyCoat-${poodleId})" stroke="${palette.shade}" stroke-width="2"/>
        <circle cx="51" cy="188" r="2.5" fill="#edd4c8"/>
        <circle cx="61" cy="188" r="2.5" fill="#edd4c8"/>
        <circle cx="122" cy="188" r="2.5" fill="#edd4c8"/>
        <circle cx="132" cy="188" r="2.5" fill="#edd4c8"/>
      </g>
    </svg>
  `;
}

export const itemLabels = {
  bowl: 'Bowl',
  bed: 'Bed',
  toy: 'Toy',
  family: 'Family',
  sunny: 'Sun',
  obstacle: 'Block',
};
