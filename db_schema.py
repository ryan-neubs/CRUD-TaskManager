from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

class Task(Base): # This is a template for our code to know how to pass the info to the database
    __tablename__ = 'TaskInfo'
    task_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(50), nullable=False)
    description = Column(String(500))
    creation_date = Column(TIMESTAMP, server_default=func.current_timestamp())
    status = Column(String(25), nullable=False)
    created_by = Column(String(50), nullable=False)
    priority = Column(String(15), nullable=True)
    date_modified = Column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp())