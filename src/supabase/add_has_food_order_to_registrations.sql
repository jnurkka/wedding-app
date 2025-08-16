-- Add a boolean column to `registrations` to indicate if a guest has submitted any food order
ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS has_food_order BOOLEAN NOT NULL DEFAULT FALSE;

-- Backfill existing rows based on current food_orders
UPDATE registrations r
SET has_food_order = EXISTS (
  SELECT 1 FROM food_orders f WHERE f.user_id = r.user_id
);

-- Function to keep `has_food_order` in sync when rows in `food_orders` change
CREATE OR REPLACE FUNCTION public.sync_has_food_order()
RETURNS TRIGGER AS $$
DECLARE
  affected_user UUID;
  has_any_orders BOOLEAN;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    affected_user := NEW.user_id;
  ELSIF (TG_OP = 'DELETE') THEN
    affected_user := OLD.user_id;
  ELSE
    affected_user := COALESCE(NEW.user_id, OLD.user_id);
  END IF;

  SELECT EXISTS(SELECT 1 FROM food_orders WHERE user_id = affected_user) INTO has_any_orders;

  UPDATE registrations
    SET has_food_order = COALESCE(has_any_orders, FALSE)
    WHERE user_id = affected_user;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger on INSERT/DELETE/UPDATE of food_orders to sync the flag
DROP TRIGGER IF EXISTS trg_sync_has_food_order_ins ON food_orders;
DROP TRIGGER IF EXISTS trg_sync_has_food_order_del ON food_orders;
DROP TRIGGER IF EXISTS trg_sync_has_food_order_upd ON food_orders;

CREATE TRIGGER trg_sync_has_food_order_ins
AFTER INSERT ON food_orders
FOR EACH ROW EXECUTE FUNCTION public.sync_has_food_order();

CREATE TRIGGER trg_sync_has_food_order_del
AFTER DELETE ON food_orders
FOR EACH ROW EXECUTE FUNCTION public.sync_has_food_order();

CREATE TRIGGER trg_sync_has_food_order_upd
AFTER UPDATE ON food_orders
FOR EACH ROW EXECUTE FUNCTION public.sync_has_food_order();


