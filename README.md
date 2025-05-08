## Permision for pem file
icacls C:\External-projects\WinVinaya\WVIS-Website\wvis_website.pem /grant light:(F)

icacls.exe wvis_website.pem  /reset
whoami
icacls.exe wvis_website.pem  /grant:r dharanidaran\daran:(R)
icacls.exe wvis_website.pem  /inheritance:r

ssh -i "wvis_website.pem" ubuntu@ec2-3-110-219-158.ap-south-1.compute.amazonaws.com
### step-1
sudo apt update
sudo apt upgrade -y
sudo apt install nginx python3-pip python3-venv git curl -y
sudo apt install -y nodejs npm
sudo apt install postgresql postgresql-contrib -y

### push from git to server
git clone https://github.com/daran6255/wvis_website.git

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

### step-2 Install postgres sql
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql

#### create user in postgres
sudo -i -u postgres
psql
ALTER USER postgres WITH PASSWORD '12345';
\q
exit

#### create new database 
sudo -u postgres createdb wvis-website

#### run backend application
python -m main

#### build frontend application
cd frontend
npm install
npm run build

### Nginx config
sudo nano /etc/nginx/sites-available/default

server {
    listen 80;
    server_name demo.winvinaya.com;

    location /api/ {
        proxy_pass http://127.0.0.1:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:5173/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


sudo nginx -t
sudo systemctl restart nginx


#### Run Flask as a Service
sudo nano /etc/systemd/system/flask.service
**paste below in this **
[Unit]
Description=Flask Backend Service
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/backend
ExecStart=/home/ubuntu/backend/venv/bin/python -m main.py
Restart=always

[Install]
WantedBy=multi-user.target

sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable flask
sudo systemctl start flask

#### Add SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d demo.winvinaya.com


### Pm2 config
sudo npm install -g pm2
pm2 start venv/bin/python3 --name backend --cwd ~/wvis_website/backend -- main.py
pm2 start "npm run dev" --name frontend --cwd ~/wvis_website/frontend
pm2 save
pm2 startup
pm2 list
pm2 logs backend

pm2 restart backend
pm2 stop backend 


## Making It Available on Port 80 (NGINX)

### Install Nginx
sudo apt install nginx -y

### Nginx Configuration
sudo nano /etc/nginx/sites-available/default

server {
	listen 80;
	server_name demo.winvinaya.com www.demo.winvinaya.com;

	location / {
		proxy_pass http://localhost:5173/;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}

	location / {
    proxy_pass http://127.0.0.1:5000/;  # Backend runs on port 5000
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

}


sudo systemctl restart nginx

sudo certbot --nginx -d demo.winvinaya.com -d www.demo.winvinaya.com

ubuntu@ip-172-31-1-245:~$ sudo certbot --nginx -d training.winvinaya.com -d www.training.winvinaya.com
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): dharanidaran.a@winvinaya.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.5-February-24-2025.pdf. You must
agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
Account registered.
Requesting a certificate for training.winvinaya.com and www.training.winvinaya.com

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/training.winvinaya.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/training.winvinaya.com/privkey.pem
This certificate expires on 2025-07-02.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for training.winvinaya.com to /etc/nginx/sites-enabled/default
Successfully deployed certificate for www.training.winvinaya.com to /etc/nginx/sites-enabled/default
Congratulations! You have successfully enabled HTTPS on https://training.winvinaya.com and https://www.training.winvinaya.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-------------------------------
\c employee_db;
\dt;
SELECT * FROM employee;
