import variable from "./../variables/platform";

export default (variables = variable) => {
  const labelTheme = {
    ".focused": {
      width: 0
    },
    fontSize: 14,
    lineHeight: 24,
    color: 'rgba(158,158,158,0.87)'
  };

  return labelTheme;
};
