import React from 'react';
import uuid from 'uuid/v4';
import styles from './styles.scss';

const languages = [
  'Afrikanns', 'Albanian', 'Arabic', 'Armenian', 'Basque', 'Bengali', 'Bulgarian',
  'Catalan', 'Cambodian', 'Chinese (Mandarin)', 'Croation', 'Czech', 'Danish',
  'Dutch', 'English', 'Estonian', 'Fiji', 'Finnish', 'French', 'Georgian', 'German',
  'Greek', 'Gujarati', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian',
  'Irish', 'Italian', 'Japanese', 'Javanese', 'Korean', 'Latin', 'Latvian', 'Lithuanian',
  'Macedonian', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi', 'Mongolian',
  'Nepali', 'Norwegian', 'Persian', 'Polish', 'Portuguese', 'Punjabi', 'Quechua',
  'Romanian', 'Russian', 'Samoan', 'Serbian', 'Slovak', 'Slovenian', 'Spanish',
  'Swahili', 'Swedish', 'Tamil', 'Tatar', 'Telugu', 'Thai', 'Tibetan', 'Tonga',
  'Turkish', 'Ukranian', 'Urdu', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa'
];

const AdditionalDetails = () => {
  const renderOptions = () => (
    languages.map(language => <option key={uuid()} value={language}>{language}</option>)
  );

  return (
    <div className={styles.Row}>
      <div className={styles.ColumnLeft}>
        <p className={styles.Title}>Basic Information</p>
        <p className={styles.Description}>All the fields in this section are optional.</p>
      </div>
      <div className={styles.ColumnRight}>
        <div className={styles.InputContainer}>
          <label htmlFor="languages" className={styles.Tag}>Languages</label>
          <select
            id="languages"
            name="languages"
            className={styles.Select}
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
          />
        </div>
        <div className={styles.InputContainer}>
          <label htmlFor="publisher" className={styles.Tag}>Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            className={styles.Input}
          />
        </div>
      </div>
      <div className={styles.InputContainer}>
        <label htmlFor="website" className={styles.Tag}>Website</label>
        <input
          type="text"
          id="website"
          name="website"
          className={styles.Input}
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;
