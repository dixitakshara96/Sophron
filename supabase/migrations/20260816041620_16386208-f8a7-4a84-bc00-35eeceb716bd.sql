
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.assign_parent_code() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.assign_child_code() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.gen_short_code(text) FROM PUBLIC, anon, authenticated;
