# Backend Series

This is a video on backend with javascript -[Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzlDkzj)

## MongoDB setup

1. Copy `.env.sample` to `.env`.
2. Set `MONGODB_URI` to the complete connection string from MongoDB Atlas, including `mongodb+srv://`, your database user, and password.
3. In MongoDB Atlas, add the machine's current public IP address under **Network Access**. For local development only, `0.0.0.0/0` can be used temporarily.
4. Make sure DNS can resolve the Atlas SRV record. If startup reports `querySrv ETIMEOUT`, check the internet connection, VPN/firewall, or DNS settings and retry.
5. If Node reports `querySrv ECONNREFUSED`, use a DNS server that is reachable on your network. On Windows, run `Get-DnsClientServerAddress -AddressFamily IPv4` and set the active adapter's DNS server in `.env`, for example `MONGODB_DNS_SERVERS=10.138.93.33`.
6. If startup reports `SSL alert number 80` or `tlsv1 alert internal error`, Atlas is rejecting the connection before authentication. Add the current public IP under **Network Access**, then verify the database username and password. URL-encode reserved password characters such as `@`, `:`, `/`, and `#`.

The application fails fast after 10 seconds when MongoDB cannot be reached, instead of waiting indefinitely.
