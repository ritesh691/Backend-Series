# Backend Series

This is a video on backend with javascript -[Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzlDkzj)

## MongoDB setup

1. Copy `.env.sample` to `.env`.
2. Set `MONGODB_URI` to the complete connection string from MongoDB Atlas, including `mongodb+srv://`, your database user, and password.
3. In MongoDB Atlas, add the machine's current public IP address under **Network Access**. For local development only, `0.0.0.0/0` can be used temporarily.
4. Make sure DNS can resolve the Atlas SRV record. If startup reports `querySrv ETIMEOUT`, check the internet connection, VPN/firewall, or DNS settings and retry.
5. If the system DNS still times out, set `MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8` in `.env` and restart the server.

The application fails fast after 10 seconds when MongoDB cannot be reached, instead of waiting indefinitely.
