const isDevelopment = process.env.REACT_APP_IS_DEV;

export const log = (message, ...optionalParams) => {
  // console.log(`logging: ${process.env.REACT_APP_IS_DEV}`)
  // if (isDevelopment) {
  console.log(message, ...optionalParams);
  // }
}

export const error = (message, ...optionalParams) => {
  if (isDevelopment) {
    console.error(message, ...optionalParams);
  }
}

export const warn = (message, ...optionalParams) => {
  if (isDevelopment) {
    console.warn(message, ...optionalParams);
  }
}