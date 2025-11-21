export type SupabaseUser = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string | null;
  phone: string;
  confirmation_sent_at: string | null;
  confirmed_at: string | null;
  last_sign_in_at: string | null;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss?: string;
    name: string;
    phone_verified: boolean;
    picture: string;
    provider_id?: string;
    sub?: string;
  };
  identities: Array<{
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      full_name: string;
      phone_verified: boolean;
      sub?: string;
      avatar_url?: string;
      iss?: string;
      name?: string;
      picture?: string;
      provider_id?: string;
    };
    provider: string;
    last_sign_in_at: string | null;
    created_at: string;
    updated_at: string;
    email: string;
  }>;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};
