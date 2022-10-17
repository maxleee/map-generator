import React from 'react';
import counties from '../data/counties';

const style = `
.map-0 .county, 
.legend-square.included-0 {
  fill: #771b61; stroke: #666d70; stroke-width: 2;
}
.map-1 .county,
.legend-square.included-1 {
  fill: #e795d4; stroke: #666d70; stroke-width: 2;
}
.map-2 .county,
.legend-square.included-2 {
  fill: #edcce5; stroke: #666d70;stroke-width: 2;
}
.map-3 .county,
.legend-square.included-3 {
  fill: #0e856D; stroke: #666d70; stroke-width: 2;
}
.map-4 .county,
.legend-square.included-4 {
  fill: #7ed6c1; stroke: #666d70; stroke-width: 2;
}
.map-1 .map-text, .map-2 .map-text, .map-4 .map-text {fill: #000}
.map-not-included .county {fill: #f5f5f7; stroke: #666d70; stroke-width: 2;}
.map-not-included text {display: none;}
.legend-text, .map-text {font-family: "Gotham SSm A", "Gotham SSm B", Arial, sans-serif !important; font-size: 18px; font-weight: 600}
.map-text {fill: #fff}
.legend-text {fill: #3a4042}
.legend-square {fill: #f5f5f7; stroke: #8d9599;stroke-width:2;}
.legend-square.included-0 {fill:#771b61; stroke:#35072f;}
 `;

const Map = ({ title, groupState, selectedCounties, notIncludedTitle }) => {
  return (
    <svg
      version='1.2'
      baseProfile='tiny'
      x='0px'
      y='0px'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`250 285 1650 ${1000 + groupState.length * 60}`}
      style={{ enableBackground: 'new 0 0 2160 1440' }}
      role='group'>
      <title>{title}</title>
      <style type='text/css'>{style}</style>
      <g aria-label='Counties in Pennsylvania' role='list'>
        {groupState.map((group, index) => (
          <g
            aria-label={group.title}
            role='list'
            className={`map-${index}`}
            key={`map-${index}`}>
            <title>{group.title}</title>
            {counties.map(county =>
              group.counties[county.name] ? (
                <g role='listitem' key={`${county.name}-${index}`}>
                  <title>{county.name}</title>
                  <polygon className='county' points={county.points} />
                  <text transform={county.textTransform} className='map-text'>
                    {county.name}
                  </text>
                </g>
              ) : null
            )}
          </g>
        ))}

        <g
          aria-label={notIncludedTitle}
          role='list'
          className='map-not-included'>
          <title>{notIncludedTitle}</title>
          {counties.map((county, index) =>
            !selectedCounties[county.name] ? (
              <g role='listitem' key={`${county.name}-${index}`}>
                <title>{county.name}</title>
                <polygon className='county' points={county.points} />
                <text transform={county.textTransform} className='map-text'>
                  {county.name}
                </text>
              </g>
            ) : null
          )}
        </g>
      </g>
      <g>
        <path
          d='M267.1,402.6l213.2-107.3v96.5h1226.5l-1.9,12.8c7.7,1.9,24.9,21.1,24.9,34.5c13.4,1.9,49.9,13.4,49.9,23
		c0,15.3,5.8,38.3,5.8,38.3c9.6,11.5-5.8,26.8-11.5,32.6c11.5,9.6,26.8,32.6,24.9,40.3l32.6,13.4l26.8,5.7l23-7.7
		c0,0,15.3,24.9,3.8,36.4c-11.5,11.5-24.9,17.3-24.9,17.3s-13.4,3.8-15.3,11.5c-1.9,7.7-17.2,49.8-38.4,59.4
		c0,0-21.1,40.3-44.1,34.5l24.9,55.6l-9.6,3.8l-5.8,24.9l-15.3-7.7c0,0-26.8,26.8-9.6,34.5l7.7,47.9c0,0,34.5-42.2,30.7,47.9
		l26.8,1.9l-1.9,19.2l70.9,72.8l-24.9,5.8l-38.4,19.2c0,0-26.8,32.6-53.7,32.6c-26.8,0-7.7,13.4-7.7,15.3c0,1.9,15.3,15.3,15.3,15.3
		h-19.2l-11.5,9.6l-57.5,23c0,0-61.4-49.9-97.8,24.9h-1319V402.6z'
          style={{ fill: 'none', stroke: '#c7c8cc', strokeWidth: '9' }}
        />
      </g>
      <g>
        {groupState.map((group, index) => (
          <React.Fragment key={`legend-${index}`}>
            <rect
              width='40'
              height='40'
              className={`legend-square included-${index}`}
              transform={`matrix(1 0 0 1 277 ${1220 + index * 60})`}
            />
            <text
              transform={`matrix(1 0 0 1 327 ${1245 + index * 60})`}
              className='legend-text'>
              {group.title}
            </text>
          </React.Fragment>
        ))}

        <rect
          width='40'
          height='40'
          className='legend-square'
          transform={`matrix(1 0 0 1 277 ${1220 + groupState.length * 60})`}
        />
        <text
          transform={`matrix(1 0 0 1 327 ${1245 + groupState.length * 60})`}
          className='legend-text'>
          {notIncludedTitle}
        </text>
      </g>
    </svg>
  );
};

export default Map;
