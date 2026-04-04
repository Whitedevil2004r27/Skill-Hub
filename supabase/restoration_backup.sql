-- PostgreSQL database restoration script
-- Fixed version with Primary Key constraints for ON CONFLICT

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    display_name text,
    avatar_url text,
    role text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_user_id_key UNIQUE (user_id),
    CONSTRAINT profiles_role_check CHECK ((role = ANY (ARRAY['learner'::text, 'mentor'::text, 'both'::text])))
);

ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: profiles Profiles are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Profiles are viewable by everyone' AND tablename = 'profiles') THEN
        CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
    END IF;
END $$;

--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: postgres
--
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own profile' AND tablename = 'profiles') THEN
        CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));
    END IF;
END $$;

--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: postgres
--
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own profile' AND tablename = 'profiles') THEN
        CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = user_id));
    END IF;
END $$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Data Restoration
--

INSERT INTO public.profiles (id, user_id, display_name, avatar_url, role, created_at, updated_at)
VALUES ('aef3ff01-41d2-4da5-b080-33fee8c869c7', '94ee61ee-8b01-40d7-9554-6af8a3f45fc5', 'Jerry', 'https://lh3.googleusercontent.com/a/ACg8ocIG6cn2HHFISqQ4uzSKy36QDMguoaFQcEreuO7Y3Rnp0V7Fex7K=s96-c', 'learner', '2025-08-01 06:14:47.900647+00', '2025-08-03 08:09:54.959592+00')
ON CONFLICT (id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = EXCLUDED.updated_at;
