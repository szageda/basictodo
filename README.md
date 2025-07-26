## Azure VM

### Prerequisites

1. [Create a virtual machine](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).
    - Set **Select inbound ports** to *HTTP (80), SSH (20)*
2. SSH into the VM (syntax: `ssh user@serverIP`).

### Web Server Installation & Configuration

1. `sudo apt update`
2. `sudo apt install nodejs npm nginx`
3. Clone the repository `https://github.com/szageda/basictodo`
4. `cd basictodo`
5. `npm install`
6. `npm run build`
7. `sudo npm install -g pm2`
8. `pm2 start npm --name "todo" -- start`
9. `pm2 save && pm2 startup`

10. `sudo nano /etc/nginx/sites-available/basictodo`
11. Paste and change `SERVER_IP_ADDRESS` to the actual IP:
    ```
    server {
        listen 80;
        server_name SERVER_IP_ADDRESS; 

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
11. `sudo ln -s /etc/nginx/sites-available/basictodo /etc/nginx/sites-enabled/ && sudo nginx -t`
12. `sudo systemctl restart nginx`
