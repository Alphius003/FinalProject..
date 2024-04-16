{{
    config(
        tags=['main', 'staging']
    )
}}
 
WITH users AS(
    SELECT
      _ID AS Object_id,
       USERID AS User_id,
       LOWER(FIRSTNAME) AS first_name,
       LOWER(LASTNAME) AS last_name,
       TO_DATE(DOB, 'DD-MM-YYYY') AS date_of_birth,
       LOWER(MAILID) AS email,
       GENDER,
       SPLIT_PART(SKILLS, ',', 1) AS primary_skill,
       CASE
           WHEN EXPERIENCE LIKE '%years%' THEN CAST(REGEXP_REPLACE(EXPERIENCE, '[^0-9]', '') AS INT)
           WHEN EXPERIENCE LIKE '%year%' THEN CAST(REGEXP_REPLACE(EXPERIENCE, '[^0-9]', '') AS INT)
           ELSE NULL
       END AS experience_years,
       LOWER(DESIGNATION) AS designation,
       LOWER(ROLE) AS role
      FROM {{source('data', 'users') }}
)
 
SELECT * FROM users