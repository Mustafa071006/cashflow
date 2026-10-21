function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-obsidian px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export default AuthLayout;
