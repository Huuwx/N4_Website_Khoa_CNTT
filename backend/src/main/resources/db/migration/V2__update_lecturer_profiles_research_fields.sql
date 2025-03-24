-- First, set research_fields to JSON type if it exists
ALTER TABLE lecturer_profiles MODIFY COLUMN research_fields JSON;

-- Update any existing null values to empty array
UPDATE lecturer_profiles SET research_fields = '[]' WHERE research_fields IS NULL;