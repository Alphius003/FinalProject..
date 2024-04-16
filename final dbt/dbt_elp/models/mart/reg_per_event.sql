{{ config(
    materialized='table',
    tags=['mart']
)}}

with event_registrations as (
    select
        event_id,
        count(*) as registrations_count
      from {{ ref('staging_event_reg') }}
      group by event_id
)

select * from event_registrations