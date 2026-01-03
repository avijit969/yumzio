-- Enable the pg_net extension to make HTTP requests
create extension if not exists pg_net;

-- Function to handle new order insertion
create or replace function public.handle_new_order()
returns trigger as $$
declare
  user_record record;
  restaurant_record record;
  order_items_json jsonb;
  -- REPLACE WITH YOUR ACTUAL DEPLOYED URL (e.g., https://your-project.vercel.app/api/order-placed)
  -- Note: Localhost URLs won't work from Supabase cloud database.
  api_url text := 'https://your-deployment-url.com/api/order-placed'; 
begin
  -- 1. Get User Details (Adjust table/column names as per your schema)
  -- Assuming public.users or public.profiles
  select first_name, email into user_record
  from public.users
  where id = new.user_id;

  -- 2. Get Restaurant Details
  select name into restaurant_record
  from public.restaurants
  where id = new.restaurant_id;

  -- 3. Get Order Items
  -- CAUTION: If order_items are inserted *after* the order (in the same transaction),
  -- this query might return empty results if the trigger fires immediately on order insert.
  -- Consider triggering on a status update (e.g., 'PAYMENT_SUCCESS') or ensuring items are inserted first if possible.
  select json_agg(json_build_object(
      'name', mi.name, 
      'quantity', oi.quantity, 
      'price', mi.price
  )) 
  into order_items_json
  from public.order_items oi
  join public.menu_items mi on oi.menu_item_id = mi.id
  where oi.order_id = new.id;

  -- 4. Send API Request
  -- Using pg_net to send an asynchronous POST request
  perform net.http_post(
      url := api_url,
      headers := json_build_object(
          'Content-Type', 'application/json'
      )::jsonb,
      body := json_build_object(
          'orderId', new.id,
          'userId', new.user_id,
          'totalAmount', new.total_amount,
          'otp', new.otp,
          'firstName', COALESCE(user_record.first_name, 'Customer'),
          'email', COALESCE(user_record.email, 'no-email@example.com'),
          'restaurantName', COALESCE(restaurant_record.name, 'Restaurant'),
          'items', COALESCE(order_items_json, '[]'::jsonb)
      )::jsonb
  );

  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger
drop trigger if exists on_order_placed on public.orders;

create trigger on_order_placed
after insert on public.orders
for each row execute function public.handle_new_order();
