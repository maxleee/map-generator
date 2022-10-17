import { useState } from 'react';
import counties from '../data/counties';
import Checkbox from './checkbox';

function CountyOptions() {
  const countyNames = counties.map(county => county.name);

  const [checkboxes, setCheckboxes] = useState(
    countyNames.reduce(
      (counties, county) => ({
        ...counties,
        [county]: false,
      }),
      {}
    )
  );

  const handleCheckboxChange = event => {
    const { name } = event.target;
    setCheckboxes({ ...checkboxes, [name]: !checkboxes[name] });
  };

  const createCheckbox = county => (
    <Checkbox
      label={county}
      isSelected={checkboxes[county]}
      onCheckboxChange={handleCheckboxChange}
      key={county}
    />
  );

  const createCheckboxes = () => countyNames.map(createCheckbox);

  return <form>{createCheckboxes()}</form>;
}

export default CountyOptions;
