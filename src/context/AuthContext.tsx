    import { createContext, useContext, useEffect, useState, ReactNode } from "react";
    import { User } from "@supabase/supabase-js";
    import { supabase } from "@/integrations/supabase/client";

    type AuthContextType = {
      user: User | null;
      loading: boolean;
      nickname: string | null;
      role: "admin" | "user" | null;
      signOut: () => Promise<void>;
    };

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider = ({ children }: { children: ReactNode }) => {
      const [user, setUser] = useState<User | null>(null);
      const [nickname, setNickname] = useState<string | null>(null);
      const [role, setRole] = useState<"admin" | "user" | null>(null);
      const [loading, setLoading] = useState(true);

      const loadProfile = async (user: User | null) => {
        if (!user) return;

        const { data } = await supabase
          .from("profiles")
          .select("name, role")
          .eq("id", user.id)
          .single();

        setNickname(data?.name ?? null);
        setRole(data?.role ?? "user");
      };

      useEffect(() => {
        supabase.auth.getSession().then(async ({ data }) => {
          const sessionUser = data.session?.user ?? null;
          setUser(sessionUser);
          await loadProfile(sessionUser);
          setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            const sessionUser = session?.user ?? null;
            setUser(sessionUser);
            await loadProfile(sessionUser);
          }
        );

        return () => listener.subscription.unsubscribe();
      }, []);

      const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setNickname(null);
        setRole(null);
      };

      return (
        <AuthContext.Provider value={{ user, nickname, role, loading, signOut }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      const ctx = useContext(AuthContext);
      if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
      return ctx;
    };
