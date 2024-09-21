import chalk from "chalk";

export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    if (status >= 500) {
      return print(req, chalk.red(status), duration);
    } else if (status >= 400) {
      return print(req, chalk.yellow(status), duration);
    } else if (status >= 300) {
      return print(req, chalk.blue(status), duration);
    } else if (status >= 200) {
      return print(req, chalk.green(status), duration);
    } else {
      return print(req, chalk.white(status), duration);
    }
  });

  next();
};

const print = (req, status, duration) => {
  console.log(`${req.method} ${req.originalUrl} ${status} - ${duration}ms`);
};
