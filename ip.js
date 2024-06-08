import fs from "fs/promises";

export async function public_ip() {
    const config = JSON.parse(await fs.readFile("config.json", "utf-8"));
    const res = await fetch(config.ip_lookup_service);
    const data = await res.text();
    return data.trim();
}