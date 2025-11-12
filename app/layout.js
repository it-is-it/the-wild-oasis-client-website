import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";

export const metadata = {
  title: "The Wild Oasis",
  description: "The Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright &copy; The Wild Oasis</footer>
      </body>
    </html>
  );
}
