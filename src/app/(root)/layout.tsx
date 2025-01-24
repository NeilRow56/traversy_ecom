export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col bg-blue-50">
      <main className="flex-1 wrapper bg-green-50">{children}</main>
    </div>
  );
}
