import React from 'react';
import uuid from 'uuid/v4';
import { array, func, string } from 'prop-types';
import styles from './styles.scss';

import Tag from '../TagsInput/Tag';

const allLanguages = [
  'Add a Language...', 'Afrikanns', 'Albanian', 'Arabic', 'Armenian', 'Basque',
  'Bengali', 'Bulgarian', 'Catalan', 'Cambodian', 'Chinese (Mandarin)', 'Croation',
  'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Fiji', 'Finnish', 'French',
  'Georgian', 'German', 'Greek', 'Gujarati', 'Hebrew', 'Hindi', 'Hungarian',
  'Icelandic', 'Indonesian', 'Irish', 'Italian', 'Japanese', 'Javanese', 'Korean',
  'Latin', 'Latvian', 'Lithuanian', 'Macedonian', 'Malay', 'Malayalam', 'Maltese',
  'Maori', 'Marathi', 'Mongolian', 'Nepali', 'Norwegian', 'Persian', 'Polish',
  'Portuguese', 'Punjabi', 'Quechua', 'Romanian', 'Russian', 'Samoan', 'Serbian',
  'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Tamil', 'Tatar', 'Telugu',
  'Thai', 'Tibetan', 'Tonga', 'Turkish', 'Ukranian', 'Urdu', 'Uzbek', 'Vietnamese',
  'Welsh', 'Xhosa'
];

const AdditionalDetails = ({ languages, publisher, spaceRequired, website, handleChange }) => {
  const handleRemoveLanguage = (index) => () => {
    const value = [...languages.slice(0, index), ...languages.slice(index + 1)];
    handleChange({ target: { name: 'languages', value } });
  };

  const handleAddLanguage = ({ target }) => {
    const newLanguage = target.value;

    let alreadyExists = false;
    languages.forEach(language => {
      if (newLanguage === language) alreadyExists = true;
    });

    if (alreadyExists || newLanguage === 'Add a Language...') return;

    const value = [...languages, newLanguage];
    handleChange({ target: { name: 'languages', value } });
  };

  const renderLanguageTags = () => (
    languages.map((language, index) => (
      <Tag key={uuid()} text={language} index={index} onRemoveClick={handleRemoveLanguage} />
    ))
  );

  const renderOptions = () => (
    allLanguages.map(language => <option key={uuid()} value={language}>{language}</option>)
  );

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Additional Details</p>
        <p className={styles.Description}>All the fields in this section are optional.</p>
      </div>
      <div className={styles.ColumnRight}>
        <div className={styles.InputContainer}>
          <label htmlFor="languages" className={styles.Tag}>Languages</label>
          <div className={styles.Languages}>
            {renderLanguageTags()}
          </div>
          <select
            id="languages"
            name="languages"
            className={styles.Select}
            onChange={handleAddLanguage}
          >
            {renderOptions()}
          </select>
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="spaceRequired" className={styles.Tag}>Space Required</label>
          <input
            type="text"
            id="spaceRequired"
            name="spaceRequired"
            className={styles.Input}
            value={spaceRequired}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="publisher" className={styles.Tag}>Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            className={styles.Input}
            value={publisher}
            onChange={handleChange}
          />
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="website" className={styles.Tag}>Website</label>
          <input
            type="text"
            id="website"
            name="website"
            className={styles.Input}
            value={website}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

AdditionalDetails.propTypes = {
  languages: array,
  publisher: string,
  spaceRequired: string,
  website: string,
  handleChange: func.isRequired
};

AdditionalDetails.defaultProps = {
  languages: [],
  publisher: '',
  spaceRequired: '',
  website: ''
};

export default AdditionalDetails;
