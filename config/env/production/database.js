const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({
  env
}) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});

// postgres://lhiodwwywogkfp:bc52c54e3b2e623c10ba2d4c037b64b9f091d376e7ba1a85b60d824363156ec0@ec2-34-204-127-36.compute-1.amazonaws.com:5432/d8k63tvs3bdmpk
