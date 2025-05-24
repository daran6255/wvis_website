# AI Chatbot - WVIS

## Project directory Structure

├── backend/
│   ├── app/                      
│   │   ├── __init__.py                
│   │   ├── database.py             
│   │   ├── config.py
│   |   ├── api/                 
│   │   |   ├── signup.py
│   │   |   ├── login.py
│   |   ├── models/                 
│   │   |   ├── users.py
│   ├── run.py 


## pip install -r requirements.txt

## Initialize the migration directory:
flask db init  # Initializes the migrations folder
flask db migrate -m "Initial migration"  # Creates the migration script
flask db upgrade  # Applies the migration and creates the table

flask db migrate -m "Add blog table"
flask db upgrade
