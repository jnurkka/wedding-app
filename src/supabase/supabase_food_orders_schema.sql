-- Create enum types for menu selections
CREATE TYPE appetizer_type AS ENUM ('fish', 'vegetarian');
CREATE TYPE main_course_type AS ENUM ('meat', 'fish', 'vegetarian');

-- Create food_orders table for individual participant menu selections
CREATE TABLE food_orders (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    participant_index INTEGER NOT NULL,
    participant_name TEXT NOT NULL,
    appetizer appetizer_type,
    main_course main_course_type,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Composite primary key
    PRIMARY KEY (user_id, participant_index)
);

-- Enable Row Level Security
ALTER TABLE food_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for food_orders table
-- Users can only access their own food orders
CREATE POLICY "Users can view their own food orders" ON food_orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food orders" ON food_orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food orders" ON food_orders
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food orders" ON food_orders
    FOR DELETE USING (auth.uid() = user_id);

-- Create index for better performance (user_id is already indexed as part of primary key)
-- No additional index needed since user_id is part of the primary key

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_food_orders_updated_at
    BEFORE UPDATE ON food_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();