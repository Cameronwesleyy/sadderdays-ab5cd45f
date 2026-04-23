DELETE FROM public.tour_dates WHERE date = 'MAR 14' AND venue = 'Trans Pecos';

INSERT INTO public.tour_dates (date, venue, city, status, ticket_link, sort_order) VALUES
  ('TBD', 'Market Hotel', 'NEW YORK, NY', 'available', 'https://link.dice.fm/j8ed7d5d4bea', 1),
  ('TBD', 'El Cid', 'LOS ANGELES, CA', 'available', 'https://link.dice.fm/L9046a96ce73', 2);