{{ config(
    materialized='table',
    tags=['mart']
)}}

with Skill_Proficiency as (
    SELECT
        primary_skill,
        CASE
            WHEN experience_years < 2 THEN 'Beginner'
            WHEN experience_years BETWEEN 2 AND 5 THEN 'Intermediate'
            ELSE 'Advanced'
        END AS proficiency_level,
        COUNT(*) AS user_count
    FROM {{ ref('staging_users') }}
    GROUP BY primary_skill, proficiency_level
    ORDER BY primary_skill, proficiency_level

)

select * from Skill_Proficiency
