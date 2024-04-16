{{ config(
    materialized='table',
    tags=['mart']
)}}
with user_registrations as (

    SELECT
        user_id,
        COUNT(*) AS events_attended_count
      FROM {{ ref('staging_event_reg') }}
      GROUP BY user_id
)
select * from user_registrations
