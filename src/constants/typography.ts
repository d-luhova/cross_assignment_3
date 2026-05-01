import { TextStyle } from 'react-native';

type TypographySet = {
  heading: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    h4: TextStyle;
    h5: TextStyle;
  };
  body: {
    xl: TextStyle;
    l: TextStyle;
    m: TextStyle;
    s: TextStyle;
    xs: TextStyle;
  };
  action: {
    l: TextStyle;
    m: TextStyle;
    s: TextStyle;
  };
  caption: {
    m: TextStyle;
  };
};

export const TYPOGRAPHY: TypographySet = {
  heading: {
    h1: {
      fontFamily: 'Inter',
      fontSize: 24,
      fontWeight: '800',
      letterSpacing: 0.1,
    },
    h2: {
      fontFamily: 'Inter',
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    h3: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    h4: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '700',
    },
    h5: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '700',
    },
  },

  body: {
    xl: {
      fontFamily: 'Inter',
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 24,
    },
    l: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22,
    },
    m: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    s: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    xs: {
      fontFamily: 'Inter',
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 14,
      letterSpacing: 0.5,
    },
  },

  action: {
    l: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '600',
    },
    m: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: '600',
    },
    s: {
      fontFamily: 'Inter',
      fontSize: 10,
      fontWeight: '600',
    },
  },

  caption: {
    m: {
      fontFamily: 'Inter',
      fontSize: 10,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  },
} as const;