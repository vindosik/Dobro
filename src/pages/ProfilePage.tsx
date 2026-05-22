import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-lg bg-card border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Профіль</h1>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Нікнейм:</span>{" "}
            {user.user_metadata?.name || "—"}
          </p>
          <p>
            <span className="font-medium">Статус:</span> Користувач
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
