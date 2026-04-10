import './globals.css';
import AIChatbot from "./components/GeminiChatbot";


export const metadata = {
  title: 'AgriFinAI',
  description: 'Empowering Indian agriculture with AI-powered financial and crop advisory solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 antialiased">
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}