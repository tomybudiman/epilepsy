import chalk from 'chalk';
import axios from 'axios';

const enableLog = false;

axios.interceptors.request.use(
  config => {
    // Do something before the request is sent
    if (enableLog) {
      const logArray = [];
      if (config.data) {
        logArray.push('\n');
        logArray.push(chalk.bold.blue('Request data:'));
        logArray.push('\n');
        logArray.push(JSON.stringify(config.data, null, 2));
      }
      if (config.params) {
        logArray.push('\n');
        logArray.push(chalk.bold.blue('Request params:'));
        logArray.push('\n');
        logArray.push(JSON.stringify(config.params, null, 2));
      }
      if (config?.method) {
        console.log(
          `${chalk.yellow.bold(
            config.method.toUpperCase(),
          )} - ${chalk.green.bold(config.url)}`,
          ...logArray,
        );
      }
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (enableLog) {
      console.log(
        `${chalk.yellow.bold(response.request._method)} - ${chalk.green.bold(
          response.request._url.split('?')[0],
        )}`,
        '\n',
        chalk.cyan.bold('Response:'),
        '\n',
        JSON.stringify(response.data, null, 2),
      );
    }
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(
      `${chalk.yellow.bold(error.config.method.toUpperCase())} ${chalk.red.bold(
        error?.response?.status,
      )} - ${chalk.green.bold(error.config.url)}`,
      '\n',
      chalk.cyan.bold('Response:'),
      error?.message,
    );
    return Promise.reject(error);
  },
);

export {axios};
