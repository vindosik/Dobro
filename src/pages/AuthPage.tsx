// src/pages/AuthPage.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Якщо вже залогінений — йдемо на головну
  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignIn = async () => {
    setSubmitting(true);
    setMessage("");

    if (!email || !password) {
      setMessage("Заповніть всі поля!");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Показуємо більш читабельне повідомлення
      if (error.message.toLowerCase().includes("email")) {
        setMessage("Підтвердіть email перед входом");
      } else {
        setMessage("Невірний email або пароль");
      }
      setSubmitting(false);
      return;
    }

    // Успіх — йдемо на головну
    navigate("/", { replace: true });
    setSubmitting(false);
  };

  const handleSignUp = async () => {
    setSubmitting(true);
    setMessage("");

    if (!username || !email || !password) {
      setMessage("Заповніть всі поля!");
      setSubmitting(false);
      return;
    }

    if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
      setMessage("Логін має бути від 3 до 20 символів (тільки літери та цифри)");
      setSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Невірний формат email");
      setSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Пароль має містити мінімум 6 символів");
      setSubmitting(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: username,
        },
        // якщо хочеш, змінюй redirect; зазвичай emailRedirectTo корисний при веріфікації
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) {
      setMessage(error.message);
      setSubmitting(false);
      return;
    }

    // Якщо сесія створена відразу (наприклад confirm off або автологін),
    // перевіряємо та редіректимо на головну.
    const sessionResp = await supabase.auth.getSession();
    const sessionUser = sessionResp.data.session?.user ?? null;
    if (sessionUser) {
      navigate("/", { replace: true });
      setSubmitting(false);
      return;
    }

    // Інакше — просимо підтвердити email
    setMessage("Реєстрація успішна. Перевірте пошту та підтвердіть email.");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          {mode === "signin" ? "Вхід" : "Реєстрація"}
        </h2>

        {mode === "signup" && (
          <input
            type="text"
            placeholder="Нікнейм"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-3 border rounded"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />

        {message && <p className="mb-4 text-sm text-red-500">{message}</p>}

        <button
          onClick={mode === "signin" ? handleSignIn : handleSignUp}
          disabled={submitting}
          className={`w-full p-3 rounded text-white ${
            mode === "signin" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } mb-4`}
        >
          {mode === "signin" ? "Увійти" : "Зареєструватися"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          {mode === "signin" ? "Ще нема акаунту?" : "Вже є акаунт?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setMessage("");
            }}
            className="text-blue-600 hover:underline"
          >
            {mode === "signin" ? "Зареєструватися" : "Увійти"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
