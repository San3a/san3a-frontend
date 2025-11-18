import { useTheme } from "next-themes";

export default function UserHeader() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-4 mb-4">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop"
        alt="User"
      />
      <h2
        className={`font-semibold 
        ${theme === "dark" ? "text-white" : "text-black"}
        `}
      >
        Yousef Mohamed
      </h2>
    </div>
  );
}
