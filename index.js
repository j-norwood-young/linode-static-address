import fs from "fs/promises";
import cron from "node-cron";
import { fetch_domains, fetch_domain_records, create_domain_record, update_domain_record } from "./linode.js";
import { public_ip } from "./ip.js";

export const update = async () => {
    console.log("Checking DNS record");
    const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
    const domains = await fetch_domains();
    const domain = domains.find((domain) => domain.domain === config.dns.domain);
    if (!domain) {
        throw new Error("Domain not found");
    }
    const records = await fetch_domain_records(domain.id);
    const existing_record = records.find((record) => record.name === config.dns.subdomain);
    const ip = await public_ip();
    let record = {
        type: config.dns.type || "A",
        name: config.dns.subdomain,
        target: ip,
        ttl_sec: config.dns.ttl || 300,
    }
    let result;
    if (!existing_record) {
        result = await create_domain_record(domain.id, record);
        console.log("Record created");
    } else {
        if (existing_record.target !== ip) {
            result = await update_domain_record(domain.id, existing_record.id, record);
            console.log("Record updated");
        }
    }
    if (result) {
        console.log(result);
    }
};

cron.schedule("*/5 * * * *", update);

update();