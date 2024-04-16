{{ config(
    materialized='table',
    tags=['mart']
)}}

with Designation_Dist as (
    SELECT
        designation,
        COUNT(*) AS user_count
    FROM {{ ref('staging_users') }}
    GROUP BY designation
)

select * from Designation_Dist
-- 


