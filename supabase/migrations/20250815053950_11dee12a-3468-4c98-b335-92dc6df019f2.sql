-- Enable RLS on all tables that need protection
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_subscription ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for doctors table
CREATE POLICY "Public can view doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Admins can manage doctors" ON public.doctors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::bigint AND role = 'admin')
);

-- Create policies for hospitals table  
CREATE POLICY "Public can view hospitals" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Admins can manage hospitals" ON public.hospitals FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::bigint AND role = 'admin')
);

-- Create policies for laboratories table
CREATE POLICY "Public can view laboratories" ON public.laboratories FOR SELECT USING (true);
CREATE POLICY "Admins can manage laboratories" ON public.laboratories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::bigint AND role = 'admin')
);

-- Create policies for pharmacies table
CREATE POLICY "Public can view pharmacies" ON public.pharmacies FOR SELECT USING (true);
CREATE POLICY "Admins can manage pharmacies" ON public.pharmacies FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::bigint AND role = 'admin')
);

-- Create policies for student_subscription table
CREATE POLICY "Students can view own subscriptions" ON public.student_subscription FOR SELECT USING (
  user_id = auth.uid()::bigint
);
CREATE POLICY "Students can create own subscriptions" ON public.student_subscription FOR INSERT WITH CHECK (
  user_id = auth.uid()::bigint
);
CREATE POLICY "Admins can manage all subscriptions" ON public.student_subscription FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::bigint AND role = 'admin')
);

-- Create policies for system_settings table
CREATE POLICY "Public can view system settings" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage system settings" ON public.system_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid()::bigint AND role = 'admin')
);

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (
  id = auth.uid()::bigint
);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (
  id = auth.uid()::bigint
);
CREATE POLICY "Admins can manage all users" ON public.users FOR ALL USING (
  role = 'admin'
);

-- Add missing columns to tables
ALTER TABLE public.student_subscription ADD COLUMN IF NOT EXISTS plan VARCHAR;

-- Create enum types for better data consistency
DO $$ BEGIN
    CREATE TYPE subscription_plan AS ENUM ('gold', 'silver', 'bronze');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;