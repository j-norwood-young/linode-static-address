import dotenv from "dotenv";
dotenv.config();

export async function fetch_domains() {
    const res = await fetch("https://api.linode.com/v4/domains", {
        headers: {
            Authorization: `Bearer ${process.env.LINODE_TOKEN}`,
        },
    })
    const data = await res.json();
    return data.data;
}

export async function fetch_domain_records(domain_id) {
    const res = await fetch(`https://api.linode.com/v4/domains/${domain_id}/records`, {
        headers: {
            Authorization: `Bearer ${process.env.LINODE_TOKEN}`,
        },
    })
    const data = await res.json();
    return data.data;
}

export async function create_domain_record(domain_id, payload) {
    const res = await fetch(`https://api.linode.com/v4/domains/${domain_id}/records`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.LINODE_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    const data = await res.json();
    return data;
}

export async function update_domain_record(domain_id, record_id, payload) {
    const res = await fetch(`https://api.linode.com/v4/domains/${domain_id}/records/${record_id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${process.env.LINODE_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    const data = await res.json();
    return data;
}