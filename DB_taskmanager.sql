CREATE TABLE TaskInfo (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(25) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    priority VARCHAR(15),
    last_modified_by VARCHAR(50) NOT NULL,
    date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

USE db_taskmanager;
SELECT * FROM TaskInfo;