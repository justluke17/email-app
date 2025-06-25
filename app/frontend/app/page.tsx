"use client"; // Required for using NextAuth.js hooks

import { Search, Inbox, Target, Send, FileText, Trash2, Shield, Settings, LogIn, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useSession, signIn, signOut } from "next-auth/react";

export default function SponsorInbox() {
  const { data: session, status } = useSession();

  const sidebarItems = [
    { icon: Inbox, label: "Main Inbox", active: true },
    { icon: Target, label: "Similar to your Niche" },
    { icon: Send, label: "Sent" },
    { icon: FileText, label: "Drafts" },
    { icon: Shield, label: "Spam" },
    { icon: Trash2, label: "Trash" },
    // { icon: Settings, label: "Settings" }, // Settings might be user-specific
  ];

  const sponsorshipRequests = [
    {
      id: 1,
      company: "TechBrand Inc.",
      title: "Sponsorship Request: TechBrand Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "2 days ago",
      risk: "Low",
      summary:
        "This is a sponsorship opportunity from a well-known brand in the tech industry. They are looking for a creator to promote their new product launch. The budget is $5,000.",
      riskColor: "bg-green-500",
    },
    {
      id: 2,
      company: "GameDev Studio",
      title: "Sponsorship Request: GameDev Studio",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "3 days ago",
      risk: "Medium",
      summary:
        "A gaming company is seeking a creator to review their latest game. They offer a free copy of the game and a commission based on sales.",
      riskColor: "bg-yellow-500",
    },
    // ... other requests
  ];

  if (status === "loading") {
    return (
      <div className="flex h-screen bg-gray-900 text-white items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen bg-gray-900 text-white items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to CollabPilot</h1>
          <p className="mb-8 text-gray-300">Please sign in to manage your sponsorships.</p>
          <Button onClick={() => signIn("google")} className="bg-blue-600 hover:bg-blue-700">
            <LogIn className="mr-2 h-5 w-5" /> Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  // @ts-ignore // Accessing custom user property from session
  const userEmail = session.user?.email;
  // @ts-ignore
  const userName = session.user?.full_name;
   // @ts-ignore
  const userPicture = session.user?.picture;


  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 p-6 flex flex-col">
        <div className="flex items-center mb-6">
           {userPicture && (
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={userPicture} alt={userName || 'User'} />
              <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <h1 className="text-xl font-bold">CollabPilot</h1>
            {userName && <p className="text-sm text-gray-400">{userName}</p>}
            {userEmail && <p className="text-xs text-gray-500">{userEmail}</p>}
          </div>
        </div>

        <nav className="space-y-3 flex-grow">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={
                  "w-full flex items-center space-x-3 px-3 py-2 rounded " +
                  (item.active
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white")
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
           <button
            key="Settings"
            className="w-full flex items-center space-x-3 px-3 py-2 rounded text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <Button
            onClick={() => signOut()}
            variant="ghost"
            className="w-full flex items-center space-x-3 px-3 py-2 rounded text-gray-400 hover:bg-red-700 hover:text-white justify-start"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 max-w-sm">
          <Input
            placeholder="Search sponsorships..."
            className="bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 border-gray-700"
          />
        </div>
        <div className="space-y-4">
          {sponsorshipRequests.map((req) => (
            <Card key={req.id} className="bg-gray-800 border-gray-700">
              <CardContent className="flex items-start space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={req.avatar} alt={req.company} />
                  <AvatarFallback>{req.company[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-100">{req.title}</h2>
                    <Badge className={`${req.riskColor} text-white`}>{req.risk}</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{req.summary}</p>
                  <p className="text-xs text-gray-500 mt-2">{req.timeAgo}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
