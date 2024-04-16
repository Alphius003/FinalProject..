{{
    config(
        tags=['main', 'staging']
    )
}}
WITH event_reg AS (
   SELECT
       ID AS object_id,
       EVENTID AS event_id,
       USERID AS user_id
   FROM {{source('data', 'event_registration') }}
)

SELECT * FROM event_reg
