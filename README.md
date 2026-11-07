# Dashboard

Lightweight personal infrastructure dashboard and health monitor built with PHP, Vanilla JavaScript, and clean CSS.

## Features

- **VPS Mini Monitor**: Real-time display of CPU, RAM, Disk usage, and server uptime.
- **Web App & Service Shortcuts**: Clean grid cards for primary applications and internal tools.
- **Node Health Checking**: Live socket/port status checks (online, waiting, offline) for distributed services and infrastructure nodes.
- **Interactive Device Modals**: Quick-action modals for managing nodes, copying SSH commands, or opening remote web management interfaces.
- **Privacy by Design**: Configuration is completely decoupled from the codebase (`config.js` and `config.php` are git-ignored, preventing IP, hostname, or credential leaks).

## Architecture

- **Frontend**: Vanilla HTML5, modern CSS3 (CSS variables, dark theme), and clean JavaScript (no heavy UI frameworks).
- **Backend API**: Lightweight PHP endpoint (`api.php`) querying `/proc/stat`, `free -m`, `disk_free_space`, and TCP sockets.

## Getting Started

### 1. Clone & Set Up

```bash
git clone https://github.com/kersonik/dashboard.git
cd dashboard
```

### 2. Configure Monitored Nodes & Services

1. Copy the example configuration files:
   ```bash
   cp config.example.js config.js
   cp config.example.php config.php
   ```

2. **Frontend (`config.js`)**: Configure your web application cards, monitored service nodes, and device actions.
3. **Backend (`config.php`)**: Define the IPs and ports to be checked by `api.php`.

### 3. Deploy to Web Server

Deploy the directory to any PHP-enabled web server (Nginx + PHP-FPM, Apache, or Caddy).

#### Example Nginx Configuration
```nginx
server {
    listen 80;
    server_name dashboard.example.com;
    root /var/www/dashboard;
    index index.html index.php;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php-fpm.sock;
    }

    # Deny direct access to config.php
    location = /config.php {
        deny all;
    }
}
```

## Security & Privacy

Both `config.js` and `config.php` are listed in `.gitignore` by default to prevent private network IP addresses, SSH keys, and server hostnames from being pushed to public version control.
