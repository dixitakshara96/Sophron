
CREATE OR REPLACE FUNCTION public.gen_short_code(prefix text)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  out text := '';
  i int;
BEGIN
  FOR i IN 1..6 LOOP
    out := out || substr(chars, 1 + floor(random() * length(chars))::int, 1);
  END LOOP;
  RETURN prefix || '-' || out;
END;
$$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  parent_code text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Parents can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Parents can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  child_code text NOT NULL UNIQUE,
  name text NOT NULL,
  age int,
  avatar text NOT NULL DEFAULT 'owl',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX children_parent_id_idx ON public.children(parent_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.children TO authenticated;
GRANT ALL ON public.children TO service_role;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents manage own children" ON public.children
  FOR ALL TO authenticated USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);

CREATE OR REPLACE FUNCTION public.assign_parent_code()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE candidate text;
BEGIN
  IF NEW.parent_code IS NULL OR NEW.parent_code = '' THEN
    LOOP
      candidate := public.gen_short_code('PAR');
      EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE parent_code = candidate);
    END LOOP;
    NEW.parent_code := candidate;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_assign_code BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.assign_parent_code();

CREATE OR REPLACE FUNCTION public.assign_child_code()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE candidate text;
BEGIN
  IF NEW.child_code IS NULL OR NEW.child_code = '' THEN
    LOOP
      candidate := public.gen_short_code('CHD');
      EXIT WHEN NOT EXISTS (SELECT 1 FROM public.children WHERE child_code = candidate);
    END LOOP;
    NEW.child_code := candidate;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER children_assign_code BEFORE INSERT ON public.children
FOR EACH ROW EXECUTE FUNCTION public.assign_child_code();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, parent_code)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email), '')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
