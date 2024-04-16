{{ config(
    materialized='table',
    tags=['mart']
)}}

with 
reg_and_event as(
    SELECT
    er.user_id,
    e.*
    
FROM
    {{ ref('staging_event_reg') }} er
left JOIN
    {{ ref('staging_events') }} e
ON
    e.event_id = er.event_id
),
merge_all as(
    SELECT
    re.*,
    u. first_name,
    u.last_name,
    u.date_of_birth,
    u.email,
    u.GENDER,
    u.primary_skill ,
    u.experience_years,
    u.designation,
    u.role
    
FROM
    reg_and_event re
left JOIN
    {{ ref('staging_users') }} u
ON
    u.user_id = re.user_id
-- WHERE 
--     u.primary_skill = re.event_name
)

select * from merge_all