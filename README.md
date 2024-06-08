# linode-static-address

This app will update the Linode DNS record for a given domain with the current public IP address of the machine it is running on. This is useful for machines that have a dynamic public IP address and need to be reachable by a domain name. It updates the DNS record every 5 minutes.

## Config

config.json:
```json
{
    "dns": {
        "domain": "sourcery.info",
        "subdomain": "alpha",
        "type": "A",
        "ttl": 300
    },
    "ip_lookup_service": "https://icanhazip.com"
}
```

.env:
```
LINODE_TOKEN=your_linode_api_key
```

## Usage

```bash
$ npm install
$ npm start
```