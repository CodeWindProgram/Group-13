DROP TABLE IF EXISTS PRINCIPLE;
DROP TABLE IF EXISTS TEACHERS;
DROP TABLE IF EXISTS DEPARTMENTS;
DROP TABLE IF EXISTS PROGRAMS;
DROP TABLE IF EXISTS STUDENTS;
DROP TABLE IF EXISTS SUBJECTS;
DROP TABLE IF EXISTS ATTENDANCE;

CREATE TABLE PRINCIPLE (AID INT PRIMARY KEY , ANAME VARCHAR (50), APASS VARCHAR(50));
                   
CREATE TABLE TEACHERS (TID VARCHAR (20) PRIMARY KEY ,TPASS VARCHAR (50) ,TNAME VARCHAR (50), GENDER VARCHAR (10), POST VARCHAR (50), MAIL VARCHAR (50), PHONE INT);

CREATE TABLE DEPARTMENTS (DEPTID VARCHAR (20) PRIMARY KEY , DEPTNAME VARCHAR (50), DEPTFLR INT,HODID VARCHAR(20) ,  CONSTRAINT HODID FOREIGN KEY (HODID) REFERENCES TEACHERS (TID) );
                                                                                
CREATE TABLE PROGRAMS (PROGID VARCHAR (20) PRIMARY KEY, PROGNAME VARCHAR (50) , YEAR VARCHAR(30), SEM INT , DIV VARCHAR(30), CAID VARCHAR(20), CONSTRAINT (CAID) FOREIGN KEY CAID REFERENCES TEACHERS(TID));

CREATE TABLE STUDENTS (STUDID VARCHAR (20) PRIMARY KEY, STUDNAME VARCHAR(50) , GENDER VARCHAR(10), YEAR VARCHAR(30), SEM INT, PROGID VARCHAR(20) , CONSTRAINT PROGID FOREIGN KEY PROGRAMS REFERENCES PROGRAMS(PROGID));

CREATE TABLE SUBJECTS (SUBID VARCHAR(20) PRIMARY KEY, SUBNAME VARCHAR(30), LECTID VARCHAR(20) , CONSTRAINT LECTID FOREIGN KEY LECTID REFERENCES TEACHERS (TID));

CREATE TABLE ATTENDANCE (ATTID INT PRIMARY KEY, STUDID VARCHAR(11) ,  ROOM INT, CLDATE DATE, STIME TIME(0) , ETIME(0), STATUS VARCHAR(10), LECTID VARCHAR(11), CONSTRAINT LECTID FOREIGN KEY LECTID REFERENCES TEACHERS (TID));
                                                                               
                                                                                
INSERT INTO PRINCIPLE VALUES (1001 , 'ADMIN' , 'Admin');
                                                                                
INSERT INTO TEACHERS VALUES ('TUS3F181941' , 'ADNAN' , 'ADNAN' , 'MALE', 'ASSISTANT PROFESSOR', 'ADNAN@GMAIL.COM', 222222222);
                                                                                
INSERT INTO DEPARTMENTS VALUES ('DEPT-COMPS', 'COMPUTER ENGINEERING', 2, 'TUS3F181941');             

INSERT INTO PROGRAMS VALUES ('BE-SEM5-C', 'COMPUTER ENGINEERING', 'FOURTH YEAR (BE)' , 5, 'C' , 'TUS3F181941');

INSERT INTO STUDENTS VALUES ('TUS3F181932', 'TANAY SALVE', 'MALE', 'FOURTH YEAR (BE)', 5, 'BE-SEM5-C');

INSERT INTO ATTENDANCE VALUES (1, 'TUS3F181932' , 2, '2021-06-18', '10:00:00', '11:00:00','PRESENT');