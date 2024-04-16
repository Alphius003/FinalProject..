{{ config(
    materialized='table',
    tags=['mart']
)}}

with top_skills as (
    SELECT
        primary_skill,
        COUNT(*) AS user_count
    FROM {{ ref('staging_users') }}
    GROUP BY primary_skill
    ORDER BY user_count DESC
)

select * from top_skills



