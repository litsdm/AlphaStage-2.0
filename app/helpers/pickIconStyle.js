const sharedStyles = {
  opacity: '0.1',
  width: '35px',
  height: '35px'
};

const smallStyles = [
  {
    top: '90px',
    left: '85px',
    ...sharedStyles
  },
  {
    top: '90px',
    right: '85px',
    ...sharedStyles
  },
  {
    bottom: '90px',
    right: '85px',
    ...sharedStyles
  },
  {
    bottom: '90px',
    left: '85px',
    ...sharedStyles
  }
];

const iconStyles = [
  {
    top: '30px',
    left: '30px'
  },
  {
    top: '15px'
  },
  {
    top: '30px',
    right: '30px'
  },
  {
    right: '15px'
  },
  {
    bottom: '30px',
    right: '30px'
  },
  {
    bottom: '15px'
  },
  {
    bottom: '30px',
    left: '30px'
  },
  {
    left: '15px'
  }
];

let lastIndex;
let iconSet;
let iconStylesCopy;
let smallStylesCopy;

const pickStyle = (category) => {
  if (category !== iconSet) {
    iconStylesCopy = iconStyles.slice();
    smallStylesCopy = smallStyles.slice();
  }

  const type = Math.round(Math.random()) ? 'regular' : 'small';
  const currentStyles = type === 'regular' ? iconStylesCopy : smallStylesCopy;
  let index;
  let prevIndex;
  let style = {};

  do {
    index = Math.floor(Math.random() * currentStyles.length);
    prevIndex = index - 1 < 0 ? currentStyles.length - 1 : index - 1;
  } while (lastIndex === prevIndex || lastIndex === (index + 1));

  style = currentStyles[index];
  lastIndex = index;
  iconSet = category;
  currentStyles.splice(index, 1);

  return style;
};

export default pickStyle;
