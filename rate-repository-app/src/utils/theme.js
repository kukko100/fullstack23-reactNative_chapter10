const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBar: 'grey',
    appBarFont: 'white',
    itemLanguageButton: '#0762D2',
    redButton: '#D6394C',
    languageButtonFont: 'white',
    textError: '#d73a4a',
    furthestBackground: '#E1E5E8'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select ({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }) 
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;