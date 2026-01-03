-- Enable the pg_net extension to make HTTP requests
create extension if not exists pg_net;

-- Function to handle new order insertion
create or replace function public.handle_new_order()
returns trigger as $$
declare
  -- REPLACE WITH YOUR ACTUAL DEPLOYED URL (e.g., https://your-domain.com/api/order-placed)
  -- Note: Localhost URLs won't work from Supabase cloud database unless you use a tunnel (e.g., ngrok).
  api_url text := 'https://your-deployment-url.com/api/order-placed'; 
begin
  -- Send API Request with only the orderId
  -- Using pg_net to send an asynchronous POST request
  perform net.http_post(
      url := api_url,
      headers := json_build_object(
          'Content-Type', 'application/json'
      )::jsonb,
      body := json_build_object(
          'orderId', new.id
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
