// Example configuration template for personal dashboard
window.CONFIG = {
    webApps: [
        {
            title: "Example Web App 1",
            badge: "APP",
            badgeStyle: "color: #38bdf8; border-color: rgba(56, 189, 248, 0.3);",
            desc: "Primary web application / service",
            urlCode: "app1.example.com",
            href: "https://app1.example.com"
        },
        {
            title: "Example Web App 2",
            badge: "DEMO",
            badgeClass: "vault",
            desc: "Secondary web application / internal tool",
            urlCode: "app2.example.com",
            href: "https://app2.example.com"
        },
        {
            title: "Admin Panel",
            badge: "ADMIN",
            badgeClass: "tailscale",
            desc: "Network and service administration",
            urlCode: "admin.example.com",
            href: "https://admin.example.com",
            target: "_blank"
        }
    ],
    nodes: [
        {
            id: "node1",
            title: "Server Node",
            desc: "Main server instance",
            url: "http://192.168.1.10:8080",
            urlCode: "192.168.1.10:8080"
        },
        {
            id: "node2",
            title: "Workstation Node",
            desc: "Workstation instance",
            url: "http://192.168.1.20:8080",
            urlCode: "192.168.1.20:8080"
        },
        {
            id: "node3",
            title: "Backup Node",
            desc: "Offsite backup instance",
            url: "http://192.168.1.30:8080",
            urlCode: "192.168.1.30:8080"
        }
    ],
    devices: {
        server: {
            name: "server-01",
            title: "server-01 (Production Server)",
            desc: "Linux Server • 4 vCPU / 16 GB",
            ip: "192.168.1.10",
            buttons: [
                { text: 'Web Administration', sub: ':8080', color: 'var(--accent-cyan)', url: 'http://192.168.1.10:8080' },
                { text: 'Copy SSH Command', sub: 'id_rsa', color: 'var(--accent)', actionText: 'ssh -i ~/.ssh/id_rsa user@192.168.1.10' }
            ]
        },
        workstation: {
            name: "workstation-01",
            title: "workstation-01 (Workstation)",
            desc: "Development Environment",
            ip: "192.168.1.20",
            buttons: [
                { text: 'Web Console', sub: ':9090', color: 'var(--accent-cyan)', url: 'http://192.168.1.20:9090' },
                { text: 'Copy SSH Command', sub: 'id_rsa', color: 'var(--accent)', actionText: 'ssh -i ~/.ssh/id_rsa user@192.168.1.20' }
            ]
        },
        backup: {
            name: "backup-nas",
            title: "backup-nas (Storage)",
            desc: "Network Attached Storage",
            ip: "192.168.1.30",
            buttons: [
                { text: 'Storage Manager', sub: ':5000', color: 'var(--accent-amber)', url: 'http://192.168.1.30:5000' },
                { text: 'Copy SSH Command', sub: 'id_rsa', color: 'var(--accent)', actionText: 'ssh -i ~/.ssh/id_rsa user@192.168.1.30' }
            ]
        }
    }
};
