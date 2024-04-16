{{ config(
    materialized='table',
    tags=['mart']
)}}

with Avg_Experience as (
    SELECT
        GENDER,
        AVG(experience_years) AS avg_experience_years
    FROM {{ ref('staging_users') }}
    GROUP BY GENDER
)

select * from Avg_Experience
-- 
