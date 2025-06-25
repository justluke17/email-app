import { Search, Inbox, Target, Send, FileText, Trash2, Shield, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function SponsorInbox() {
  const sidebarItems = [
    { icon: Inbox, label: "Main Inbox", active: true },
    { icon: Target, label: "Similar to your Niche" },
    { icon: Send, label: "Sent" },
    { icon: FileText, label: "Drafts" },
    { icon: Shield, label: "Spam" },
    { icon: Trash2, label: "Trash" },
    { icon: Settings, label: "Settings" },
  ]

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
    {
      id: 3,
      company: "FitGear Co.",
      title: "Sponsorship Request: FitGear Co.",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "4 days ago",
      risk: "Low",
      summary:
        "A fitness apparel company wants a creator to showcase their new activewear line. They are offering a product sponsorship and a discount code for the creator's audience.",
      riskColor: "bg-green-500",
    },
    {
      id: 4,
      company: "FoodieExpress",
      title: "Sponsorship Request: FoodieExpress",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "5 days ago",
      risk: "Medium",
      summary:
        "A food delivery service is looking for a creator to promote their app. They are offering a flat fee of $1,000 and a referral bonus.",
      riskColor: "bg-yellow-500",
    },
    {
      id: 5,
      company: "Wanderlust Travel",
      title: "Sponsorship Request: Wanderlust Travel",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "6 days ago",
      risk: "High",
      summary:
        "A travel agency is seeking a creator to document their trip to a tropical destination. They are offering an all-expenses-paid trip and a fee of $2,000.",
      riskColor: "bg-red-500",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">CollabPilot</h1>
        <nav className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className={
                  "flex items-center space-x-3 px-3 py-2 rounded " +
                  (item.active
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white")
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 max-w-sm">
          <Input
            placeholder="Search sponsorships..."
            className="bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-4">
          {sponsorshipRequests.map((req) => (
            <Card key={req.id}>
              <CardContent className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={req.avatar} alt={req.company} />
                  <AvatarFallback>{req.company[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{req.title}</h2>
                    <Badge className={req.riskColor}>{req.risk}</Badge>
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
  )
}
