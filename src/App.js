import { useState } from 'react';
import './App.css';
import Map from './components/map';
import Checkbox from './components/checkbox.js';
import counties from './data/counties';
import { renderToStaticMarkup } from 'react-dom/server';
import { CopyBlock, dracula } from 'react-code-blocks';

function App() {
  const countyNames = counties.map(county => county.name);

  const [mapTitle, setMapTitle] = useState('');
  const [notIncludedTitle, setNotIncludedTitle] = useState('');
  const [selectedCounties, setSelectedCounties] = useState(
    countyNames.reduce(
      (counties, county) => ({
        ...counties,
        [county]: false,
      }),
      {}
    )
  );

  const blankGroup = {
    title: '',
    color: '',
    counties: countyNames.reduce(
      (counties, county) => ({
        ...counties,
        [county]: false,
      }),
      {}
    ),
  };

  const [groupState, setGroupState] = useState([
    JSON.parse(JSON.stringify(blankGroup)),
  ]);

  const addGroup = () => {
    setGroupState([...groupState, JSON.parse(JSON.stringify(blankGroup))]);
  };

  const mapString = renderToStaticMarkup(
    <Map
      title={mapTitle}
      groupState={groupState}
      selectedCounties={selectedCounties}
      notIncludedTitle={notIncludedTitle}
    />
  );

  const downloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([mapString], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = `${mapTitle}-map.svg`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleGroupChange = e => {
    const updatedGroups = [...groupState];
    updatedGroups[e.target.dataset.index][e.target.className] = e.target.value;
    setGroupState(updatedGroups);
  };

  const handleCheckboxChange = e => {
    const updatedGroups = [...groupState];
    updatedGroups[e.target.dataset.index].counties[e.target.name] =
      !updatedGroups[e.target.dataset.index].counties[e.target.name];
    setGroupState(updatedGroups);

    const updatedSelectedCounties = { ...selectedCounties };
    updatedSelectedCounties[e.target.name] =
      !updatedSelectedCounties[e.target.name];
    setSelectedCounties(updatedSelectedCounties);
  };

  function handleRemove(e) {
    const updatedGroups = [...groupState];
    const updatedSelectedCounties = { ...selectedCounties };
    Object.entries(updatedGroups[e.target.dataset.index].counties).forEach(
      ([county, countyStatus]) => {
        if (countyStatus === true) {
          updatedSelectedCounties[county] = false;
        } else return;
      }
    );
    setSelectedCounties(updatedSelectedCounties);
    updatedGroups.splice([e.target.dataset.index], 1);
    setGroupState(updatedGroups);
  }

  return (
    <div className='App'>
      <div className='form-wrapper'>
        <form className='form-options'>
          <div className='text-input-group'>
            <label htmlFor='map-title'>Map title</label>
            <input
              type='text'
              name='map-title'
              value={mapTitle}
              onChange={e => setMapTitle(e.target.value)}></input>
          </div>
          <div className='text-input-group'>
            <label htmlFor='not-included'>Not included title</label>
            <input
              type='text'
              name='not-included'
              value={notIncludedTitle}
              onChange={e => setNotIncludedTitle(e.target.value)}></input>
          </div>
        </form>
        {groupState.map((group, index) => {
          const titleId = `title-${index}`;
          return (
            <form key={`group-${index}`} className='form-options'>
              <div className='text-input-group'>
                <label htmlFor={titleId}>Group {index + 1} Title</label>
                <input
                  type='text'
                  name={titleId}
                  id={titleId}
                  data-index={index}
                  className='title'
                  value={groupState[index].title}
                  onChange={handleGroupChange}></input>
              </div>
              <p className='instruction'>
                Select the counties in Group {index + 1}
              </p>
              {Object.keys(group.counties).map(county => (
                <Checkbox
                  county={county}
                  isSelected={groupState[index].counties[county]}
                  onCheckboxChange={handleCheckboxChange}
                  key={`${county}-${index}`}
                  index={index}
                  disabled={selectedCounties[county]}
                />
              ))}

              <button
                type='button'
                className='remove'
                onClick={handleRemove}
                data-index={index}>
                Remove Group
              </button>
            </form>
          );
        })}
        {groupState.length < 5 && (
          <form className='form-options'>
            <button type='button' onClick={addGroup}>
              Add Group
            </button>
          </form>
        )}
      </div>
      <div className='map-preview'>
        <Map
          title={mapTitle}
          groupState={groupState}
          selectedCounties={selectedCounties}
          notIncludedTitle={notIncludedTitle}
        />
        <div className='code'>
          <h2>Code preview</h2>
          <CopyBlock
            text={mapString}
            theme={dracula}
            language='markup'
            customStyle={{
              fontSize: '.8rem',
              padding: '1rem',
              maxWidth: '550px',
              maxHeight: '400px',
              overflowY: 'scroll',
              marginBottom: '3rem',
            }}
          />
          <button onClick={downloadFile}>Download SVG</button>
        </div>
      </div>
    </div>
  );
}

export default App;
