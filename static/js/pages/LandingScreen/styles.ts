export const typographyStyles = {
  fontFamily: 'ProximaNovaRegular',
  fontWeight: 600,
  fontSize: '72px',
  lineHeight: '100%',
  textAlign: 'center',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #363A3F 140.97%), #FFFFFF',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  '@media (max-width: 900px)': {
    fontSize: '64px',
    lineHeight: '52.8px',
  },
  '@media (max-width: 600px)': {
    fontSize: '56px',
    lineHeight: '40px',
  },
  '@media (max-width: 400px)': {
    fontSize: '48px',
    lineHeight: '48px',
  },
}

export const headingStyles = {
  ...typographyStyles,
  textAlign: 'left',
  fontSize: '56px',
  lineHeight: '61.6px',
  '@media (max-width: 900px)': {
    fontSize: '48px',
    lineHeight: '52.8px',
  },
  '@media (max-width: 600px)': {
    fontSize: '32px',
    lineHeight: '35.2px',
  },
  '@media (max-width: 400px)': {
    fontSize: '32px',
    lineHeight: '35.2px',
  },
}

export const subheadingStyles = {
  fontFamily: 'Roboto',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '30.6px',
  textAlign: 'left',
  color: '#d1d1d1',
  '@media (max-width: 900px)': {
    fontSize: '16px',
    lineHeight: '27.2px',
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
    lineHeight: '23.8px',
  },
}

export const textStyles = {
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: '18px',
  lineHeight: '30.6px',
  textAlign: 'left',
  color: '#94989C',
  '@media (max-width: 900px)': {
    fontSize: '16px',
    lineHeight: '27.2px',
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
    lineHeight: '23.8px',
  },
}

export const buttonStyles = {
  width: '200px',
  height: '64px',
  borderRadius: '8px',
  textTransform: 'none',
  fontFamily: 'ProximaNovaRegular',
  fontWeight: 600,
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 600px)': {
    width: '150px',
    height: '48px',
    fontSize: '16px',
  },
}

export const sectionMiniBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  p: '6px 24px 6px 20px',
  gap: '8px',
  width: 'max-content',
  height: '44px',
  fontFamily: 'ProximaNovaRegular',
  fontSize: '18px',
  color: '#d1d1d1',
  background:
    'radial-gradient(56.52% 74.7% at 50.36% 100%, rgba(255, 255, 255, 0.0408) 0%, rgba(255, 255, 255, 0) 100%), #09090A',
  boxShadow:
    '0px 2px 8px rgba(0, 0, 0, 0.16), inset 0px 1px 0px rgba(255, 255, 255, 0.15)',
  borderRadius: '32px',
  textTransform: 'none',
  textAlign: 'center',
  letterSpacing: '-1px',
  '&:hover': {
    background:
      'radial-gradient(56.52% 74.7% at 50.36% 100%, rgba(255, 255, 255, 0.0608) 0%, rgba(255, 255, 255, 0) 100%), #09090A',
  },
}
