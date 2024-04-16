{{
    config(
        tags=['main', 'staging']
    )
}}
WITH events AS (
   SELECT
       ID AS event_id,
       NAME AS event_name,
        CASE
           WHEN DATEDIFF(DAY, TO_DATE(STARTDATE, 'DD-MM-YYYY'), TO_DATE(ENDDATE, 'DD-MM-YYYY')) = 0 THEN 6
           WHEN DATEDIFF(DAY, TO_DATE(STARTDATE, 'DD-MM-YYYY'), TO_DATE(ENDDATE, 'DD-MM-YYYY')) = 1 THEN 12
           WHEN DATEDIFF(DAY, TO_DATE(STARTDATE, 'DD-MM-YYYY'), TO_DATE(ENDDATE, 'DD-MM-YYYY')) = 2 THEN 18
           ELSE DURATION
       END AS duration_hours,
       TO_DATE(STARTDATE, 'DD-MM-YYYY') AS start_date,
       TO_DATE(ENDDATE, 'DD-MM-YYYY') AS end_date,
       PREREQUISITE AS prerequisites,
       MODE AS mode,
       CASE
           WHEN MODE = 'online' THEN MEETINGLINK
           ELSE 'It is an offline event!'
       END AS meeting_link,
       CASE
           WHEN MODE = 'offline' THEN VENUE
           ELSE 'It is an online event'
       END AS venue
   FROM {{source('data', 'events') }}
)

SELECT * FROM events
